import { Suspense } from "react";

import { Reveal } from "@/components/animation/reveal";
import Container from "@/components/layout/container";
import Loading from "@/components/template/loading";
import { H1 } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FirstLeaderboard from "./_components/first-leaderboard";
import SecondLeaderboard from "./_components/second-leaderboard";
import ThirdLeaderboard from "./_components/third-leaderboard";

import { JWT } from "google-auth-library";

import { GoogleSpreadsheet } from "google-spreadsheet";

export default async function LeaderboardPage() {
  const serviceAccountAuth = new JWT({
    // env var values here are copied from service account credentials generated by google
    // see "Authentication" section in docs for more info
    email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
    key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(
    process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID!,
    serviceAccountAuth
  );

  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

  const data: {
    nim: string;
    name: string;
    score: string;
  }[] = [];

  rows.forEach((row) => {
    if (row.get("Fase Pencerahan") === "-") return;

    data.push({
      nim: row.get("NIM"),
      name: row.get("Nama"),
      score: row.get("Fase Pencerahan"),
    });
  });

  const sortedProfileboard = data.sort(
    (a, b) => parseFloat(b.score) - parseFloat(a.score)
  );

  return (
    <Suspense
      fallback={
        <Container className="py-12">
          <Loading />
        </Container>
      }
    >
      <Container className="py-12">
        <div>
          <div className="flex justify-center md:justify-start">
            <Reveal variant="slide" width="fit">
              <div className="flex before:content-['Leaderboard'] before:absolute before:text-accent before:-z-20 before:text-4xl before:md:text-5xl before:font-bold before:-translate-y-0.5 md:before:-translate-x-1 mb-2 justify-center md:justify-start">
                <H1 className="text-4xl md:text-5xl">Leaderboard</H1>
              </div>
            </Reveal>
          </div>
          <div className="flex text-center md:text-start mb-6">
            <Reveal width="fit">
              <p className="font-semibold">
                Berikut adalah leaderboard untuk peserta Intellektuelle Schule
                HIMAFI ITB 2023
              </p>
            </Reveal>
          </div>
          <Separator className="mb-6" />

          <Tabs defaultValue="1">
            <TabsList className="h-fit w-full flex flex-col xs:flex-row xs:justify-between">
              <TabsTrigger value="1" className="text-xs w-full md:text-base">
                Tahap Pencerahan
              </TabsTrigger>
              {/* <TabsTrigger value="2" className="text-xs w-full md:text-base">
                Tahap Implementasi
              </TabsTrigger>
              <TabsTrigger value="3" className="text-xs w-full md:text-base">
                Tahap Berkarya
              </TabsTrigger> */}
            </TabsList>
            <TabsContent value="1">
              <FirstLeaderboard leaderboardData={sortedProfileboard} />
            </TabsContent>
            {/* <TabsContent value="2">
              <SecondLeaderboard />
            </TabsContent>
            <TabsContent value="3">
              <ThirdLeaderboard />
            </TabsContent> */}
          </Tabs>
        </div>
      </Container>
    </Suspense>
  );
}
