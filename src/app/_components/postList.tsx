"use client"

import { useState } from "react";
import { api } from "~/trpc/react";
import { FormEvent } from "react";
import Link from "next/link";

export function PostList() {
    const { data: posts, refetch: refetchPosts } = api.postAdmin.getAll.useQuery();
    return (
    <div>
        <h1>Posts:</h1>
        <button
            onClick={() => refetchPosts()}
        >
            Refetch 
        </button>
        <ul className="grid gap-4 grid-cols-1">
            {posts?.map((post) => (
                <li key={post.id} >
                    <p><b>{post.judul}</b></p>
                    <p>{post.body}</p>
                    <Link 
                        href={post.attachment ? post.attachment : '#'}
                        >attachments
                    </Link>
                </li>
            ))}
        </ul>
        
    </div>
    )
}