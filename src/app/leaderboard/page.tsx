"use client";
import Leaderboard from "../_components/leaderboard";
import Image from "next/image"

export default function LeaderboardPage(){

  return (
    <div className="flex flex-col bg-[url('/panorama-vertical-red-background.png')] bg-cover bg-bottom pt-10 px-10">
      <div className="pt-20 pb-20">
        <Leaderboard />
      </div>
    </div>
  )
}