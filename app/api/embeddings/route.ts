// app/api/embeddings/route.ts
import { NextResponse } from "next/server";
import openai from "@/lib/openai/client";

export async function POST(request: Request) {
  try {
    // 1️⃣ Parse and validate the JSON body
    const { input } = await request.json();

    if (!input || (Array.isArray(input) && input.length === 0)) {
      return NextResponse.json(
        { error: "Missing `input` for embeddings." },
        { status: 400 }
      );
    }

    // 2️⃣ Call the embeddings endpoint
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input,
      encoding_format: "float",
    });

    // 3️⃣ Respond with JSON + proper headers
    return NextResponse.json(embedding, { status: 200 });
  } catch (error) {
    console.error("Error in embeddings API:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
