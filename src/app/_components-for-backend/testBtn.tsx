"use client";
import { Button } from "~/components/ui/button";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
export const TestBtn = () => {
  const actions = [api.sheetsCMSTugas.synchronizeSheetsData.useMutation()];
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
          action {id}
        </Button>
      ))}
    </div>
  );
};
