// lib/llm/gemini/client.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing from environment variables.");
}

const gemini = new GoogleGenerativeAI(apiKey);

export default gemini;
