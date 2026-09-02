import { detectEmotions, findRelevantShloka } from "../lib/logic";

export interface AIGuidance {
  id: string;
  theme: string;
  shloka: string;
  reference: string;
  meaning: string;
  guidance: string;
  example: string;
  imageUrl?: string;
}

/**
 * Generates a cinematic spiritual image via the server-side proxy.
 * Handles permission and quota constraints gracefully without throwing unhandled errors.
 */
export async function generateSpiritualImage(prompt: string): Promise<string | undefined> {
  try {
    const res = await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      return undefined;
    }

    const data = await res.json();
    return data.imageUrl || undefined;
  } catch (error) {
    // Non-critical image generation error, silenced to keep UX smooth
    return undefined;
  }
}

/**
 * Fetches relevant Bhagavad Gita wisdom via the server-side API endpoint.
 * Fallbacks gracefully to the curated Bhagavad Gita library if network or service error occurs.
 */
export async function getGitaWisdom(problem: string, language: string = "English"): Promise<AIGuidance> {
  try {
    const res = await fetch("/api/guidance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problem, language }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.shloka && data.reference) {
        return {
          id: data.id || data.reference,
          theme: data.theme || "Spiritual Guidance",
          shloka: data.shloka,
          reference: data.reference,
          meaning: data.meaning,
          guidance: data.guidance,
          example: data.example,
        };
      }
    }
  } catch (err) {
    console.warn("Server guidance failed, using curated shloka engine:", err);
  }

  // Graceful fallback to curated wisdom database
  const emotions = detectEmotions(problem);
  const matched = findRelevantShloka(emotions);
  const isMR = language.toLowerCase().includes("marathi") || language === "mr";

  return {
    id: matched.id,
    theme: matched.theme,
    shloka: matched.shloka,
    reference: matched.reference,
    meaning: isMR ? matched.meaning_mr : matched.meaning_en,
    guidance: isMR ? matched.guidance_mr : matched.guidance_en,
    example: matched.example,
  };
}
