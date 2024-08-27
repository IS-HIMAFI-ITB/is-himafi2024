import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { TugasCreateAdmin } from "~/app/_components/tugasCreate-admin";
import { PostCreateAdmin } from "~/app/_components/postCreate-admin";
import { PostList } from "~/app/_components/postList";
import { TugasListAdmin } from "~/app/_components/tugasList";
import { MarkOrphanedSubmissions } from "~/app/_components-for-backend/renameOrphanedSubmissions";
import { ChooseDay, CreateDayForm } from "../_components/day";
import { SynchronizeSheetsCMS } from "~/app/_components-for-backend/synchronizeSheetsCMS";

export default async function AdminPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/authpage/login/");
  }
  if (session.user.role === "PESERTA") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="absolute top-0 right-0 h-16 max-h-16">
        <div className="flex h-full flex-row items-center justify-center gap-2">
          <p className="text-center text-m text-white">
            {session && (
              <span>
                Logged in as {session.user?.name} ({session.user?.role})
              </span>
            )}
          </p>
          <Link
            href={"/api/auth/signout"}
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            signout
          </Link>
        </div>
      </div>
      <div className="container min-h-screen items-center justify-center">
        <h1 className="text-sm font-extrabold tracking-tight text-center md:text-5xl">
          Admin <span className="text-[hsl(280,100%,70%)]">Page</span>
        </h1>
        <div className="container grid grid-cols-1 gap-6 mt-10 md:grid-cols-2">
          <CreateDayForm />
          <div className="">
            <ChooseDay />
            </div>
        </div>
        <div className="container grid grid-cols-1 gap-6 mt-10 md:grid-cols-2">
          <PostCreateAdmin />
          <TugasCreateAdmin />
        </div>
        <div className="mt-10">
          <h1>List Post</h1>
          <PostList />
        </div>
        <div className="border rounded-lg p-5 t-10 grid grid-cols-1 mt-10">
          <h1>List Tugas</h1>
          <TugasListAdmin />
        </div>
        <div className="mt-10 col-span-2 text-sm">
          <h1>Data</h1>
          <MarkOrphanedSubmissions />
        </div>
      </div>
    </div>
  );
}

// todo:
// - can create post & tugas
// - can delete post & tugas
