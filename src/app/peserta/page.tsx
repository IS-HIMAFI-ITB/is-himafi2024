import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PostList } from "../_components/postList";
import { TugasList, TugasListPeserta } from "../_components/tugasList";
import { ImageUpload } from "../_components/image-upload";

export default async function PesertaPage() {
    const session = await getServerAuthSession()
    if (!session) {
        redirect('/authpage/login/')
    }
    if (session.user.role === 'ADMIN') {
        redirect('/')
    }
    return (
        <div className="flex min-h-screen flex-col text-white
            bg-[linear-gradient(to_right_bottom,#512d0d81,#2b1807),url('/panorama-vertical-red-background.png')]"
            >
        
            <div className="absolute top-0 right-0 max-w-[25rem] max-h-[15rem] bg-local" 
                        style={{
                            backgroundImage: `url('/woodsign(2)-burn-shortchain.png')`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "100% 100%"
                        }}>
                <div className="flex h-full flex-col items-center justify-center gap-2 pt-12 pb-12">
                    <p className="text-center text-amber-50 font-extrabold px-20" >
                    {session && <span>
                        {session.user?.name}<br /> ({session.user?.role})</span>}
                    </p>
                    <Link
                        href={"/api/auth/signout"}
                            className="rounded bg-amber-900/80 text-orange-200 px-10 font-semibold no-underline transition hover:bg-white/20"
                        >signout
                    </Link>
                    
                </div>
            </div>
            <div className="flex min-h-screen flex-col items-center justify-center pt-48">
                <h1 className="text-5xl font-extrabold tracking-tight md:text-[5rem]">
                    Intellektuelle<span className="text-[#f59e0b]">schule</span>
                </h1>
                <p className="pt-10 text-base w-9/12 text-center text-[#f59f0bbb] font-extrabold tracking-widest md:text-xl">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                </p>
                {/* <PostList/> */}
                <div className="pt-24">
                    <TugasListPeserta/>
                </div>
                
                
            </div>
        </div>
    );
}

// todo:
// - can view post & tugas
// - can submit tugas with uploadthing