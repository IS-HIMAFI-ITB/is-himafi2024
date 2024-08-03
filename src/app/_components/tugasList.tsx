"use client"

import { useState } from "react";
import { api } from "~/trpc/react";
import { FormEvent } from "react";
import Link from "next/link";

export function TugasList() {
    const { data: tugass, refetch: refetchTugass } = api.tugasAdmin.getAll.useQuery();
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
                        href={tugas.attachment}
                        >attachments
                    </Link>
                    <p>deadline: {tugas.deadline?.toString()}</p>
                </li>
            ))}
        </ul>
        
    </div>
    )
}