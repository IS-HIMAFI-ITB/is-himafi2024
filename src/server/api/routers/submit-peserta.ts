import {z} from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";

export const submitPesertaRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx, }) => {
        return ctx.db.submission.findMany({
            where: {
                submissionBy: { id: ctx.session?.user.id },
                hidden: false,
            },
        });
    }),
    submitPesertaCreate: publicProcedure.input(z.object({ url:z.string(), tugasId: z.string(),filename: z.string() }))
    .mutation(async ({ ctx, input }) => {
        if (ctx.session && ctx.session.user) {
            return ctx.db.submission.create({
                    data:{
                        submissionUrl: input.url,
                        submissionTugas: {connect: { id: input.tugasId }},
                        submissionBy: { connect: { id: ctx.session.user.id } },
                        filename: input.filename,
                    }
                })
        }

    }),
    hideSubmission: publicProcedure.input(z.object({ tugasId: z.string() }))
    .mutation(async ({ ctx, input }) => {
        if (ctx.session && ctx.session.user) {
            return ctx.db.submission.update({
                where: { id: input.tugasId },
                data: { hidden: true },
            });
        }
    }),
        
})