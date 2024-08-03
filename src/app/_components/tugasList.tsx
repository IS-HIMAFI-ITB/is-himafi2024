"use client"

import { useState } from "react";
import { api } from "~/trpc/react";
import { FormEvent } from "react";
import Link from "next/link";
import { UploadButton } from "~/utils/uploadthing";

import Image from 'next/image'
import { url } from "inspector";

export function TugasList() {
    const { data: tugass, refetch: refetchTugass } = api.tugasAdmin.getAll.useQuery();
    const createSubmission = api.submitPeserta.submitPesertaCreate.useMutation();
    return (
    <div>
        <h1>Tugas:</h1>
        <button
            onClick={() => refetchTugass()}
        >
            Refetch 
        </button>
        <ul className="grid gap-4 grid-cols-1">
            {tugass?.map((tugas) => (
                <li key={tugas.id} >
                    <p><b>{tugas.judul}</b></p>
                    <p>{tugas.body}</p>
                    <Link
                        href={tugas.attachment ? tugas.attachment : '#'}
                        >attachments
                    </Link>
                    <p>deadline: {tugas.deadline?.toString()}</p>
                    <UploadButton
                        endpoint="blobUploader"
                        onClientUploadComplete={(res) => {
                            console.log("Files: ", res[0]!.url);
                            createSubmission.mutate({ tugasId: tugas.id, url: res[0]!.url });
                            alert("Upload Completed");
                        }}
                        onUploadError={(error: Error) => {
                            // Do something with the error.
                            alert(`ERROR! ${error.message}`);
                        }}
                    />
                </li>
            ))}
        </ul>
        
    </div>
    )
}

export function TugasListPeserta() {
    const { data: tugass, refetch: refetchTugass } = api.tugasAdmin.getAll.useQuery();
    const createSubmission = api.submitPeserta.submitPesertaCreate.useMutation();
    
    return (
    <div className="m-5 bg-local bg-repeat-y"
        style={{
                backgroundImage: `url('/wooden board.png')`,
                backgroundSize: "100% "
            }}>
        <div className="p-6 md:p-20">
            <ul className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3  items-start" >
                {tugass?.map((tugas) => (
                    <li className="bg-local"
                        style={{
                            backgroundImage: `url('/paper1.png')`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "100% 100%"
                        }}
                        key={tugas.id} >
                        
                        <div className="m-[7rem] text-amber-900 font-bold text-center">
                            <h1 className="text-[2rem] font-extrabold tracking-tight ">{tugas.judul}</h1>
                            <p className="font-bold">Deadline: {tugas.deadline?.toLocaleString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p className="text-justify">{tugas.body}</p>
                            <div className="pt-4"> {tugas.attachment &&
                                <Link className="bg-amber-900/100 text-orange-200 rounded px-10 py-3 font-semibold no-underline transition hover:bg-amber-900/70"
                                    href={tugas.attachment ? tugas.attachment : '#'}
                                    >attachment
                                </Link>
                            }</div>
                            <p className="pt-8 text-[1.2rem]">Upload</p>
                            <UploadButton 
                                className="ut-button:bg-amber-900/100 ut-label:'ese'"
                                endpoint="blobUploader"
                                onClientUploadComplete={(res) => {
                                    console.log("Files: ", res[0]!.url);
                                    createSubmission.mutate({ tugasId: tugas.id, url: res[0]!.url });
                                    alert("Upload Completed");
                                }}
                                onUploadError={(error: Error) => {
                                    // Do something with the error.
                                    alert(`ERROR! ${error.message}`);
                                }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    )
}