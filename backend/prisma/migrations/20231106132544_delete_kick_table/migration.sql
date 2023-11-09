/*
  Warnings:

  - You are about to drop the `KickedMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_channelOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "KickedMember" DROP CONSTRAINT "KickedMember_channelId_fkey";

-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "channelCreator" TEXT;

-- DropTable
DROP TABLE "KickedMember";

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_channelCreator_fkey" FOREIGN KEY ("channelCreator") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
