import {z} from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { redirect } from "next/navigation";

export const userRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.user.findMany();
    }),
    changePassword: publicProcedure
    .input(z.object({ password: z.string() }))
    .mutation(({ ctx, input }) => {
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
    }),
  })