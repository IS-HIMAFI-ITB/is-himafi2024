"use client";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
export const SynchronizeSheetsCMS = () => {
  const synchronizeSheetsData = api.sheetsCMS.synchronizeSheetsData.useMutation();
  return (
    <button
      onClick={async () => {
        try {
          await synchronizeSheetsData.mutateAsync();
          toast({
            title: "Success",
            description: "synchronization successful",
          });
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
    </button>
  );
};
