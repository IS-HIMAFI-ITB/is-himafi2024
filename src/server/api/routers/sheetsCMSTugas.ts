/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { google } from "googleapis";
import { datastore } from "googleapis/build/src/apis/datastore";
import { PassThrough } from "stream";
import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

const dbParallel = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_NOPARAM + "?pgbouncer=true&connection_limit=100&pool_timeout=60",
    },
  },
  log: ["query", "error", "warn"],
});

const sheetsCMSId = "1MwyVhChAU6OuXPBmW5a5QxxAZotbzgMQpDumQv6g6Wc";

async function getSheetTitles() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  return (await sheets.spreadsheets.get({ spreadsheetId: sheetsCMSId })).data.sheets?.map((sheet) => sheet.properties!.title);
}

async function getSheetData(sheetName: string) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  const range = `${sheetName}!A2:Z`;
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetsCMSId,
      range: range,
    });
    console.log(response.data.values);
    console.log("INFO: Sheets CMS ID: ", sheetsCMSId);
    console.log("INFO: Reading sheets done");
    return response.data.values;
  } catch (e) {
    throw new Error("ERROR: error reading sheet ", { cause: e });
  }
}

async function getSheetsData() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  const sheetNames = await getSheetTitles();
  const ranges = [];
  for (const sheetName of sheetNames!) {
    ranges.push(`${sheetName}!A2:Z`);
  }
  try {
    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: sheetsCMSId,
      ranges: ranges,
    });
    console.log(response.data.valueRanges);
    console.log("INFO: Sheets CMS ID: ", sheetsCMSId);
    console.log("INFO: Reading sheets done");
    return response.data.valueRanges;
  } catch (e) {
    throw new Error("ERROR: error reading sheet ", { cause: e });
  }
}

async function createSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  const tugases = await getTugasFromDB();
  const req = [];
  const SheetTitles = await getSheetTitles();
  for (const tugas of tugases) {
    if (!SheetTitles!.includes(tugas.judul)) {
      req.push({
        addSheet: {
          properties: {
            title: tugas.judul,
          },
        },
      });
    }
  }

  try {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetsCMSId,
      requestBody: {
        requests: req,
      },
    });
    return;
  } catch (e) {
    console.error("ERROR: error creating sheet: ", e);
  }
}

async function getTugasFromDB() {
  return await db.tugas.findMany();
}

async function getSubmissionsFromDB(tugasId: string) {
  return await db.submission.findMany({
    where: {
      submissionTugasId: tugasId,
      hidden: false,
    },
    include: {
      submissionBy: true,
    },
  });
}

async function processSubmissionsFromDB(datas: Array<any>) {
  const processedDatas = datas.map((data) => {
    const processedData: any = {
      nim: data.submissionBy.nim,
      nama: data.submissionBy.name,
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
    delete processedData.submissionBy;
    return Object.values(processedData);
  });
  return processedDatas;
}

async function writeSubmissionsToSheet() {
  console.log("INFO: Writing submissions to sheet...");
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  const tugases = await getTugasFromDB();
  const datas = [];

  for (const tugas of tugases) {
    const submissions = await getSubmissionsFromDB(tugas.id);
    const processedSubmissions = await processSubmissionsFromDB(submissions);

    datas.push({
      range: `${tugas.judul}!A2`,
      values: processedSubmissions,
    });
  }
  console.log(JSON.stringify(datas));
  try {
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: sheetsCMSId,
      requestBody: {
        valueInputOption: "USER_ENTERED",
        data: datas,
      },
    });
  } catch (e) {
    console.log(e);
  }
}

async function updateScoresToDB() {
  const datas = await getSheetsData();
  // const tugases = await getTugasFromDB()
  const payload: any[] = [];
  for (const data of datas!) {
    data.values?.forEach((submission) => {
      payload.push(
        dbParallel.submission.updateMany({
          where: {
            submissionById: submission[9],
            submissionTugasId: submission[10],
          },
          data: {
            score: parseInt(submission[6]) ?? undefined,
          },
        }),
      );
    });
  }
  // const chunkSize = Math.ceil(payload.length / 50);
  // const payloadChunks = [];
  // for (let i = 0; i < payload.length; i += chunkSize) {
  //   payloadChunks.push(payload.slice(i, i + chunkSize));
  // }
  try {
    // console.log(payloadChunks);
    console.log("INFO: Updating scores to DB...");
    // await dbParallel.$transaction(payload);
    // await Promise.all(payloadChunks.map((payloadChunk) => dbParallel.$transaction(payloadChunk)));
    await Promise.all(payload);
  } catch (e) {
    console.log(e);
    throw new Error("ERROR: error updating scores", { cause: e });
  }
}

export const sheetsCMSTugasRouter = createTRPCRouter({
  getSheetData: publicProcedure.input(z.object({ sheetName: z.string() })).query(async ({ input }) => {
    return await getSheetData(input.sheetName);
  }),
  getSheetsData: publicProcedure.mutation(async ({ ctx }) => {
    return await getSheetsData();
  }),
  createSheets: publicProcedure.mutation(async ({ ctx }) => {
    await createSheets();
  }),
  writeSubmissionsToSheet: publicProcedure.mutation(async ({ ctx, input }) => {
    await writeSubmissionsToSheet();
  }),
  updateScoresToDB: publicProcedure.mutation(async ({ ctx, input }) => {
    await updateScoresToDB();
  }),
});
