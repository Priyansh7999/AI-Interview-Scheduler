import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {
  try {
    const body = await request.json();
    const { jobDescription, type, interviewDuration, jobPosition } = body;

    const FINAL_PROMPT = QUESTIONS_PROMPT
      .replace('{{jobTitle}}', jobPosition)
      .replace('{{jobDescription}}', jobDescription)
      .replace('{{duration}}', interviewDuration)
      .replace('{{type}}', Array.isArray(type) ? type.join(', ') : type);

    console.log("FINAL PROMPT:", FINAL_PROMPT);

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
    //   model: "google/gemini-2.0-flash-exp:free",
     model: "gpt-4o-mini",
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });
    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
  