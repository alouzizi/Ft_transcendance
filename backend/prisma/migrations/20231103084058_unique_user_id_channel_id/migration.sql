/*
  Warnings:

  - A unique constraint covering the columns `[userId,channelId]` on the table `ChannelMember` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChannelMember_userId_channelId_key" ON "ChannelMember"("userId", "channelId");
