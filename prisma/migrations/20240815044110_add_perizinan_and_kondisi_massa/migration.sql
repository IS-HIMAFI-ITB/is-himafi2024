-- CreateEnum
CREATE TYPE "kehadiranType" AS ENUM ('HADIR', 'MENYUSUL', 'MENINGGALKAN', 'MENYUSUL_DAN_MENINGGALKAN', 'TIDAK_HADIR');

-- CreateEnum
CREATE TYPE "jenisIzinType" AS ENUM ('LEMBAGA', 'AGAMA', 'AKADEMIK', 'KELUARGA', 'SAKIT');

-- CreateEnum
CREATE TYPE "fisikType" AS ENUM ('SEHAT', 'KURANG_SEHAT', 'SAKIT', 'BARU_PULIH');

-- CreateTable
CREATE TABLE "Day" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perizinan" (
    "id" TEXT NOT NULL,
    "kehadiran" "kehadiranType",
    "jenisIzin" "jenisIzinType",
    "alasanIzin" TEXT,
    "kapanMenyusul" TIMESTAMP(3),
    "kapanMeninggalkan" TIMESTAMP(3),
    "buktiIzin" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,
    "dayId" INTEGER,

    CONSTRAINT "Perizinan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KondisiMassa" (
    "id" TEXT NOT NULL,
    "fisik" "fisikType" NOT NULL,
    "deskripsi" TEXT,
    "kesiapan" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,
    "dayId" INTEGER,

    CONSTRAINT "KondisiMassa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Perizinan" ADD CONSTRAINT "Perizinan_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perizinan" ADD CONSTRAINT "Perizinan_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KondisiMassa" ADD CONSTRAINT "KondisiMassa_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KondisiMassa" ADD CONSTRAINT "KondisiMassa_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE SET NULL ON UPDATE CASCADE;
