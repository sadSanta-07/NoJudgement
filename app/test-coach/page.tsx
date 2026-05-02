"use client";
import { useState, useEffect } from "react";

export default function TestCoach() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("/api/coach")
      .then((r) => r.json())
      .then((d) => {
        console.log("History:", d);
        setMessages(d.messages || []);
      });
  }, []);

  const send = async () => {
    const res = await fetch("/api/coach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    console.log("Reply:", data);
    setInput("");
    fetch("/api/coach").then(r => r.json()).then(d => setMessages(d.messages || []));
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Coach Test</h1>
      <div className="mb-4 space-y-2">
        {messages.map((m: {role: string, content: string}, i) => (
          <p key={i}><strong>{m.role}:</strong> {m.content}</p>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} className="border p-2 mr-2" />
      <button onClick={send} className="bg-blue-500 text-white px-4 py-2">Send</button>
    </div>
  );
}