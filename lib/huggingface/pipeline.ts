import { pipeline } from '@huggingface/transformers';

// You must use async/await because model loading is asynchronous
let generator: any;

export async function loadGenerator() {
  if (!generator) {
    generator = await pipeline('text-generation');
  }
  return generator;
}

export async function generateText(prompt: string): Promise<string> {
  const generator = await loadGenerator();
  const output = await generator(prompt, { max_new_tokens: 50 });
  // output is an array of objects with 'generated_text'
  return output[0]?.generated_text ?? '';
}