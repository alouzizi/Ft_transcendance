/*
  Warnings:

  - You are about to drop the column `muted_at` on the `MutedMember` table. All the data in the column will be lost.
  - Added the required column `unmuted_at` to the `MutedMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MutedMember" DROP COLUMN "muted_at",
ADD COLUMN     "unmuted_at" TIMESTAMP(3) NOT NULL;
