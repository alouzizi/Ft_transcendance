/*
  Warnings:

  - You are about to drop the column `type` on the `NotificationTable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NotificationTable" DROP COLUMN "type";

-- DropEnum
DROP TYPE "NotificationType";
