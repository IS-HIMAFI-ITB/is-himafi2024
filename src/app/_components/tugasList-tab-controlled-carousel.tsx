"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "~/components/ui/carousel";
import { api } from "~/trpc/react";
import Link from "next/link";
import { UploadButton } from "~/utils/uploadthing";
import type { Url } from "next/dist/shared/lib/router/router";
import { Badge } from "~/components/ui/badge";
import Image from "next/image";
import type { tugasDataExtend } from "~/server/api/routers/tugas-peserta";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { toast } from "sonner";

function TugasListPeserta({ tugasDatas }: { tugasDatas: tugasDataExtend[] }) {
  // const userSession = api.user.getUserSession.useQuery();
  // const { data: tugass, refetch: refetchTugass } = api.tugasAdmin.getAll.useQuery();
  // const { data: tugasSubmits, refetch: refetchTugasSubmits } = api.submitPeserta.getAll.useQuery();

  const createSubmissionMutation = api.submitPeserta.submitPesertaCreate.useMutation();
  const hideSubmissionMutation = api.submitPeserta.hideSubmission.useMutation();

  const { refetch: refetchCarouselTugasData } = api.tugasPeserta.getCarouselTugasData.useQuery();
  // const { data: allSubmission, refetch: refetchAllSubmission } = api.tugasPeserta.getAllSubmission.useQuery();

  // const tugasDatas = carouselTugasData?.[carouselIdx];
  async function hideSubmission(tugasId: string) {
    try {
      await hideSubmissionMutation.mutateAsync({ tugasId: tugasId });
      toast.success("Deletion successful", { description: "Your submission has been deleted" });
    } catch (error) {
      toast.error("Error ", { description: "Refer to console for details" });
      console.log(error);
    }
    void refetchCarouselTugasData();
  }
  async function createSubmission({
    tugasId,
    url,
    filename,
    key,
  }: {
    tugasId: string;
    url: string;
    filename: string;
    key: string | undefined;
  }) {
    try {
      await createSubmissionMutation.mutateAsync({ tugasId: tugasId, url: url, filename: filename, key: key });
      toast.success("Submission successful", { description: "Your submission has been created" });
    } catch (error) {
      toast.error("Error ", { description: "Refer to console for details" });
      console.log(error);
    }
    void refetchCarouselTugasData();
  }

  return (
    <div className="m-0 sm:m-5">
      <div className="-z-100 ">
        <Image src="/day5_board(top).png" width={0} height={0} sizes="100vw" style={{ width: "100%", height: "auto" }} alt={""} />
      </div>
      <div
        className="bg-local bg-repeat-y"
        style={{
          backgroundImage: `url('/day5_board(body).png')`,
          backgroundSize: "100% ",
        }}
      >
        <div className="px-0 sm:px-6 md:px-20">
          <div className="grid grid-cols-1 items-start xl:grid-cols-2 2xl:grid-cols-3">
            {tugasDatas?.map((tugasData, idx) => (
              <div key={idx} className="relative bg-local">
                <div className="absolute top-0 left-0 right-0 bottom-0 -z-90">
                  <Image src="/day5_paper.png" width={0} height={0} sizes="100vw" style={{ width: "100%", height: "100%" }} alt={""} />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 -rotate-6 text-[16rem] md:text-[18rem] text-amber-700 font-bBayanganPendekar">
                  {tugasData.tugasScore}
                </div>
                {tugasData.isTugasSpesial && (
                  <Image
                    className="absolute -z-80 bottom-0 left-0 right-0 top-0 m-auto opacity-20"
                    src="/logo-himafi-old-stamp.png"
                    alt=""
                    width={400}
                    height={400}
                  ></Image>
                )}
                <div className="relative z-10 m-[4rem] pb-32 pt-20 md:py-14 text-center font-bold text-amber-900 sm:m-[7rem] ">
                  <h1 className="text-[2rem] font-extrabold tracking-tight">{tugasData.judul}</h1>

                  <div className="items-center justify-center flex">
                    {tugasData.isTugasSpesial && <Badge>Misi spesial: tidak wajib dikerjakan</Badge>}
                  </div>
                  <p className="font-bold font-sans">
                    Deadline:{" "}
                    {tugasData.deadline?.toLocaleString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                  <p className="whitespace-pre-wrap text-justify overflow-auto misi-scrollbar max-h-[30vh]">{tugasData.body}</p>
                  <p className="whitespace-pre-wrap mt-6 text-center font-serif font-black overflow-auto misi-scrollbar max-h-[30vh]">
                    {tugasData.perintahMisi}
                  </p>
                  <div className="pt-4">
                    {tugasData.attachment && (
                      <Link
                        className="rounded bg-orange-950 px-10 py-3 font-roman font-semibold text-yellow-50 no-underline transition hover:bg-orange-700"
                        href={tugasData.attachment}
                      >
                        Attachment
                      </Link>
                    )}
                  </div>
                  <p className="pt-10 text-[1.2rem]">Upload</p>
                  <div>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target as HTMLFormElement);
                        const link = formData.get("link") as string;
                        await createSubmission({
                          tugasId: tugasData.id,
                          url: link,
                          filename: link,
                          key: undefined,
                        });
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
                      await createSubmission({
                        tugasId: tugasData.id,
                        url: res[0]!.url,
                        filename: res[0]!.name,
                        key: res[0]!.key,
                      });
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                  <div>
                    {tugasData.submissions?.map((submission) => (
                      <div className="flex flex-row justify-center self-center pb-2 gap-2" key={submission.id}>
                        <Link
                          className="grow overflow-auto misi-scrollbar text-nowrap hover:underline"
                          href={submission.submissionUrl as Url}
                        >
                          {submission.filename ? submission.filename : "file"}
                        </Link>
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="self-center px-4 py-2 sm:py-0 rounded bg-orange-800 font-semibold text-yellow-50 no-underline transition hover:bg-orange-700">
                              Delete
                            </button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Delete submisi?</DialogTitle>
                              <DialogDescription className="hyphens-auto">{submission.filename}</DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="sm:justify-start">
                              <DialogClose asChild>
                                <Button
                                  variant={"destructive"}
                                  onClick={async () => {
                                    await hideSubmission(submission.id);
                                  }}
                                >
                                  Delete
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="-z-100 ">
        <Image src="/day5_board(bottom).png" width={0} height={0} sizes="100vw" style={{ width: "100%", height: "auto" }} alt={""} />
      </div>
    </div>
  );
}

export function TugasListTabControlledCarousel() {
  const tabs = ["Sudah dinilai", "Mendatang", "etc."];
  const { data: carouselTugasData } = api.tugasPeserta.getCarouselTugasData.useQuery();

  const [activeTab, setActiveTab] = useState("0");
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const handleSelect = () => {
      setCurrent(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", handleSelect);

    return () => {
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    setActiveTab(current.toString());
  }, [current]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    carouselApi?.scrollTo(parseInt(value));
  };

  return (
    <div className=" md:mx-5 mx-0 ">
      <div className="flex justify-center text-center pb-2">
        <div className=" w-3/4 bg-amber-950 py-4 sm:py-5 rounded-3xl sm:rounded-t-full  text-3xl font-bluecashews">Papan Misi</div>
      </div>
      <CarouselTabs />
      <Carousel setApi={setCarouselApi}>
        <CarouselContent>
          {carouselTugasData?.map((tugasDatas, idx) => {
            return (
              <CarouselItem key={idx}>
                <div className="sm:px-5 overflow-auto no-scrollbar max-h-[200vh]" style={{}}>
                  <TugasListPeserta tugasDatas={tugasDatas} />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        {/* <CarouselPrevious className="bg-amber-900 hover:bg-orange-700" />
        <CarouselNext className="bg-amber-900 hover:bg-orange-700" /> */}
      </Carousel>
      <CarouselTabs />
    </div>
  );
  function CarouselTabs() {
    return (
      <div className="flex justify-center bg-amber-950 py-2 sm:py-4 sm:rounded-full">
        <Tabs value={activeTab} onValueChange={handleTabChange} className=" w-auto sm:w-3/4  ">
          <TabsList className="grid grid-cols-3 bg-amber-900 p-2 h-auto gap-2">
            {tabs.map((item, idx) => (
              <TabsTrigger
                key={idx}
                value={`${idx}`}
                className=" sm:text-lg md:text-2xl data-[state=active]:bg-orange-700/80 data-[state=active]:text-white text-orange-500 hover:bg-orange-700/40 font-black "
              >
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    );
  }
}
