-- AlterTable
ALTER TABLE `Event` ADD COLUMN `enablePresensi` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `description` TEXT NULL;
