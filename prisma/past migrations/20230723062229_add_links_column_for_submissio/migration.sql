/*
  Warnings:

  - Added the required column `links` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Submission` ADD COLUMN `links` VARCHAR(191) NOT NULL,
    ALTER COLUMN `submittedAt` DROP DEFAULT;
