/*
  Warnings:

  - You are about to drop the column `subjet` on the `NotificationTable` table. All the data in the column will be lost.
  - Added the required column `subject` to the `NotificationTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NotificationTable" DROP COLUMN "subjet",
ADD COLUMN     "subject" TEXT NOT NULL;
