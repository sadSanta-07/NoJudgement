import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return Response.json({ error: "No audio file" }, { status: 400 });
    }
    const audioBuffer = await audioFile.arrayBuffer();
    const base64Audio = Buffer.from(audioBuffer).toString("base64");
    const mimeType = audioFile.type || "audio/webm";

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType,
          data: base64Audio,
        },
      },
      {
        text: `Listen to this audio clip and respond ONLY with a JSON object like this:
{
  "transcript": "exact words spoken",
  "isEnglish": true or false,
  "englishScore": 0-100,
  "warning": null or "Please speak in English"
}

Rules:
- isEnglish = true only if mostly English
- englishScore = how English it is (0=no English, 100=fully English)
- If silent or unclear, set transcript to "" and isEnglish to true
- Return ONLY the JSON, no markdown, no explanation`
      }
    ]);

    const text = result.response.text().trim();
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return Response.json(parsed);
  } catch (err) {
    console.error("STT error details:", JSON.stringify(err));
    return Response.json({
      transcript: "",
      isEnglish: true,
      englishScore: 100,
      warning: null
    });
  }
}