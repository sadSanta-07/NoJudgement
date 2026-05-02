import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

const POINT_RULES = {
  session_complete: 10,
  left_early: -10,
  non_english: -15,
  good_rating: 5,
} as const;

type PointReason = keyof typeof POINT_RULES;

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isYesterday(date: Date, today: Date) {
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return isSameDay(date, yesterday);
}

async function updateStreak(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { streak: true, lastActiveDate: true },
  });

  if (!user) return;

  const today = new Date();

  if (user.lastActiveDate) {
    if (isSameDay(user.lastActiveDate, today)) {
      return;
    } else if (isYesterday(user.lastActiveDate, today)) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          streak: user.streak + 1,
          lastActiveDate: today,
        },
      });
    } else {
      await prisma.user.update({
        where: { id: userId },
        data: {
          streak: 1,
          lastActiveDate: today,
        },
      });
    }
  } else {
    await prisma.user.update({
      where: { id: userId },
      data: {
        streak: 1,
        lastActiveDate: today,
      },
    });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { reason } = await req.json() as { reason: PointReason };

  if (!POINT_RULES[reason]) {
    return Response.json({ error: "Invalid reason" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  const amount = POINT_RULES[reason];

  const [updatedUser] = await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { points: { increment: amount } },
    }),
    prisma.pointTransaction.create({
      data: {
        userId: user.id,
        amount,
        reason,
      },
    }),
  ]);

  if (amount > 0) {
    await updateStreak(user.id);
  }

  return Response.json({
    points: updatedUser.points,
    change: amount,
    reason,
  });
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      points: true,
      streak: true,
      lastActiveDate: true,
      pointTransactions: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  });

  return Response.json(user);
}