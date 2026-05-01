import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { transcript, durationSeconds } = await req.json();

    if (!transcript || transcript.trim().length < 10) {
      return Response.json({
        fluency: 0,
        clarity: 0,
        helpfulness: 0,
        feedback: "Not enough speech detected to analyze.",
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(`
You are an English speaking coach. Analyze this conversation transcript from a ${durationSeconds}s speaking session.

Transcript:
"${transcript}"

Respond ONLY with a JSON object:
{
  "fluency": <0-10>,
  "clarity": <0-10>,
  "helpfulness": <0-10>,
  "fillerWords": <count of uh/um/like/you know>,
  "feedback": "<2-3 sentence constructive feedback>",
  "strongPoints": "<one thing they did well>",
  "improvePoints": "<one specific thing to improve>"
}

Return ONLY the JSON, no markdown.
    `);

    const text = result.response.text().trim();
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return Response.json(parsed);
  } catch (err) {
    console.error("Analysis error:", err);
    return Response.json({ error: "Analysis failed" }, { status: 500 });
  }
}