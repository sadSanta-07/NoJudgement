-- AlterTable
ALTER TABLE "MatchSession" ADD COLUMN     "level" TEXT NOT NULL DEFAULT 'beginner',
ADD COLUMN     "topic" TEXT NOT NULL DEFAULT 'casual';
