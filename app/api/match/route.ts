import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { level, topic } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  // Try to find exact match first, then level-only match
  let waitingSession = await prisma.matchSession.findFirst({
    where: { status: "waiting", level, topic, user1Id: { not: user.id } },
  });

  if (!waitingSession) {
    waitingSession = await prisma.matchSession.findFirst({
      where: { status: "waiting", level, user1Id: { not: user.id } },
    });
  }

  if (waitingSession) {
    const updated = await prisma.matchSession.update({
      where: { id: waitingSession.id },
      data: { user2Id: user.id, status: "active" },
    });
    return Response.json({ session: updated, isUser2: true });
  }

  // No match found — create new waiting session
  const newSession = await prisma.matchSession.create({
    data: { user1Id: user.id, status: "waiting", level, topic },
  });

  return Response.json({ session: newSession, isUser2: false });
}