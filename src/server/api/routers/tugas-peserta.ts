import { Prisma } from "@prisma/client";
import type { Submission } from "@prisma/client";
import { inferProcedureBuilderResolverOptions } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";

type Topts = inferProcedureBuilderResolverOptions<typeof protectedProcedure>;

export interface tugasDataExtend extends Prisma.TugasGetPayload<{ include: { submissions: true } }> {
  tugasScore?: number | null;
}

async function getAllTugasData(opts: Topts) {
  const { ctx } = opts;
  return await ctx.db.tugas.findMany({
    where: {
      hidden: false,
      OR: [
        {
          targetNimPeserta: {
            has: ctx.session.user.nim,
          },
        },
        {
          targetNimPeserta: { equals: [] },
        },
      ],
    },
    orderBy: [{ updatedAt: "desc" }],
    include: {
      submissions: {
        where: {
          hidden: false,
          submissionById: ctx.session.user.id,
        },
      },
    },
  });
}

async function getAllSubmission(opts: Topts) {
  const { ctx } = opts;
  return await ctx.db.submission.findMany({
    where: {
      submissionById: ctx.session.user.id,
      hidden: false,
    },
  });
}
async function getTugasScore(tugasId: string, allSubmission: Prisma.PromiseReturnType<typeof getAllSubmission>) {
  const submissionsForThisTugas = allSubmission?.filter((submission) => submission.submissionTugasId === tugasId);
  //check if no submission
  if (!submissionsForThisTugas) return null;

  //check if ungraded
  let isUngraded = true;
  for (const submissionForThisTugas of submissionsForThisTugas) {
    if (submissionForThisTugas.score !== null) isUngraded = false;
  }
  if (isUngraded) return null;

  //cumulate tugasScore
  const tugasScore = submissionsForThisTugas?.reduce((prev, current) => prev + (current.score ?? 0), 0) ?? 0;
  return tugasScore;
}

async function getCumulatedSubmissionScore(submissions: Submission[]) {
  //check if no submission
  if (!submissions) return null;

  //check if ungraded
  let isUngraded = true;
  for (const submissionForThisTugas of submissions) {
    if (submissionForThisTugas.score !== null) isUngraded = false;
  }
  if (isUngraded) return null;

  //cumulate score
  const cumulatedScore = submissions?.reduce((prev, current) => prev + (current.score ?? 0), 0) ?? 0;
  return cumulatedScore;
}

export const tugasPesertaRouter = createTRPCRouter({
  getAllSubmission: protectedProcedure.query((opts) => {
    return getAllSubmission(opts);
  }),
  getCarouselTugasData: protectedProcedure.query(async (opts) => {
    const { ctx } = opts;
    const allTugasData = await getAllTugasData(opts);
    const carouselItemCount = 3;
    const tugasDataArr: tugasDataExtend[][] = Array(carouselItemCount)
      .fill(0)
      .map(() => []);

    for (const tugasData of allTugasData) {
      const tugasDataExtend: tugasDataExtend = tugasData;

      //get cumulated tugas score
      const tugasScore = await getCumulatedSubmissionScore(tugasDataExtend.submissions);
      tugasDataExtend.tugasScore = tugasScore;

      //carousel item placement
      if (tugasDataExtend.deadline! > new Date()) {
        //upcoming
        tugasDataArr[1]!.push(tugasDataExtend);
      } else if (tugasScore !== null) {
        //graded and past deadline
        tugasDataArr[0]!.push(tugasDataExtend);
      } else {
        //ungraded and past deadline
        tugasDataArr[2]!.push(tugasDataExtend);
      }
    }

    // console.log(JSON.stringify(tugasArr, null, 2));
    return tugasDataArr;
  }),
});
