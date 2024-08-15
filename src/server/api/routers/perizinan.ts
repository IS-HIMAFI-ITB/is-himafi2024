import { z } from "zod";
import { kehadiranType } from "@prisma/client";
import { jenisIzinType } from "@prisma/client";
import { fisikType } from "@prisma/client";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const perizinanRouter = createTRPCRouter({
  getAllDay: publicProcedure
    .input(z.object({ dayId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.day.findFirst({
        where: {
          id: input.dayId,
        },
        include: {
          perizinan: true,
          kondisiMassa: true,
        },
      });
    }),
  getPerizinan: publicProcedure
    .input(z.object({ dayId: z.number() }))
    .query(({ ctx, input }) => {
      if (ctx.session && ctx.session.user) {
        return ctx.db.perizinan.findFirst({
          where: {
            createdBy: { id: ctx.session.user.id },
            day: { id: input.dayId },
          },
        });
      }
    }),
  createPerizinan: publicProcedure
    .input(
      z.object({
        kehadiran: z.nativeEnum(kehadiranType),
        jenisIzin: z.nativeEnum(jenisIzinType).optional(),
        alasanIzin: z.string().optional(),
        kapanMenyusul: z.date().optional(),
        kapanMeninggalkan: z.date().optional(),
        buktiIzin: z.string().optional(),
        dayId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session && ctx.session.user) {
        return ctx.db.perizinan.create({
          data: {
            kehadiran: input.kehadiran,
            jenisIzin: input.jenisIzin,
            alasanIzin: input.alasanIzin,
            kapanMenyusul: input.kapanMenyusul,
            kapanMeninggalkan: input.kapanMeninggalkan,
            buktiIzin: input.buktiIzin,
            createdBy: { connect: { id: ctx.session.user.id } },
            day: { connect: { id: input.dayId } },
          },
        });
      }
    }),
  createKondisiMassa: publicProcedure
    .input(
      z.object({
        dayId: z.number(),
        fisik: z.nativeEnum(fisikType),
        deskripsi: z.string().optional(),
        kesiapan: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session && ctx.session.user) {
        return ctx.db.kondisiMassa.create({
          data: {
            createdBy: { connect: { id: ctx.session.user.id } },
            day: { connect: { id: input.dayId } },
            fisik: input.fisik,
            deskripsi: input.deskripsi,
            kesiapan: input.kesiapan,
          },
        });
      }
    }),
});
