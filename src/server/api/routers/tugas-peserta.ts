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
interface TleaderboardData {
  nim: string;
  nama: string;
  score: number;
}
export type TleaderboardDatas = Array<TleaderboardData>;
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

async function getCumulatedSubmissionScore(submissions: Submission[]){
  // check if no submission
  if (!submissions) return null;

  //check if ungraded
  let isUngraded = true;
  for (const submissionForThisTugas of submissions) {
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (submissionForThisTugas.score !== null) isUngraded = false;
  }
  if (isUngraded) return null;

  //cumulate score
  const cumulatedScore = submissions?.reduce((prev, current) => prev + (current.score ?? 0), 0) ?? 0;
  return cumulatedScore;
}

function quickSortLeaderboardDatas(datas: TleaderboardDatas): TleaderboardDatas{
  if(datas.length <=1) {
    return datas;
  }
  const pivot: TleaderboardData = datas[0]!;
  const leftArr: TleaderboardDatas = [];
  const rightArr: TleaderboardDatas = [];

  //exclude pivot in sorting
  datas.slice(1).forEach((data) => {
    // > operator for descending
    if (data.score > pivot.score){
      leftArr.push(data);
    } else {
      rightArr.push(data);
    }
  })
  return [...quickSortLeaderboardDatas(leftArr), pivot, ...quickSortLeaderboardDatas(rightArr)];  
}

async function getAllUserSubmission(opts: Topts) {
  const { ctx } = opts;
  return await ctx.db.user.findMany({
    include: {
      submissions: {
        where: {
          hidden: false,
        },
      },
    },
  });
}


export const tugasPesertaRouter = createTRPCRouter({
  getAllSubmission: protectedProcedure.query((opts) => {
    return getAllUserSubmission(opts);
  }),
  getLeaderboardData: protectedProcedure.query(async (opts) => {
    const leaderboardDatas : TleaderboardDatas = [];
    const allUserSubmission = await getAllUserSubmission(opts);
    const all23UserSubmission = allUserSubmission.filter((userSubmission) => parseInt(userSubmission.nim!) > 10223000);

    //generate leaderboard data
    for(const userSubmission of all23UserSubmission){
      const cumulatedScore = (await getCumulatedSubmissionScore(userSubmission.submissions)) ?? 0;
      leaderboardDatas.push({
        nim: userSubmission.nim!,
        nama: userSubmission.name!,
        score: cumulatedScore
    });
    }

    //descending sort by score using quicksore algorithm
    const sortedLeaderboardDatas = quickSortLeaderboardDatas(leaderboardDatas);
    return sortedLeaderboardDatas;
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
