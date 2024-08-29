"use client";

import * as React from "react";
import { useState } from "react";
import { api } from "~/trpc/react";
import { FormEvent } from "react";
import { toast } from "~/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";
import { cn } from "~/lib/utils";

import { useMediaQuery } from "react-responsive";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import { fisikType } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";

export function CreateDayForm() {
  const [formcontent, setFormcontent] = useState({ name: "", sheetsCMSId: "", passwordAbsensi: "" });
  const createDay = api.perizinan.createDay.useMutation();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createDay.mutateAsync({
        name: formcontent.name,
        sheetsCMSId: formcontent.sheetsCMSId,
        passwordAbsensi: formcontent.passwordAbsensi,
      });
      toast({
        title: "Success",
        description: "form submitted",
      });
      setFormcontent({
        name: "",
        sheetsCMSId: "",
        passwordAbsensi: "",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "submission failed, check console for more info",
      });
    }
  };

  return (
    <div className="bg-violet-100 py-5 content-center container w-full max-w-xs border border-violet-400 rounded-lg drop-shadow-md size-full">
      <h1 className="relative text-5xl font-extrabold text-violet-700 z-20">Create Day</h1>
      <div className="absolute -inset-2 z-0">
        <div className="w-full h-full max-w-sm mx-auto lg:mx-0 opacity-30 blur-lg bg-gradient-to-r from-violet-400 via-pink-500 to-violet-600"></div>
      </div>
      <form onSubmit={handleSubmit} className="z-10 relative flex flex-col gap-4 mt-10 items-center justify-center text-[hsl(0,0,0)]">
        <Input
          value={formcontent.name}
          onChange={({ target }) => setFormcontent({ ...formcontent, name: target.value })}
          type="text"
          placeholder="Name"
          required={true}
        />
        <Input
          value={formcontent.sheetsCMSId}
          onChange={({ target }) => setFormcontent({ ...formcontent, sheetsCMSId: target.value })}
          type="text"
          placeholder="SheetsCMSId"
          required={true}
        />
        <Input
          value={formcontent.passwordAbsensi}
          onChange={({ target }) => setFormcontent({ ...formcontent, passwordAbsensi: target.value })}
          type="text"
          placeholder="PasswordAbsensi"
          required={true}
        />
        <Button
          className="z-10 text-violet-100 text-xl bg-black rounded-xl px-5 py-auto hover:cursor-pointer hover:bg-slate-700 transition duration-300 ease-in-out"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export function ChooseDay() {
  const { data: days, refetch: refetchDays } = api.perizinan.getAllDay.useQuery();
  const isAcceptingPerizinanTrue = api.perizinan.isAcceptingPerizinanTrue.useMutation();
  const isAcceptingPerizinanFalse = api.perizinan.isAcceptingPerizinanFalse.useMutation();
  const updateCurrentDay = api.perizinan.updateCurrentDay.useMutation();
  const [currentDayId, setCurrentDayId] = useState<number | undefined>(0);
  async function RefetchCurrentDay() {
    await refetchDays();
    if (!days) return <div>no day in database</div>;
    setCurrentDayId(days.find((day) => day.isCurrent)?.id);
    if (!currentDayId) return <div>no current day in database</div>;
  }
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateCurrentDay.mutateAsync({ dayId: currentDayId! });
      await RefetchCurrentDay();

      toast({
        title: "Success",
        description: "day updated",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "check console for more info",
      });
    }
  };
  return (
    <div className="bg-violet-100 container w-full max-w-xs py-5 bg-blend-screen border border-violet-400 rounded-lg drop-shadow-md">
      <div className="absolute -inset-2 z-0">
        <div className="z-0 w-full h-full max-w-sm mx-auto lg:mx-0 opacity-30 blur-lg bg-gradient-to-r from-violet-400 via-pink-500 to-violet-600"></div>
      </div>
      <h1 className="relative text-5xl font-extrabold text-violet-700 z-20">Update Day</h1>
      <form onSubmit={handleSubmit} className={cn("mt-5 z-10 grid items-start gap-4")}>
        <div className="z-20 grid gap-2">
          <Select onValueChange={(value) => setCurrentDayId(parseInt(value))}>
            <SelectTrigger className="w-[180px] text-black">
              <SelectValue placeholder="Set Current Day" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Day:</SelectLabel>
                {days?.map((day) => (
                  <SelectItem key={day.id} value={day.id.toString()}>
                    {day.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="z-10 text-violet-100 text-xl bg-black rounded-xl px-5 py-auto hover:cursor-pointer hover:bg-slate-700 transition duration-300 ease-in-out"
          type="submit"
        >
          Update Day
        </Button>
      </form>
      <div className="z-10 grid relative gap-2 mt-5 text-pretty">
        <div className="text-violet-800 grid gap-2">id: {days?.find((day) => day.isCurrent)?.id}</div>
        <div className="text-violet-800 grid gap-2">current day: {days?.find((day) => day.isCurrent)?.name}</div>
        <div className="text-violet-800 grid gap-2">sheetsCMSId: {days?.find((day) => day.isCurrent)?.sheetsCMSId}</div>
        <div className="text-violet-800 grid gap-2">passwordAbsensi: {days?.find((day) => day.isCurrent)?.passwordAbsensi}</div>
        <div className="text-violet-800 grid gap-2">
          isAcceptingPerizinan: {days?.find((day) => day.isCurrent)?.isAcceptingPerizinan ? "true" : "false"}
        </div>
      </div>
      <div className="relative z-20 flex gap-4 mt-5">
        <button
          className="text-violet-100  bg-black rounded-xl px-5 py-auto hover:cursor-pointer hover:bg-slate-700 transition duration-300 ease-in-out"
          onClick={async () => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            await isAcceptingPerizinanFalse.mutateAsync({ dayId: days?.find((day) => day.isCurrent)?.id! });
            void RefetchCurrentDay();
          }}
        >
          Close Perizinan
        </button>
        <br />
        <button
          className="text-violet-100 bg-black rounded-xl px-5 py-auto hover:cursor-pointer hover:bg-slate-700 transition duration-300 ease-in-out"
          onClick={async () => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            await isAcceptingPerizinanTrue.mutateAsync({ dayId: days?.find((day) => day.isCurrent)?.id! });
            void RefetchCurrentDay();
          }}
        >
          Open Perizinan
        </button>
      </div>
      <br />
      <div className="my-4 justify-center items-center flex flex-auto rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20">
        <Link href={`https://docs.google.com/spreadsheets/d/${days?.find((day) => day.isCurrent)?.sheetsCMSId}`}>
          Sheets news & perizinan
        </Link>
      </div>
    </div>
  );
}
