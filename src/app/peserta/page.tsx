import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PostList } from "../_components/postList";
import { TugasListPeserta } from "../_components/tugasList";
import { ImageUpload } from "../_components/image-upload";
import { News } from "../_components/news";

import { api, HydrateClient } from "~/trpc/server";

export default async function PesertaPage() {
    const session = await getServerAuthSession()
    if (!session) {
        redirect('/authpage/login/')
    }
    if (session.user.role === 'ADMIN') {
        redirect('/')
    }

    const getCumulativeScore = await api.user.getCumulativeScore({ userId: session.user.id })

    return (
        <div className="flex min-h-screen flex-col text-white bg-cover
            bg-[url('/background.png')]"
            >
        
            <div className="absolute top-0 right-0 max-w-[25rem] max-h-[15rem] bg-local"  // session status bar
                        style={{
                            backgroundImage: `url('/Papan-ungu.png')`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "100% 100%"
                        }}>
                <div className="flex h-full flex-col items-center justify-center gap-2 pt-20 pb-12">
                    <p className="text-center text-purple-50 font-extrabold px-20 font-bluecashews" >
                    {session && <span>{session.user?.name}<br /> ({session.user?.role})</span>}<br />
                        Points: {getCumulativeScore}
                    </p>
                    
                    <Link
                        href={"/api/auth/signout"}
                            className="rounded bg-purple-900/80 text-purple-200 px-10 font-semibold no-underline transition hover:bg-white/20 font-roman"
                        >Signout
                    </Link>
                    
                </div>
            </div>
            <div className="flex min-h-screen flex-col items-center justify-center pt-60">
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight md:text-6xl font-bluecashews">
                    Intellektuelle<span className="text-[hsl(280,36%,51%)]">schule</span>
                </h1>
                <p className="pt-10 text-base w-9/12 text-center text-[hsl(280,100%,94%)] font-extrabold tracking-widest md:text-xl">
                    Selamat datang, para kurcaci pengembara cahaya. Hutan yang lebat mungkin telah menutup pandanganmu, namun penduduk istana selalu menunggumu untuk menemuinya, tapi kapankah datangnya kesempatan itu? Jalanilah proses ini, hingga kau menemukan celah terang...
                </p>
                {/* <PostList/> */}
                <div className="pt-24">
                    <News/>
                </div>
                <div className="pt-24">
                    <TugasListPeserta/>
                </div>
                <div className="flex flex-col items-center justify-center pt-10 pb-20">
                    <p className=" text-base text-center text-[#772da8] font-extrabold tracking-widest md:text-2xl font-bluecashews">
                        Teman adalah saudara <br/>
                        Saudara adalah keluarga <br/>
                        Kebersamaan adalah segalanya <br/>
                    </p>
                </div>
                
            </div>
        </div>
    );
}

// todo:
// - can view post & tugas
// - can submit tugas with uploadthing