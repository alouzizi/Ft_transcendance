/*
  Warnings:

  - You are about to drop the `GameRanking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GameRanking" DROP CONSTRAINT "GameRanking_senderUsr_fkey";

-- DropTable
DROP TABLE "GameRanking";
