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

  const session = api.user.getUserSession.useQuery();

  const { data: tugass, refetch: refetchTugass } = api.tugasAdmin.getAll.useQuery();
  const { data: submissions, refetch: refetchSubmissions } = api.tugasAdmin.getTugasSubmissions.useQuery();
  const { data: leaderboardData, refetch: refetchLeaderboardData } = api.tugasPeserta.getLeaderboardData.useQuery();

  return (
    <>
    <div>
      <Image src="/2.png" width ={0} height={0} sizes="100vw" style={{width: "100vw", height: "auto"}} alt={""}></Image>
    </div>
    <div
      className="bg-local bg-repeat-y px-8 font-roman"
      style={{
        backgroundImage: `url('/3.png')`,
        backgroundSize: "100%"
      }}
    >
        <Table>
          <TableHeader>
            <TableRow className={'bg-[#40260b]'}>
              <TableHead className={'!text-[#ffb03b]'} style={{ textAlign: 'center' }}>Rank</TableHead>
              <TableHead className={'!text-[#ffb03b]'} style={{ width: "1080px" }}>Name</TableHead>
              <TableHead className={'!text-[#ffb03b]'} style={{ textAlign: 'center' }}>NIM</TableHead>
              <TableHead className={'!text-[#ffb03b]'} style={{ textAlign: 'center' }}>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody style={{ textAlign: 'center' }}>
            {leaderboardData?.map((item, index) => (
              <TableRow
                key={index}
                className={
                    index == 0? '  bg-[#ffd700]/80' : //for the first rank
                    index == 1? '  bg-[#c0c0c0]/80' : //for the second rank
                    index == 2? '  bg-[#cd7f32]/80' : //for the third rank
                    item.score == 0? '  bg-[#c92e26]/80' : //for those with zero score
                    item.score < 1000? '  bg-[#f49e27]/80' : '' //for those whose score is less than required
                  }
                >
                <TableCell>{index + 1}</TableCell> {/* Rank */}
                <TableCell style={{ textAlign: 'left' }}>{item.nama}</TableCell>
                <TableCell>{item.nim}</TableCell>
                <TableCell>{item.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
    <div>
      <Image src="/4.png" width ={0} height={0} sizes="100vw" style={{width: "100vw", height: "auto"}} alt={""}></Image>
    </div>
</>
  );
}
