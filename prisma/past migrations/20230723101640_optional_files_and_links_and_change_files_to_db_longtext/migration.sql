-- AlterTable
ALTER TABLE `Submission` ALTER COLUMN `submittedAt` DROP DEFAULT,
    MODIFY `files` LONGTEXT NULL,
    MODIFY `links` LONGTEXT NULL;
