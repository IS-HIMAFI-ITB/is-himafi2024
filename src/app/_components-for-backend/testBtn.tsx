"use client";
import { Button } from "~/components/ui/button";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
export const TestBtn = () => {
  const action1 = api.sheetsCMSTugas.getSheetsData.useQuery({ sheetName: "TUGAS1" });
  const action2 = api.sheetsCMSTugas.createSheet.useMutation();
  return (
    <div className="grid grid-cols-1 gap-10">
      <h1>{action1.data}</h1>
      {/* <Button
        id="btn1"
        onClick={async () => {
          try {
            (document.getElementById("btn1") as HTMLButtonElement).disabled = true;
            await action1();
            toast({
              title: "Success",
              description: "action1 successful",
            });
            (document.getElementById("btn1") as HTMLButtonElement).disabled = false;
          } catch (error) {
            console.log(error);
            toast({
              title: "Error",
              description: "check console for more info",
            });
          }
        }}
      >
        action1
      </Button> */}
      <Button
        id="btn2"
        onClick={async () => {
          try {
            (document.getElementById("btn2") as HTMLButtonElement).disabled = true;
            await action2.mutateAsync({ sheetName: "Tugas 2" });
            toast({
              title: "Success",
              description: "action2 successful",
            });
            (document.getElementById("btn2") as HTMLButtonElement).disabled = false;
          } catch (error) {
            console.log(error);
            toast({
              title: "Error",
              description: "check console for more info",
            });
          }
        }}
      >
        action2
      </Button>
    </div>
  );
};
