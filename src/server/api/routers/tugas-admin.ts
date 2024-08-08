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
    getTugasSubmissions: publicProcedure.query(({ ctx }) => {
        return ctx.db.submission.findMany({
            where: {
                hidden: false
            },
            include: {
                submissionBy: true
            }
        });
    }),
    hideTugas: publicProcedure.input(z.object({ tugasId: z.string() }))
    .mutation(async ({ ctx, input }) => {
        if (ctx.session && ctx.session.user) {
            console.log(console.log("hiding tugasId "+input.tugasId))
            return ctx.db.tugas.update({
                where: { id: input.tugasId },
                data: { hidden: true },
            })
        }
    }),
    unhideTugas: publicProcedure.input(z.object({ tugasId: z.string() }))
    .mutation(async ({ ctx, input }) => {
        if (ctx.session && ctx.session.user) {
            console.log(console.log("unhiding tugasId "+ input.tugasId ))
            return ctx.db.tugas.update({
                where: { id: input.tugasId },
                data: { hidden: false },
            })
        }
    }),
        
})