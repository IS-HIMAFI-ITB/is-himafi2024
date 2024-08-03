"use client"

import { useState } from "react";
import { api } from "~/trpc/react";
import { FormEvent } from "react";

import DatePicker from "react-datepicker"


export function TugasCreateAdmin() {
    
    const [formcontent, setFormcontent] = useState({judul:'', body: '', attachment: '', deadline: '' });
    const createTugas = api.tugasAdmin.tugasAdminCreate.useMutation();
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createTugas.mutate({ judul: formcontent.judul, body: formcontent.body, attachment: formcontent.attachment, deadline: new Date(formcontent.deadline), });
    };
    return (
        <div className="w-full max-w-xs">
            <h1>Create tugas</h1>
            <form 
                onSubmit={handleSubmit}
                className='flex flex-col gap-4 mt-10 items-center justify-center text-[hsl(0,0,0)]'
            >
                <input 
                    value={formcontent.judul} 
                    onChange={({ target }) => setFormcontent({ ...formcontent, judul: target.value })}
                    type="judul" placeholder='judul' />
                <input 
                    value={formcontent.body} 
                    onChange={({ target }) => setFormcontent({ ...formcontent, body: target.value })}
                    type="body" placeholder='body' />
                <input 
                    value={formcontent.attachment} 
                    onChange={({ target }) => setFormcontent({ ...formcontent, attachment: target.value })}
                    type="attachment" placeholder='attachment' />
                <input 
                    value={formcontent.deadline} 
                    onChange={({ target }) => setFormcontent({ ...formcontent, deadline: target.value })}
                    type="date" />
                <button className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20 text-white"
                    type="submit"> Submit
                </button>
            </form>
        </div>
    );
}