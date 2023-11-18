/*
  Warnings:

  - You are about to drop the column `channelCreator` on the `Channel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_channelCreator_fkey";

-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "channelCreator",
ALTER COLUMN "channelOwnerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_channelOwnerId_fkey" FOREIGN KEY ("channelOwnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
