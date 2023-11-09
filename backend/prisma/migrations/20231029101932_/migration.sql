-- CreateEnum
CREATE TYPE "ChannelType" AS ENUM ('Public', 'Private');

-- CreateTable
CREATE TABLE "Channel" (
    "id" TEXT NOT NULL,
    "channelName" TEXT NOT NULL,
    "channelType" "ChannelType" NOT NULL DEFAULT 'Public',
    "channelPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "channelOwnerId" TEXT NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChannelMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,
    "channelId" TEXT,

    CONSTRAINT "ChannelMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Channel_channelName_key" ON "Channel"("channelName");

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_channelOwnerId_fkey" FOREIGN KEY ("channelOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelMember" ADD CONSTRAINT "ChannelMember_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
