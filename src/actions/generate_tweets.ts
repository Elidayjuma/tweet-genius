"use server";

import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY! });


export async function generateTweets(prompt: string, noOftweets: string): Promise<string[]> {
  if (!prompt.trim()) return [];

  try {
    const basePrompt = `Based on this prompt, generate ${noOftweets} tweets.
Job Description:
${prompt}
Return ONLY an array like:
[
  "tweet 1",
  "tweet 2",
  ...
]

Do not include any explanation or commentary.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: basePrompt,
        },
      ],
      max_tokens: 1000,
    });

    const content = response.choices[0].message?.content?.trim();
    if (!content) return [];

    // Try parsing JSON array if possible
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        return parsed.map((tweet: string) => tweet.trim()).filter(Boolean);
      }
    } catch {
      // Fallback to line-based parsing
      return content
        .split('\n')
        .map((tweet) => tweet.replace(/^[-*\d.]+\s*/, '').replace(/^"|"$/g, '').trim())
        .filter(Boolean);
    }

    return [];
  } catch (error) {
    console.error("Error generating tweets:", error);
    return [];
  }
}
