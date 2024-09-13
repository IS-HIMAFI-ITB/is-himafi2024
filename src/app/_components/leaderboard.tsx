"use client";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/trpc/react";
import { FormEvent } from "react";
import Link from "next/link";
import { UploadButton } from "~/utils/uploadthing";

import Image from "next/image";
import { url } from "inspector";
import { Url } from "next/dist/shared/lib/router/router";
import { Badge } from "~/components/ui/badge";

 import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Leaderboard() {
    // const session = await getServerAuthSession();
    // if (!session) {
    //   redirect("/authpage/login/");
    // }
    // if (session.user.role === "ADMIN") {
    //   redirect("/");
    // }

  const session = api.user.getUserSession.useQuery();
  const getCumulativeScore = api.user.getCumulativeScore.useQuery({
    userId: session.data!.id,
  })

  const { data: tugass, refetch: refetchTugass } = api.tugasAdmin.getAll.useQuery();
  const { data: submissions, refetch: refetchSubmissions } = api.tugasAdmin.getTugasSubmissions.useQuery();
  const hideTugas = api.tugasAdmin.hideTugas.useMutation();
  const unhideTugas = api.tugasAdmin.unhideTugas.useMutation();


  // sort submissions by NIM
  if (submissions) {
    submissions.sort((a, b) => {
      const aNim = Number(a.submissionBy.nim]); //eslint-disable-line
      const bNim = Number(b.submissionBy.nim); //eslint-disable-line
      return aNim - bNim;
    });
  }
  return (
    <div>
      <h1>Tugas:</h1>
      <button
        onClick={() => {
          void refetchTugass();
          void refetchSubmissions();
        }}
      >
        Refetch
      </button>
      <ul className="grid grid-cols-1 gap-4 text-sm overflow-auto md:overflow-hidden md:text-lg">
        {tugass?.map((tugas) => (
          <li key={tugas.id}>
            <p>
              <b>{tugas.judul}</b>
            </p>
            <p>{tugas.body}</p>
            <p>{tugas.perintahMisi}</p>
            <Link href={tugas.attachment ? tugas.attachment : "#"}>Attachments</Link>
            <p>deadline: {tugas.deadline?.toString()}</p>
            <p>isTugasSpesial: {tugas.isTugasSpesial ? "true" : "false"}</p>
            <p>hidden: {tugas.hidden ? "true" : "false"}</p>
            <button
              onClick={async () => {
                await hideTugas.mutateAsync({ tugasId: tugas.id });
                void refetchTugass();
              }}
            >
              hide tugas
            </button>
            <br />
            <button
              onClick={async () => {
                await unhideTugas.mutateAsync({ tugasId: tugas.id });
                void refetchTugass();
              }}
            >
              unhide tugas
            </button>
            <p>targetNimPeserta:</p>
            {tugas.targetNimPeserta?.map((targetNim) => <p key={targetNim}>{targetNim}</p>)}
            <ul className="grid grid-cols-1 gap-4">
              <p>Submissions: </p>
              {submissions?.map(
                (submission) =>
                  submission.submissionTugasId === tugas.id && (
                    <li key={submission.id} className="grid grid-cols-4 gap-4">
                      {/* <p><b>{JSON.stringify(submission)}</b></p> */}
                      <p>
                        <b>
                          {
                            submission.submissionBy.nim // eslint-disable-line
                          }
                        </b>
                      </p>
                      <p>
                        <b>
                          {
                            submission.submissionBy.name // eslint-disable-line
                          }
                        </b>
                      </p>
                      <p>
                        <b>
                          {
                            submission.submissionBy.nim // eslint-disable-line
                          }
                        </b>
                        {/* <b>
                          {submission.createdAt?.toLocaleString("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }) // eslint-disable-line
                          }
                        </b> */}
                      </p>
                      <Link href={submission.submissionUrl as Url}>{submission.filename}</Link>
                    </li>
                  ),
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

// const data = [
//   { name: "Alice", score: 85 },
//   { name: "Bob", score: 92 },
//   { name: "Charlie", score: 78 },
//   // Add more data to test scrolling behavior
// ];

// export default async function Leaderboard() {
//   const session = await getServerAuthSession();
//   if (!session) {
//     redirect("/authpage/login/");
//   }
//   if (session.user.role === "ADMIN") {
//     redirect("/");
//   }

//   const getCumulativeScore = await api.user.getCumulativeScore({
//     userId: session.user.id,
//   });

//   const sortedData = [...data].sort((a, b) => b.score - a.score);
//   return (
//     <div style={{ maxHeight: "400px", overflowY: "auto" }}>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Rank</TableHead>
//             <TableHead>Name</TableHead>
//             <TableHead>Score</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {sortedData.slice(0, 10).map((player, index) => (
//             <TableRow key={index}>
//               <TableCell>{index + 1}</TableCell> {/* Rank */}
//               <TableCell>{player.name}</TableCell>
//               <TableCell>{player.score}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };
