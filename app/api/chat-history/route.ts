import { NextResponse } from "next/server";
import { appendMessage, readMessages } from "@/lib/db/jsonl";
import type { ChatMessage } from "@/lib/db/jsonl";

// POST /api/chat-history
// Body: ChatMessage JSON
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ChatMessage>;

    // Basic validation
    if (body.role !== "user" && body.role !== "assistant") {
      return NextResponse.json(
        { error: "Invalid role; expected 'user' | 'assistant'." },
        { status: 400 }
      );
    }
    if (!body.content) {
      return NextResponse.json(
        { error: "Missing content." },
        { status: 400 }
      );
    }

    const message: ChatMessage = {
      role: body.role,
      content: body.content,
      timestamp: body.timestamp ?? Date.now(),
    };

    // Persist to JSONL file (server-side, safe to use fs)
    appendMessage(message);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("chat-history POST error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET /api/chat-history?limit=50
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limitParam = url.searchParams.get("limit");
    const limit = limitParam ? Math.max(1, Number(limitParam)) : 50;

    const messages = readMessages(limit);
    return NextResponse.json(messages);
  } catch (error) {
    console.error("chat-history GET error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}