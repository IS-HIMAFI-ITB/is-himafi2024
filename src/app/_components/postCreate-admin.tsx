"use client"

import { useState } from "react";
import { api } from "~/trpc/react";
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PostCreateAdmin() {
    const [formcontent, setFormcontent] = useState({judul:'', body: '', attachment: ''});
    const createPost = api.postAdmin.postAdminCreate.useMutation();
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createPost.mutate({ judul: formcontent.judul, body: formcontent.body, attachment: formcontent.attachment });
    };
    return (
        <div className="bg-violet-100 py-5 content-center container w-full max-w-xs border border-violet-400 rounded-lg drop-shadow-md">
            <h1 className="relative text-5xl font-extrabold text-violet-700 z-20">Create Post</h1>
            <div className="absolute -inset-2 z-0">
            <div
                className="w-full h-full max-w-sm mx-auto lg:mx-0 opacity-30 blur-lg bg-gradient-to-r from-violet-400 via-pink-500 to-violet-600">
            </div>
            </div>
            <form 
                onSubmit={handleSubmit}
                className="z-10 relative flex flex-col gap-4 mt-5 text-[hsl(0,0,0)]"
            >
                <Input 
                    value={formcontent.judul} 
                    onChange={({ target }) => setFormcontent({ ...formcontent, judul: target.value })}
                    type="judul" placeholder='Judul' />
                <Input 
                    value={formcontent.body} 
                    onChange={({ target }) => setFormcontent({ ...formcontent, body: target.value })}
                    type="body" placeholder='Body' />
                <Input 
                    value={formcontent.attachment} 
                    onChange={({ target }) => setFormcontent({ ...formcontent, attachment: target.value })}
                    type="attachment" placeholder='Attachment' />
                <Button className="text-violet-100 text-xl bg-black rounded-xl px-5 py-auto hover:cursor-pointer hover:bg-slate-700 transition duration-300 ease-in-out"
                    type="submit"> Submit
                </Button>
            </form>
        </div>
    );
}