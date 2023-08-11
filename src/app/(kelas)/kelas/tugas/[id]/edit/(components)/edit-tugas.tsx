"use client";

import "./editor-style.css";

import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarIcon,
  HelpCircle,
  LinkIcon,
  Loader2Icon,
  PlusIcon,
  XCircleIcon,
  XIcon,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Container from "@/components/layout/container";
import { H3 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast/useToast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tugas } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Editor } from "@tinymce/tinymce-react";

const attachmentSchema = z.object({
  title: z
    .string({ invalid_type_error: "Invalid", required_error: "Required" })
    .nonempty({ message: "Invalid" }),
  url: z.string().url(),
});

const formSchema = z.object({
  description: z.string().nonempty(),
  title: z.string().nonempty(),
  attachments: z.string().optional().nullable(),
  dueDate: z.date(),
  dueTime: z.string(),
});

export default function EditTugas({
  initialData,
}: {
  initialData: Tugas | null;
}) {
  const queryClient = useQueryClient();
  const titleEditorRef = useRef<any>(null);
  const descriptionEditorRef = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const params = useParams();

  const {
    data: tugas,
    isLoading,
    isError,
  } = useQuery<Tugas | null, Error>({
    queryKey: ["tugas", { id: params.id }],
    queryFn: () => {
      return fetch(`/api/tugas/${params.id}`).then((res) => res.json());
    },
    initialData: initialData,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: tugas?.description,
      title: tugas?.title,
      attachments: tugas?.attachments,
      dueDate: tugas?.dueDate ? new Date(tugas?.dueDate.toString()) : undefined,
      dueTime: tugas?.dueDate
        ? moment(tugas?.dueDate).format("HH:mm")
        : undefined,
    },
  });

  const editTugas = useMutation({
    mutationKey: ["editTugas"],
    mutationFn: (body: {
      description: string;
      title: string;
      attachments: string | null | undefined;
      dueDate: Date;
    }) => {
      return fetch(`/api/tugas/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tugas", { id: params.id }]);
      toast({
        title: "Tugas berhasil diedit",
      });
    },
    onError: (err: Error) => {
      toast({
        title: "Gagal mengubah detail tugas",
        description: err.message,
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedBody = getFormattedBody(values);
    // order of the object is important
    const oldData = {
      description: tugas?.description,
      title: tugas?.title,
      attachments: tugas?.attachments,
      dueDate: tugas && new Date(tugas.dueDate),
    };

    if (JSON.stringify(formattedBody) === JSON.stringify(oldData)) {
      toast({
        title: "Tidak ada perubahan",
      });
      return;
    }

    editTugas.mutate(formattedBody);
  }

  function getFormattedBody(values: z.infer<typeof formSchema>) {
    const properDateTime = new Date(
      values.dueDate.setHours(
        Number(values.dueTime.split(":")[0]),
        Number(values.dueTime.split(":")[1])
      )
    );
    const returnValue = {
      description: values.description,
      title: values.title.replace("<h1>", "").replace("</h1>", ""),
      attachments: values.attachments,
      dueDate: properDateTime,
    };

    return returnValue;
  }

  const attachmentForm = useForm<z.infer<typeof attachmentSchema>>({
    resolver: zodResolver(attachmentSchema),
  });

  function addAttachment(values: z.infer<typeof attachmentSchema>) {
    form.setValue(
      "attachments",
      form.getValues("attachments")
        ? `${form.getValues("attachments")}|${values.url}?judultugas=${
            values.title
          }`
        : `${values.url}?judultugas=${values.title}`
    );

    attachmentForm.reset({ title: "", url: "" }, { keepValues: false });
  }

  if (!tugas || isError) return notFound();
  if (isLoading) {
    return (
      <Container className="py-12 grid gap-x-24 gap-y-12 lg:grid-cols-[65%_25%] grid-cols-1">
        <article className="prose lg:prose-lg dark:prose-invert">
          <h3 className="flex flex-row items-center gap-2">
            Tugas #{params.id}
          </h3>

          <div className="flex flex-col gap-4">
            <Skeleton className="min-w-[200px] w-full h-12" />
            <div className="not-prose mt-4 flex flex-row flex-wrap items-center gap-4">
              <Skeleton className="w-[300px] h-8" />
              <Skeleton className="w-[300px] h-8" />
            </div>
            <Skeleton className="w-full h-80" />
            <Skeleton className="w-[20ch] h-8" />
          </div>
        </article>

        <div className="sticky top-28 h-max flex flex-col gap-4">
          <Skeleton className="w-full h-8" />
          <div className="flex flex-row gap-4 items-center">
            <Skeleton className="w-[15ch] h-8" />
            <Skeleton className="w-[15ch] h-8" />
          </div>
          <Skeleton className="w-full h-8 mt-4 -mb-2" />
          <Skeleton className="w-full h-16" />
          <Skeleton className="w-full h-8 mt-4 -mb-2" />

          <Separator />
          <Skeleton className="w-full h-40" />
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 grid gap-x-24 gap-y-12 lg:grid-cols-[65%_25%] grid-cols-1">
      <motion.article
        className="prose lg:prose-lg dark:prose-invert"
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
          delay: 0,
        }}
      >
        <Button variant={"outline"} className="no-underline" asChild>
          <Link href={`/kelas`}>
            <ArrowLeft className="mr-2" size={16} /> Kembali ke halaman kelas
          </Link>
        </Button>
        <h3 className="flex flex-row items-center gap-2">Tugas #{params.id}</h3>

        <Editor
          id="1"
          onChange={(e) => {
            form.setValue(
              "title",
              `<h1>${e.target.getContent({ format: "text" })}</h1>`
            );

            if (!titleEditorRef.current) return;

            titleEditorRef.current.setContent(
              `<h1>${e.target.getContent({ format: "text" })}</h1>`
            );
          }}
          onInit={(evt, editor) => (titleEditorRef.current = editor)}
          apiKey={process.env.TINYMCE_API_KEY}
          initialValue={`<h1>${tugas.title}</h1>`}
          init={{
            inline: true,
            skin: "small",
            icons: "jam",
            menubar: false,
            toolbar: false,
            content_style: "body { font-family:Inter,Arial,sans-serif; }",
          }}
        />

        <Editor
          id="2"
          onChange={(e) => {
            form.setValue("description", e.target.getContent());
          }}
          onInit={(evt, editor) => (descriptionEditorRef.current = editor)}
          apiKey={process.env.TINYMCE_API_KEY}
          initialValue={tugas.description}
          init={{
            height: 500,
            inline: true,
            skin: "small",
            icons: "jam",
            menubar: false,
            toolbar: [
              "h3 h4 | alignleft aligncenter alignright | emoticons bold italic subscript superscript underline | indent outdent | bullist numlist | link",
            ],
            toolbar_location: "bottom",
            toolbar_mode: "sliding",
            plugins: ["lists", "link", "emoticons"],
            content_style: "body { font-family:Inter,Arial,sans-serif; }",
          }}
        />

        <div className="not-prose flex flex-col gap-2 justify-start">
          <p className="font-bold">
            {form.getValues("attachments") && "Attachments"}
          </p>

          <div className="flex flex-row flex-wrap gap-x-2 gap-y-3 text-base">
            {/* Bentuk data attachments adalah {link1}|{link2}|{link3} dst.
            Jadi di sini string dipisah berdasarkan karakter "|" dan karakter "|" tidak dimasukkan ke dalam array.
            Kemudian, bentuk url "https://" atau "http://" hanya diambil domain utamanya.
            Contoh "https://drive.google.com/..." hanya diambil "drive.google.com"*/}

            {!form.getValues("attachments") && null}
            {form
              .getValues("attachments")
              ?.split("|")
              .filter((element) => (element === "|" ? null : element))
              .map((attachment, i) => (
                <div key={i} className="flex flex-row gap-1">
                  <Link
                    href={attachment.split("?judultugas=")[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card className="px-5 py-4 w-max max-w-full flex flex-row gap-4 items-center group/download hover:cursor-pointer hover:border-primary">
                      <LinkIcon
                        className="group-hover/download:text-primary"
                        size={24}
                      />

                      <div className="flex flex-col gap-1">
                        <p className="font-semibold line-clamp-1">
                          {attachment.split("?judultugas=")[1]}
                        </p>

                        <p className="text-sm opacity-50 overflow-hidden line-clamp-1">
                          {
                            attachment
                              .replace("https://", "")
                              .replace("http://", "")
                              .split("?judultugas=")[0]
                              .split("/")[0]
                          }
                        </p>
                      </div>
                    </Card>
                  </Link>
                  <div className="h-full w-fit flex flex-col justify-start items-start">
                    <XCircleIcon
                      onClick={() => {
                        toast({
                          title: "Menghapus attachment",
                        });
                        if (
                          form.getValues("attachments")!.split("|").length === 1
                        ) {
                          form.setValue("attachments", undefined);
                          return;
                        }
                        form.setValue(
                          "attachments",
                          form
                            .getValues("attachments")!
                            .split("|")
                            .filter((att) => att !== attachment)
                            .join("|")
                        );
                      }}
                      size={16}
                      className="hover:text-destructive"
                    />
                  </div>
                </div>
              ))}
          </div>

          <Form {...attachmentForm}>
            <form
              onSubmit={attachmentForm.handleSubmit(addAttachment)}
              className="flex flex-row items-end flex-wrap gap-x-2 gap-y-3 mt-4"
            >
              <FormField
                control={attachmentForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex flex-row w-full justify-between items-center">
                      Attachment name <FormMessage />
                    </FormLabel>

                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={attachmentForm.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex flex-row w-full justify-between items-center">
                      Attachment link <FormMessage />
                    </FormLabel>

                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button size="icon" type="submit">
                <PlusIcon size={16} />
              </Button>
            </form>
          </Form>
        </div>
      </motion.article>

      <motion.div
        className="sticky top-28 h-max flex flex-col gap-4"
        // diganti karena ada overflow sebelumnya
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
          delay: 0.3,
        }}
      >
        <H3 className="flex flex-row items-center gap-2">Informasi Tugas</H3>

        <Separator />

        <p>Isi sesuai dengan zona waktu kamu.</p>

        <Form {...form}>
          <form
            onReset={() => {
              form.reset(
                {
                  title: tugas.title,
                  attachments: tugas.attachments,
                  description: tugas.description,
                  dueDate: tugas.dueDate,
                  dueTime: moment(new Date(tugas.dueDate.toString())).format(
                    "HH:mm"
                  ),
                },
                { keepValues: false, keepDefaultValues: true }
              );
              if (!titleEditorRef.current) return;
              if (!descriptionEditorRef.current) return;

              descriptionEditorRef.current.setContent(tugas.description);
              titleEditorRef.current.setContent(`<h1>${tugas.title}</h1>`);
            }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due date</FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? moment(field.value).format("dddd, DD MMMM YYYY")
                            : tugas.dueDate
                            ? moment(tugas.dueDate).format("dddd, DD MMMM YYYY")
                            : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          if (!date) return;
                          field.onChange(date);
                        }}
                        disabled={(date) => {
                          const yesterday = new Date(
                            new Date(new Date().getTime()).setDate(
                              new Date().getDate() - 1
                            )
                          );

                          return date < yesterday;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormDescription>
                    Masukkan tanggal akhir pengumpulan tugas.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row items-center gap-2">
                    Due time{" "}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle size={16} />
                        </TooltipTrigger>
                        <TooltipContent>
                          Klik icon jam agar lebih mudah memilih waktu yang
                          diinginkan.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      type="time"
                      name="dueTime"
                      className="w-full hover:cursor-pointer"
                      placeholder="Pick a time"
                    />
                  </FormControl>

                  <FormDescription>
                    {field.value &&
                      `Waktu yang kamu pilih adalah ${field.value} waktu setempat.`}
                    {!field.value && "Masukkan waktu akhir pengumpulan tugas."}
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? (
                <Loader2Icon size={16} className="animate-spin" />
              ) : (
                "Edit Tugas"
              )}
            </Button>
            <Button
              className="w-full flex flex-row items-center"
              variant={"outline"}
              type="reset"
            >
              <XIcon className="mr-2" size={16} />
              Reset
            </Button>
          </form>
        </Form>
      </motion.div>
    </Container>
  );
}
