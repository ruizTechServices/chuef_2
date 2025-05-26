import client from '@/lib/mistral/client';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required.' }), { status: 400 });
    }

    const chatResponse = await client.chat.complete({
      model: 'mistral-small',
      messages: [{ role: 'user', content: prompt }],
    });

    if (!chatResponse.choices || chatResponse.choices.length === 0) {
      console.error('No choices returned from chatResponse:', chatResponse);
      return new Response(JSON.stringify({ error: 'No choices returned from chat model.' }), { status: 500 });
    }

    return new Response(
      JSON.stringify({ result: chatResponse.choices[0].message.content }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in text-generation API:', error);
    return new Response(JSON.stringify({ error: 'Internal server error.' }), { status: 500 });
  }
}