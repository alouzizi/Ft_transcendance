-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "isDirectMessage" DROP NOT NULL,
ALTER COLUMN "isDirectMessage" DROP DEFAULT;
