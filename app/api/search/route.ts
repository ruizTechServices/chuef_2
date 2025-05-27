// app/api/search/route.ts
// This endpoint is used to search for documents and previous chat history in the knowledge base.
// it returns the specific relevent request based on the text input
// For example, if the user asks for the recipe of a dish, it will return the recipe of the dish
// if the user asks a question based on previous context, it will take the user input, pull main keywords, create semantic context from the keywords, and then search thru the db for relevancy. If the keywords create context for a document, the algorithm searches for documents similar to the context being discussed in the chat context. If the user requests about past chat history, it will return the chat history, summarize the requested chat history, and then submits the results. 

import { NextResponse } from "next/server";
import openai from "@/lib/openai/client";

export async function POST(request: Request) {
    try {
        const { input } = await request.json();
        if (!input) {
            return NextResponse.json(
                { error: "Missing `input` for search." },
                { status: 400 }
            );
        }

        // 2️⃣ Call the search endpoint
        const searchResults = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input,
            encoding_format: "float",
        });

        // 3️⃣ Respond with JSON + proper headers
        return NextResponse.json(searchResults.data, { status: 200 });
    } catch (error) {
        console.error("Error in search API:", error);
        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        );
    }
}
