"use client";
import { api } from "~/trpc/react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export function PerizinanInput() {
  const [open, setOpen] = React.useState(false);
  const getIsAcceptingPerizinan =
    api.perizinan.getIsAcceptingPerizinan.useQuery();
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
          <Button variant="outline">Kehadiran & Perizinan</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Kehadiran & Perizinan</DialogTitle>
            <DialogDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </DialogDescription>
          </DialogHeader>
          <PerizinanForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Kehadiran & Perizinan</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Kehadiran & Perizinan</DrawerTitle>
          <DrawerDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </DrawerDescription>
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
  });
  const [timeMenyusul, setTimeMenyusul] = useState(
    perizinan?.kapanMenyusul ? new Date(perizinan.kapanMenyusul) : undefined,
  );
  const [timeMeninggalkan, setTimeMeninggalkan] = useState(
    perizinan?.kapanMeninggalkan
      ? new Date(perizinan.kapanMeninggalkan)
      : undefined,
  );

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
    try {
      await createPerizinan.mutateAsync({
        dayId: dayId,
        kehadiran: formcontent.kehadiran!,
        jenisIzin: formcontent.jenis,
        alasanIzin: formcontent.alasan,
        buktiIzin: formcontent.bukti,
        kapanMenyusul: ["MENYUSUL", "MENYUSUL_DAN_MENINGGALKAN"].includes(
          formcontent.kehadiran!,
        )
          ? timeMenyusul
          : undefined,
        kapanMeninggalkan: [
          "MENINGGALKAN",
          "MENYUSUL_DAN_MENINGGALKAN",
        ].includes(formcontent.kehadiran!)
          ? timeMeninggalkan
          : undefined,
      });
      toast({
        title: "Success",
        description: "form submitted",
      });
      // setFormcontent({ kehadiran: undefined, jenis: undefined, alasan: "", bukti: "" });
      // setTimeMenyusul(undefined);
      // setTimeMeninggalkan(undefined);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "submission failed",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="grid gap-2">
        <Select
          onValueChange={(value) =>
            setFormcontent({
              ...formcontent,
              kehadiran: value as kehadiranType,
            })
          }
        >
          <SelectTrigger className="w-[full]">
            <SelectValue placeholder={formcontent.kehadiran} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Kehadiran</SelectLabel>
              <SelectItem value={kehadiranType.HADIR}>Hadir</SelectItem>
              <SelectItem value={kehadiranType.MENYUSUL}>Menyusul</SelectItem>
              <SelectItem value={kehadiranType.MENINGGALKAN}>
                Meninggalkan
              </SelectItem>
              <SelectItem value={kehadiranType.MENYUSUL_DAN_MENINGGALKAN}>
                Menyusul dan Meninggalkan
              </SelectItem>
              <SelectItem value={kehadiranType.TIDAK_HADIR}>
                Tidak Hadir
              </SelectItem>
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
              required
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={formcontent.jenis} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    Jenis Izin <span className="text-red-500">*</span>
                  </SelectLabel>
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
            />
          </div>
          {["MENYUSUL_DAN_MENINGGALKAN", "MENYUSUL"].includes(
            formcontent.kehadiran!,
          ) && (
            <div className="grid gap-2">
              <Label>Kapan Menyusul</Label>
              <TimePicker date={timeMenyusul} onChange={setTimeMenyusul} />
            </div>
          )}

          {["MENYUSUL_DAN_MENINGGALKAN", "MENINGGALKAN"].includes(
            formcontent.kehadiran!,
          ) && (
            <div className="grid gap-2">
              <Label>Kapan Meninggalkan</Label>
              <TimePicker
                date={timeMeninggalkan}
                onChange={setTimeMeninggalkan}
              />
            </div>
          )}

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
            />
          </div>
        </React.Fragment>
      )}
      <Button type="submit">Submit</Button>
    </form>
  );
}
export function PerizinanStatus() {
  const getCurrentDayId = api.perizinan.getCurrentDayId.useQuery();
  const dayId = getCurrentDayId.data;
  const getPerizinan = api.perizinan.getPerizinan.useQuery(
    dayId ? { dayId: dayId } : skipToken,
  );
  const getStatusIzin = api.perizinan.getStatusIzin.useQuery(
    dayId ? { dayId: dayId } : skipToken,
  );
  const statusIzin = getStatusIzin.data;
  const perizinan = getPerizinan.data;
  if (!getPerizinan || perizinan?.kehadiran === "HADIR") return;
  return <div>{statusIzin}</div>;
  //make this use shadcnui badge
}
