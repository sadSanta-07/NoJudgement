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
    select: { id: true },
  });

  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const analyses = await prisma.sessionAnalysis.findMany({
    where: {
      userId: user.id,
      createdAt: { gte: oneYearAgo },
    },
    select: {
      createdAt: true,
      durationSecs: true,
    },
    orderBy: { createdAt: "asc" },
  });

  const heatmapMap: Record<string, { sessions: number; speakingSeconds: number }> = {};

  analyses.forEach((a) => {
    const date = a.createdAt.toISOString().split("T")[0];
    if (!heatmapMap[date]) {
      heatmapMap[date] = { sessions: 0, speakingSeconds: 0 };
    }
    heatmapMap[date].sessions += 1;
    heatmapMap[date].speakingSeconds += a.durationSecs;
  });
  const heatmap = [];
  for (let i = 364; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    heatmap.push({
      date: dateStr,
      sessions: heatmapMap[dateStr]?.sessions || 0,
      speakingSeconds: heatmapMap[dateStr]?.speakingSeconds || 0,
    });
  }

  return Response.json({ heatmap });
}