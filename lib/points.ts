export async function awardPoints(reason: "session_complete" | "left_early" | "non_english" | "good_rating") {
  try {
    const res = await fetch("/api/points", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason }),
    });
    const data = await res.json();
    console.log(`Points ${data.change > 0 ? "+" : ""}${data.change} (${reason}) → total: ${data.points}`);
    return data;
  } catch (err) {
    console.error("Points update failed:", err);
  }
}