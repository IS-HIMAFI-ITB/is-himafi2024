"use client";
import { api } from "~/trpc/react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { TimePicker } from "@/components/ui/datetime-picker";
import { useToast } from "@/components/ui/use-toast";

import { kehadiranType } from "@prisma/client";
import { jenisIzinType } from "@prisma/client";
import { fisikType } from "@prisma/client";
import { skipToken } from "@tanstack/react-query";
import { date } from "zod";
import { Badge } from "~/components/ui/badge";
import { Checkbox } from "~/components/ui/checkbox";

export function PerizinanInput() {
  const [open, setOpen] = React.useState(false);
  const getIsAcceptingPerizinan = api.perizinan.getIsAcceptingPerizinan.useQuery();
  const isAcceptingPerizinan = getIsAcceptingPerizinan.data;
  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  if (!isAcceptingPerizinan) {
    return;
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Kehadiran & Perizinan</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Kehadiran & Perizinan</DialogTitle>
            {/* <DialogDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </DialogDescription> */}
          </DialogHeader>
          <PerizinanForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="default">Kehadiran & Perizinan</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Kehadiran & Perizinan</DrawerTitle>
          {/* <DrawerDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </DrawerDescription> */}
        </DrawerHeader>
        <PerizinanForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function PerizinanForm({ className }: React.ComponentProps<"form">) {
  const { toast } = useToast();
  const createPerizinan = api.perizinan.createPerizinan.useMutation();
  const getCurrentDayId = api.perizinan.getCurrentDayId.useQuery();
  const dayId = getCurrentDayId.data!;
  const getPerizinan = api.perizinan.getPerizinan.useQuery({ dayId: dayId });
  const perizinan = getPerizinan.data;

  const [formcontent, setFormcontent] = useState({
    kehadiran: perizinan?.kehadiran ? perizinan.kehadiran : undefined,
    jenis: perizinan?.jenisIzin ? perizinan.jenisIzin : undefined,
    alasan: perizinan?.alasanIzin ? perizinan.alasanIzin : "",
    bukti: perizinan?.buktiIzin ? perizinan.buktiIzin : "",
    isBuktiNyusul: perizinan?.isBuktiNyusul ? perizinan.isBuktiNyusul : false,
    timeMenyusul: perizinan?.kapanMenyusul ? new Date(perizinan.kapanMenyusul) : undefined,
    timeMeninggalkan: perizinan?.kapanMeninggalkan ? new Date(perizinan.kapanMeninggalkan) : undefined,
  });
  // const [timeMenyusul, setTimeMenyusul] = useState(perizinan?.kapanMenyusul ? new Date(perizinan.kapanMenyusul) : undefined);
  // const [timeMeninggalkan, setTimeMeninggalkan] = useState(
  //   perizinan?.kapanMeninggalkan ? new Date(perizinan.kapanMeninggalkan) : undefined,
  // );
  // const [isBuktiNyusul, setIsBuktiNyusul] = useState(perizinan?.isBuktiNyusul ? perizinan.isBuktiNyusul : false);

  // const [formcontent, setFormcontent] = useState({
  //   kehadiran: "",
  //   jenis: undefined as undefined | string,
  //   alasan: "",
  //   bukti: "",
  // });
  // const [timeMenyusul, setTimeMenyusul] = useState<Date | undefined>(undefined);
  // const [timeMeninggalkan, setTimeMeninggalkan] = useState<Date | undefined>(undefined);

  // if (perizinan) {
  //   setFormcontent({
  //     kehadiran: perizinan.kehadiran ? perizinan.kehadiran : "",
  //     jenis: perizinan.jenisIzin ? perizinan.jenisIzin : undefined,
  //     alasan: perizinan.alasanIzin ? perizinan.alasanIzin : "",
  //     bukti: perizinan.buktiIzin ? perizinan.buktiIzin : "",
  //   });
  //   setTimeMenyusul(perizinan.kapanMenyusul ? new Date(perizinan.kapanMenyusul) : undefined);
  //   setTimeMeninggalkan(perizinan.kapanMeninggalkan ? new Date(perizinan.kapanMeninggalkan) : undefined);
  // }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formcontent);
    try {
      (document.getElementById("btn-submit") as HTMLButtonElement).disabled = true;
      await createPerizinan.mutateAsync({
        dayId: dayId,
        kehadiran: formcontent.kehadiran!,
        jenisIzin: formcontent.jenis,
        alasanIzin: formcontent.alasan,
        buktiIzin: formcontent.bukti,
        kapanMenyusul: ["MENYUSUL", "MENYUSUL_DAN_MENINGGALKAN"].includes(formcontent.kehadiran!) ? formcontent.timeMenyusul : undefined,
        kapanMeninggalkan: ["MENINGGALKAN", "MENYUSUL_DAN_MENINGGALKAN"].includes(formcontent.kehadiran!)
          ? formcontent.timeMeninggalkan
          : undefined,
        isBuktiNyusul: formcontent.isBuktiNyusul,
      });
      (document.getElementById("btn-submit") as HTMLButtonElement).disabled = false;
      toast({
        title: "Success",
        description: "form submitted",
      });
      // setFormcontent({ kehadiran: undefined, jenis: undefined, alasan: "", bukti: "" });
      // setTimeMenyusul(undefined);
      // setTimeMeninggalkan(undefined);
    } catch (error) {
      console.log(error);
      (document.getElementById("btn-submit") as HTMLButtonElement).disabled = false;
      toast({
        title: "Error",
        description: "submission failed",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Select
          onValueChange={(value) =>
            setFormcontent({
              ...formcontent,
              kehadiran: value as kehadiranType,
            })
          }
          required={true}
          defaultValue={formcontent.kehadiran}
        >
          <SelectTrigger className="w-[full]">
            <SelectValue placeholder="Kehadiran" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Kehadiran</SelectLabel>
              <SelectItem value={kehadiranType.HADIR}>Hadir</SelectItem>
              <SelectItem value={kehadiranType.MENYUSUL}>Menyusul</SelectItem>
              <SelectItem value={kehadiranType.MENINGGALKAN}>Meninggalkan</SelectItem>
              <SelectItem value={kehadiranType.MENYUSUL_DAN_MENINGGALKAN}>Menyusul dan Meninggalkan</SelectItem>
              <SelectItem value={kehadiranType.TIDAK_HADIR}>Tidak Hadir</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {!["HADIR", undefined].includes(formcontent.kehadiran) && (
        <React.Fragment>
          <div className="grid gap-2">
            <Select
              onValueChange={(value) =>
                setFormcontent({
                  ...formcontent,
                  jenis: value as jenisIzinType,
                })
              }
              required={true}
              defaultValue={formcontent.jenis}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Jenis izin" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Jenis Izin</SelectLabel>
                  <SelectItem value="LEMBAGA">Lembaga</SelectItem>
                  <SelectItem value="AGAMA">Agama</SelectItem>
                  <SelectItem value="AKADEMIK">Akademik</SelectItem>
                  <SelectItem value="KELUARGA">Keluarga</SelectItem>
                  <SelectItem value="SAKIT">Sakit</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="alasanIzin">Alasan Izin</Label>
            <Input
              type="text"
              id="alasan"
              placeholder="Alasan izin"
              value={formcontent.alasan}
              onChange={({ target }) =>
                setFormcontent({
                  ...formcontent,
                  alasan: target.value,
                })
              }
              required={true}
            />
          </div>
          {["MENYUSUL_DAN_MENINGGALKAN", "MENYUSUL"].includes(formcontent.kehadiran!) && (
            <div className="grid gap-2">
              <Label>Kapan Menyusul</Label>
              <TimePicker date={formcontent.timeMenyusul} onChange={(target) => setFormcontent({ ...formcontent, timeMenyusul: target })} />
            </div>
          )}

          {["MENYUSUL_DAN_MENINGGALKAN", "MENINGGALKAN"].includes(formcontent.kehadiran!) && (
            <div className="grid gap-2">
              <Label>Kapan Meninggalkan</Label>
              <TimePicker
                date={formcontent.timeMeninggalkan}
                onChange={(target) => setFormcontent({ ...formcontent, timeMeninggalkan: target })}
              />
            </div>
          )}
          {!formcontent.isBuktiNyusul && (
            <div className="grid gap-2">
              <Label htmlFor="buktiIzin">Bukti Izin</Label>
              <Input
                type="text"
                id="bukti"
                placeholder="Link bukti perizinan"
                value={formcontent.bukti}
                onChange={({ target }) =>
                  setFormcontent({
                    ...formcontent,
                    bukti: target.value,
                  })
                }
                required={true}
              />
            </div>
          )}

          <div className="grid gap-2">
            <div className="items-top flex space-x-2">
              <Checkbox
                id="terms1"
                checked={formcontent.isBuktiNyusul}
                onCheckedChange={(checked) => setFormcontent({ ...formcontent, isBuktiNyusul: checked === true })}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Bukti Menyusul
                </label>
                <p className="text-sm text-muted-foreground">Perizinan berstatus bersyarat apabila bukti menyusul</p>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
      {perizinan ? (
        <Button id="btn-submit" type="submit">
          Resubmit
        </Button>
      ) : (
        <Button id="btn-submit" type="submit">
          Submit
        </Button>
      )}
    </form>
  );
}

export function PerizinanBuktiMenyusulInput() {
  const dayId = api.perizinan.getCurrentDayId.useQuery().data!;
  const perizinan = api.perizinan.getPerizinan.useQuery({ dayId: dayId }).data;
  const isBuktiNyusul = perizinan?.isBuktiNyusul;
  const [open, setOpen] = React.useState(false);
  if (isBuktiNyusul) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Bukti menyusul</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Bukti perizinan</DialogTitle>
          </DialogHeader>
          <PerizinanBuktiMenyusulForm />
        </DialogContent>
      </Dialog>
    );
  } else return;
}

function PerizinanBuktiMenyusulForm({ className }: React.ComponentProps<"form">) {
  const { toast } = useToast();
  const updatePerizinanBuktiMenyusul = api.perizinan.updatePerizinanBuktiMenyusul.useMutation();
  const getCurrentDayId = api.perizinan.getCurrentDayId.useQuery();
  const dayId = getCurrentDayId.data!;

  const [buktiIzin, setBuktiIzin] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(buktiIzin);
    try {
      (document.getElementById("btn-submit") as HTMLButtonElement).disabled = true;
      await updatePerizinanBuktiMenyusul.mutateAsync({
        dayId: dayId,
        buktiIzin: buktiIzin,
      });
      (document.getElementById("btn-submit") as HTMLButtonElement).disabled = false;
      toast({
        title: "Success",
        description: "form submitted",
      });
    } catch (error) {
      console.log(error);
      (document.getElementById("btn-submit") as HTMLButtonElement).disabled = false;
      toast({
        title: "Error",
        description: "submission failed",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="buktiIzin">Bukti Izin</Label>
        <Input
          type="text"
          id="bukti"
          placeholder="Link bukti perizinan"
          value={buktiIzin}
          onChange={({ target }) => setBuktiIzin(target.value)}
          required={true}
        />
      </div>

      <Button id="btn-submit" type="submit">
        Submit
      </Button>
    </form>
  );
}

export function PerizinanStatus() {
  const getCurrentDayId = api.perizinan.getCurrentDayId.useQuery();
  const dayId = getCurrentDayId.data;
  const getPerizinan = api.perizinan.getPerizinan.useQuery(dayId ? { dayId: dayId } : skipToken);
  const getStatusIzin = api.perizinan.getStatusIzin.useQuery(dayId ? { dayId: dayId } : skipToken);
  const statusIzin = getStatusIzin.data;
  const perizinan = getPerizinan.data;
  if (!getPerizinan || perizinan?.kehadiran === "HADIR") return;
  switch (statusIzin) {
    case "DITOLAK":
      return (
        <div>
          <div className="flex flex-row items-middle">
            <p className="font-bluecashews  px-2 text-l font-black">Status perizinan: </p>
            <Badge variant="destructive">{statusIzin}</Badge>
          </div>
          <div>
            <p className="text-left">
              <span className="font-bluecashews pb-1 text-l font-bold">Alasan ditolak: </span>
              {perizinan?.alasanStatusDitolak}{" "}
            </p>
          </div>
        </div>
      );
    case "DITERIMA":
      return (
        <div className="flex flex-row items-middle">
          <p className="font-bluecashews px-2  text-l font-black">Status perizinan: </p>
          <Badge>{perizinan?.isBuktiNyusul ? "DITERIMA BERSYARAT" : statusIzin}</Badge>
        </div>
      );
    case "PENDING":
      return (
        <div className="flex flex-row items-middle">
          <p className="font-bluecashews px-2  text-l font-black">Status perizinan: </p>
          <Badge variant="secondary">{statusIzin}</Badge>
        </div>
      );
  }
}
