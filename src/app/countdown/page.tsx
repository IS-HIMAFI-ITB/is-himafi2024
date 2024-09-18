import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PostList } from "../_components/postList";
// import { TugasListPeserta } from "../_components/tugasList-peserta";
import { ImageUpload } from "../_components/image-upload";
import { News } from "../_components/news";
import Image from "next/image";

import { api, HydrateClient } from "~/trpc/server";
import { TugasListTabControlledCarousel } from "../_components/tugasList-tab-controlled-carousel";
import Countdown from "../_components/countdown";

export default async function PesertaPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/authpage/login/");
  }
  if (session.user.role === "ADMIN") {
    redirect("/");
  }

  const getCumulativeScore = await api.user.getCumulativeScore({
    userId: session.user.id,
  });

  const countdownTime = new Date("Sept 20, 2024 19:00:00");

  return (
    // <div className="flex flex-col bg-[url('/day6_background.png')] bg-cover bg-bottom  text-white">
    <div className="flex flex-col relative text-white bg-black/40">
      <div className="fixed inset-0 -z-50">
        <Image src="/bg-lantik-2023.jpg" alt="Cover Image" className="object-cover object-center" fill />
        <Image src="/bg-lantik-2023-mobile.jpg" alt="Cover Image" className="object-cover object-center md:hidden" fill />
      </div>
      <div
        className="absolute right-0 top-0 max-h-[20rem] max-w-[25rem] bg-local" // session status bar
      >
        <Image src="/day6_papan.png" alt="Cover Image" className="object-fit absolute -z-50" fill />
        <div className=" flex h-full flex-col items-center justify-center gap-2 pb-12 pt-20">
          <p className="px-20 text-center font-bluecashews font-extrabold text-orange-50">
            {session && (
              <span>
                {session.user?.name}
                <br /> ({session.user?.role})
              </span>
            )}
            <br />
            Points: {getCumulativeScore}
          </p>

          <Link
            href={"/authpage/resetpassword"}
            className="rounded bg-sky-700/80 px-10 font-roman font-semibold text-white no-underline transition hover:bg-white/20"
          >
            Ganti password
          </Link>

          <Link
            href={"/api/auth/signout"}
            className="rounded bg-sky-700/80 px-10 font-roman font-semibold text-white no-underline transition hover:bg-white/20"
          >
            Signout
          </Link>
        </div>
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center pt-72">
        <h1 className="font-bluecashews text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Intellektuelle<span className="text-[#39a2e2]">schule</span>
        </h1>
        <p className="w-9/12 pt-10 text-center text-base font-extrabold tracking-widest text-[#fff8e8] md:text-xl">
          Selamat datang, para kurcaci pengembara cahaya. Hutan yang lebat mungkin telah menutup pandanganmu, namun penduduk istana selalu
          menunggumu untuk menemuinya, tapi kapankah datangnya kesempatan itu? Jalanilah proses ini, hingga kau menemukan celah terang...
        </p>
        {/* <PostList/> */}
        <div className="pt-14">
          <Countdown count={countdownTime} />
        </div>
        <div className="flex flex-col items-center justify-center pb-20 pt-10">
          <p className="text-center font-bluecashews text-base font-extrabold tracking-widest text-[#fff8e8] md:text-2xl">
            Teman adalah saudara <br />
            Saudara adalah keluarga <br />
            Kebersamaan adalah segalanya <br />
          </p>
        </div>
      </div>
    </div>
  );
}

// todo:
// - can view post & tugas
// - can submit tugas with uploadthing
