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

export function PerizinanInput() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });

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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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

  const [formcontent, setFormcontent] = useState({
    kehadiran: "",
    jenis: undefined,
    alasan: undefined,
    bukti: undefined,
  });
  const [timeMenyusul, setTimeMenyusul] = useState<Date | undefined>(undefined);
  const [timeMeninggalkan, setTimeMeninggalkan] = useState<Date | undefined>(undefined);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formcontent, timeMenyusul, timeMeninggalkan);
    try {
      const dayId = 0;
      await createPerizinan.mutateAsync({
        dayId: dayId,
        kehadiran: formcontent.kehadiran as kehadiranType,
        jenisIzin: formcontent.jenis as jenisIzinType | undefined,
        alasanIzin: formcontent.alasan,
        buktiIzin: formcontent.bukti,
        kapanMenyusul: timeMenyusul,
        kapanMeninggalkan: timeMeninggalkan,
      });
      toast({
        title: "Success",
        description: "form submitted",
      });
      setFormcontent({ kehadiran: "", jenis: "", alasan: "", bukti: "" });
      setTimeMenyusul(undefined);
      setTimeMeninggalkan(undefined);
    } catch (error) {
      console.log(error);
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
              kehadiran: value,
            })
          }
        >
          <SelectTrigger className="w-[full]">
            <SelectValue placeholder="Kehadiran" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Kehadiran</SelectLabel>
              <SelectItem value="HADIR">Hadir</SelectItem>
              <SelectItem value="MENYUSUL">Menyusul</SelectItem>
              <SelectItem value="MENINGGALKAN">Meninggalkan</SelectItem>
              <SelectItem value="MENYUSUL_DAN_MENINGGALKAN">Menyusul dan Meninggalkan</SelectItem>
              <SelectItem value="TIDAK_HADIR">Tidak Hadir</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {!["HADIR", ""].includes(formcontent.kehadiran) && (
        <React.Fragment>
          <div className="grid gap-2">
            <Select
              onValueChange={(value) =>
                setFormcontent({
                  ...formcontent,
                  jenis: value,
                })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Jenis Izin" />
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
            />
          </div>
          {["MENYUSUL_DAN_MENINGGALKAN", "MENYUSUL"].includes(formcontent.kehadiran) && (
            <div className="grid gap-2">
              <Label>Kapan Menyusul</Label>
              <TimePicker date={timeMenyusul} onChange={setTimeMenyusul} />
            </div>
          )}

          {["MENYUSUL_DAN_MENINGGALKAN", "MENINGGALKAN"].includes(formcontent.kehadiran) && (
            <div className="grid gap-2">
              <Label>Kapan Meninggalkan</Label>
              <TimePicker date={timeMeninggalkan} onChange={setTimeMeninggalkan} />
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
