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
  log: ["error"],
});

const sheetsCMSId = "1MwyVhChAU6OuXPBmW5a5QxxAZotbzgMQpDumQv6g6Wc";

async function googleAuth() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  return { auth, sheets };
}

async function getSheetTitleAndId() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  const sheetDatas = (await sheets.spreadsheets.get({ spreadsheetId: sheetsCMSId })).data.sheets;
  const sheetTitles = sheetDatas?.map((sheet) => sheet.properties!.title);
  const sheetIds = sheetDatas?.map((sheet) => sheet.properties!.sheetId);
  return { sheetTitles, sheetIds };
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
  const { sheetTitles } = await getSheetTitleAndId();
  const ranges = [];
  for (const sheetTitle of sheetTitles!) {
    ranges.push(`${sheetTitle}!A10:Z`);
  }
  try {
    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: sheetsCMSId,
      ranges: ranges,
    });
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
  const { sheetTitles } = await getSheetTitleAndId();

  const infoHeaderRows = ["Perintah Misi:", "Attachment:", "Deadline:", "Tugas Spesial:", "Hidden:"].map((value) => ({
    values: [
      {
        userEnteredValue: { stringValue: value },
        userEnteredFormat: {
          horizontalAlignment: "RIGHT",
          textFormat: { bold: true },
        },
      },
    ],
  }));

  const tableHeaderRowValues = [
    "NIM",
    "Nama",
    "id",
    "filename",
    "Submission URL",
    "submissinKey",
    "Score",
    "Submitted at",
    "hidden",
    "submissionById",
    "submissionTugasId",
  ].map((value) => ({
    userEnteredValue: { stringValue: value },
    userEnteredFormat: {
      horizontalAlignment: "CENTER",
      textFormat: { bold: true },
    },
  }));

  for (const [index, tugas] of tugases.entries()) {
    if (sheetTitles!.includes(tugas.judul)) continue;

    // const sheet_id = sheetIds![sheetTitles!.indexOf(tugas.judul)];
    const sheet_id = parseInt(Date.now().toString().substring(5, 12) + index); //generate  INT32 sheetid based on time, then append iterator index
    console.log(tugas.judul);
    const infoHeaderRowsValues = [tugas.perintahMisi, tugas.attachment, tugas.deadline, tugas.isTugasSpesial, tugas.hidden].map(
      (value) => ({
        values: [
          {
            userEnteredValue: { stringValue: "value?.toString()" },
            userEnteredFormat: {
              horizontalAlignment: "LEFT",
            },
          },
        ],
      }),
    );
    req.push(
      //add sheets
      {
        addSheet: {
          properties: {
            title: tugas.judul,
            sheetId: sheet_id,
            gridProperties: {
              frozenRowCount: 9,
              frozenColumnCount: 1,
            },
          },
        },
      },
      // write sheets
      {
        //info header
        updateCells: {
          range: {
            sheetId: sheet_id,
            startRowIndex: 0,
            endRowIndex: 9,
            startColumnIndex: 1,
            endColumnIndex: 2,
          },
          rows: infoHeaderRows,
          fields: "*",
        },
      },
      {
        //info header values
        updateCells: {
          range: {
            sheetId: sheet_id,
            startRowIndex: 0,
            endRowIndex: 9,
            startColumnIndex: 4,
            endColumnIndex: 5,
          },
          rows: infoHeaderRowsValues,
          fields: "*",
        },
      },
      {
        //table header
        updateCells: {
          range: {
            sheetId: sheet_id,
            startRowIndex: 8,
            endRowIndex: 9,
            startColumnIndex: 0,
            endColumnIndex: 26,
          },
          rows: [
            {
              values: tableHeaderRowValues,
            },
          ],
          fields: "*",
        },
      },
      // hide sheets
      {
        //col C & D
        updateDimensionProperties: {
          range: {
            sheetId: sheet_id,
            dimension: "COLUMNS",
            startIndex: 2,
            endIndex: 4,
          },
          properties: {
            hiddenByUser: true,
          },
          fields: "hiddenByUser",
        },
      },
      {
        //col F
        updateDimensionProperties: {
          range: {
            sheetId: sheet_id,
            dimension: "COLUMNS",
            startIndex: 5,
            endIndex: 6,
          },
          properties: {
            hiddenByUser: true,
          },
          fields: "hiddenByUser",
        },
      },
      {
        //col I to Z
        updateDimensionProperties: {
          range: {
            sheetId: sheet_id,
            dimension: "COLUMNS",
            startIndex: 8,
            endIndex: 26,
          },
          properties: {
            hiddenByUser: true,
          },
          fields: "hiddenByUser",
        },
      },

      //set column width
      {
        //col B
        updateDimensionProperties: {
          range: {
            sheetId: sheet_id,
            dimension: "COLUMNS",
            startIndex: 1,
            endIndex: 2,
          },
          properties: {
            pixelSize: 200,
          },
          fields: "pixelSize",
        },
      },
      {
        //col E
        updateDimensionProperties: {
          range: {
            sheetId: sheet_id,
            dimension: "COLUMNS",
            startIndex: 4,
            endIndex: 5,
          },
          properties: {
            pixelSize: 400,
          },
          fields: "pixelSize",
        },
      },
      {
        //col H
        updateDimensionProperties: {
          range: {
            sheetId: sheet_id,
            dimension: "COLUMNS",
            startIndex: 7,
            endIndex: 8,
          },
          properties: {
            pixelSize: 200,
          },
          fields: "pixelSize",
        },
      },
    );
  }

  try {
    console.log("INFO: creating sheets");
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetsCMSId,
      requestBody: {
        requests: req,
      },
    });
    console.log("INFO: sheets created");
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
    orderBy: [
      {
        submissionBy: {
          nim: "asc",
        },
      },
    ],
  });
}

async function processSubmissionsFromDB(datas: Array<any>) {
  const processedDatas = datas.flatMap((data) => {
    if (data.filename === ".....") return [];
    const processedData: any = {
      nim: data.submissionBy.nim,
      nama: data.submissionBy.name,
      ...data,
      submissionUrl: `=HYPERLINK("${data.submissionUrl}", "${data.filename}")`,
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
    return [Object.values(processedData)];
  });
  return processedDatas;
}

async function writeSubmissionsToSheets() {
  console.log("INFO: Writing submissions to sheets...");
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
      range: `${tugas.judul}!A10`,
      values: processedSubmissions,
    });
  }
  console.log(JSON.stringify(datas));
  try {
    console.log("INFO: Writing submissions to sheet...");
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: sheetsCMSId,
      requestBody: {
        valueInputOption: "USER_ENTERED",
        data: datas,
      },
    });
    console.log("INFO: submissions written to sheet");
  } catch (e) {
    console.log(e);
  }
}

async function clearSheets() {
  console.log("INFO: Clearing sheets...");
  const { sheetTitles } = await getSheetTitleAndId();

  const ranges = sheetTitles!.map((sheetTitle) => `${sheetTitle}!A10:Z`);

  const { sheets } = await googleAuth();
  const datas = ranges.map((range) => {
    return {
      range: range,
      values: [Array(26).fill(0)], //fill 0 for A-Z columns on first row
    };
  });
  try {
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: sheetsCMSId,
      requestBody: {
        valueInputOption: "USER_ENTERED",
        data: datas,
      },
    });
    await sheets.spreadsheets.values.batchClear({
      spreadsheetId: sheetsCMSId,
      requestBody: { ranges: ranges },
    });

    console.log("INFO: sheets cleared");
  } catch (e) {
    console.error("ERROR: error clearing sheets: ", e);
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
    console.log("INFO: scores updated to DB");
  } catch (e) {
    console.log(e);
    throw new Error("ERROR: error updating scores", { cause: e });
  }
}

export const sheetsCMSTugasRouter = createTRPCRouter({
  getSheetsData: publicProcedure.mutation(async ({ ctx }) => {
    await getSheetsData();
  }),
  clearSheets: publicProcedure.mutation(async ({ ctx }) => {
    await clearSheets();
  }),
  createSheets: publicProcedure.mutation(async ({ ctx }) => {
    await createSheets();
  }),
  writeSubmissionsToSheets: publicProcedure.mutation(async ({ ctx, input }) => {
    await writeSubmissionsToSheets();
  }),
  updateScoresToDB: publicProcedure.mutation(async ({ ctx, input }) => {
    await updateScoresToDB();
  }),
  synchronizeSheetsData: publicProcedure.mutation(async () => {
    await createSheets();
    await updateScoresToDB();
    await clearSheets();
    await writeSubmissionsToSheets();
  }),
});
