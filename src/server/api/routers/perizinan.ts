import { z } from "zod";
import { kehadiranType, jenisIzinType, fisikType } from "@prisma/client";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { ChartScatter } from "lucide-react";

export const perizinanRouter = createTRPCRouter({
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
        isBuktiNyusul: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session && ctx.session.user) {
        await ctx.db.perizinan.deleteMany({
          where: {
            createdBy: { id: ctx.session.user.id },
            day: { id: input.dayId },
          },
        }),
          await ctx.db.perizinan.create({
            data: {
              kehadiran: input.kehadiran,
              jenisIzin: input.jenisIzin,
              alasanIzin: input.alasanIzin,
              kapanMenyusul: input.kapanMenyusul,
              kapanMeninggalkan: input.kapanMeninggalkan,
              buktiIzin: input.buktiIzin,
              createdBy: { connect: { id: ctx.session.user.id } },
              day: { connect: { id: input.dayId } },
              isBuktiNyusul: input.isBuktiNyusul,
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
  createDay: publicProcedure
    .input(z.object({ name: z.string(), sheetsCMSId: z.string(), passwordAbsensi: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.day.create({
        data: {
          name: input.name,
          sheetsCMSId: input.sheetsCMSId,
          passwordAbsensi: input.passwordAbsensi,
        },
      });
    }),
  getAllDay: publicProcedure.query(({ ctx }) => {
    return ctx.db.day.findMany();
  }),
  getDayAll: publicProcedure.input(z.object({ dayId: z.number() })).query(({ ctx, input }) => {
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
  getKondisiMassa: publicProcedure.query(async ({ ctx }) => {
    const currentDay = await ctx.db.day.findFirst({
      where: {
        isCurrent: true,
      },
    });
    const dayId = currentDay?.id;
    if (ctx.session && ctx.session.user) {
      return ctx.db.kondisiMassa.findFirst({
        where: {
          createdBy: { id: ctx.session.user.id },
          day: { id: dayId },
        },
      });
    }
  }),
  getPerizinan: publicProcedure.input(z.object({ dayId: z.number() })).query(({ ctx, input }) => {
    if (ctx.session && ctx.session.user) {
      return ctx.db.perizinan.findFirst({
        where: {
          createdBy: { id: ctx.session.user.id },
          day: { id: input.dayId },
        },
      });
    }
  }),
  getStatusIzin: publicProcedure.input(z.object({ dayId: z.number() })).query(async ({ ctx, input }) => {
    if (ctx.session && ctx.session.user) {
      const izinCurrentDay = await ctx.db.perizinan.findFirst({
        where: {
          createdBy: { id: ctx.session.user.id },
          day: { id: input.dayId },
        },
      });
      return izinCurrentDay?.statusIzin;
    }
  }),
  getCurrentDayId: publicProcedure.query(async ({ ctx }) => {
    const currentDay = await ctx.db.day.findFirst({
      where: {
        isCurrent: true,
      },
    });
    return currentDay?.id;
  }),
  updateCurrentDay: publicProcedure.input(z.object({ dayId: z.number() })).mutation(async ({ ctx, input }) => {
    await ctx.db.day.updateMany({
      where: {
        isCurrent: true,
      },
      data: {
        isCurrent: false,
      },
    });
    await ctx.db.day.update({
      where: {
        id: input.dayId,
      },
      data: {
        isCurrent: true,
      },
    });
  }),
  updatePerizinanBuktiMenyusul: publicProcedure
    .input(z.object({ dayId: z.number(), buktiIzin: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.perizinan.updateMany({
        where: {
          dayId: input.dayId,
          createdBy: { id: ctx.session!.user.id },
        },
        data: {
          buktiIzin: input.buktiIzin,
        },
      });
    }),
  getIsAcceptingPerizinan: publicProcedure.query(async ({ ctx }) => {
    const currentDay = await ctx.db.day.findFirst({
      where: {
        isCurrent: true,
      },
    });
    return currentDay?.isAcceptingPerizinan;
  }),
  isAcceptingPerizinanTrue: publicProcedure.input(z.object({ dayId: z.number() })).mutation(async ({ ctx, input }) => {
    await ctx.db.day.update({
      where: {
        id: input.dayId,
      },
      data: {
        isAcceptingPerizinan: true,
      },
    });
  }),
  isAcceptingPerizinanFalse: publicProcedure.input(z.object({ dayId: z.number() })).mutation(async ({ ctx, input }) => {
    await ctx.db.day.update({
      where: {
        id: input.dayId,
      },
      data: {
        isAcceptingPerizinan: false,
      },
    });
  }),
  hadirAktual: publicProcedure.input(z.object({ password: z.string() })).mutation(async ({ ctx, input }) => {
    const currentDayId = await ctx.db.day.findFirst({
      where: {
        isCurrent: true,
      },
      select: {
        id: true,
      },
    });
    const currentDayPassword = await ctx.db.day.findFirst({
      where: {
        id: currentDayId?.id,
      },
      select: {
        passwordAbsensi: true,
      },
    });
    if (input.password === currentDayPassword?.passwordAbsensi) {
      const perizinanExist = await ctx.db.perizinan.findFirst({
        where: {
          createdById: ctx.session!.user.id,
          dayId: currentDayId!.id,
        },
      });
      if (!perizinanExist) {
        await ctx.db.perizinan.create({
          data: {
            kehadiran: kehadiranType.HADIR,
            createdBy: { connect: { id: ctx.session!.user.id } },
            day: { connect: { id: currentDayId!.id } },
          },
        });
      }
      await ctx.db.perizinan.updateMany({
        where: {
          createdById: ctx.session?.user.id,
          dayId: currentDayId?.id,
        },
        data: {
          isHadirAbsensi: true,
          hadirAbsensiAt: new Date(),
        },
      });
    }
  }),
  getStatusHadirAbsensi: publicProcedure.query(async ({ ctx }) => {
    const currentDayId = await ctx.db.day.findFirst({
      where: {
        isCurrent: true,
      },
      select: {
        id: true,
      },
    });
    return await ctx.db.perizinan.findFirst({
      where: {
        createdById: ctx.session?.user.id,
        dayId: currentDayId?.id,
      },
      select: {
        isHadirAbsensi: true,
      },
    });
  }),
});
