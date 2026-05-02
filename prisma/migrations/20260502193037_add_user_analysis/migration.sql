-- CreateTable
CREATE TABLE "SessionAnalysis" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionId" TEXT,
    "fluency" INTEGER NOT NULL,
    "clarity" INTEGER NOT NULL,
    "helpfulness" INTEGER NOT NULL,
    "fillerWords" INTEGER NOT NULL,
    "feedback" TEXT NOT NULL,
    "strongPoints" TEXT NOT NULL,
    "improvePoints" TEXT NOT NULL,
    "englishScore" INTEGER NOT NULL DEFAULT 100,
    "durationSecs" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionAnalysis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SessionAnalysis" ADD CONSTRAINT "SessionAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
