-- AlterTable
ALTER TABLE `Submission` ALTER COLUMN `submittedAt` DROP DEFAULT,
    MODIFY `links` LONGTEXT NOT NULL;
