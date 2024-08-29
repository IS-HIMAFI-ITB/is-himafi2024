"use client";
import { Button } from "~/components/ui/button";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
export const SynchronizeSheetsCMS = () => {
  const synchronizeSheetsData = api.sheetsCMS.synchronizeSheetsData.useMutation();
  return (
    <Button
      className="relative justify-center items-center flex flex-auto rounded-full bg-black px-10 py-7 font-semibold no-underline transition hover:bg-slate-700 text-md"
      id="btn-synchronize"
      onClick={async () => {
        try {
          (document.getElementById("btn-synchronize") as HTMLButtonElement).disabled = true;
          await synchronizeSheetsData.mutateAsync();
          toast({
            title: "Success",
            description: "synchronization successful",
          });
          (document.getElementById("btn-synchronize") as HTMLButtonElement).disabled = false;
        } catch (error) {
          console.log(error);
          toast({
            title: "Error",
            description: "check console for more info",
          });
        }
      }}
    >
      synchronize sheets with database
    </Button>
  );
};
