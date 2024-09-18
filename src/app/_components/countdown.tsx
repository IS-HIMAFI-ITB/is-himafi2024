"use client";
import { useState, useEffect } from "react";

export default function Countdown({ count }: { count: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    miliseconds: 0,
  });

  useEffect(() => {
    const countdownDate = new Date(count).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      setTimeLeft({
        hours: Math.floor(distance / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        miliseconds: Math.floor(distance % 1000),
      });

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, miliseconds: 0 });
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-screen px-10 sm:px-[15%]">
      <div className="text-center">
        <h1 className="text-5xl md:text-8xl font-bold mb-8 text-[#39a2e2] animate-pulse w-auto">Hari Kemenangan</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="bg-gray-800/50 p-4 rounded-lg shadow-lg">
              <div className="text-5xl md:text-6xl font-bold text-gray-100 mb-2">{value.toString().padStart(2, "0")}</div>
              <div className="text-md sm:text-xl text-gray-400 uppercase overflow-clip">{unit}</div>
            </div>
          ))}
        </div>
        <div className="my-20 text-2xl md:text-4xl gap-5 grid grid-cols-1 text-gray-300 whitespace-pre-wrap text-center ">
          <div>{`Titik koordinat:`}</div>
          <div className="font-black font-mono tracking-widest overflow-x-auto no-scrollbar">{`-6.8643391, 107.6178311`}</div>
          <div>{`Tidak ada keluarga yang ditinggalkan.`}</div>
        </div>
      </div>
    </div>
  );
}
