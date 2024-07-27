/*
  Warnings:

  - You are about to drop the column `feedback` on the `Submission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `submissionId` VARCHAR(191) NULL,
    ADD COLUMN `tugasId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Submission` DROP COLUMN `feedback`;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_tugasId_fkey` FOREIGN KEY (`tugasId`) REFERENCES `Tugas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_submissionId_fkey` FOREIGN KEY (`submissionId`) REFERENCES `Submission`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
