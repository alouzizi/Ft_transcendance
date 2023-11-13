/*
  Warnings:

  - Added the required column `isTwoFactorAuthEnabled` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isTwoFactorAuthEnabled" BOOLEAN NOT NULL,
ADD COLUMN     "twoFactorAuthSecret" TEXT;
