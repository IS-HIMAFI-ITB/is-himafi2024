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
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import { fisikType } from "@prisma/client";

export function KondisiPraDayInput() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Kondisi pra-day</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Kondisi pra-day</DialogTitle>
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
        <Button variant="outline">Kondisi pra-day</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Kondisi pra-day</DrawerTitle>
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
  const createKondisiMassa = api.perizinan.createKondisiMassa.useMutation();
  const { toast } = useToast();

  const [formcontent, setFormcontent] = useState({
    fisik: "",
    deskripsi: "",
    kesiapan: 50,
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formcontent);
    try {
      const dayId = 0;
      await createKondisiMassa.mutateAsync({
        dayId: dayId,
        fisik: formcontent.fisik as fisikType,
        deskripsi: formcontent.deskripsi,
        kesiapan: formcontent.kesiapan,
      });
      toast({
        title: "Success",
        description: "form submitted",
      });
      setFormcontent({ fisik: "", deskripsi: "", kesiapan: formcontent.kesiapan });
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
        <Select onValueChange={(value) => setFormcontent({ ...formcontent, fisik: value })}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Kondisi Fisik" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Kondisi Fisik</SelectLabel>
              <SelectItem value="SEHAT">Sehat</SelectItem>
              <SelectItem value="KURANG_SEHAT">Kurang Sehat</SelectItem>
              <SelectItem value="SAKIT">Sakit</SelectItem>
              <SelectItem value="BARU_PULIH">Baru Pulih</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {!["SEHAT", ""].includes(formcontent.fisik) && (
        <div className="grid gap-2">
          <Label htmlFor="deskripsi">Deskripsi Kondisi</Label>
          <Input
            type="text"
            id="deskripsi"
            placeholder="Deskripsikan Kondisimu"
            value={formcontent.deskripsi}
            onChange={({ target }) => setFormcontent({ ...formcontent, deskripsi: target.value })}
          />
        </div>
      )}
      <div className="grid gap-2">
        <Label>Seberapa siap kamu menghadapi day?</Label>
        <Slider
          value={[formcontent.kesiapan]}
          max={100}
          step={1}
          onValueChange={(value) =>
            setFormcontent({
              ...formcontent,

              kesiapan: value[0]!,
            })
          }
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
