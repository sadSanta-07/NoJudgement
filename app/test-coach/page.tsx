"use client";
import { useState, useEffect } from "react";

export default function TestCoach() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("/api/coach")
      .then((r) => r.json())
      .then((d) => {
        setMessages(d.messages || []);
      })
      .catch(console.error);
  }, []);

  const send = async () => {
    if (!input.trim()) return;
    const res = await fetch("/api/coach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setInput("");
    fetch("/api/coach")
      .then((r) => r.json())
      .then((d) => setMessages(d.messages || []));
  };

  return (
    <div className="p-8 max-w-xl mx-auto space-y-4 font-mono text-xs">
      <h1 className="font-display text-2xl text-[#1d1c1a]">AI Coach Test Harness</h1>
      <div className="p-4 rounded-[10px] bg-[#fcfbf8] border border-[#e8e6e1] space-y-2 max-h-96 overflow-y-auto">
        {messages.map((m: { role: string; content: string }, i) => (
          <div key={i} className="p-2 rounded bg-[#f5f3ee]">
            <span className="font-bold uppercase text-[10px]">{m.role}: </span>
            <span>{m.content}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 border border-[#e8e6e1] rounded-[5px] bg-[#fcfbf8]"
          placeholder="Test input..."
        />
        <button onClick={send} className="px-4 py-2 bg-[#1d1c1a] text-white rounded-[5px]">
          Send
        </button>
      </div>
    </div>
  );
}
