/*
  Warnings:

  - You are about to drop the `_NotificationToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_NotificationToUser` DROP FOREIGN KEY `_NotificationToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_NotificationToUser` DROP FOREIGN KEY `_NotificationToUser_B_fkey`;

-- DropTable
DROP TABLE `_NotificationToUser`;

-- CreateTable
CREATE TABLE `_received` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_received_AB_unique`(`A`, `B`),
    INDEX `_received_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_readBy` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_readBy_AB_unique`(`A`, `B`),
    INDEX `_readBy_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_received` ADD CONSTRAINT `_received_A_fkey` FOREIGN KEY (`A`) REFERENCES `Notification`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_received` ADD CONSTRAINT `_received_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_readBy` ADD CONSTRAINT `_readBy_A_fkey` FOREIGN KEY (`A`) REFERENCES `Notification`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_readBy` ADD CONSTRAINT `_readBy_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
