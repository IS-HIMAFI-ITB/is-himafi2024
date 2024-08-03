'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react';

export default function LoginPage() {
    const [userInfo, setUserInfo] = useState({nim:'', password: ''})
    const handleSubmit =async (event: React.FormEvent<HTMLFormElement>)  => {
        event.preventDefault();
        // signIn('credentials', {...userInfo, redirect: false})
        await signIn("credentials", {
            nim: userInfo.nim,
            password: userInfo.password,
            callbackUrl: '/'
        })
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                Login <span className="text-[hsl(280,100%,70%)]">Page</span>
            </h1>
            <div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-10 items-center justify-center text-[hsl(0,0,0)]'>
                    <input 
                        value={userInfo.nim} 
                        onChange={({ target }) => setUserInfo({ ...userInfo, nim: target.value })}
                        type="nim" placeholder='10223xxx' />
                    <input 
                        value={userInfo.password} 
                        onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })} 
                        type="password" placeholder='password' />
                    <button className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20 text-white"
                        type="submit">Login
                    </button>
                    
                </form>
            </div>
        </div>
    );
}


// todo:
// - login with nim and password
// - go back to home page if authenticated