"use client"
import { api } from "~/trpc/react";
export const MarkOrphanedSubmissions = () => {
    
    const markOrphanedSubmissions = api.backend.markOrphanedSubmissions.useMutation();
    return (
        <button onClick={() => {markOrphanedSubmissions.mutate()}}>
            append .orphaned. to orphaned submissions
        </button>
    )
}