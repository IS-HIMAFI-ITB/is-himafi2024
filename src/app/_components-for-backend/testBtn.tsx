"use client";
import { Button } from "~/components/ui/button";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
export const TestBtn = () => {
  const action1 = api.sheetsCMSTugas.getSheetsData.useMutation();
  const action2 = api.sheetsCMSTugas.createSheets.useMutation();
  const action3 = api.sheetsCMSTugas.writeSubmissionsToSheet.useMutation();
  const action4 = api.sheetsCMSTugas.updateScoresToDB.useMutation();
  return (
    <div className="grid grid-cols-1 gap-10">
      <Button
        id="btn1"
        onClick={async () => {
          try {
            (document.getElementById("btn1") as HTMLButtonElement).disabled = true;
            await action1.mutateAsync();
            toast({
              title: "Success",
              description: "action1 successful",
            });
            (document.getElementById("btn1") as HTMLButtonElement).disabled = false;
          } catch (error) {
            (document.getElementById("btn1") as HTMLButtonElement).disabled = false;
            console.log(error);
            toast({
              title: "Error",
              description: "check console for more info",
            });
          }
        }}
      >
        action1
      </Button>
      <Button
        id="btn2"
        onClick={async () => {
          try {
            (document.getElementById("btn2") as HTMLButtonElement).disabled = true;
            await action2.mutateAsync();
            toast({
              title: "Success",
              description: "action2 successful",
            });
            (document.getElementById("btn2") as HTMLButtonElement).disabled = false;
          } catch (error) {
            (document.getElementById("btn2") as HTMLButtonElement).disabled = false;
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
      <Button
        id="btn3"
        onClick={async () => {
          try {
            (document.getElementById("btn3") as HTMLButtonElement).disabled = true;
            await action3.mutateAsync();
            toast({
              title: "Success",
              description: "action successful",
            });
            (document.getElementById("btn3") as HTMLButtonElement).disabled = false;
          } catch (error) {
            (document.getElementById("btn3") as HTMLButtonElement).disabled = false;
            console.log(error);
            toast({
              title: "Error",
              description: "check console for more info",
            });
          }
        }}
      >
        action3
      </Button>
      <Button
        id="btn4"
        onClick={async () => {
          try {
            (document.getElementById("btn4") as HTMLButtonElement).disabled = true;
            await action4.mutateAsync();
            toast({
              title: "Success",
              description: "action successful",
            });
            (document.getElementById("btn4") as HTMLButtonElement).disabled = false;
          } catch (error) {
            (document.getElementById("btn4") as HTMLButtonElement).disabled = false;
            console.log(error);
            toast({
              title: "Error",
              description: "check console for more info",
            });
          }
        }}
      >
        action4
      </Button>
    </div>
  );
};
