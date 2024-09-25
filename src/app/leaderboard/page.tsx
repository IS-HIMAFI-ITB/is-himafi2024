"use client";
import Leaderboard from "../_components/leaderboard";
import Link from "next/link";

export default function LeaderboardPage(){

  return (
    <div className="flex flex-col bg-[url('/panorama-vertical-red-background.png')] bg-cover bg-bottom pt-3 px-2 items-center justify-center">
      <div className="pt-5 pb-5">
        <Leaderboard />
      </div>
      <div className="mt-5 text-2xl pb-5 rounded-full bg-[#731c1b] px-10 py-5 font-bold transition hover:bg-red-700/60 text-white">
        <Link href={"peserta"}>Home</Link>
      </div>
    </div>
  )
}