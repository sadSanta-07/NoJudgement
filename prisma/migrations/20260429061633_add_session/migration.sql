-- CreateTable
CREATE TABLE "MatchSession" (
    "id" TEXT NOT NULL,
    "user1Id" TEXT NOT NULL,
    "user2Id" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MatchSession" ADD CONSTRAINT "MatchSession_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchSession" ADD CONSTRAINT "MatchSession_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
