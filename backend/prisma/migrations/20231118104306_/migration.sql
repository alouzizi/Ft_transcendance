/*
  Warnings:

  - You are about to drop the column `inviteLink` on the `Channel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "inviteLink";

-- CreateTable
CREATE TABLE "NotificationTable" (
    "id" TEXT NOT NULL,
    "subjet" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "recieverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "receivedId" TEXT,

    CONSTRAINT "NotificationTable_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NotificationTable" ADD CONSTRAINT "NotificationTable_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
