-- AlterEnum
ALTER TYPE "statusIzinType" ADD VALUE 'HADIR';

-- AlterTable
ALTER TABLE "Perizinan" ADD COLUMN     "alasanStatusDitolak" TEXT,
ADD COLUMN     "isBuktiNyusul" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "newPerizinan" BOOLEAN NOT NULL DEFAULT true;
