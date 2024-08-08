import {z} from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { redirect } from "next/navigation";

export const userRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.user.findMany();
    }),
    getUserSession: publicProcedure.query(({ ctx }) => {
        return ctx.session!.user
    }),
    changePassword: publicProcedure.input(z.object({ password: z.string() }))
    .mutation(({ ctx, input }) => {
        if (ctx.session && ctx.session.user) {
            return (
                ctx.db.user.update({
                    where: {
                        id: ctx.session.user.id
                    },
                    data: {
                        password: input.password,
                        passwordOverride: false
                    }
                })
            )
        }
    }),
    getCumulativeScore: publicProcedure.input(z.object({ userId: z.string() }))
    .query(async({ ctx }) => {
        if (ctx.session && ctx.session.user) {
            const submissions = await ctx.db.submission.findMany({
                where: {
                    submissionBy: {
                        id: ctx.session.user.id
                    }
                },
            })
            let cumulativeScore = 0
            submissions.map((submission) => (
                cumulativeScore += submission.score??0
            ))
            return cumulativeScore
        }
    }),
})