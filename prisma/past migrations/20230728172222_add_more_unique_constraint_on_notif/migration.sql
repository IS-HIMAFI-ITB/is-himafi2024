/*
  Warnings:

  - A unique constraint covering the columns `[title,description,type]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Notification` MODIFY `description` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Notification_title_description_type_key` ON `Notification`(`title`, `description`, `type`);
