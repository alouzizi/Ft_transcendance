/*
  Warnings:

  - Made the column `channelId` on table `ChannelMember` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ChannelMember" DROP CONSTRAINT "ChannelMember_channelId_fkey";

-- AlterTable
ALTER TABLE "ChannelMember" ALTER COLUMN "channelId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "receivedId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ChannelMember" ADD CONSTRAINT "ChannelMember_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
