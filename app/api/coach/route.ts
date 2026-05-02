import Groq from "groq-sdk";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  const messages = await prisma.coachMessage.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
    take: 50, 
  });

  return Response.json({ messages });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  const { message } = await req.json() as { message: string };

  if (!message?.trim()) {
    return Response.json({ error: "Empty message" }, { status: 400 });
  }

  const history = await prisma.coachMessage.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
    take: 20,
  });

  const historyMessages: Message[] = history.map((m) => ({
    role: m.role as "user" | "assistant",
    content: m.content,
  }));

  await prisma.coachMessage.create({
    data: {
      userId: user.id,
      role: "user",
      content: message,
    },
  });

  const systemPrompt = `You are NoJudgment AI Coach, a friendly and encouraging English speaking coach.
Help users improve their English speaking skills through conversation practice, tips, and exercises.
Be specific, encouraging, and practical. Keep responses concise (2-4 sentences).
If the user wants to practice speaking, give them prompts and correct their grammar kindly.`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        ...historyMessages,
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const reply = completion.choices[0]?.message?.content || 
      "Sorry, I couldn't respond. Try again.";

    await prisma.coachMessage.create({
      data: {
        userId: user.id,
        role: "assistant",
        content: reply,
      },
    });

    return Response.json({ reply });
  } catch (err) {
    console.error("Coach error:", err);
    return Response.json({ 
      reply: "Sorry, I'm having trouble responding right now." 
    });
  }
}

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  await prisma.coachMessage.deleteMany({
    where: { userId: user.id },
  });

  return Response.json({ success: true });
}