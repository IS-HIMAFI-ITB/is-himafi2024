"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { toast } from "~/components/ui/use-toast";

export function TugasCreateAdmin() {
  const [formcontent, setFormcontent] = useState({
    judul: "",
    body: "",
    attachment: "",
    tugasSpesial: false,
    targetNimPesertaString: "",
    perintahMisi: "",
    deadline: new Date("2024-09-11T08:46:40+07:00"),
  });
  const createTugas = api.tugasAdmin.tugasAdminCreate.useMutation();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const targetNimPesertaList = formcontent.targetNimPesertaString ? formcontent.targetNimPesertaString.split(",") : [];
    // const deadline = new Date(new Date(formcontent.deadline).getTime() + 62 * 60 * 1000); //add 1 hour & 2 minutes to deadline
    // const deadline = new Date(new Date(formcontent.deadline.getTime() - 7 * 60 * 60 * 1000)); //convert GMT+7 time as utc
    try {
      createTugas.mutate({
        judul: formcontent.judul,
        body: formcontent.body,
        attachment: formcontent.attachment,
        deadline: formcontent.deadline,
        isTugasSpesial: formcontent.tugasSpesial,
        targetNimPeserta: targetNimPesertaList,
        perintahMisi: formcontent.perintahMisi,
      });
      toast({
        title: "Success",
        description: `Tugas created`,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "check console for more info",
      });
    } finally {
      setFormcontent({
        judul: "",
        body: "",
        attachment: "",
        tugasSpesial: false,
        targetNimPesertaString: "",
        perintahMisi: "",
        deadline: new Date("2001-09-11T08:46:40+07:00"),
      });
    }
  };

  return (
    <div className="bg-violet-100 p-10 content-center w-full  border border-violet-400 rounded-lg drop-shadow-md relative">
      <h1 className="relative text-5xl font-extrabold text-violet-700 z-20 text-center">Create Tugas</h1>
      <div className="absolute -inset-2 z-0">
        <div className="w-full h-full  mx-auto lg:mx-0 opacity-30 blur-lg bg-gradient-to-r from-violet-400 via-pink-500 to-violet-600"></div>
      </div>
      <form onSubmit={handleSubmit} className="relative flex flex-col gap-4 mt-10 items-center justify-center text-[hsl(0,0,0)]">
        <Input
          value={formcontent.judul}
          onChange={({ target }) => setFormcontent({ ...formcontent, judul: target.value })}
          type="text"
          placeholder="Judul"
        />
        <Input
          value={formcontent.body}
          onChange={({ target }) => setFormcontent({ ...formcontent, body: target.value })}
          type="text"
          placeholder="Body"
        />
        <Input
          value={formcontent.perintahMisi}
          onChange={({ target }) => setFormcontent({ ...formcontent, perintahMisi: target.value })}
          type="text"
          placeholder="Perintah misi"
        />
        <Input
          value={formcontent.attachment}
          onChange={({ target }) => setFormcontent({ ...formcontent, attachment: target.value })}
          type="text"
          placeholder="Link attachment"
        />
        {/* <Input
          value={formcontent.deadline}
          onChange={({ target }) => setFormcontent({ ...formcontent, deadline: target.value })}
          type="date"
        /> */}
        <div className="flex-row flex align-center items-center gap-4">
          <p className="text-violet-700 font-bold">Deadline:</p>
          <DateTimePicker
            value={formcontent.deadline}
            onChange={(target) => setFormcontent({ ...formcontent, deadline: target ?? new Date() })}
          />
        </div>
        <Input
          value={formcontent.targetNimPesertaString}
          onChange={({ target }) => setFormcontent({ ...formcontent, targetNimPesertaString: target.value })}
          type="text"
          placeholder="TargetNimPeserta (comma separated no whitespace)"
        />
        <label className="z-10 text-violet-700 font-bold flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => {
              setFormcontent({ ...formcontent, tugasSpesial: !formcontent.tugasSpesial });
            }}
          />
          Misi Spesial
        </label>
        <Button
          className="z-10 text-violet-100 text-xl bg-black rounded-xl px-5 py-auto hover:cursor-pointer hover:bg-slate-700 transition duration-300 ease-in-out"
          type="submit"
        >
          {" "}
          Submit
        </Button>
      </form>
    </div>
  );
}
