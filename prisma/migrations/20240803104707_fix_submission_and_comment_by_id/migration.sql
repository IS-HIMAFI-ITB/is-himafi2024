-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_submissionById_fkey";

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_submissionById_fkey" FOREIGN KEY ("submissionById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
