import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  const topUsers = await prisma.user.findMany({
    orderBy: { points: "desc" },
    take: 50,
    select: {
      id: true,
      name: true,
      image: true,
      points: true,
      streak: true,
      _count: {
        select: { sessionAnalyses: true },
      },
    },
  });

  const userRank = topUsers.findIndex((u) => u.id === currentUser?.id) + 1;

  let currentUserData = null;
  if (userRank === 0 && currentUser) {
    const higherUsers = await prisma.user.count({
      where: { points: { gt: (await prisma.user.findUnique({
        where: { id: currentUser.id },
        select: { points: true }
      }))?.points ?? 0 }},
    });

    currentUserData = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: {
        id: true,
        name: true,
        image: true,
        points: true,
        streak: true,
        _count: { select: { sessionAnalyses: true } },
      },
    });

    currentUserData = {
      ...currentUserData,
      rank: higherUsers + 1,
    };
  }

  return Response.json({
    leaderboard: topUsers.map((u, i) => ({
      rank: i + 1,
      id: u.id,
      name: u.name,
      image: u.image,
      points: u.points,
      streak: u.streak,
      totalSessions: u._count.sessionAnalyses,
      isCurrentUser: u.id === currentUser?.id,
    })),
    currentUserRank: userRank || currentUserData?.rank || null,
    currentUserData: userRank === 0 ? currentUserData : null,
  });
}