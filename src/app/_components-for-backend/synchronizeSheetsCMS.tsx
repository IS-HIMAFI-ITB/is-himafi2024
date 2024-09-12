"use client";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { api } from "~/trpc/react";
export const SynchronizeSheetsCMSPerizinan = () => {
  const synchronizeSheetsData = api.sheetsCMS.synchronizeSheetsData.useMutation();
  return (
    <Button
      className="relative justify-center items-center flex flex-auto rounded-full bg-black px-10 py-7 font-semibold no-underline transition hover:bg-slate-700 text-md"
      id="btn-synchronize-day"
      onClick={async () => {
        const toastLoading = toast.loading("Synchronizing...", { duration: Infinity });
        try {
          (document.getElementById("btn-synchronize-day") as HTMLButtonElement).disabled = true;
          await synchronizeSheetsData.mutateAsync();
          toast.dismiss(toastLoading);
          toast.success("synchronization successful");
          (document.getElementById("btn-synchronize-day") as HTMLButtonElement).disabled = false;
        } catch (error) {
          console.log(error);
          toast.dismiss(toastLoading);
          toast.error("Error", { description: "Refer console for more info" });
        }
      }}
    >
      synchronize sheets with database
    </Button>
  );
};

export const SynchronizeSheetsCMSTugas = () => {
  const synchronizeSheetsData = api.sheetsCMSTugas.synchronizeSheetsData.useMutation();
  return (
    <Button
      className="relative justify-center items-center flex flex-auto rounded-full bg-black px-10 py-7 font-semibold no-underline transition hover:bg-slate-700 text-md"
      id="btn-synchronize-tugas"
      onClick={async () => {
        const toastLoading = toast.loading("Synchronizing...", { duration: Infinity });
        try {
          (document.getElementById("btn-synchronize-tugas") as HTMLButtonElement).disabled = true;
          await synchronizeSheetsData.mutateAsync();
          toast.dismiss(toastLoading);
          toast.success("synchronization successful");
          (document.getElementById("btn-synchronize-tugas") as HTMLButtonElement).disabled = false;
        } catch (error) {
          console.log(error);
          toast.dismiss(toastLoading);
          toast.error("Error", { description: "Refer console for more info" });
        }
      }}
    >
      synchronize sheets with database
    </Button>
  );
};
