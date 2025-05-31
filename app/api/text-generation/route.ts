import mistralClient from "@/lib/mistral/client";
import openai from "@/lib/openai/client";
import gemini from "@/lib/google/client";
import anthropic from "@/lib/anthropic/client";
import hfClient from "@/lib/huggingface/client";

export async function POST(request: Request) {
  try {
    const { prompt, provider = "mistral" } = await request.json();
    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required.' }), { status: 400 });
    }

    let resultText: string | null = null;

    switch (provider) {
      case "openai": {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        });
        resultText = response.choices?.[0]?.message?.content ?? null;
        break;
      }
      case "gemini": {
        try {
          const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
          const payload = await model.generateContent(prompt);
          // payload is { response: { candidates: [ { content: { parts: [ { text } ] } } ] } }
          // SDK helper: payload.response.text() returns string
          // @ts-ignore
          resultText = payload?.response?.text?.() ?? null;
        } catch (e) {
          console.error("Gemini error", e);
          resultText = null;
        }
        break;
      }
      case "anthropic": {
        const res: any = await anthropic.messages.create({
          model: "claude-3-haiku-20240307", // lightweight default
          messages: [
            { role: "user", content: prompt },
          ],
          max_tokens: 1024,
        });
        // Claude v3 returns { content: [ { text } ] }
        resultText = res?.content?.[0]?.text
          ? String(res.content[0].text)
          : null;
        break;
      }
      case "huggingface": {
        try {
          const completion = await hfClient.chat.completions.create({
            model: "tgi",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 256,
          });
          resultText = completion.choices?.[0]?.message?.content ?? null;
        } catch (e) {
          console.error("HuggingFace error", e);
          resultText = null;
        }
        break;
      }
      case "mistral":
      default: {
        const chatResponse = await mistralClient.chat.complete({
          model: "mistral-small",
          messages: [{ role: "user", content: prompt }],
        });
        const rawContent = chatResponse.choices?.[0]?.message?.content;
        resultText = Array.isArray(rawContent)
          ? rawContent.map((c: any) => c.text ?? "").join("").trim() || null
          : (rawContent as string | null);
        break;
      }
    }

    if (!resultText) {
      return new Response(
        JSON.stringify({ error: "Model did not return a response." }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ result: resultText }), { status: 200 });
  } catch (error) {
    console.error('Error in text-generation API:', error);
    return new Response(JSON.stringify({ error: 'Internal server error.' }), { status: 500 });
  }
}

// Example cURL commands for interacting with the API endpoints:

// 1. Mistral (default)
// curl -X POST http://localhost:3000/api/text-generation \
//   -H "Content-Type: application/json" \
//   -d '{"prompt": "What are the benefits of NextJS?", "provider": "mistral"}'

// 2. OpenAI
// curl -X POST http://localhost:3000/api/text-generation \
//   -H "Content-Type: application/json" \
//   -d '{"prompt": "What are the benefits of NextJS?", "provider": "openai"}'

// 3. Gemini
// curl -X POST http://localhost:3000/api/text-generation \
//   -H "Content-Type: application/json" \
//   -d '{"prompt": "What are the benefits of NextJS?", "provider": "gemini"}'

// 4. Anthropic
// curl -X POST http://localhost:3000/api/text-generation \
//   -H "Content-Type: application/json" \
//   -d '{"prompt": "What are the benefits of NextJS?", "provider": "anthropic"}'

// 5. HuggingFace
// curl -X POST http://localhost:3000/api/text-generation \
//   -H "Content-Type: application/json" \
//   -d '{"prompt": "What are the benefits of NextJS?", "provider": "huggingface"}'
