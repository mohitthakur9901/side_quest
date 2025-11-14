-- AlterTable
ALTER TABLE "Quest" ADD COLUMN     "acceptedAt" TIMESTAMP(3),
ADD COLUMN     "assignedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "QuestApplication" ADD COLUMN     "isFirstAccepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "responseTime" INTEGER;
