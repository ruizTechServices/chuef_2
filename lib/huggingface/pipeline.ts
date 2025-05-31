import { pipeline } from '@huggingface/transformers';

// You must use async/await because model loading is asynchronous
let generator: any;

export async function loadGenerator(modelId?: string) {
  if (!generator) {
    const id = modelId || process.env.HUGGINGFACE_INFERENCE_MODEL || "gpt2";
    generator = await pipeline("text-generation", id);
  }
  return generator;
}

export async function generateText(prompt: string, modelId?: string): Promise<string> {
  const gen = await loadGenerator(modelId);
  const output = await gen(prompt, { max_new_tokens: 50 });
  return output[0]?.generated_text ?? "";
}