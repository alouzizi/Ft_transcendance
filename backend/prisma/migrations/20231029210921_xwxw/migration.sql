-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_receivedId_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "channelId" TEXT;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
