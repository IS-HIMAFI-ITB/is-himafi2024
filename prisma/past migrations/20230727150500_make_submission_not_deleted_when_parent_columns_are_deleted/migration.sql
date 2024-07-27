-- DropForeignKey
ALTER TABLE `Submission` DROP FOREIGN KEY `Submission_tugasId_fkey`;

-- DropForeignKey
ALTER TABLE `Submission` DROP FOREIGN KEY `Submission_userId_fkey`;

-- AlterTable
ALTER TABLE `Submission` MODIFY `userId` VARCHAR(191) NULL,
    MODIFY `tugasId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Submission` ADD CONSTRAINT `Submission_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Submission` ADD CONSTRAINT `Submission_tugasId_fkey` FOREIGN KEY (`tugasId`) REFERENCES `Tugas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
