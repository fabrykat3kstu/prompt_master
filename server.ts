import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client helper to avoid crashes during startup if variable is temporarily absent
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please verify it is configured in the Settings > Secrets panel.");
    }
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

// 1. Endpoint for prompt optimization
app.post("/api/optimize-prompt", async (req, res) => {
  try {
    const { draft } = req.body;
    if (!draft || typeof draft !== "string") {
      return res.status(400).json({ error: "Brak podanego tekstu roboczego promptu (draft)." });
    }

    const ai = getGeminiClient();

    const systemInstruction = `Jesteś ekspertem inżynierii promptów (Prompt Engineer) pracującym dla elitarnej agencji copywriterskiej "Fabryka tekstu". Twoim zadaniem jest ulepszenie, doprecyzowanie i sformatowanie roboczego, amatorskiego pomysłu na prompt (draftu) użytkownika w profesjonalny, strukturalny i niesamowicie skuteczny prompt gotowy do użycia z zaawansowanymi modelami językowymi (np. Gemini, GPT-4).

Struktura wyjściowa, jaką musisz bezwzględnie zastosować w ulepszonym prompcie:
1. ROLA I RYZYKO: Określ kim jest AI (np. elitarny doradca finansowy) i jakie cechy posiada.
2. CEL I KONTEKST: Zdefiniuj główne zadanie i cel biznesowy.
3. KROK PO KROKU: Dokładny plan działania AI.
4. WYTYCZNE JĘZYKOWE I STYL (ANTY-AI): Narzuć styl, zabroń bezsensownych ozdobników ("W dzisiejszych czasach", "Warto zauważyć", itp.) i zoptymalizuj pod naturalną lekkość tekstu.
5. PARAMETRY / ZMIENNE: Wskaż zmienne w łatwych do podmienienia nawiasach kwadratowych, np. [NISZA], [OPIS] tak aby użytkownik mógł je podmienić.

Cały wygenerowany prompt musi być napisany w języku polskim, charakteryzować się czystością, perfekcyjną strukturą i bezpośrednim, merytorycznym tonem. Nie dołączaj do odpowiedzi dodatkowego komentarza "oto Twój prompt". Odpowiedz TYLKO i wyłącznie zoptymalizowanym, kompletnym tekstem promptu ujętym w strukturalny format markdown.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Ulepsz ten roboczy pomysł na prompt: "${draft}"`,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ optimized: response.text });
  } catch (error: any) {
    console.error("Błąd podczas optymalizacji promptu:", error);
    res.status(500).json({ error: error?.message || "Wystąpił nieoczekiwany błąd serwera." });
  }
});

// 2. Endpoint for prompt testing (Live AI Playground simulation)
app.post("/api/test-prompt", async (req, res) => {
  try {
    const { promptText, userInputs } = req.body;
    if (!promptText || typeof promptText !== "string") {
      return res.status(400).json({ error: "Brak tekstu promptu do przetestowania." });
    }

    const ai = getGeminiClient();

    // Substitute placeholders in real-time on server just in case
    let substitutedPrompt = promptText;
    if (userInputs && typeof userInputs === "object") {
      Object.keys(userInputs).forEach((key) => {
        const val = userInputs[key] || "";
        // Match both [key] and [KEY]
        substitutedPrompt = substitutedPrompt.replace(new RegExp(`\\[${key}\\]`, "gi"), val);
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: substitutedPrompt,
      config: {
        temperature: 0.6,
      },
    });

    res.json({ 
      promptExecuted: substitutedPrompt,
      response: response.text 
    });
  } catch (error: any) {
    console.error("Błąd podczas testowania promptu:", error);
    res.status(500).json({ error: error?.message || "Wystąpił błąd podczas komunikacji z API Gemini." });
  }
});

// Setup Vite development server or production static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[PROMPT MASTER SERVER] running at http://localhost:${PORT}`);
  });
}

startServer();
