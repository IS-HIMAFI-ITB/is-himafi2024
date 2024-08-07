import {z} from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";

export const tugasAdminRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.tugas.findMany();
    }),
    tugasAdminCreate: publicProcedure.input(z.object({ judul: z.string(),body: z.string(),attachment: z.string(),deadline: z.date(), isTugasSpesial: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
        return ctx.db.tugas.create({
            data:{
                judul: input.judul,
                body: input.body,
                attachment: input.attachment,
                deadline: input.deadline,
                isTugasSpesial: input.isTugasSpesial,
            }
        })
    }),
        
})