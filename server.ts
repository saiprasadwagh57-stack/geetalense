import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { SOURCE_BOOKS, getSourceById } from "./src/data/sourcesRegistry";
import { PROBLEM_TAXONOMY, PERSONA_TAXONOMY, GITA_CONCEPTS_TAXONOMY } from "./src/data/taxonomy";
import { GITA_KNOWLEDGE_GRAPH, getVerseById, getAllVerses } from "./src/data/knowledgeGraph";
import { searchGitaKnowledge, compareVerseCommentaries, checkSafetyBoundaries } from "./src/lib/knowledgeEngine";
import { RELATIONAL_POSTGRES_DDL, VECTOR_DATABASE_SCHEMA_SPEC } from "./src/lib/databaseSchemas";

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
    res.json({ status: "ok", service: "GitaLens Knowledge Base", totalVerses: GITA_KNOWLEDGE_GRAPH.length });
  });

  // 1. Source books registry endpoint (20 Marathi & English sources with copyright status)
  app.get("/api/sources", (req, res) => {
    res.json({ sources: SOURCE_BOOKS });
  });

  // 2. Taxonomies endpoint (Problems, Personas, Gita Concepts)
  app.get("/api/taxonomies", (req, res) => {
    res.json({
      problems: PROBLEM_TAXONOMY,
      personas: PERSONA_TAXONOMY,
      concepts: GITA_CONCEPTS_TAXONOMY
    });
  });

  // 3. Reverse retrieval search endpoint
  app.post("/api/search", (req, res) => {
    const { queryText, language, persona, category, selectedSourceId, limit } = req.body;
    const searchResult = searchGitaKnowledge({
      queryText: queryText || "",
      language,
      persona,
      category,
      selectedSourceId,
      limit: limit || 10
    });
    res.json(searchResult);
  });

  // 4. Single Verse with full 8-layer data endpoint
  app.get("/api/verse/:chapter/:verse", (req, res) => {
    const chapter = parseInt(req.params.chapter, 10);
    const verse = parseInt(req.params.verse, 10);
    const verseId = `BG_${chapter}_${verse}`;
    const entry = getVerseById(verseId);
    if (!entry) {
      return res.status(404).json({ error: `Verse BG ${chapter}.${verse} not found in knowledge graph.` });
    }
    res.json(entry);
  });

  // 5. Multi-Source Commentary Comparison endpoint
  app.get("/api/compare/:verseId", (req, res) => {
    const comparison = compareVerseCommentaries(req.params.verseId);
    if (!comparison.verse) {
      return res.status(404).json({ error: `Verse ${req.params.verseId} not found.` });
    }
    res.json(comparison);
  });

  // 6. Schemas and DDL inspection endpoint
  app.get("/api/schemas", (req, res) => {
    res.json({
      relationalPostgresDDL: RELATIONAL_POSTGRES_DDL,
      vectorDatabaseSpec: VECTOR_DATABASE_SCHEMA_SPEC
    });
  });

  // 7. Server-side Gemini AI guidance route (integrated with knowledge layer & crisis checks)
  app.post("/api/guidance", async (req, res) => {
    const { problem, language = "English", persona } = req.body;
    if (!problem) {
      return res.status(400).json({ error: "Problem text is required." });
    }

    // Safety boundary check
    const safety = checkSafetyBoundaries(problem);
    if (safety.isCrisis) {
      return res.json({
        isCrisis: true,
        safetyMessage: language.toLowerCase().includes("marathi") || language === "mr" 
          ? safety.safetyMessage_mr 
          : safety.safetyMessage_en,
        helplines: safety.helplines,
        theme: "Crisis Support / आपत्कालीन साहाय्य",
        reference: "Support Resource",
        shloka: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
        meaning: language.toLowerCase().includes("marathi") || language === "mr" 
          ? "सर्व चिंता सोडून ईश्वराचा आणि संकटकाळी वैद्यकीय साहाय्याचा आधार घ्या. तुम्ही एकटे नाही आहात." 
          : "Surrender your distress and seek compassionate support. You are never alone.",
        guidance: language.toLowerCase().includes("marathi") || language === "mr" 
          ? safety.safetyMessage_mr 
          : safety.safetyMessage_en,
        example: "Please reach out to the 24/7 toll-free helpline numbers provided above."
      });
    }

    // First search the structured local knowledge graph for high-precision matches
    const searchMatch = searchGitaKnowledge({ queryText: problem, language: language.toLowerCase().includes("marathi") || language === "mr" ? "mr" : "en", persona });
    const topKnowledgeVerse = searchMatch.matches[0]?.verse;

    const ai = getAI();
    if (!ai) {
      if (topKnowledgeVerse) {
        const isMr = language.toLowerCase().includes("marathi") || language === "mr";
        return res.json({
          id: topKnowledgeVerse.verse_id,
          theme: topKnowledgeVerse.canonical.chapter_theme,
          shloka: topKnowledgeVerse.canonical.shloka_devanagari,
          reference: `Chapter ${topKnowledgeVerse.chapter_number}, Verse ${topKnowledgeVerse.verse_number}`,
          meaning: isMr ? topKnowledgeVerse.translation_literal_mr : topKnowledgeVerse.translation_literal_en,
          guidance: isMr ? topKnowledgeVerse.application.gita_core_teaching_mr : topKnowledgeVerse.application.gita_core_teaching_en,
          example: isMr ? topKnowledgeVerse.application.modern_realistic_example_mr : topKnowledgeVerse.application.modern_realistic_example_en,
          knowledgeVerse: topKnowledgeVerse
        });
      }
      return res.status(500).json({ 
        error: "Gemini API key not configured on server.",
        fallback: true 
      });
    }

    const isMarathi = language.toLowerCase().includes("marathi") || language === "mr";

    const systemInstruction = `You are GitaLens, an enlightened spiritual master and compassionate counselor deeply versed in the complete 700 verses of the sacred Bhagavad Gita.
Your mission is to offer profound, direct, and actionable wisdom to solve the seeker's exact problem, emotional state, or philosophical question.

Guidelines for response:
1. "theme": A meaningful, uplifting 2-5 word title capturing the spiritual antidote (e.g., "The Power of Detached Action" / "निष्काम कर्मयोग").
2. "shloka": The exact, authentic Sanskrit Shloka from the Bhagavad Gita in Devanagari script (e.g., "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन...").
3. "reference": The precise Chapter and Verse number (e.g., "Chapter 2, Verse 47" or "अध्याय २, श्लोक ४७").
4. "meaning": A deep, clear translation and philosophical explanation of the Shloka in ${isMarathi ? "poetic, pure Marathi (मराठी)" : "clear, evocative English"}.
5. "guidance": Direct, empathetic, practical guidance ('The Soul's Path') that directly addresses the seeker's specific question: "${problem}". Provide clear mental and practical steps to shift perspective, dissolve anxiety/confusion, and master action. Must be in ${isMarathi ? "Marathi (मराठी)" : "English"}.
6. "example": A relatable, modern real-world scenario ('Material Wisdom') showing how a student, professional, artist, or leader applies this exact teaching in modern daily life. Must be in ${isMarathi ? "Marathi (मराठी)" : "English"}.

Always select the most genuinely relevant verse from the 18 chapters of the Bhagavad Gita matching the seeker's query.`;

    const prompt = `Seeker's question or problem: "${problem}".
Target Language: ${isMarathi ? "Marathi (मराठी)" : "English"}.
Provide complete and accurate spiritual insight as a JSON object.`;

    try {
      // Primary model: gemini-3.6-flash
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction,
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
      if (result.shloka && result.meaning && result.guidance) {
        return res.json({ 
          ...result, 
          id: result.reference || "Chapter 2, Verse 47",
          knowledgeVerse: topKnowledgeVerse || null
        });
      }
      throw new Error("Empty guidance output structure");
    } catch (err: any) {
      console.warn("Primary model attempt failed, trying gemini-3.7-flash:", err?.message || err);

      try {
        // Fallback attempt with gemini-3.7-flash
        const fallbackResponse = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: `${systemInstruction}\n\nSeeker Query: "${problem}"\nLanguage: ${language}`,
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

        const fallbackResult = JSON.parse(fallbackResponse.text || "{}");
        return res.json({ 
          ...fallbackResult, 
          id: fallbackResult.reference || "Chapter 2, Verse 47",
          knowledgeVerse: topKnowledgeVerse || null
        });
      } catch (fallbackErr: any) {
        console.error("All AI guidance models failed:", fallbackErr);
        if (topKnowledgeVerse) {
          const isMr = language.toLowerCase().includes("marathi") || language === "mr";
          return res.json({
            id: topKnowledgeVerse.verse_id,
            theme: topKnowledgeVerse.canonical.chapter_theme,
            shloka: topKnowledgeVerse.canonical.shloka_devanagari,
            reference: `Chapter ${topKnowledgeVerse.chapter_number}, Verse ${topKnowledgeVerse.verse_number}`,
            meaning: isMr ? topKnowledgeVerse.translation_literal_mr : topKnowledgeVerse.translation_literal_en,
            guidance: isMr ? topKnowledgeVerse.application.gita_core_teaching_mr : topKnowledgeVerse.application.gita_core_teaching_en,
            example: isMr ? topKnowledgeVerse.application.modern_realistic_example_mr : topKnowledgeVerse.application.modern_realistic_example_en,
            knowledgeVerse: topKnowledgeVerse
          });
        }
        return res.status(500).json({ 
          error: fallbackErr?.message || "Failed to generate guidance",
          fallback: true 
        });
      }
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
      // Use Imagen 3 for cinematic spiritual scene generation
      const response = await ai.models.generateImages({
        model: "imagen-3.0-generate-002",
        prompt: `A cinematic, highly spiritual, meditative scene inspired by sacred Vedic traditions: ${prompt}. Golden divine light, serene sacred atmosphere, ethereal lighting, high resolution, 16:9 cinematic ratio.`,
        config: {
          numberOfImages: 1,
          aspectRatio: "16:9",
        },
      });

      const image = response?.generatedImages?.[0]?.image;
      if (image?.imageBytes) {
        const imageUrl = `data:image/jpeg;base64,${image.imageBytes}`;
        return res.json({ imageUrl });
      }

      return res.json({ imageUrl: null });
    } catch {
      // Gracefully silence quota (429), tier, or permission restrictions so user experience remains pristine
      return res.json({ 
        imageUrl: null, 
        warning: "Image generation currently unavailable on current plan" 
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
