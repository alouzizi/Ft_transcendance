/*
  Warnings:

  - You are about to drop the column `grade` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "grade",
DROP COLUMN "level";
