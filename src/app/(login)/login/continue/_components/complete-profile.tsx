"use client";

import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import Logo from "@/components/logo";
import Loading from "@/components/template/loading";
import ThemeSwitch from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast/useToast";
import { zodResolver } from "@hookform/resolvers/zod";

interface CompleteProfileProps {
  className?: string;
}

const completeProfileSchema = z
  .object({
    nim: z.coerce
      .number()
      .gte(10221000, "Format NIM salah")
      .lte(10223999, "Format NIM salah"),
    password: z.string().min(8, "Password terlalu pendek"),
    confirmPassword: z.string().nonempty("This field must not be empty"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password tidak sama",
        path: ["confirmPassword"],
      });
    }
  });

const CompleteProfile: React.FC<CompleteProfileProps> = ({ className }) => {
  /** Inisialisasi useForm dengan resolver zodResolver, menggunakan schema completeProfileSchema. */
  const form = useForm<z.infer<typeof completeProfileSchema>>({
    resolver: zodResolver(completeProfileSchema),
  });

  const { toast } = useToast();
  const { status, data: credential, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof completeProfileSchema>) {
    setLoading(true);
    const res = await fetch(`/api/users/${credential?.user.nim}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nim: data.nim,
        password: data.password,
        lastPasswordChange: new Date().toISOString(),
      }),
    }).then((res) => res.json());

    if (res.error) {
      setLoading(false);
      toast({
        title: "Failed to update profile",
        description: res.error,
      });
      return;
    }

    setLoading(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated",
    });
    const session = await update({
      nim: res.nim,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
      lastPasswordChange: res.lastPasswordChange,
    }).then((res) => {
      if (!res) return;
      if (res.user.role === "PESERTA") {
        // Kalau yang login peserta, redirect ke halaman kelas.
        router.replace("/kelas");
      } else {
        router.replace("/");
      }
    });
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return <Loading />;
  }

  /** Jika loading tampilkan skeleton*/
  if (status === "loading")
    return (
      <Card className={twMerge("flex-col p-6 overflow-y-auto", className)}>
        <CardHeader>
          {/* <ThemeSwitch /> */}
          <div className="flex justify-center items-center">
            <Logo className="mb-12" width={100} height={100} />
          </div>
          <Skeleton className="w-[80px] h-[30px]" />
          <Skeleton className="w-[150px] h-[20px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="w-[75px] h-[20px] mt-1 mb-2" />
          <Skeleton className="w-full h-[35px] mb-2" />
          <Skeleton className="w-[75px] h-[20px] mb-2" />
          <Skeleton className="w-full h-[35px] mb-3" />
          <Skeleton className="w-[75px] h-[15px] mb-2" />
        </CardContent>
        <CardFooter>
          <Skeleton className="w-[75px] h-[35px] mr-4" />
          <Skeleton className="w-[150px] h-[35px]" />
        </CardFooter>
      </Card>
    );
  return (
    <Card className={twMerge("flex-col p-6 overflow-y-auto", className)}>
      <CardHeader>
        {/* <ThemeSwitch /> */}
        <div className="flex justify-center items-center">
          <Logo className="mb-12" width={100} height={100} />
        </div>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>
          Complete the remaining data to continue registration
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-3">
            <FormField
              control={form.control}
              name="nim"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIM Jurusan</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription className="opacity-50 text-sm">
                    NIM jurusan fisika adalah NIM yang diawali dengan 102
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Baru</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konfirmasi Password Baru</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Finalisasi"
              )}
            </Button>
            {/* <Button variant={"secondary"} className="ml-4">
              <GoogleImage height={20} width={20} />
              <span>Register with Google</span>
            </Button> */}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CompleteProfile;
