/*
  Warnings:

  - You are about to drop the column `showed` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `AsciiSecretQr` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twoFactorAuth` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ChannelMember" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "showed",
ADD COLUMN     "notSendTo" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "AsciiSecretQr",
DROP COLUMN "hash",
DROP COLUMN "twoFactorAuth",
ADD COLUMN     "isTwoFactorAuthEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "twoFactorAuthSecret" TEXT;

-- CreateTable
CREATE TABLE "MutedMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "unmuted_at" TIMESTAMP(3) NOT NULL,
    "channelId" TEXT NOT NULL,

    CONSTRAINT "MutedMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MutedMember_userId_channelId_key" ON "MutedMember"("userId", "channelId");

-- AddForeignKey
ALTER TABLE "MutedMember" ADD CONSTRAINT "MutedMember_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
