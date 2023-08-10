// SERVER SIDE METHODS

import { prisma } from "@/prisma";

export async function getAnalytics() {
  const userCount = await prisma.user.count().catch((e: Error) => e.message);
  const postCount = await prisma.contents
    .count()
    .catch((e: Error) => e.message);

  return { userCount, postCount };
}

export async function getUser(take?: number) {
  const result = await prisma.user.findMany({
    take: take || 10,
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
}

export async function getUserById(id: string) {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return result;
}

export async function getTugasById(id: string) {
  const tugas = await prisma.tugas
    .findUnique({
      where: { id: Number(id) },
      include: {
        comments: {
          include: {
            author: {
              select: {
                name: true,
                nim: true,
              },
            },
          },
        },
      },
    })
    .catch((err) => {
      throw new Error(err);
    });

  return tugas;
}

export async function getTugasSubmission(userId: string, tugasId: string) {
  const submissions = await prisma.submission
    .findFirst({
      where: {
        userId: userId,
        tugasId: Number(tugasId),
      },
      orderBy: {
        submittedAt: "desc",
      },
      include: {
        feedback: {
          include: {
            author: {
              select: {
                name: true,
                nim: true,
              },
            },
          },
        },
      },
    })
    .catch((err) => {
      throw new Error(err.message);
    });

  return submissions;
}

export async function getTugasAssigned(nim: string) {
  const tugasAssigned = await prisma.tugas.findMany({
    where: {
      NOT: {
        submissions: {
          some: {
            user: {
              nim: nim,
            },
          },
        },
      },
    },
    orderBy: {
      dueDate: "asc",
    },
  });

  return tugasAssigned;
}

export async function getTugasDone(nim: string) {
  const tugasDone = await prisma.tugas.findMany({
    where: {
      submissions: {
        some: {
          user: {
            nim: nim,
          },
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  return tugasDone;
}

export async function getEventHadir(nim: string) {
  const eventHadir = await prisma.event.findMany({
    where: {
      disabled: false,
      AND: [
        {
          hadir: {
            some: {
              nim: nim,
            },
          },
        },
        {
          OR: [
            {
              izin: {
                none: {
                  user: {
                    nim: nim,
                  },
                },
              },
            },
            {
              izin: {
                some: {
                  AND: [
                    {
                      user: {
                        nim: nim,
                      },
                    },
                    {
                      status: "DITOLAK",
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    include: {
      hadir: {
        where: {
          nim: nim,
        },
      },
      izin: {
        orderBy: {
          createdAt: "desc",
        },
        where: {
          user: {
            nim: nim,
          },
        },
      },
    },
  });

  return eventHadir;
}

export async function getEventIzin(nim: string) {
  const eventIzin = await prisma.event.findMany({
    where: {
      disabled: false,
      izin: {
        some: {
          AND: [
            {
              user: {
                nim: nim,
              },
            },
            {
              OR: [
                {
                  status: "DITERIMA",
                },
                {
                  status: "MENUNGGU",
                },
              ],
            },
          ],
        },
      },
    },
    include: {
      hadir: {
        where: {
          nim: nim,
        },
      },
      izin: {
        orderBy: {
          createdAt: "desc",
        },
        where: {
          user: {
            nim: nim,
          },
        },
      },
    },
  });

  return eventIzin;
}

export async function getEventNoPresence(nim: string) {
  const eventNoPresence = await prisma.event.findMany({
    where: {
      disabled: false,
      hadir: {
        none: {
          nim: nim,
        },
      },
      OR: [
        {
          izin: {
            some: {
              AND: [
                {
                  user: {
                    nim: nim,
                  },
                },
                {
                  status: "DITOLAK",
                },
              ],
            },
          },
        },
        {
          izin: {
            none: {
              user: {
                nim: nim,
              },
            },
          },
        },
      ],
    },
    include: {
      hadir: {
        where: {
          nim: nim,
        },
      },
      izin: {
        orderBy: {
          createdAt: "desc",
        },
        where: {
          user: {
            nim: nim,
          },
        },
      },
    },
  });

  return eventNoPresence;
}

// END OF SERVER SIDE METHODS
