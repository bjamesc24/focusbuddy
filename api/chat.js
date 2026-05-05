export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { preMood, preMoodLabel, postMood, postMoodLabel } = req.body;

  // Check the key is actually being picked up
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY is not set" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system:
          "You are FocusBuddy, a warm supportive AI companion for ADHD. " +
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

    // Log the full response so we can see any errors from Anthropic
    console.log("Anthropic response status:", response.status);
    console.log("Anthropic response body:", JSON.stringify(data));

    if (!response.ok) {
      return res.status(500).json({ error: data });
    }

    const message = data.content[0].text;
    return res.status(200).json({ message });

  } catch (error) {
    console.error("Anthropic API error:", error);
    return res.status(500).json({ error: error.message });
  }
}
