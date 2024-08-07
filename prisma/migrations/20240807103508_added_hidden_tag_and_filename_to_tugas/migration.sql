-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "filename" TEXT,
ADD COLUMN     "hidden" BOOLEAN NOT NULL DEFAULT false;
