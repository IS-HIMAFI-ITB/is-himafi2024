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
  const getCumulativeScore = api.user.getCumulativeScore.useQuery({
    userId: session.data!.id
  })

  const { data: tugass, refetch: refetchTugass } = api.tugasAdmin.getAll.useQuery();
  const { data: submissions, refetch: refetchSubmissions } = api.tugasAdmin.getTugasSubmissions.useQuery();

  // sort submissions by NIM
  if (submissions) {
    submissions.sort((a, b) => {
      const aNim = Number(a.submissionBy.nim); //eslint-disable-line
      const bNim = Number(b.submissionBy.nim); //eslint-disable-line
      return aNim - bNim;
    });
  }

      return (
        <div style={{ maxHeight: "600px", overflowY: "auto", width: "100%" }} className="px-10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead style = {{width: "1080px"}}>Name</TableHead>
                <TableHead>Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions?.map((submission, index) => (
                <TableRow key={submission.id}>
                  <TableCell>{index + 1}</TableCell> {/* Rank */}
                  <TableCell>{submission.submissionBy.name}</TableCell>
                </TableRow>
              ))}  
            </TableBody>
          </Table>
        </div>
      );
    }


