export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { preMood, preMoodLabel, postMood, postMoodLabel } = req.body;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,   // safely stored in Vercel env vars
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system:
          "You are FocusBuddy, a warm supportive AI companion for ADHD students. " +
          "Respond in exactly 1-2 sentences. Be specific about their mood change. " +
          "Feel genuine and human, not corporate. Never give medical advice.",
        messages: [
          {
            role: "user",
            content: `Just finished a 25-min focus sprint! Mood: ${preMood} ${preMoodLabel} → ${postMood} ${postMoodLabel}. Please cheer me on!`,
          },
        ],
      }),
    });

    const data = await response.json();
    const message = data.content[0].text;
    return res.status(200).json({ message });

  } catch (error) {
    console.error("Anthropic API error:", error);
    // Fallback message so the UI never breaks
    return res.status(200).json({
      message: "You showed up and followed through — that's the hardest part, and you nailed it! 🌟",
    });
  }
}
