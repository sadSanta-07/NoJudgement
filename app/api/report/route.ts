import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

const AUTO_BAN_THRESHOLD = 3;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { reportedUserId, reason, sessionId } = await req.json() as {
    reportedUserId: string;
    reason: string;
    sessionId?: string;
  };

  if (!reportedUserId || !reason) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const reporter = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!reporter) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  if (reporter.id === reportedUserId) {
    return Response.json({ error: "Cannot report yourself" }, { status: 400 });
  }

  const existingReport = await prisma.report.findFirst({
    where: {
      reporterId: reporter.id,
      reportedId: reportedUserId,
      createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    },
  });

  if (existingReport) {
    return Response.json({ error: "Already reported this user today" }, { status: 429 });
  }

  await prisma.report.create({
    data: {
      reporterId: reporter.id,
      reportedId: reportedUserId,
      reason,
      sessionId: sessionId || null,
    },
  });

  const reportCount = await prisma.report.count({
    where: { reportedId: reportedUserId },
  });

  if (reportCount >= AUTO_BAN_THRESHOLD) {
    await prisma.user.update({
      where: { id: reportedUserId },
      data: { isBanned: true },
    });

    console.log(`User ${reportedUserId} auto-banned after ${reportCount} reports`);
  }

  return Response.json({
    success: true,
    message: "Report submitted",
  });
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reports = await prisma.report.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      reporter: { select: { name: true, email: true } },
      reported: { select: { name: true, email: true, isBanned: true } },
    },
  });

  return Response.json({ reports });
}