/*
  Warnings:

  - You are about to drop the column `receivedId` on the `GameHistory` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `GameHistory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[senderUsr,receiverUsr]` on the table `GameHistory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `receiverUsr` to the `GameHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderUsr` to the `GameHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GameHistory" DROP CONSTRAINT "GameHistory_senderId_fkey";

-- DropIndex
DROP INDEX "GameHistory_senderId_receivedId_key";

-- AlterTable
ALTER TABLE "GameHistory" DROP COLUMN "receivedId",
DROP COLUMN "senderId",
ADD COLUMN     "receiverUsr" TEXT NOT NULL,
ADD COLUMN     "senderUsr" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GameHistory_senderUsr_receiverUsr_key" ON "GameHistory"("senderUsr", "receiverUsr");

-- AddForeignKey
ALTER TABLE "GameHistory" ADD CONSTRAINT "GameHistory_senderUsr_fkey" FOREIGN KEY ("senderUsr") REFERENCES "User"("nickname") ON DELETE RESTRICT ON UPDATE CASCADE;
