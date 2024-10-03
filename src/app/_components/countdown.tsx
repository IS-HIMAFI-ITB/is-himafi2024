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
      <div className="pt-16 px-10 md:px-[20%] sm:px-[10%]">
        <div className="text-center content-stretch">
          <h1 className="text-5xl md:text-8xl font-bold mb-8 text-[#39a2e2] animate-pulse w-auto mix-blend-color-dodge">Hari Kemenangan</h1>
          <div className="grid grid-cols-3 sm:gap-10">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-gray-800/50 sm:p-4 py-4 rounded-lg shadow-lg ">
                <div className="text-5xl md:text-6xl font-bold text-gray-100 mb-2 mix-blend-overlay">
                  {value.toString().padStart(2, "0")}
                </div>
                <div className="text-sm sm:text-xl text-gray-400 uppercase overflow-clip mix-blend-color-dodge">{unit}</div>
              </div>
            ))}
          </div>
          <div className="my-20 text-2xl md:text-4xl gap-5 grid grid-cols-1 text-gray-300 whitespace-pre-wrap text-center ">
            <div className="font-black font-mono tracking-widest overflow-x-auto no-scrollbar">{`-6.893306, 107.610448`}</div>
            <div>{`Tidak ada keluarga yang ditinggalkan.`}</div>
            <div>{`Sekarang, hanya ada satu kekuatan yang tersisa.`}</div>
          </div>
        </div>
      </div>
      <div className="px-10 sm:px-[10%] text-center content-stretch text-lg">
        <h1 className="text-5xl md:text-8xl font-bold mb-8 text-[#39a2e2] tracking-widest animate-pulse w-auto mix-blend-color-dodge">
          SPEK
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-20 font-semibold mix-blend-plus-lighter opacity-70">
          <div>
            <div className="text-3xl text-[#9a82dc]">Angkatan</div>
            <ol className=" grid grid-cols-1 gap-2 pt-4 pl-5 text-pretty list-decimal text-left">
              <li className="pl-5"> Dua buah Tenda Komunal Kapasitas 5 orang</li>
              <li className="pl-5"> Bendera Keresahan</li>
              <li className="pl-5"> Sepuluh buah Tikar Besar</li>
              <li className="pl-5"> Lima buah Terminal Stopkontak</li>
              <li className="pl-5"> Performa dan Semangat Terbaik</li>
            </ol>
          </div>
          <div>
            <div className="text-3xl text-[#9a82dc]">Lapangan</div>
            <ol className="grid grid-cols-1 gap-2 pt-4 pl-5 text-pretty list-decimal text-left ">
              <li className="pl-5">Identitas Angkatan: Penanda Angkatan, Jaket Angkatan dan Yel-Yel</li>
              <li className="pl-5">Satu buah Jaket yang Hangat (dikenakan di dalam jaket angkatan)</li>
              <li className="pl-5">Satu buah Senter dengan Cahaya Terang</li>
              <li className="pl-5">Satu buah Madurasa</li>
              <li className="pl-5">Dua buah Tolak Angin</li>
              <li className="pl-5">Dua buah Roti Kembung (merk Prime Bread)</li>
              <li className="pl-5">Tiga lembar Kresek Hitam</li>
              <li className="pl-5">Satu buah Air Mineral 1.5L</li>
              <li className="pl-5">Satu buah Ponco Kelelawar (tidak bau, tidak sobek, tidak berjamur)</li>
              <li className="pl-5">Cobalt Book</li>
              <li className="pl-5">Alat Tulis</li>
              <li className="pl-5">Obat-obatan Pribadi</li>
              <li className="pl-5">Tas Ransel yang Memuat Seluruh Spek Lapangan</li>
              <li className="pl-5">Celana Panjang Olahraga (tidak robek, tidak ketat)</li>
              <li className="pl-5">Sepatu Bertali dan Menutup Tumit</li>
              <li className="pl-5">Kaos Kaki Menutup Mata Kaki</li>
              <li className="pl-5">Dalam keadaan siap: perut sudah terisi, sudah sholat, dan tidak perlu ke wc.</li>
              <li className="pl-5">Sudah menyelesaikan tugas akademik yang memiliki deadline hingga Sabtu 5 Oktober 23.59 WIB</li>
            </ol>
          </div>
          <div>
            <div className="text-3xl text-[#9a82dc]">Non-Lapangan</div>
            <ol className="grid grid-cols-1 gap-2 pt-4 pl-5 text-pretty list-decimal text-left">
              <li className="pl-5">Uang Tunai Rp20.000</li>
              <li className="pl-5">Satu pasang (minimal) Pakaian Ganti</li>
              <li className="pl-5">Keperluan Mandi (opsional)</li>
              <li className="pl-5">Alat Sholat (opsional)</li>
              <li className="pl-5">Sleeping Bag (opsional)</li>
              <li className="pl-5">Sandal (opsional)</li>
              <li className="pl-5">Satu buah Wadah/Tas yang memuat spek non lapangan (pisahkan dengan spek lapangan)</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
