"use client";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/trpc/react";
import { FormEvent } from "react";
import Link from "next/link";
import { UploadButton } from "~/utils/uploadthing";

import Image from "next/image";
import { url } from "inspector";
import { Url } from "next/dist/shared/lib/router/router";

export function TugasListAdmin() {
  const { data: tugass, refetch: refetchTugass } =
    api.tugasAdmin.getAll.useQuery();
  const { data: submissions, refetch: refetchSubmissions } =
    api.tugasAdmin.getTugasSubmissions.useQuery();
  const hideTugas = api.tugasAdmin.hideTugas.useMutation();
  const unhideTugas = api.tugasAdmin.unhideTugas.useMutation();

  // sort submissions by NIM
  if (submissions) {
    submissions.sort((a, b) => {
      const aNim = Number(a.submissionBy.nim); //eslint-disable-line
      const bNim = Number(b.submissionBy.nim); //eslint-disable-line
      return aNim - bNim;
    });
  }
  return (
    <div>
      <h1>Tugas:</h1>
      <button
        onClick={() => {
          void refetchTugass();
          void refetchSubmissions();
        }}
      >
        Refetch
      </button>
      <ul className="grid grid-cols-1 gap-4">
        {tugass?.map((tugas) => (
          <li key={tugas.id}>
            <p>
              <b>{tugas.judul}</b>
            </p>
            <p>{tugas.body}</p>
            <p>{tugas.perintahMisi}</p>
            <Link href={tugas.attachment ? tugas.attachment : "#"}>
              Attachments
            </Link>
            <p>deadline: {tugas.deadline?.toString()}</p>
            <p>isTugasSpesial: {tugas.isTugasSpesial ? "true" : "false"}</p>
            <p>hidden: {tugas.hidden ? "true" : "false"}</p>
            <button
              onClick={async () => {
                await hideTugas.mutateAsync({ tugasId: tugas.id });
                void refetchTugass();
              }}
            >
              hide tugas
            </button>
            <br />
            <button
              onClick={async () => {
                await unhideTugas.mutateAsync({ tugasId: tugas.id });
                void refetchTugass();
              }}
            >
              unhide tugas
            </button>
            <p>targetNimPeserta:</p>
            {tugas.targetNimPeserta?.map((targetNim) => (
              <p key={targetNim}>{targetNim}</p>
            ))}
            <ul className="grid grid-cols-1 gap-4">
              <p>Submissions: </p>
              {submissions?.map(
                (submission) =>
                  submission.submissionTugasId === tugas.id && (
                    <li key={submission.id} className="grid grid-cols-4 gap-4">
                      {/* <p><b>{JSON.stringify(submission)}</b></p> */}
                      <p>
                        <b>
                          {
                            submission.submissionBy.nim // eslint-disable-line
                          }
                        </b>
                      </p>
                      <p>
                        <b>
                          {
                            submission.submissionBy.name // eslint-disable-line
                          }
                        </b>
                      </p>
                      <p>
                        <b>
                          {submission.createdAt?.toLocaleString("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }) // eslint-disable-line
                          }
                        </b>
                      </p>
                      <Link href={submission.submissionUrl as Url}>
                        {submission.filename}
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TugasListPeserta() {
  const userSession = api.user.getUserSession.useQuery();
  const { data: tugass, refetch: refetchTugass } =
    api.tugasAdmin.getAll.useQuery();
  const { data: tugasSubmits, refetch: refetchTugasSubmits } =
    api.submitPeserta.getAll.useQuery();
  const createSubmission = api.submitPeserta.submitPesertaCreate.useMutation();
  const hideSubmission = api.submitPeserta.hideSubmission.useMutation();

  // sort tugas by date
  if (tugass) {
    tugass.sort((a, b) => {
      return new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf();
    });
  }

  async function hideTugas(tugasId: string) {
    await hideSubmission.mutateAsync({ tugasId: tugasId });
    void refetchTugasSubmits();
  }

  return (
    <div className="m-0 sm:m-5">
      {/* <div className="bg-local relative"
            style={{
                // backgroundImage: `url('/billboard-desktop-top.png')`,
                // backgroundSize: "100% "
            }}><Image className="" alt="" src="/billboard-desktop-top.png" fill={true}/></div> */}
      <div
        className="bg-local"
        style={{
          backgroundImage: `url('/day 3 - billboard_top.png')`,
          backgroundSize: "100% ",
        }}
      >
        <img src="/billboard-desktop-top.png" className="invisible w-full" />
      </div>
      <div
        className="bg-local bg-repeat-y"
        style={{
          backgroundImage: `url('/day 3 - billboard_body.png')`,
          backgroundSize: "100% ",
        }}
      >
        <div className="px-0 sm:px-6 md:px-20">
          <ul className="grid grid-cols-1 items-start xl:grid-cols-2 2xl:grid-cols-3">
            {tugass?.map(
              (tugas) =>
                tugas.hidden === false &&
                (tugas.targetNimPeserta.length === 0 ||
                tugas.targetNimPeserta.includes(userSession.data!.nim)
                  ? true
                  : false) && (
                  <li
                    key={tugas.id}
                    className="relative bg-local"
                    style={{
                      backgroundImage: `url('day 3 - paper.png')`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100% 100%",
                    }}
                  >
                    {tugas.isTugasSpesial && (
                      <Image
                        className="absolute bottom-0 left-0 right-0 top-0 m-auto opacity-40"
                        src="/logo-himafi-old-stamp.png"
                        alt=""
                        width={400}
                        height={400}
                      ></Image>
                    )}
                    <div className="relative z-10 m-[4rem] pt-20 text-center font-bold text-amber-900 sm:m-[7rem]">
                      <h1 className="text-[2rem] font-extrabold tracking-tight">
                        {tugas.judul}
                      </h1>
                      <p className="font-black">
                        Deadline:{" "}
                        {tugas.deadline?.toLocaleString("en-GB", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </p>
                      <p className="whitespace-pre-wrap text-justify">
                        {tugas.body}
                      </p>
                      <p className="whitespace-pre-wrap pt-6 text-center font-serif font-black">
                        {tugas.perintahMisi}
                      </p>
                      {/* <h1 className="text-center font-black">{tugas.perintahMisi}</h1> */}
                      <div className="pt-4">
                        {" "}
                        {tugas.attachment && (
                          <Link
                            className="rounded bg-orange-950 px-10 py-3 font-roman font-semibold text-yellow-50 no-underline transition hover:bg-orange-700"
                            href={tugas.attachment ? tugas.attachment : "#"}
                          >
                            Attachment
                          </Link>
                        )}
                      </div>
                      <p className="pt-20 text-[1.2rem]">Upload</p>
                      <div>
                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(
                              e.target as HTMLFormElement,
                            );
                            const link = formData.get("link") as string;
                            await createSubmission.mutateAsync({
                              tugasId: tugas.id,
                              url: link,
                              filename: link.substring(0, 32) + ".....",
                              key: undefined,
                            });
                            void refetchTugasSubmits();
                            (e.target as HTMLFormElement).reset();
                          }}
                        >
                          <div className="flex flex-row justify-center self-center px-10 py-3">
                            <input
                              required={true}
                              type="text"
                              name="link"
                              id="link"
                              placeholder="Enter link here"
                              className="max-w-[15rem] rounded border border-gray-400 p-1"
                            />
                            <button
                              type="submit"
                              className="rounded bg-orange-800 px-4 py-1 font-semibold text-yellow-50 no-underline transition hover:bg-orange-700"
                            >
                              Submit link
                            </button>
                          </div>
                        </form>
                      </div>
                      <UploadButton
                        className="ut-label:'ese' ut-button:bg-orange-900"
                        endpoint="blobUploader"
                        onClientUploadComplete={async (res) => {
                          console.log("Files: ", res[0]!.url);
                          await createSubmission.mutateAsync({
                            tugasId: tugas.id,
                            url: res[0]!.url,
                            filename: res[0]!.name,
                            key: res[0]!.key,
                          });
                          void refetchTugasSubmits();
                        }}
                        onUploadError={(error: Error) => {
                          // Do something with the error.
                          alert(`ERROR! ${error.message}`);
                        }}
                      />
                      <div>
                        {tugasSubmits?.map(
                          (submission) =>
                            submission.submissionTugasId === tugas.id && (
                              <div
                                className="flex justify-between px-10"
                                key={submission.id}
                              >
                                <Link href={submission.submissionUrl as Url}>
                                  {submission.filename
                                    ? submission.filename
                                    : "file"}
                                </Link>
                                <button
                                  onClick={() => hideTugas(submission.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            ),
                        )}
                      </div>
                    </div>
                  </li>
                ),
            )}
          </ul>
        </div>
      </div>
      <div
        className="bg-local"
        style={{
          backgroundImage: `url('day 3 - billboard_bottom.png')`,
          backgroundSize: "100% ",
        }}
      >
        <img src="/billboard-desktop-bottom.png" className="invisible w-full" />
      </div>
    </div>
  );
}
