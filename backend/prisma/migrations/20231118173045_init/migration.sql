/*
  Warnings:

  - You are about to drop the column `receiverUsr` on the `GameHistory` table. All the data in the column will be lost.
  - You are about to drop the column `senderUsr` on the `GameHistory` table. All the data in the column will be lost.
  - Added the required column `receiverId` to the `GameHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `GameHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GameHistory" DROP CONSTRAINT "GameHistory_senderUsr_fkey";

-- AlterTable
ALTER TABLE "GameHistory" DROP COLUMN "receiverUsr",
DROP COLUMN "senderUsr",
ADD COLUMN     "receiverId" TEXT NOT NULL,
ADD COLUMN     "senderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "GameHistory" ADD CONSTRAINT "GameHistory_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
