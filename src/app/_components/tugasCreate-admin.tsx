"use client"

import { useState } from "react";
import { api } from "~/trpc/react";
import { FormEvent } from "react";


export function TugasCreateAdmin() {
    const [formcontent, setFormcontent] = useState({judul:'', body: '', attachment: '', deadline: '', tugasSpesial: false, targetNimPesertaString: '', perintahMisi: ''});
    const createTugas = api.tugasAdmin.tugasAdminCreate.useMutation();
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const targetNimPesertaList = formcontent.targetNimPesertaString?formcontent.targetNimPesertaString.split(','):[];
        const deadline = new Date(new Date(formcontent.deadline).getTime()+62*60*1000) //add 1 hour & 2 minutes to deadline
        try {
            createTugas.mutate({ judul: formcontent.judul, body: formcontent.body, attachment: formcontent.attachment, deadline: deadline, isTugasSpesial: formcontent.tugasSpesial, targetNimPeserta: targetNimPesertaList, perintahMisi: formcontent.perintahMisi });
        } catch (error) {
            console.log(error);
        } finally {
            setFormcontent({ judul: '', body: '', attachment: '', deadline: '', tugasSpesial: false, targetNimPesertaString: '', perintahMisi: '' });
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
                    type="text" placeholder='judul' />
                <input 
                    value={formcontent.body} 
                    onChange={({ target }) => setFormcontent({ ...formcontent, body: target.value })}
                    type="text" placeholder='body' />
                <input 
                    value={formcontent.perintahMisi} 
                    onChange={({ target }) => setFormcontent({ ...formcontent, perintahMisi: target.value })}
                    type="text" placeholder='perintah misi' />
                <input 
                    value={formcontent.attachment} 
                    onChange={({ target }) => setFormcontent({ ...formcontent, attachment: target.value })}
                    type="text" placeholder='link attachment' />
                <input 
                    value={formcontent.deadline} 
                    onChange={({ target }) => setFormcontent({ ...formcontent, deadline: target.value })}
                    type="date" />
                <input 
                    value={formcontent.targetNimPesertaString} 
                    onChange={({ target }) => setFormcontent({ ...formcontent, targetNimPesertaString: target.value })}
                    type="text" placeholder='targetNimPeserta (comma separated no whitespace)' />
                <label className="text-[#FFFFFF]">
                    <input
                        type="checkbox"
                        onChange={() => {setFormcontent({ ...formcontent, tugasSpesial: !formcontent.tugasSpesial });
                            }}
                    />Misi spesial
                </label>
                <button className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20 text-white"
                    type="submit"> Submit
                </button>
            </form>
        </div>
    );
}