-- AlterTable
ALTER TABLE "Day" ADD COLUMN     "isAcceptingPerizinan" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isCurrent" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "passwordAbsensi" TEXT,
ADD COLUMN     "sheetsCMSId" TEXT;

-- AlterTable
ALTER TABLE "Perizinan" ADD COLUMN     "hadirAbsensiAt" TIMESTAMP(3),
ADD COLUMN     "isHadirAbsensi" BOOLEAN NOT NULL DEFAULT false;
