import { Query } from "@tanstack/react-query";
import { google } from "googleapis";

export const getSheetsData = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/spreadsheets/drive.file",
      "https://www.googleapis.com/auth/spreadsheets/drive.file",
    ],
  });

  const sheets = google.sheets({ version: "v4", auth });

  //query
  //   const { id } = Query;
  //   const range = "Sheet1!A1:B10";
  //   const response = await sheets.spreadsheets.values.get({
  //     spreadsheetId: process.env.SHEET_ID,
  //     range,
  //   });
  //   return rows;
};
