// lib/llm/openai/client.ts
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is missing from environment variables.");
}

const openai = new OpenAI({
  apiKey,
  //   organization: process.env.OPENAI_ORG_ID // optional org scoping
});

export default openai;
