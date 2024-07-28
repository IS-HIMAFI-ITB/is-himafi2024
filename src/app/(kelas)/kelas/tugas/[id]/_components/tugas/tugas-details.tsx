"use client";

import { CalendarIcon, ClockIcon } from "lucide-react";
import moment from "moment";
import { useParams } from "next/navigation";
import React, { useContext } from "react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TugasDetailsContext } from "@/context/tugas-details-provider";
import { Tugas } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function TugasDetails() {
  const params = useParams();
  const initialData = useContext(TugasDetailsContext);
  const { data: tugas, isLoading } = useQuery<Tugas, Error>({
    queryKey: ["tugas", { id: params.id }],
    queryFn: async () => {
      const res = await fetch(`/api/tugas/${params.id}`);
      return res.json();
    },
    initialData: initialData,
  });

  if (isLoading)
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="min-w-[200px] w-full h-12" />
        <div className="not-prose mt-4 flex flex-row flex-wrap items-center gap-4">
          <Skeleton className="w-[300px] h-8" />
          <Skeleton className="w-[300px] h-8" />
        </div>
        <Skeleton className="w-full h-80" />
        <Skeleton className="w-[20ch] h-8" />
      </div>
    );

  return (
    <>
      <h3 className="flex flex-row items-center gap-2">Tugas #{tugas.id}</h3>

      <h1>{tugas.title}</h1>

      <div className="not-prose -mt-4 flex flex-row flex-wrap items-center gap-4">
        <Badge
          variant={"secondary"}
          className="flex flex-row gap-1 items-center font-normal px-4"
        >
          <CalendarIcon className="mr-1" size={16} />

          <p className="hidden text-sm xs:inline">Deadline</p>

          <p className="text-sm">
            {moment(tugas.dueDate).format("DD-MM-YYYY")},{" "}
            {moment(tugas.dueDate).format(
              `HH:mm ${
                moment(tugas.dueDate).format("Z") === "+07:00"
                  ? "[WIB]"
                  : moment(tugas.dueDate).format("Z") === "+08:00"
                  ? "[WITA]"
                  : `[GMT] ${moment(tugas.updatedAt).format("Z")}`
              }`
            )}
          </p>
        </Badge>

        <Badge
          variant={"outline"}
          className="flex flex-row gap-2 items-center font-normal px-4"
        >
          <ClockIcon size={16} />{" "}
          <p className="text-sm">
            Updated{" "}
            {moment(tugas.updatedAt).format(
              `DD-MM-YYYY, HH:mm ${
                moment(tugas.updatedAt).format("Z") === "+07:00"
                  ? "[WIB]"
                  : moment(tugas.updatedAt).format("Z") === "+08:00"
                  ? "[WITA]"
                  : `[GMT] ${moment(tugas.updatedAt).format("Z")}`
              }`
            )}
          </p>
        </Badge>
      </div>

      <div
        className="my-6"
        dangerouslySetInnerHTML={{
          __html: tugas.description ?? "Tidak ada deskripsi.",
        }}
      />
    </>
  );
}