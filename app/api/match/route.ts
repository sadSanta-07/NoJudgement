import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { level, topic, roomId } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  const existing = await prisma.matchSession.findFirst({
    where: { id: roomId },
  });

  if (existing) {
    const updated = await prisma.matchSession.update({
      where: { id: roomId },
      data: { user2Id: user.id, status: "active" },
    });
    return Response.json({ session: updated });
  }

  const newSession = await prisma.matchSession.create({
    data: {
      id: roomId,
      user1Id: user.id,
      status: "waiting",
      level,
      topic,
    },
  });

  return Response.json({ session: newSession });
}