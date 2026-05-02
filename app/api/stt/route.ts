import Groq from "groq-sdk";
import { NextRequest } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return Response.json({ error: "No audio file" }, { status: 400 });
    }

    // Groq Whisper transcription
    const transcription = await groq.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-large-v3-turbo",
      response_format: "json",
      language: "en",
    });

    const transcript = transcription.text?.trim() || "";
    console.log("Transcript:", transcript);

    // Simple English detection — check for non-latin characters
    const nonLatinRatio = (transcript.match(/[^\x00-\x7F]/g) || []).length / (transcript.length || 1);
    const englishScore = Math.round((1 - nonLatinRatio) * 100);
    const isEnglish = englishScore >= 60;

    return Response.json({
      transcript,
      isEnglish,
      englishScore,
      warning: isEnglish ? null : "Please speak in English",
    });

  } catch (err) {
    console.error("STT error:", err);
    return Response.json({
      transcript: "",
      isEnglish: true,
      englishScore: 100,
      warning: null,
    });
  }
}