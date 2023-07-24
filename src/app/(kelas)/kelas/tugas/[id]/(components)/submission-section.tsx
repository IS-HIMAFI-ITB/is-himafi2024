"use client";

import "moment/locale/id";

import { motion } from "framer-motion";
import {
  CalendarIcon,
  ClockIcon,
  DownloadIcon,
  ExternalLink,
  UploadIcon,
} from "lucide-react";
import moment from "moment";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

import DropFile from "@/components/drop-file";
import { H3 } from "@/components/typography";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/toast/useToast";
import { Submission, Tugas } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import SubmitTugasCard from "./submit-tugas-card";

export default function SubmissionSection({
  tugas,
  tugasSubmission,
  params,
}: {
  tugas: Tugas | undefined;
  tugasSubmission: Submission | undefined;
  params: { id: string };
}) {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [uploadedFileKey, setUploadedFileKey] = useState<string | undefined>(
    tugasSubmission?.files ?? undefined
  );
  const [attachments, setAttachments] = useState<string | undefined>(
    tugasSubmission?.links ?? undefined
  );
  const { toast } = useToast();
  const session = useSession();
  const queryClient = useQueryClient();
  moment.locale("id");

  const deleteSubmission = useMutation({
    mutationKey: ["deleteSubmission", { submissionId: tugasSubmission?.id }],
    mutationFn: async () => {
      setLoading(true);
      toast({
        title: "Menghapus submisi",
      });
      const res = await fetch(
        `/api/submissions/${session?.data?.user.id}/${params.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: tugasSubmission?.id }),
        }
      )
        .then((res) => res.json())
        .catch((err) => {
          throw new Error(err);
        });

      return res;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        [
          "tugasSubmission",
          { tugasId: params.id, userId: session?.data?.user.id },
        ],
        undefined
      );
      setOpen(false);
      setUploadedFileKey(undefined);
      setAttachments(undefined);
      toast({
        title: "Berhasil menghapus submisi",
        description: "Submisi kamu berhasil dihapus.",
      });
    },
    onError: (err: Error) => {
      toast({
        title:
          "Gagal menghapus file submisi, namun submisi kamu berhasil dihapus, silakan refresh halaman ini.",
        description: err.message,
      });
    },
    onSettled: () => {
      setLoading(false);
      queryClient.invalidateQueries({
        queryKey: [
          "tugasSubmission",
          { tugasId: params.id, userId: session?.data?.user.id },
        ],
      });
    },
  });

  return (
    <motion.div
      className="sticky top-28 h-max flex flex-col gap-4"
      // diganti karena ada overflow sebelumnya
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01],
        delay: 0.3,
      }}
    >
      <div className="flex flex-row gap-4">
        <H3>Nilai kamu</H3>

        <H3 className="text-accent">{tugasSubmission?.score ?? "???"}</H3>
      </div>

      <div className="flex flex-row flex-wrap gap-2 items-center">
        {(moment(tugasSubmission?.submittedAt).isAfter(
          moment(tugas?.dueDate)
        ) ||
          (!tugasSubmission && moment(tugas?.dueDate).isBefore())) && (
          <Badge className="w-max" variant={"destructive"}>
            Telat
          </Badge>
        )}

        {tugasSubmission ? (
          <>
            <Badge className="w-max">Sudah dikumpulkan</Badge>
            {tugasSubmission?.score === null ? (
              <Badge variant={"destructive"} className="w-max">
                Belum dinilai
              </Badge>
            ) : (
              <Badge variant={"secondary"} className="w-max">
                Sudah dinilai
              </Badge>
            )}
          </>
        ) : (
          <Badge variant={"destructive"} className="w-max">
            Belum dikumpulkan
          </Badge>
        )}
      </div>

      <p className="text-lg font-bold mt-4 -mb-2">Jawaban yang dikumpulkan</p>
      {tugasSubmission?.submittedAt && (
        <div className="flex flex-row flex-wrap gap-2 items-center">
          <p className="text-sm">Dikumpulkan </p>
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <CalendarIcon className="xs:ml-2" size={12} />{" "}
            <p className="text-sm">
              {moment(tugasSubmission.submittedAt).format("L")}
            </p>
          </div>
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <ClockIcon className="ml-2" size={12} />
            <p className="text-sm">
              {moment(new Date(tugasSubmission.submittedAt)).format(
                `HH:mm ${
                  moment(tugasSubmission?.submittedAt).format("Z") === "+07:00"
                    ? "[WIB]"
                    : moment(tugasSubmission?.submittedAt).format("Z") ===
                      "+08:00"
                    ? "[WITA]"
                    : `[GMT] ${moment(tugasSubmission?.submittedAt).format(
                        "Z"
                      )}`
                }`
              )}
              {/* {`${
                (new Date(tugasSubmission.submittedAt).getHours() < 10
                  ? "0"
                  : "") + new Date().getHours()
              }:${
                (new Date(tugasSubmission.submittedAt).getMinutes() < 10
                  ? "0"
                  : "") + new Date().getMinutes()
              }`} */}
            </p>
          </div>
        </div>
      )}

      {!tugasSubmission?.files && (
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Card className="py-4 px-6 group/fileSubmitted hover:cursor-pointer hover:border hover:border-primary hover:scale-105 transition-transform">
              <div className="flex flex-row gap-6 items-center">
                <UploadIcon
                  size={24}
                  className="group-hover/fileSubmitted:text-primary"
                />

                <p className="font-bold">Upload file/jawaban</p>
              </div>
            </Card>
          </AlertDialogTrigger>

          <SubmitTugasCard
            loading={loading}
            setLoading={setLoading}
            uploadedFileKey={uploadedFileKey}
            setUploadedFileKey={setUploadedFileKey}
            attachments={attachments}
            setAttachments={setAttachments}
            edit={edit}
            setEdit={setEdit}
            variant="submit"
            params={{ id: params.id }}
            setOpen={setOpen}
            tugasSubmission={tugasSubmission}
          />
        </AlertDialog>
      )}

      {tugasSubmission?.files && (
        <a
          href={`https://uploadthing.com/f/${tugasSubmission.files}`}
          className="flex flex-row gap-6 items-center"
        >
          <Card className="py-4 px-6 group/fileSubmitted hover:cursor-pointer hover:border hover:border-primary hover:scale-105 transition-transform w-full max-w-full">
            <div className="flex flex-row gap-6 items-center w-full">
              <div>
                <DownloadIcon
                  size={32}
                  className="group-hover/fileSubmitted:text-primary shrink-0"
                />
              </div>

              <div className="flex flex-row gap-4 justify-between w-full overflow-hidden">
                <p className="font-semibold line-clamp-1 text-ellipsis">
                  {decodeURI(
                    tugasSubmission.files.split("_").slice(1).join("_")
                  )}
                </p>

                <Badge className="xs:inline hidden" variant={"outline"}>
                  .
                  {
                    // Ambil ekstensi file
                    tugasSubmission.files
                      .split("_")
                      .slice(1)
                      .join("_")
                      .split(".")[1]
                  }
                </Badge>
                {/* <CalendarIcon className="xs:ml-2" size={12} />{" "}
                  <p className="text-sm">
                    {moment(tugasSubmission.submittedAt).format("L")}
                  </p>
                  <ClockIcon className="ml-2" size={12} />
                  <p className="text-sm">
                    {`${new Date(
                      tugasSubmission.submittedAt
                    ).getHours()}:${new Date(
                      tugasSubmission.submittedAt
                    ).getMinutes()}`}
                  </p> */}
              </div>
            </div>
          </Card>
        </a>
      )}

      {tugasSubmission?.links && (
        <>
          {tugasSubmission.links.split("|").map((link) => (
            <Card
              key={link}
              className="py-3 px-6 group/fileSubmitted hover:cursor-pointer hover:border hover:border-primary hover:scale-105 transition-transform"
            >
              <div className="flex flex-col gap-1">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row gap-6 items-center"
                >
                  <ExternalLink
                    size={24}
                    className="group-hover/fileSubmitted:text-primary shrink-0"
                  />
                  <p className="font-semibold line-clamp-1">{link}</p>
                </a>
              </div>
            </Card>
          ))}
        </>
      )}

      {tugasSubmission && (
        <div className="flex flex-row gap-2 items-center">
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button className="w-full" variant={"outline"}>
                Ganti submisi
              </Button>
            </AlertDialogTrigger>

            <SubmitTugasCard
              loading={loading}
              setLoading={setLoading}
              uploadedFileKey={uploadedFileKey}
              setUploadedFileKey={setUploadedFileKey}
              attachments={attachments}
              setAttachments={setAttachments}
              edit={edit}
              setEdit={setEdit}
              params={{ id: params.id }}
              setOpen={setOpen}
              tugasSubmission={tugasSubmission}
              variant="edit"
            />
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"} className="w-full">
                Hapus submisi
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                Apakah kamu yakin ingin menghapus submisi kamu?
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogAction>Batal</AlertDialogAction>

                <AlertDialogCancel
                  className="mt-3"
                  onClick={() => deleteSubmission.mutate()}
                >
                  Hapus
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}

      <p className="text-lg font-bold mt-4 -mb-2">Feedback grader</p>

      <Separator />

      <p className="max-h-[200px] overflow-y-auto">
        {tugasSubmission?.feedback ?? "Belum ada feedback."}
      </p>
    </motion.div>
  );
}
