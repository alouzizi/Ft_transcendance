-- CreateTable
CREATE TABLE "MutedMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "muted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "channelId" TEXT NOT NULL,

    CONSTRAINT "MutedMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MutedMember_userId_channelId_key" ON "MutedMember"("userId", "channelId");

-- AddForeignKey
ALTER TABLE "MutedMember" ADD CONSTRAINT "MutedMember_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
