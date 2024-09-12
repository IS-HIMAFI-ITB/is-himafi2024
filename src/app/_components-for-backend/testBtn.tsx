"use client";
import { Button } from "~/components/ui/button";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

function adminActions() {
  return [api.sheetsCMSTugas.synchronizeSheetsData.useMutation()];
}
function pesertaActions() {
  return [
    api.sheetsCMSTugas.synchronizeSheetsData.useMutation(),
    // api.tugasPeserta.getCarouselTugasList.useMutation()
  ];
}

export const TestBtnAdmin = () => {
  const actions = adminActions();
  return (
    <div className="grid grid-cols-1 gap-10">
      {actions.map((action, id) => (
        <Button
          key={id}
          id={`btn1${id}`}
          onClick={async () => {
            try {
              (document.getElementById(`btn1${id}`) as HTMLButtonElement).disabled = true;
              await action.mutateAsync();
              toast({
                title: "Success",
                description: `action ${id} successful`,
              });
              (document.getElementById(`btn1${id}`) as HTMLButtonElement).disabled = false;
            } catch (error) {
              (document.getElementById(`btn1${id}`) as HTMLButtonElement).disabled = false;
              console.log(error);
              toast({
                title: "Error",
                description: "check console for more info",
              });
            }
          }}
        >
          Admin action {id}
        </Button>
      ))}
    </div>
  );
};

export const TestBtnPeserta = () => {
  const actions = pesertaActions();
  return (
    <div className="grid grid-cols-1 gap-10">
      {actions.map((action, id) => (
        <Button
          key={id}
          id={`btn${id}`}
          onClick={async () => {
            try {
              (document.getElementById(`btn${id}`) as HTMLButtonElement).disabled = true;
              await action.mutateAsync();
              toast({
                title: "Success",
                description: `action ${id} successful`,
              });
              (document.getElementById(`btn${id}`) as HTMLButtonElement).disabled = false;
            } catch (error) {
              (document.getElementById(`btn${id}`) as HTMLButtonElement).disabled = false;
              console.log(error);
              toast({
                title: "Error",
                description: "check console for more info",
              });
            }
          }}
        >
          Peserta action {id}
        </Button>
      ))}
    </div>
  );
};
