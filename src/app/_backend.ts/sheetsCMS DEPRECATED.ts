// import { google } from "googleapis";
// interface SheetRange {
//   sheetName: string;
//   start: string;
//   end: string;
// }
// const newsRange = {
//   sheetName: "News",
//   start: "A",
//   end: "D",
// };
// const getSheetsData = async (r: SheetRange) => {
//   const auth = new google.auth.GoogleAuth({
//     credentials: {
//       client_email: process.env.GOOGLE_CLIENT_EMAIL,
//       private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//     },
//     scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
//   });

//   const sheets = google.sheets({ version: "v4", auth });
//   const range = `${r.sheetName}!${r.start}:${r.end}`;
//   try {
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: process.env.GOOGLE_SHEET_ID,
//       range: range,
//     });
//     return response.data.values;
//   } catch (e) {
//     console.error("error reading sheet", e);
//   }
// };

// export const extractNews = async () => {
//   const data: any = await getSheetsData(newsRange);
//   if (data === null || data === undefined) {
//     throw new Error("Data is null or undefined");
//   }
//   let newsStart, newsEnd;
//   let news = [];
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
//   //   const raah = [];
//   //   for (i = newsStart!; i <= newsEnd!; i++) {
//   //     // news.push({
//   //     //   [data[i][0]]: data[i][3],
//   //     // "nameplate": data[i][0],
//   //     const key = data[i][0];
//   //     const value = data[i][3];
//   //     raah.push([key + ":"] + value + ",");
//   //   }
//   //   news.push(raah);
//   news.push({
//     nameplate: data[1][3],
//     headline: data[2][3],
//     body: data[3][3],
//     instruksi: data[4][3],
//     bukuUngu: data[5][3],
//     bukuMerah: data[6][3],
//   });
//   return news;
// };

// // const extractData = async (r: SheetRange) => {
// //     const data: any = await getSheetsData(r);
// //     if (data === null || data === undefined) {
// //       throw new Error("Data is null or undefined");
// //     }
// //     const personalInfo = { name: data[1][0], about: data[1][1] };

// //     let expStart, expEnd;
// //     let exp = [];
// //     let i = 0;
// //     while (true) {
// //       if (data[i][0] === "END") break;
// //       if (data[i][0] === "EXPERIENCE START") {
// //         expStart = i + 1;
// //       }
// //       if (data[i][0] === "EXPERIENCE END") {
// //         expEnd = i - 1;
// //       }
// //       i++;
// //     }
// //     for (i = expStart!; i <= expEnd!; i++) {
// //       exp.push({
// //         title: data[i][0],
// //         summary: data[i][1],
// //       });
// //     }
// //     return {
// //       personalInfo,
// //       exp,
// //     };
// //   };
