/*
  Warnings:

  - You are about to drop the column `showed` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "showed",
ADD COLUMN     "notSendTo" TEXT NOT NULL DEFAULT '';
