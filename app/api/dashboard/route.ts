import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      image: true,
      points: true,
      streak: true,
      lastActiveDate: true,
    },
  });

  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentAnalyses = await prisma.sessionAnalysis.findMany({
    where: {
      userId: user.id,
      createdAt: { gte: sevenDaysAgo },
    },
    orderBy: { createdAt: "asc" },
  });

  const allAnalyses = await prisma.sessionAnalysis.findMany({
    where: { userId: user.id },
    select: {
      fluency: true,
      clarity: true,
      helpfulness: true,
      durationSecs: true,
      fillerWords: true,
      englishScore: true,
    },
  });

  const recentTransactions = await prisma.pointTransaction.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const totalSessions = allAnalyses.length;
  const totalSpeakingSeconds = allAnalyses.reduce((sum, a) => sum + a.durationSecs, 0);

  const avgFluency = totalSessions > 0
    ? Math.round(allAnalyses.reduce((sum, a) => sum + a.fluency, 0) / totalSessions * 10) / 10
    : 0;

  const avgClarity = totalSessions > 0
    ? Math.round(allAnalyses.reduce((sum, a) => sum + a.clarity, 0) / totalSessions * 10) / 10
    : 0;

  const avgEnglishScore = totalSessions > 0
    ? Math.round(allAnalyses.reduce((sum, a) => sum + a.englishScore, 0) / totalSessions)
    : 100;

  const avgFillerWords = totalSessions > 0
    ? Math.round(allAnalyses.reduce((sum, a) => sum + a.fillerWords, 0) / totalSessions * 10) / 10
    : 0;

  const weakAreas = [];
  if (avgFluency < 6) weakAreas.push("Fluency");
  if (avgClarity < 6) weakAreas.push("Clarity");
  if (avgEnglishScore < 80) weakAreas.push("English consistency");
  if (avgFillerWords > 5) weakAreas.push("Filler words");

  const graphData = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    const dayAnalyses = recentAnalyses.filter((a) => {
      return a.createdAt.toISOString().split("T")[0] === dateStr;
    });

    graphData.push({
      date: dateStr,
      sessions: dayAnalyses.length,
      avgFluency: dayAnalyses.length > 0
        ? Math.round(dayAnalyses.reduce((sum, a) => sum + a.fluency, 0) / dayAnalyses.length * 10) / 10
        : null,
      avgClarity: dayAnalyses.length > 0
        ? Math.round(dayAnalyses.reduce((sum, a) => sum + a.clarity, 0) / dayAnalyses.length * 10) / 10
        : null,
      speakingSeconds: dayAnalyses.reduce((sum, a) => sum + a.durationSecs, 0),
    });
  }

  const recentSessions = await prisma.sessionAnalysis.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      fluency: true,
      clarity: true,
      helpfulness: true,
      durationSecs: true,
      feedback: true,
      englishScore: true,
      createdAt: true,
    },
  });

  return Response.json({
    user: {
      name: user.name,
      image: user.image,
      points: user.points,
      streak: user.streak,
    },
    stats: {
      totalSessions,
      totalSpeakingSeconds,
      avgFluency,
      avgClarity,
      avgEnglishScore,
      avgFillerWords,
      weakAreas,
    },
    graphData,
    recentSessions, 
    recentTransactions, 
  });
}