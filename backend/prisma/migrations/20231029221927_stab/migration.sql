/*
  Warnings:

  - Made the column `isDirectMessage` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "isDirectMessage" SET NOT NULL,
ALTER COLUMN "isDirectMessage" SET DEFAULT true;
