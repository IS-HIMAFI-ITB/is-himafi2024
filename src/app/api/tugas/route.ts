import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";
import { Role } from "@prisma/client";

import { authOptions } from "../auth/auth-options";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const result = await prisma.tugas.findMany().catch((err: Error) => {
    throw new Error(err.message);
  });

  return NextResponse.json(result, { status: 200 });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const body = await req.json();

  const result = await prisma.tugas
    .create({
      data: body,
    })
    .catch((err: Error) => {
      throw new Error(err.message);
    });

  // Send notification to all peserta, if it errors then it's okay
  const allPesertaid = await prisma.user
    .findMany({
      where: {
        role: Role.PESERTA,
      },
      select: {
        id: true,
      },
    })
    .then((res) => {
      return res.map((user) => user.id);
    });

  // Index pertama create dulu, upsert ngebug ga jelas.
  const time = new Date().getTime();
  const firstIndex = await prisma.notification
    .create({
      data: {
        title: `Tugas ${result.id} baru saja ditambahkan.`,
        description: `Kamu memiliki tugas baru dengan judul ${result.title}.`,
        type: "TUGAS",
        createdAt: new Date(),
        receiver: {
          connect: {
            id: allPesertaid[0],
          },
        },
      },
    })
    .then((res) => res.id);

  await Promise.all(
    allPesertaid.slice(1).map((id) => {
      return prisma.notification
        .update({
          where: {
            id: firstIndex,
          },
          data: {
            receiver: {
              connect: {
                id: id,
              },
            },
          },
        })
        .catch((err: Error) => {
          console.log(err);
        });
    })
  );

  return NextResponse.json(result, { status: 200 });
}