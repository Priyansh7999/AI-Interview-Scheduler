import { FEEDBACK_PROMPT } from "@/services/Constants";
import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { conversation } = await req.json();

    if (!conversation) {
      return NextResponse.json({ error: "Missing conversation data" }, { status: 400 });
    }

    const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
      "{{conversation}}",
      JSON.stringify(conversation)
    );

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: FINAL_PROMPT }],
      response_format: { type: "json_object" }, 
    });

    let content = completion.choices[0].message.content;
    content = content
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .trim();
    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    console.error("API ERROR:", error.message, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}