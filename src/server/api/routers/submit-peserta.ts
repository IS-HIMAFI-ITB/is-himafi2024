import {z} from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";

export const submitPesertaRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.submission.findMany();
    }),
    submitPesertaCreate: publicProcedure.input(z.object({ url:z.string(), tugasId: z.string() }))
    .mutation(async ({ ctx, input }) => {
        if (ctx.session && ctx.session.user) {
            return ctx.db.submission.create({
                    data:{
                        submissionUrl: input.url,
                        submissionTugas: {connect: { id: input.tugasId }},
                        submissionBy: { connect: { id: ctx.session.user.id } },
                    }
                })
        }

    }),
        
})