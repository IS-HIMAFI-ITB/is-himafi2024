"use client";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";

export default function Countdown({ count }: { count: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
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
      });

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      <div className="px-10 md:px-[20%] sm:px-[10%]">
        <div className="text-center content-stretch">
          <h1 className="text-5xl md:text-8xl font-bold mb-8 text-[#39a2e2] animate-pulse w-auto">Hari Kemenangan</h1>
          <div className="grid grid-cols-3 sm:gap-10">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-gray-800/50 sm:p-4 py-4 rounded-lg shadow-lg">
                <div className="text-5xl md:text-6xl font-bold text-gray-100 mb-2">{value.toString().padStart(2, "0")}</div>
                <div className="text-sm sm:text-xl text-gray-400 uppercase overflow-clip">{unit}</div>
              </div>
            ))}
          </div>
          <div className="my-20 text-2xl md:text-4xl gap-5 grid grid-cols-1 text-gray-300 whitespace-pre-wrap text-center ">
            <div className="font-black font-mono tracking-widest overflow-x-auto no-scrollbar">{`-6.894763, 107.610533`}</div>
            <div>{`Tidak ada keluarga yang ditinggalkan.`}</div>
            <div>{`Sekarang, hanya ada satu kekuatan yang tersisa.`}</div>
          </div>
        </div>
      </div>
      <div className="px-10 sm:px-[10%] text-center content-stretch text-lg">
        <h1 className="text-5xl md:text-8xl font-bold mb-8 text-[#39a2e2] tracking-widest animate-pulse w-auto">SPEK</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-20 font-semibold">
          <div>
            <div className="text-3xl text-[#9a82dc]">Angkatan</div>
            <ol className=" grid grid-cols-1 gap-2 pt-4 text-pretty list-decimal text-left">
              <li className="pl-5">Tenda komunal kapasitas 5 orang 2 buah</li>
              <li className="pl-5">Tikar besar 10 buah</li>
              <li className="pl-5">Bendera keresahan</li>
              <li className="pl-5">terminal stopkontak 5 buah</li>
              <li className="pl-5">Performa dan semangat terbaik</li>
            </ol>
          </div>
          <div>
            <div className="text-3xl text-[#9a82dc]">Lapangan</div>
            <ol className="grid grid-cols-1 gap-2 pt-4 text-pretty list-decimal text-left ">
              <li className="pl-5">Identitas angkatan: penanda angkatan, jaket angkatan dan yel-yel</li>
              <li className="pl-5">Senter dengan cahaya terang</li>
              <li className="pl-5">Tas ransel yang memuat seluruh spek yang tidak digunakan (jangan ada tas tambahan)</li>
              <li className="pl-5">Jaket yang hangat (dikenakan di dalam jaket angkatan)</li>
              <li className="pl-5">Cobalt Book</li>
              <li className="pl-5">Alat tulis </li>
              <li className="pl-5">Obat pribadi </li>
              <li className="pl-5">Madurasa 1 buah</li>
              <li className="pl-5">Tolak Angin 1 buah</li>
              <li className="pl-5">Roti Kembung 1 buah</li>
              <li className="pl-5">Kresek 3 lembar</li>
              <li className="pl-5">Air Mineral 1.5L</li>
              <li className="pl-5">Ponco</li>
              <li className="pl-5">lilin 1 buah</li>
              <li className="pl-5">Celana panjang olahraga yang tidak robek</li>
              <li className="pl-5">Sepatu bertali dan menutup tumit </li>
              <li className="pl-5">Kaos kaki menutup mata kaki</li>
              <li className="pl-5">Dalam keadaan siap: perut sudah terisi, sudah sholat, dan tidak perlu ke wc.</li>
              <li className="pl-5">
                Sudah menyelesaikan tugas akademik yang memiliki deadline Jumat 4 Oktober 23.59 WIB dan Sabtu 5 Oktober 23.59 WIB
              </li>
            </ol>
          </div>
          <div>
            <div className="text-3xl text-[#9a82dc]">Non-Lapangan</div>
            <ol className="grid grid-cols-1 gap-2 pt-4 text-pretty list-decimal text-left">
              <li className="pl-5">Uang tunai Rp20.000</li>
              <li className="pl-5">pakaian ganti minimal 1 pasang</li>
              <li className="pl-5">keperluan mandi (opsional)</li>
              <li className="pl-5">alat sholat (opsional)</li>
              <li className="pl-5">sandal (opsional)</li>
              <li className="pl-5">wadah/tas yang memuat spek non lapangan (pisahkan dengan spek lapangan)</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
