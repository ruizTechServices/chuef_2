import OpenAI from "openai";

const apiKey = process.env.HUGGINGFACE_API_KEY;
if (!apiKey) {
  throw new Error("HUGGINGFACE_API_KEY is missing from environment variables.");
}

const client = new OpenAI({
  apiKey,
  baseURL:
    process.env.HUGGINGFACE_BASE_URL ??
    "https://jirw9w5s99vx2bzp.us-east-1.aws.endpoints.huggingface.cloud/v1/",
  //   organization: process.env.OPENAI_ORG_ID // optional org scoping
});

export default client;
