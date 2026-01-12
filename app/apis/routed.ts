import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { domain, topic } = await req.json();

  const prompt = `
Generate 20 SEO keywords and a structured content brief
for the website ${domain} about ${topic}.

Return JSON with:
- keywords (array of strings)
- brief (string)
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  const data = JSON.parse(completion.choices[0].message.content!);

  return NextResponse.json(data);
}
