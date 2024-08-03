/*
  Warnings:

  - You are about to drop the column `name` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Post_name_idx";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "name",
ADD COLUMN     "attachment" TEXT,
ADD COLUMN     "body" TEXT,
ADD COLUMN     "judul" TEXT;
