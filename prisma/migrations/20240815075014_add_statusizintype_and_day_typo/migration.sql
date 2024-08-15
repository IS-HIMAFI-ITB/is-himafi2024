-- CreateEnum
CREATE TYPE "statusIzinType" AS ENUM ('PENDING', 'DITERIMA', 'DITOLAK');

-- AlterTable
ALTER TABLE "Perizinan" ADD COLUMN     "statusIzin" "statusIzinType" NOT NULL DEFAULT 'PENDING';
