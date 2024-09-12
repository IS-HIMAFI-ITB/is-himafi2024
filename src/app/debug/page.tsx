/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { TestBtnAdmin, TestBtnPeserta } from "~/app/_components-for-backend/testBtn";

export default async function DebugPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/authpage/login/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="absolute top-0 right-0 h-16 max-h-16">{header()}</div>
      <div className="min-h-screen items-center justify-center">
        <h1 className="text-7xl font-extrabold text-center pt-20">
          Debug <span className="text-[hsl(280,100%,70%)]">Page</span>
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:p-20">
          <div className="border-4 border-violet-400 rounded-lg drop-shadow-md p-10">
            <h1 className="text-3xl font-extrabold text-center pb-5">
              Admin <span className="text-[hsl(280,100%,70%)]">Action</span>
            </h1>
            <TestBtnAdmin />
          </div>
          <div className="border-4 border-violet-400 rounded-lg drop-shadow-md p-10">
            <h1 className="text-3xl font-extrabold text-center pb-5">
              Peserta <span className="text-[hsl(280,100%,70%)]">Action</span>
            </h1>
            <TestBtnPeserta />
          </div>
        </div>
      </div>
    </div>
  );

  function header() {
    return (
      <div className="flex h-full flex-row items-center justify-center gap-2">
        <p className="text-center text-m text-white">
          {session && (
            <span>
              Logged in as {session.user?.name} ({session.user?.role})
            </span>
          )}
        </p>
        <Link
          href={"/api/auth/signin"}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          Signin
        </Link>
      </div>
    );
  }
}
