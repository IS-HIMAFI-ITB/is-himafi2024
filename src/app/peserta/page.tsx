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
        <div className="flex min-h-screen flex-col text-white
            bg-[linear-gradient(to_right_bottom,#512d0d81,#2b1807),url('/panorama-vertical-red-background.png')]"
            >
        
            <div className="absolute top-0 right-0 max-w-[25rem] max-h-[15rem] bg-local"  // session status bar
                        style={{
                            backgroundImage: `url('/woodsign(2)-burn-shortchain.png')`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "100% 100%"
                        }}>
                <div className="flex h-full flex-col items-center justify-center gap-2 pt-12 pb-12">
                    <p className="text-center text-amber-50 font-extrabold px-20 font-bluecashews" >
                    {session && <span>{session.user?.name}<br /> ({session.user?.role})</span>}<br />
                        Points: {getCumulativeScore}
                    </p>
                    
                    <Link
                        href={"/api/auth/signout"}
                            className="rounded bg-amber-900/80 text-orange-200 px-10 font-semibold no-underline transition hover:bg-white/20 font-roman"
                        >Signout
                    </Link>
                    
                </div>
            </div>
            <div className="flex min-h-screen flex-col items-center justify-center pt-48">
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight md:text-6xl font-bluecashews">
                    Intellektuelle<span className="text-[#f59e0b]">schule</span>
                </h1>
                <p className="pt-10 text-base w-9/12 text-center text-[#f59f0bbb] font-extrabold tracking-widest md:text-xl">
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
                    <p className=" text-base text-center text-[#f59f0bbb] font-extrabold tracking-widest md:text-xl font-bluecashews">
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