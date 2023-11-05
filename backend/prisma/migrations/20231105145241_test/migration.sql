-- AlterTable
ALTER TABLE "BlockedUser" ALTER COLUMN "receivedId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "DirectMessage" ALTER COLUMN "receivedId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Friend" ALTER COLUMN "receivedId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "FriendRequest" ALTER COLUMN "receivedId" SET DATA TYPE TEXT;
