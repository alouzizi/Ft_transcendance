-- CreateTable
CREATE TABLE "GameRanking" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderUsr" TEXT NOT NULL,
    "rank" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GameRanking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameRanking_senderUsr_key" ON "GameRanking"("senderUsr");

-- AddForeignKey
ALTER TABLE "GameRanking" ADD CONSTRAINT "GameRanking_senderUsr_fkey" FOREIGN KEY ("senderUsr") REFERENCES "User"("nickname") ON DELETE RESTRICT ON UPDATE CASCADE;
