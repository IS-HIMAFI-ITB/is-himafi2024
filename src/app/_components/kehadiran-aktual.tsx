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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "~/components/ui/badge";

export function KehadiranInput() {
  const isHadirAbsensi = api.perizinan.getStatusHadirAbsensi.useQuery().data?.isHadirAbsensi;
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });
  if (isHadirAbsensi) {
    return;
  }
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Kehadiran aktual</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Kehadiran aktual</DialogTitle>
            <DialogDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </DialogDescription>
          </DialogHeader>
          <KehadiranForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="default">Kehadiran aktual</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Kehadiran aktual</DrawerTitle>
          <DrawerDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </DrawerDescription>
        </DrawerHeader>
        <KehadiranForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function KehadiranForm({ className }: React.ComponentProps<"form">) {
  const { toast } = useToast();
  const hadirAktual = api.perizinan.hadirAktual.useMutation();
  const { data: statusHadirAbsensi, refetch: refetchStatusHadirAbsensi } = api.perizinan.getStatusHadirAbsensi.useQuery();
  const isHadirAbsensi = statusHadirAbsensi?.isHadirAbsensi;

  const [formcontent, setFormcontent] = useState({
    password: "",
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      (document.getElementById("btn-submit") as HTMLButtonElement).disabled = true;
      await hadirAktual.mutateAsync({
        password: formcontent.password,
      });

      await refetchStatusHadirAbsensi();
      (document.getElementById("btn-submit") as HTMLButtonElement).disabled = false;
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
        <Label htmlFor="pass">Password akan diberikan oleh panitia</Label>
        <Input
          type="text"
          id="pass"
          placeholder="Password"
          value={formcontent.password}
          onChange={({ target }) =>
            setFormcontent({
              ...formcontent,
              password: target.value,
            })
          }
          required={true}
        />
      </div>
      {
        <Button id="btn-submit" type="submit">
          Submit
        </Button>
      }
    </form>
  );
}

export function HadirAktualStatus() {
  const isHadirAbsensi = api.perizinan.getStatusHadirAbsensi.useQuery().data?.isHadirAbsensi;

  if (isHadirAbsensi) {
    return <Badge>Kehadiran aktual tercatat</Badge>;
  } else {
    return <Badge variant="destructive">Kehadiran aktual belum tercatat</Badge>;
  }
}
