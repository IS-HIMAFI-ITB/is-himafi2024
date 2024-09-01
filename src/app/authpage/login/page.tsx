"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const [userInfo, setUserInfo] = useState({ nim: "", password: "" });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // signIn('credentials', {...userInfo, redirect: false})
    await signIn("credentials", {
      nim: userInfo.nim,
      password: userInfo.password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[url('/day5_background.png')] bg-cover text-white">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Log<span className="text-[#ffdc90]">in</span>
      </h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col items-center justify-center gap-4 text-black"
        >
          <input
            className="text-black"
            value={userInfo.nim}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, nim: target.value })
            }
            type="nim"
            placeholder="10223xxx"
          />
          <input
            className="text-black"
            value={userInfo.password}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, password: target.value })
            }
            type="password"
            placeholder="password"
          />
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="pt-10">
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSc00S7-LYJ5HgKhYrkhcx2Ac304DRG59Gw6eoX_y3oOJEgx7g/viewform?usp=sf_link"
            className="bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            type="submit"
          >
            Lupa password
          </Link>
        </div>
      </div>
    </div>
  );
}

// todo:
// - login with nim and password
// - go back to home page if authenticated
