/*
  Warnings:

  - You are about to drop the `DirectMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DirectMessage" DROP CONSTRAINT "DirectMessage_senderId_fkey";

-- DropTable
DROP TABLE "DirectMessage";

-- CreateTable
CREATE TABLE "Message" (
    "idDirectMessage" BOOLEAN NOT NULL,
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "showed" BOOLEAN NOT NULL DEFAULT true,
    "senderId" TEXT NOT NULL,
    "receivedId" TEXT NOT NULL,
    "messageStatus" "MessageStatus" NOT NULL DEFAULT 'NotReceived',

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receivedId_fkey" FOREIGN KEY ("receivedId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
