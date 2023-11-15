/*
  Warnings:

  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Notification";

-- CreateTable
CREATE TABLE "NotificationTable" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receivedId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationTable_pkey" PRIMARY KEY ("id")
);
