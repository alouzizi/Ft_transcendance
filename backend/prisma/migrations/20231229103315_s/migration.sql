-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('SendMessage', 'SendRequistFriend', 'InvitedToChannel', 'InvitedPlayGame');

-- AlterTable
ALTER TABLE "NotificationTable" ADD COLUMN     "channelId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "type" "NotificationType" NOT NULL DEFAULT 'SendMessage';
