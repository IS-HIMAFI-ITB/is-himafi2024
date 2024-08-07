"use client"

import { useState } from "react";
import { api } from "~/trpc/react";
import { FormEvent } from "react";


export function TugasCreateAdmin() {
    const [formcontent, setFormcontent] = useState({judul:'', body: '', attachment: '', deadline: '', tugasSpesial: false});
    const createTugas = api.tugasAdmin.tugasAdminCreate.useMutation();
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            createTugas.mutate({ judul: formcontent.judul, body: formcontent.body, attachment: formcontent.attachment, deadline: new Date(formcontent.deadline), isTugasSpesial: formcontent.tugasSpesial });
        } catch (error) {
            console.log(error);
        } finally {
            setFormcontent({ judul: '', body: '', attachment: '', deadline: '', tugasSpesial: false });
        }
        
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
                <label className="text-[#FFFFFF]">
                    <input
                        
                        type="checkbox"
                        onChange={() => {setFormcontent({ ...formcontent, tugasSpesial: !formcontent.tugasSpesial });
                            }}
                    />
                Misi spesial
                </label>
                
                <button className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20 text-white"
                    type="submit"> Submit
                </button>
            </form>
        </div>
    );
}