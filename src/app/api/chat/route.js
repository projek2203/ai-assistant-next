export async function POST(req){
  const { model, messages } = await req.json();
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method:'POST',
    headers: {'Content-Type':'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}`},
    body: JSON.stringify({ model: model || 'gpt-4o-mini', messages, max_tokens: 800 })
  });
  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || 'No response';
  return Response.json({ reply });
}