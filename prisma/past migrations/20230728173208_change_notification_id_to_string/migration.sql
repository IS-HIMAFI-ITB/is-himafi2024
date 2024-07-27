/*
  Warnings:

  - The primary key for the `Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `_readBy` DROP FOREIGN KEY `_readBy_A_fkey`;

-- DropForeignKey
ALTER TABLE `_received` DROP FOREIGN KEY `_received_A_fkey`;

-- DropIndex
DROP INDEX `Notification_title_description_type_key` ON `Notification`;

-- AlterTable
ALTER TABLE `Notification` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `_readBy` MODIFY `A` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `_received` MODIFY `A` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `_received` ADD CONSTRAINT `_received_A_fkey` FOREIGN KEY (`A`) REFERENCES `Notification`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_readBy` ADD CONSTRAINT `_readBy_A_fkey` FOREIGN KEY (`A`) REFERENCES `Notification`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
