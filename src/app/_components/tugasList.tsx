"use client"

import { useState } from "react";
import { api } from "~/trpc/react";
import { FormEvent } from "react";
import Link from "next/link";
import { UploadButton } from "~/utils/uploadthing";

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