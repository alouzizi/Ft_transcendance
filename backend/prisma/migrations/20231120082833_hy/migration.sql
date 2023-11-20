/*
  Warnings:

  - You are about to drop the column `numberSession` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "numberSession",
ADD COLUMN     "inGaming" BOOLEAN NOT NULL DEFAULT false;
