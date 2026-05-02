import Groq from "groq-sdk";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { transcript, durationSeconds, sessionId } = await req.json();

    if (!transcript || transcript.trim().length < 10) {
      return Response.json({
        fluency: 0,
        clarity: 0,
        helpfulness: 0,
        fillerWords: 0,
        englishScore: 100,
        feedback: "Not enough speech detected to analyze.",
        strongPoints: "You showed up and practiced!",
        improvePoints: "Try to speak for longer next time.",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are an English speaking coach. Always respond with valid JSON only, no markdown.",
        },
        {
          role: "user",
          content: `Analyze this English speaking session transcript (${durationSeconds} seconds):

"${transcript}"

Respond ONLY with this JSON:
{
  "fluency": <0-10>,
  "clarity": <0-10>,
  "helpfulness": <0-10>,
  "fillerWords": <count of uh/um/like/you know>,
  "feedback": "<2-3 sentence constructive feedback>",
  "strongPoints": "<one thing they did well>",
  "improvePoints": "<one specific thing to improve>"
}`,
        },
      ],
      temperature: 0.3,
    });

    const text = completion.choices[0]?.message?.content || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    const nonLatinRatio = (transcript.match(/[^\x00-\x7F]/g) || []).length / (transcript.length || 1);
    const englishScore = Math.round((1 - nonLatinRatio) * 100);

    const result = { ...parsed, englishScore, durationSecs: durationSeconds };
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (user) {
        await prisma.sessionAnalysis.create({
          data: {
            userId: user.id,
            sessionId: sessionId || null,
            fluency: parsed.fluency,
            clarity: parsed.clarity,
            helpfulness: parsed.helpfulness,
            fillerWords: parsed.fillerWords,
            feedback: parsed.feedback,
            strongPoints: parsed.strongPoints,
            improvePoints: parsed.improvePoints,
            englishScore,
            durationSecs: durationSeconds,
          },
        });
      }
    }

    return Response.json(result);
  } catch (err) {
    console.error("Analysis error:", err);
    return Response.json({
      fluency: 5,
      clarity: 5,
      helpfulness: 5,
      fillerWords: 0,
      englishScore: 100,
      feedback: "Could not analyze session.",
      strongPoints: "Keep practicing!",
      improvePoints: "Speak clearly and in English.",
    });
  }
}