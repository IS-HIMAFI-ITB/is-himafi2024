import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PostList } from "../_components/postList";
import { TugasList } from "../_components/tugasList";
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
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <div className="absolute top-0 right-0 h-16">
                <div className="flex h-full flex-row items-center justify-center gap-2">
                    <p className="text-center text-m text-white">
                    {session && <span>Logged in as {session.user?.name} ({session.user?.role})</span>}
                    </p>
                    <Link
                        href={"/api/auth/signout"}
                            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                        >signout
                    </Link>
                    
                </div>
            </div>
            <div className="flex min-h-screen flex-col items-center justify-center">
                
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                    Intelektuelle <span className="text-[hsl(280,100%,70%)]">schule</span>
                    
                </h1>
                <PostList/>
                <h1>tugas below</h1>
                <TugasList/>
                
            </div>
        </div>
    );
}

// todo:
// - can view post & tugas
// - can submit tugas with uploadthing