/*
  Warnings:

  - You are about to drop the column `createdById` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fish` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nim]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('KETUA', 'SEKJEN', 'SEKBEN', 'FUNDRAISING', 'EO', 'MAMET', 'EVALUATOR', 'LAPANGAN', 'MENTOR', 'MEDIK', 'KEAMANAN', 'KREATIF', 'PUBDOK', 'IT', 'MSDM', 'PERSONALIA', 'PERIZINAN', 'LOGISTIK', 'PESERTA');

-- CreateEnum
CREATE TYPE "TipeIzin" AS ENUM ('FULL', 'MENYUSUL', 'MENINGGALKAN_LEBIH_AWAL');

-- CreateEnum
CREATE TYPE "StatusIzin" AS ENUM ('DITERIMA', 'DITOLAK', 'MENUNGGU');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_createdById_fkey";

-- DropIndex
DROP INDEX "Post_name_idx";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "createdById",
DROP COLUMN "name",
ADD COLUMN     "authorId" TEXT,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "originalId" INTEGER,
ADD COLUMN     "submissionId" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "tugasId" INTEGER,
ADD COLUMN     "type" TEXT DEFAULT 'POST';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
DROP COLUMN "fish",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email_verified" TIMESTAMP(3),
ADD COLUMN     "kelompokId" INTEGER,
ADD COLUMN     "lastPasswordChange" TIMESTAMP(3),
ADD COLUMN     "nim" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'PESERTA',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "Tugas" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "attachments" TEXT,

    CONSTRAINT "Tugas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "tugasId" INTEGER,
    "files" TEXT,
    "links" TEXT,
    "score" INTEGER,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Izin" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "eventId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "StatusIzin" NOT NULL DEFAULT 'MENUNGGU',
    "tipe" "TipeIzin" NOT NULL DEFAULT 'FULL',
    "keterangan" TEXT,
    "bukti" TEXT,

    CONSTRAINT "Izin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "enablePresensi" BOOLEAN NOT NULL DEFAULT false,
    "disabled" BOOLEAN NOT NULL DEFAULT true,
    "checkRecheckForm" TEXT DEFAULT 'NONE',
    "presensiQuestion" TEXT,
    "presensiQuestionAnswer" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kelompok" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Kelompok_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_hadir" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_received" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_readBy" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tugas_title_key" ON "Tugas"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Kelompok_name_key" ON "Kelompok"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_hadir_AB_unique" ON "_hadir"("A", "B");

-- CreateIndex
CREATE INDEX "_hadir_B_index" ON "_hadir"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_received_AB_unique" ON "_received"("A", "B");

-- CreateIndex
CREATE INDEX "_received_B_index" ON "_received"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_readBy_AB_unique" ON "_readBy"("A", "B");

-- CreateIndex
CREATE INDEX "_readBy_B_index" ON "_readBy"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_nim_key" ON "User"("nim");

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_tugasId_fkey" FOREIGN KEY ("tugasId") REFERENCES "Tugas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_originalId_fkey" FOREIGN KEY ("originalId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_tugasId_fkey" FOREIGN KEY ("tugasId") REFERENCES "Tugas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Izin" ADD CONSTRAINT "Izin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Izin" ADD CONSTRAINT "Izin_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_kelompokId_fkey" FOREIGN KEY ("kelompokId") REFERENCES "Kelompok"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hadir" ADD CONSTRAINT "_hadir_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hadir" ADD CONSTRAINT "_hadir_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_received" ADD CONSTRAINT "_received_A_fkey" FOREIGN KEY ("A") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_received" ADD CONSTRAINT "_received_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_readBy" ADD CONSTRAINT "_readBy_A_fkey" FOREIGN KEY ("A") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_readBy" ADD CONSTRAINT "_readBy_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
