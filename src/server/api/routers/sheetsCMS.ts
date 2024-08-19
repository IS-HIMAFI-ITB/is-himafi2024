import { kehadiranType } from "@prisma/client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { google } from "googleapis";
import { db } from "~/server/db";

interface sheetRangeType {
  sheetName: string;
  start?: string;
  end?: string;
}
const newsRange = {
  sheetName: "News",
  start: "A",
  end: "D",
};
const perizinanRange = {
  sheetName: "Perizinan & presensi",
  start: "A2",
  end: "Z",
};
const hadirRange = {
  sheetName: "Hadir",
  start: "A2",
  end: "Z",
};
const izinMenyusulRange = {
  sheetName: "Izin menyusul",
  start: "A2",
  end: "Z",
};
const izinMeninggalkanRange = {
  sheetName: "Izin meninggalkan",
  start: "A2",
  end: "Z",
};
const izinMenyusulDanMeninggalkanRange = {
  sheetName: "Izin menyusul dan meninggalkan",
  start: "A2",
  end: "Z",
};
const izinTidakHadirRange = {
  sheetName: "Izin tidak hadir",
  start: "A2",
  end: "Z",
};
const statusIzinRange = {
  sheetName: "Perizinan & presensi",
  start: "J2",
  end: "Z",
};
const kondisiMassaRange = {
  sheetName: "Kondisi massa",
  start: "A2",
  end: "Z",
};

async function getCurrentDay() {
  return await db.day.findFirst({
    where: {
      isCurrent: true,
    },
  });
}
const getSheetsData = async (r: sheetRangeType) => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({
    version: "v4",
    auth,
  });
  const range = `${r.sheetName}!${r.start}:${r.end}`;
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: (await getCurrentDay())!.sheetsCMSId!,
      range: range,
    });
    console.log(response.data.values);
    console.log("INFO: Sheets CMS ID:", (await getCurrentDay())!.sheetsCMSId!);
    console.log("INFO: Reading sheets done");
    return response.data.values;
  } catch (e) {
    throw new Error("error reading sheet", { cause: e });
  }
};
const updateSheetsData = async (r: sheetRangeType, data: any) => {
  console.log("INFO: updateSheetsData started");
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({
    version: "v4",
    auth,
  });
  //   const range = `${r.sheetName}!${r.start}:${r.end}`;
  const range = r.start ? `${r.sheetName}!${r.start}:${r.end}` : `${r.sheetName}`;
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId: (await getCurrentDay())!.sheetsCMSId!,
      range: range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        values: data,
      },
    });
    console.log("INFO: updateSheetsData done");
  } catch (e) {
    console.error("ERROR: updateSheetsData: ", e);
  }
};
const clearSheetsData = async (r: sheetRangeType) => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({
    version: "v4",
    auth,
  });
  //   const range = `${r.sheetName}!${r.start}:${r.end}`;
  const range = r.start ? `${r.sheetName}!${r.start}:${r.end}` : `${r.sheetName}`;
  try {
    //make sure no column is empty before clearing to prevent clearing dataValidation
    await sheets.spreadsheets.values.update({
      spreadsheetId: (await getCurrentDay())!.sheetsCMSId!,
      range: range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [Array(15).fill(0)], //fill "0" to 15 columns
      },
    });
    await sheets.spreadsheets.values.clear({
      spreadsheetId: (await getCurrentDay())!.sheetsCMSId!,
      range: range,
    });
  } catch (e) {
    console.error("error clearing sheet: ", e);
  }
};
const extractNews = async () => {
  const data: any = await getSheetsData(newsRange);
  if (data === null || data === undefined) {
    throw new Error("extractNews: Data is null or undefined");
  }
  // let newsStart, newsEnd;
  // eslint-disable-next-line prefer-const
  let news = [];
  //   let i = 0;
  //   while (true) {
  //     if (data[i][0] === "NEWS_START") {
  //       newsStart = i + 1;
  //     }
  //     if (data[i][0] === "NEWS_END") {
  //       newsEnd = i - 1;
  //     }
  //     if (data[i][0] === "END") break;
  //     i++;
  //   }
  news.push({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    nameplate: data[1][3], // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    headline: data[2][3], // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    body: data[3][3], // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    instruksi: data[4][3], // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    bukuUngu: data[5][3], // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    bukuMerah: data[6][3], // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    linkAttachments: [
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      [data[7][2], data[7][3]], // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      [data[8][2], data[8][3]], // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      [data[9][2], data[9][3]], // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      [data[10][2], data[10][3]],
    ],
  });
  return news;
};
async function writePerizinan_FromDB(r: sheetRangeType) {
  let kehadiran: kehadiranType = "HADIR";
  switch (r.sheetName) {
    case "Hadir":
      kehadiran = "HADIR";
      break;
    case "Izin meninggalkan":
      kehadiran = "MENINGGALKAN";
      break;
    case "Izin menyusul":
      kehadiran = "MENYUSUL";
      break;
    case "Izin menyusul dan meninggalkan":
      kehadiran = "MENYUSUL_DAN_MENINGGALKAN";
      break;
    case "Izin tidak hadir":
      kehadiran = "TIDAK_HADIR";
      break;
  }
  const datas = await db.perizinan.findMany({
    where: {
      dayId: (await getCurrentDay())!.id,
      kehadiran: kehadiran,
    },
    include: {
      createdBy: true,
    },
  });
  const processedDatas = datas.map((data) => {
    const processedData: any = {
      nim: data.createdBy.nim,
      nama: data.createdBy.name,
      ...data,
      kapanMenyusul: data.kapanMenyusul
        ? data.kapanMenyusul.toLocaleString("en-GB", {
            timeZone: "Asia/Jakarta",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })
        : undefined,
      kapanMeninggalkan: data.kapanMeninggalkan
        ? data.kapanMeninggalkan.toLocaleString("en-GB", {
            timeZone: "Asia/Jakarta",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })
        : undefined,
      isHadirAbsensi: data.isHadirAbsensi,
      hadirAbsensiAt: data.hadirAbsensiAt
        ? data.hadirAbsensiAt.toLocaleString("en-GB", {
            timeZone: "Asia/Jakarta",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })
        : undefined,
      createdAt: data.createdAt
        ? data.createdAt.toLocaleString("en-GB", {
            timeZone: "Asia/Jakarta",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })
        : undefined,
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete processedData.createdBy;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(processedData);
  });
  const dataList = processedDatas;
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  updateSheetsData(r, dataList);
}
async function writeKondisiMassa_FromDB() {
  const datas = await db.kondisiMassa.findMany({
    where: {
      dayId: (await getCurrentDay())!.id,
    },
    include: {
      createdBy: true,
    },
  });
  const processedDatas = datas.map((data) => {
    const processedData: any = {
      nim: data.createdBy.nim,
      nama: data.createdBy.name,
      ...data,
      createdAt: data.createdAt
        ? data.createdAt.toLocaleString("en-GB", {
            timeZone: "Asia/Jakarta",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })
        : undefined,
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete processedData.createdBy;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(processedData);
  });
  console.log(processedDatas);
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  updateSheetsData(kondisiMassaRange, processedDatas);
}

async function extractStatusIzin_UpdateDB() {
  const datas: any = await getSheetsData(statusIzinRange);
  if (datas === null || datas === undefined) {
    return;
    // throw new Error("extractStatusIzin_UpdateDB: Data is null or undefined");
  }
  console.log(datas);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const processedDatas = datas.map((data: any) => {
    const processedData: any = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      statusIzin: data[0] ?? undefined,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      createdById: data[4] ?? undefined,
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return processedData;
  });
  console.log(processedDatas);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  processedDatas.map(async (data: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!data.statusIzin || !data.createdById) return;
    await db.perizinan.updateMany({
      where: {
        dayId: (await getCurrentDay())!.id,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        createdById: data.createdById,
      },
      data: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        statusIzin: data.statusIzin,
      },
    });
  });
}

export const sheetsCMSRouter = createTRPCRouter({
  extractNews: publicProcedure.query(async ({ ctx }) => {
    const output = await extractNews();
    return output;
  }),
  synchronizeSheetsData: publicProcedure.mutation(async ({ ctx }) => {
    try {
      console.log("INFO: extractStatusIzin_UpdateDB started");
      await extractStatusIzin_UpdateDB();
      console.log("INFO: extractStatusIzin_UpdateDB done");
      const writePerizinan_FromDBRange = [
        hadirRange,
        izinMenyusulRange,
        izinMeninggalkanRange,
        izinMenyusulDanMeninggalkanRange,
        izinTidakHadirRange,
      ];
      for (const r of writePerizinan_FromDBRange) {
        console.log("INFO: clearSheetsData started for ", r.sheetName);
        await clearSheetsData(r);
        console.log("INFO: clearSheetsData done for ", r.sheetName);
        console.log("INFO: writePerizinan_FromDB started for ", r.sheetName);
        await writePerizinan_FromDB(r);
        console.log("INFO: writePerizinan_FromDB done for ", r.sheetName);
      }
      console.log("INFO: clearSheetsData started for kondisiMassa");
      await clearSheetsData(kondisiMassaRange);
      console.log("INFO: clearSheetsData done for kondisiMassa");
      console.log("INFO: writeKondisiMassa_FromDB started");
      await writeKondisiMassa_FromDB();
      console.log("INFO: writeKondisiMassa_FromDB done");
    } catch (e) {
      console.log("ERROR: synchronizeSheetsData: ", e);
    }
  }),
  //   test: publicProcedure.query(async ({ ctx }) => {}),
});
