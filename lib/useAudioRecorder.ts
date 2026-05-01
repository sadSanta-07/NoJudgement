import { useRef, useCallback } from "react";

interface ChunkResult {
  transcript: string;
  isEnglish: boolean;
  englishScore: number;
  warning: string | null;
}

export function useAudioRecorder(
  onChunkResult: (result: ChunkResult) => void
) {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const fullTranscriptRef = useRef<string>("");

  const start = useCallback((stream: MediaStream) => {
    const recorder = new MediaRecorder(stream, {
      mimeType: MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/ogg",
    });

    recorderRef.current = recorder;

    recorder.ondataavailable = async (event) => {
      if (event.data.size < 1000) return; // skip tiny/silent chunks

      try {
        const formData = new FormData();
        formData.append("audio", event.data, "chunk.webm");

        const res = await fetch("/api/stt", {
          method: "POST",
          body: formData,
        });

        const result: ChunkResult = await res.json();
        console.log("STT result:", result);

        if (result.transcript) {
          fullTranscriptRef.current += " " + result.transcript;
        }

        onChunkResult(result);
      } catch (err) {
        console.error("Chunk processing error:", err);
      }
    };

    recorder.start(3000); // every 3 seconds
    console.log("Audio recorder started");
  }, [onChunkResult]);

  const stop = useCallback(() => {
    recorderRef.current?.stop();
    console.log("Audio recorder stopped");
  }, []);

  const getFullTranscript = useCallback(() => {
    return fullTranscriptRef.current.trim();
  }, []);

  return { start, stop, getFullTranscript };
}