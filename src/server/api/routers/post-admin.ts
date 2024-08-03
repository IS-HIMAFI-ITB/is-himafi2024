import {z} from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";

export const postAdminRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.post.findMany();
    }),
    postAdminCreate: publicProcedure.input(z.object({ judul: z.string(),body: z.string(),attachment: z.string() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.session && ctx.session.user) {
          return ctx.db.post.create({
              data:{
                  judul: input.judul,
                  body: input.body,
                  attachment: input.attachment,
                  createdBy: { connect: { id: ctx.session.user.id } },
              }
          })
        }
      }),
  })