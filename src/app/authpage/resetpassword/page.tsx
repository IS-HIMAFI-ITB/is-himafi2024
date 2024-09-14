"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import Image from "next/image";

export default function ResetPasswordPage() {
  const [userInfo, setUserInfo] = useState({ nim: "", password: "" });
  const router = useRouter();
  const changePassword = api.user.changePassword.useMutation();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    changePassword.mutate({ password: userInfo.password });
    router.replace("/authpage/login/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center relative text-white">
      <Image src="/day6_background.png" alt="Cover Image" className="object-cover object-top absolute -z-50" fill />
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Change <span className="text-[#39a2e2]">Password</span>
      </h1>
      <div>
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col items-center justify-center gap-4 text-black">
          <input
            className="text-black"
            value={userInfo.password}
            onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
            type="password"
            placeholder="password"
          />
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            type="submit"
          >
            change password
          </button>
        </form>
      </div>
    </div>
  );
}

// todo:
// - login with nim and password
// - go back to home page if authenticated
