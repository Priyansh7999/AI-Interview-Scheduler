import { FEEDBACK_PROMPT } from "@/services/Constants";
import OpenAI from "openai";

export async function POST(req) {
    const { conversation } = await req.json();
    const FINAL_PROMPT = FEEDBACK_PROMPT.replace("{{conversation}}", JSON.stringify(conversation));
    try {
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