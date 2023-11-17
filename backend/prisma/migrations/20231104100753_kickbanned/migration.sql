-- CreateTable
CREATE TABLE "KickedMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kicked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "channelId" TEXT NOT NULL,

    CONSTRAINT "KickedMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BannedMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "banned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "channelId" TEXT NOT NULL,

    CONSTRAINT "BannedMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KickedMember_userId_channelId_key" ON "KickedMember"("userId", "channelId");

-- CreateIndex
CREATE UNIQUE INDEX "BannedMember_userId_channelId_key" ON "BannedMember"("userId", "channelId");

-- AddForeignKey
ALTER TABLE "KickedMember" ADD CONSTRAINT "KickedMember_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BannedMember" ADD CONSTRAINT "BannedMember_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
