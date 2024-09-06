import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";

export const tugasAdminRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.tugas.findMany();
  }),
  tugasAdminCreate: publicProcedure
    .input(
      z.object({
        judul: z.string(),
        body: z.string(),
        attachment: z.string(),
        deadline: z.date(),
        isTugasSpesial: z.boolean(),
        targetNimPeserta: z.array(z.string()),
        perintahMisi: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      //NOT USED ANYMORE:  const deadlineUTC = new Date(input.deadline.getTime()-7*60*60*1000) // convert time from GMT+7 to database's UTC time
      const deadlineUTC = input.deadline;
      return ctx.db.tugas.create({
        data: {
          judul: input.judul,
          body: input.body,
          attachment: input.attachment,
          deadline: deadlineUTC,
          isTugasSpesial: input.isTugasSpesial,
          targetNimPeserta: input.targetNimPeserta,
          perintahMisi: input.perintahMisi,
        },
      });
    }),
  getTugasSubmissions: publicProcedure.query(({ ctx }) => {
    return ctx.db.submission.findMany({
      where: {
        hidden: false,
      },
      include: {
        submissionBy: true,
      },
    });
  }),
  hideTugas: publicProcedure.input(z.object({ tugasId: z.string() })).mutation(async ({ ctx, input }) => {
    if (ctx.session && ctx.session.user) {
      console.log(console.log("hiding tugasId " + input.tugasId));
      return ctx.db.tugas.update({
        where: { id: input.tugasId },
        data: { hidden: true },
      });
    }
  }),
  unhideTugas: publicProcedure.input(z.object({ tugasId: z.string() })).mutation(async ({ ctx, input }) => {
    if (ctx.session && ctx.session.user) {
      console.log(console.log("unhiding tugasId " + input.tugasId));
      return ctx.db.tugas.update({
        where: { id: input.tugasId },
        data: { hidden: false },
      });
    }
  }),
});
