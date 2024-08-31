import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PostList } from "../_components/postList";
import { TugasListPeserta } from "../_components/tugasList";
import { ImageUpload } from "../_components/image-upload";
import { News } from "../_components/news";

import { api, HydrateClient } from "~/trpc/server";

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

  return (
    <div className="flex min-h-screen flex-col bg-[url('/day5_background.png')] bg-cover text-white">
      <div
        className="absolute right-0 top-0 max-h-[20rem] max-w-[25rem] bg-local" // session status bar
        style={{
          backgroundImage: `url('/day5_papan.png')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <div className="flex h-full flex-col items-center justify-center gap-2 pb-12 pt-20">
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
            className="rounded bg-orange-700/80 px-10 font-roman font-semibold text-white no-underline transition hover:bg-white/20"
          >
            Ganti password
          </Link>

          <Link
            href={"/api/auth/signout"}
            className="rounded bg-orange-700/80 px-10 font-roman font-semibold text-white no-underline transition hover:bg-white/20"
          >
            Signout
          </Link>
        </div>
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center pt-60">
        <h1 className="font-bluecashews text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Intellektuelle<span className="text-[#731c1b]">schule</span>
        </h1>
        <p className="w-9/12 pt-10 text-center text-base font-extrabold tracking-widest text-[#fff8e8] md:text-xl">
          Selamat datang, para kurcaci pengembara cahaya. Hutan yang lebat
          mungkin telah menutup pandanganmu, namun penduduk istana selalu
          menunggumu untuk menemuinya, tapi kapankah datangnya kesempatan itu?
          Jalanilah proses ini, hingga kau menemukan celah terang...
        </p>
        {/* <PostList/> */}
        <div className="pt-24">
          <News />
        </div>
        <div className="pt-24">
          <TugasListPeserta />
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
