import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "GitaLens" });
  });

  // Server-side Gemini AI guidance route
  app.post("/api/guidance", async (req, res) => {
    const { problem, language = "English" } = req.body;
    if (!problem) {
      return res.status(400).json({ error: "Problem text is required." });
    }

    const ai = getAI();
    if (!ai) {
      return res.status(500).json({ 
        error: "Gemini API key not configured on server.",
        fallback: true 
      });
    }

    try {
      const prompt = `You are a spiritual guide inspired by the Bhagavad Gita. 
A seeker comes to you with this problem: "${problem}".

Provide wisdom in ${language}.

Return a JSON object:
{
  "theme": "Title",
  "shloka": "Sanskrit Shloka",
  "reference": "Chapter X, Verse Y",
  "meaning": "Translation in ${language}",
  "guidance": "Advice in ${language}",
  "example": "Modern scenario in ${language}"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              theme: { type: Type.STRING },
              shloka: { type: Type.STRING },
              reference: { type: Type.STRING },
              meaning: { type: Type.STRING },
              guidance: { type: Type.STRING },
              example: { type: Type.STRING },
            },
            required: ["theme", "shloka", "reference", "meaning", "guidance", "example"],
          },
        },
      });

      const result = JSON.parse(response.text || "{}");
      return res.json({ ...result, id: result.reference || "Chapter 2, Verse 47" });
    } catch (err: any) {
      console.error("Server guidance error:", err);
      return res.status(500).json({ 
        error: err?.message || "Failed to generate guidance",
        fallback: true 
      });
    }
  });

  // Server-side Image Generation route (with robust error handling for restricted / non-permitted keys)
  app.post("/api/generate-image", async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const ai = getAI();
    if (!ai) {
      return res.json({ imageUrl: null, warning: "API key not configured" });
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-image",
        contents: {
          parts: [
            {
              text: `A cinematic, highly spiritual and aetherial scene. Theme: ${prompt}. Hindu philosophy vibes, divine golden light, meditative atmosphere, high resolution, 16:9 aspect ratio.`,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
          },
        },
      });

      let imageUrl: string | null = null;
      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          break;
        }
      }

      return res.json({ imageUrl });
    } catch (err: any) {
      // Gracefully handle 403 / permission errors or lack of quota without failing the request
      console.warn("Spiritual image generation skipped:", err?.message || err);
      return res.json({ 
        imageUrl: null, 
        warning: "Image generation currently unavailable on current credentials" 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        host: "0.0.0.0",
        port: 3000
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✨ GitaLens Wisdom Server running on http://localhost:${PORT}`);
  });
}

startServer();
