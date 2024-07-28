const { PrismaClient, TipeIzin, StatusIzin } = require("@prisma/client");
const { Role } = require("@prisma/client");
const prisma = new PrismaClient();

const akunPesertas = [
  {
    name: "ikan1",
    nim: "10223065",
    password: "Ua5tkXqb",
    role: Role.PESERTA,
  },
  {
    name: "ikan2",
    nim: "10223066",
    password: "Ua5tkXqb2",
    role: Role.PESERTA,
  },
  {
    name: "ikan3",
    nim: "10223067",
    password: "Ua5tkXqb3",
    role: Role.PESERTA,
  },
];

const akunPanits = [
  {
    name: "Ahmad Royyan Fatah",
    nim: "10222065",
    password: "7KsQHj2T",
    role: Role.IT,
  },

  {
    name: "Muhamad Daffa Fawwaz F J",
    nim: "10221040",
    password: "Ua5tkXqb",
    role: Role.KETUA,
  },
  {
    name: "Yesha Marcella",
    nim: "10221064",
    password: "dTw47EQ7",
    role: Role.SEKJEN,
  },
  {
    name: "Rafi Izza Rizaldi",
    nim: "10221035",
    password: "aCIl0AJH",
    role: Role.SEKBEN,
  },
  {
    name: "Agrilia Gracia",
    nim: "10221019",
    password: "xrES8xtL",
    role: Role.FUNDRAISING,
  },
  {
    name: "Farhan Al Haqqi",
    nim: "10221046",
    password: "xnW0huap",
    role: Role.FUNDRAISING,
  },
  {
    name: "Ni Komang Linda Sopianti",
    nim: "10221023",
    password: "GhYYQfxC",
    role: Role.FUNDRAISING,
  },
  {
    name: "Muhammad Ilham Gusti Yuliantoro",
    nim: "10221002",
    password: "EG41FGAM",
    role: Role.FUNDRAISING,
  },
  {
    name: "Dinta",
    nim: "10221024",
    password: "4pp9InDT",
    role: Role.EO,
  },
  {
    name: "Nur Tsaqif Danial Putra",
    nim: "10221029",
    password: "IlW7ILNj",
    role: Role.EO,
  },
  {
    name: "Marshanda Adisti Rahmadini",
    nim: "10221001",
    password: "zcQZBXLY",
    role: Role.EO,
  },
  {
    name: "Sasha Audina Hidayat",
    nim: "10221007",
    password: "dyQatHzW",
    role: Role.EO,
  },
  {
    name: "Fadila Hasna Amalia",
    nim: "10221056",
    password: "YGRcRvjd",
    role: Role.EO,
  },
  {
    name: "Muhammad Shaquille Hisham",
    nim: "10221055",
    password: "fL6t0ntV",
    role: Role.EO,
  },
  {
    name: "Aziz Satrio",
    nim: "10221049",
    password: "K9VPEou2",
    role: Role.MAMET,
  },
  {
    name: "Ihda Huly Yusyiyah",
    nim: "10221042",
    password: "1mR4XoLG",
    role: Role.MAMET,
  },
  {
    name: "Andi Safa Afianzar",
    nim: "10221080",
    password: "bnIIZ634",
    role: Role.MAMET,
  },
  {
    name: "Muhammad Naufal Fadhillah",
    nim: "10221013",
    password: "fsnUQW7o",
    role: Role.MAMET,
  },
  {
    name: "Afif Jalu Pradipta",
    nim: "10221067",
    password: "dwRB5oAg",
    role: Role.MAMET,
  },
  {
    name: "Rizky Pratama Ramadhan",
    nim: "10221032",
    password: "Wk7w7kkv",
    role: Role.MAMET,
  },
  {
    name: "Hamzah Firoos Fauzi",
    nim: "10221005",
    password: "7xUNleBm",
    role: Role.EVALUATOR,
  },
  {
    name: "Nicholas Fabian Rustam",
    nim: "10221054",
    password: "WKV8sMmV",
    role: Role.EVALUATOR,
  },
  {
    name: "Fauzi Azhari Lubis",
    nim: "10221014",
    password: "w1Xm7d3B",
    role: Role.EVALUATOR,
  },
  {
    name: "Samuel Obadiah",
    nim: "10221076",
    password: "x8owQGQ0",
    role: Role.EVALUATOR,
  },
  {
    name: "Nabiel Akbar Wicaksono",
    nim: "10221043",
    password: "FrKjvmpM",
    role: Role.LAPANGAN,
  },
  {
    name: "Muhammad Arkaan Hidayat",
    nim: "10221061",
    password: "uP3yt1pu",
    role: Role.MENTOR,
  },
  {
    name: "Ilham Ghufroni",
    nim: "10221012",
    password: "B7AqPs1D",
    role: Role.MENTOR,
  },
  {
    name: "Eugenia Jessica",
    nim: "10221026",
    password: "lihHXt5j",
    role: Role.MENTOR,
  },
  {
    name: "Maulidina Suci Paramitha",
    nim: "10221071",
    password: "JPBdLBpU",
    role: Role.MENTOR,
  },
  {
    name: "Muhammad Fatahillah Ghulam Idrus",
    nim: "10221070",
    password: "LuDwHBYA",
    role: Role.MENTOR,
  },
  {
    name: "Eka Budiarti",
    nim: "10221015",
    password: "QQhApO2c",
    role: Role.MENTOR,
  },
  {
    name: "Arif Laksana",
    nim: "10221030",
    password: "Cx7h3N0T",
    role: Role.MENTOR,
  },
  {
    name: "Aditya Aryashakti",
    nim: "10221044",
    password: "Ktm48SNy",
    role: Role.MENTOR,
  },
  {
    name: "Ahmad Yusuf Farhat",
    nim: "10221048",
    password: "pPxkuMKp",
    role: Role.MEDIK,
  },
  {
    name: "Zahra Auria",
    nim: "10221022",
    password: "rqqiXtMq",
    role: Role.MEDIK,
  },
  {
    name: "Kian Imanur Razan",
    nim: "10221033",
    password: "tqYyL29i",
    role: Role.MEDIK,
  },
  {
    name: "Masrinaldo",
    nim: "10221059",
    password: "mbWcm5Es",
    role: Role.MEDIK,
  },
  {
    name: "Adriel Fadhlurrahman L",
    nim: "10221063",
    password: "wYHTXLDB",
    role: Role.KEAMANAN,
  },
  {
    name: "Ario Nawangsidi",
    nim: "10221052",
    password: "Hld32uOM",
    role: Role.KEAMANAN,
  },
  {
    name: "Yesaya Febrianto Nicolas",
    nim: "10221011",
    password: "nw9Yfigt",
    role: Role.KEAMANAN,
  },
  {
    name: "Richard Valentino Nainggolan",
    nim: "10221073",
    password: "Xd8HCMYq",
    role: Role.KEAMANAN,
  },
  {
    name: "Mohammad Ibrahim Akhyari",
    nim: "10221036",
    password: "fMhU5PBM",
    role: Role.KREATIF,
  },
  {
    name: "Meisya Noviliauwati",
    nim: "10221058",
    password: "SOiMAW5t",
    role: Role.KREATIF,
  },
  {
    name: "Ghina Hanifah Alamsyah",
    nim: "10221037",
    password: "ZZbph5Uo",
    role: Role.KREATIF,
  },
  {
    name: "Hafiz Arshad Ramadan",
    nim: "10221008",
    password: "XFFiNcD5",
    role: Role.KREATIF,
  },
  {
    name: "Auza Naufal Abraar",
    nim: "10221016",
    password: "crxSZxwe",
    role: Role.KREATIF,
  },
  {
    name: "Anggie Junia Saputry",
    nim: "10221069",
    password: "w8lpVSSX",
    role: Role.PUBDOK,
  },
  {
    name: "Riana Arsanda Putri",
    nim: "10221003",
    password: "PZMezp7E",
    role: Role.PUBDOK,
  },
  {
    name: "Bakhtiar Azwani",
    nim: "10221053",
    password: "D2ykpksK",
    role: Role.PUBDOK,
  },
  {
    name: "Nafa Rida Aisy Putri",
    nim: "10221020",
    password: "QPumcPQA",
    role: Role.PUBDOK,
  },
  {
    name: "Muhammad Afief Abdurrahman",
    nim: "10221006",
    password: "YNFdWHkF",
    role: Role.IT,
  },
  {
    name: "Muhammad Zydan Priambada",
    nim: "10221057",
    password: "7JcinP3Z",
    role: Role.IT,
  },
  {
    name: "Mita Refalina",
    nim: "10221027",
    password: "n872haXS",
    role: Role.MSDM,
  },
  {
    name: "Restu Khoirunnisa",
    nim: "10221039",
    password: "X4dM1w7U",
    role: Role.MSDM,
  },
  {
    name: "Farid Ilhan",
    nim: "10221062",
    password: "GY01k31H",
    role: Role.MSDM,
  },
  {
    name: "Metha Anggraeni",
    nim: "10221025",
    password: "cprltPdS",
    role: Role.PERSONALIA,
  },
  {
    name: "Shafira Nurfitri Rahmadhani",
    nim: "10221068",
    password: "PuOVArxz",
    role: Role.PERSONALIA,
  },
  {
    name: "Tysha Alya Ramadhany",
    nim: "10221075",
    password: "3mRrU4YJ",
    role: Role.PERSONALIA,
  },
  {
    name: "Leonardo Diaugusto",
    nim: "10221077",
    password: "lPdS2uVe",
    role: Role.PERSONALIA,
  },
  {
    name: "Amelia Nurfajrah",
    nim: "10221066",
    password: "FrUlc9Ju",
    role: Role.PERSONALIA,
  },
  {
    name: "Fitri Desnita",
    nim: "10221045",
    password: "oO3ZuQOb",
    role: Role.PERIZINAN,
  },
  {
    name: "Made Satriya Widiyadharma",
    nim: "10221031",
    password: "OsP39cRG",
    role: Role.PERIZINAN,
  },
  {
    name: "Ilham Prasetyo",
    nim: "10221074",
    password: "0KiXmLgV",
    role: Role.PERIZINAN,
  },
  {
    name: "Achmad Aulia Fikri",
    nim: "10221072",
    password: "jysSzkuU",
    role: Role.LOGISTIK,
  },
  {
    name: "Aulia Firdausya",
    nim: "10221017",
    password: "M5ys5SZN",
    role: Role.LOGISTIK,
  },
  {
    name: "Annisa Nurul Fitri",
    nim: "10221079",
    password: "cVwTswXC",
    role: Role.LOGISTIK,
  },
];

const load = async () => {
  try {
    // !seed akun panit
    for (let akunPanit of akunPanits) {
      await prisma.User.create({
        data: akunPanit,
      });
    }
    //! seed akun peserta
    for (let akunPeserta of akunPesertas) {
      await prisma.User.create({
        data: akunPeserta,
      });
    }

    //! new event
    // await prisma.event.create({
    //   data: {
    //     title: "Wawancara Anggota Baru",
    //     description: "Lorem ipsum dolor sit amet",
    //     date: new Date(),
    //   },
    // });

    // ! INI UNTUK BUAT NOTIFIKASI, BODY KURANG LEBIH KEK GINI
    // ! {
    // !  title: "judul",
    // !  description: "deskripsi",
    // !  type: "UMUM",
    // !  createdAt: new Date(),
    // !  receiver: ["10221006", "10221000", ...]
    // !}
    // await Promise.all(
    //   ["10221000"].map((nim) =>
    //     prisma.notification
    //       .create({
    //         data: {
    //           title: "Izin diterima!",
    //           description:
    //             "Izin kamu untuk tidak mengikuti kegiatan wawancara kami terima.",
    //           type: "TUGAS",
    //           createdAt: new Date(),
    //           receiver: {
    //             connect: {
    //               nim: nim,
    //             },
    //           },
    //         },
    //       })
    //       .then((res) => console.log(res))
    //   )
    // );
    // ! READ NOTIFICATIONS
    // const params = { id: "9475ab02-4336-4b67-a0ec-944356417c5b" };
    // await Promise.all(
    //   [3, 5, 7].map((i) =>
    //     prisma.notification.update({
    //       where: {
    //         id: i,
    //       },
    //       data: {
    //         readBy: {
    //           connect: {
    //             id: params.id,
    //           },
    //         },
    //       },
    //     })
    //   )
    // ).then((res) => console.log(res));
    // ! BUAT EVENT
    // await prisma.event.create({
    //   data: {
    //     title: "Wawancara Anggota Baru",
    //     description: "Lorem ipsum dolor sit amet",
    //     date: new Date(),
    //   },
    // });
    // ! HADIR EVENT
    // const eventId = "clkncd9s10000i19ob7cyb7xo";
    // const userId = "3b83175a-2798-4b1b-8d05-56cdb1ec8628";
    // await prisma.event.update({
    //   where: {
    //     id: eventId,
    //   },
    //   data: {
    //     hadir: {
    //       connect: {
    //         id: userId,
    //       },
    //     },
    //   },
    // });
    // ! AMBIL EVENT YANG USER HADIRI
    // const userId = "3b83175a-2798-4b1b-8d05-56cdb1ec8628";
    // await prisma.event
    //   .findMany({
    //     where: {
    //       hadir: {
    //         some: {
    //           id: userId,
    //         },
    //       },
    //     },
    //   })
    //   .then((res) => console.log(res));
    // ! AMBIL EVENT DIMANA USER IZIN
    // const userId = "3b83175a-2798-4b1b-8d05-56cdb1ec8628";
    // await prisma.event
    //   .findMany({
    //     where: {
    //       izin: {
    //         some: {
    //           userId: userId,
    //         },
    //       },
    //     },
    //   })
    //   .then((res) => console.log(res));
    // ! BUAT IZIN
    // const userId = "3b83175a-2798-4b1b-8d05-56cdb1ec8628";
    // const eventId = "clknbcoj50000i1f8cm3zf0gv";
    // await prisma.event.update({
    //   where: {
    //     id: eventId,
    //   },
    //   data: {
    //     izin: {
    //       create: {
    //         bukti: "https://i.imgur.com/2ZQ4Q3o.jpg",
    //         createdAt: new Date(),
    //         keterangan: "Lorem ipsum dolor sit amet",
    //         tipe: TipeIzin.FULL,
    //         userId: userId,
    //       },
    //     },
    //   },
    // });
    // ! MP UBAH STATUS IZIN
    // const izinId = 1;
    // await prisma.izin.update({
    //   where: {
    //     id: izinId,
    //   },
    //   data: {
    //     status: StatusIzin.DITERIMA,
    //   },
    // });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

load();
