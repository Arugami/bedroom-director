import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { chatHistory, projectContext } = await request.json();

        if (!process.env.OPENROUTER_API_KEY) {
            return NextResponse.json(
                { error: "Missing API Key" },
                { status: 500 }
            );
        }

        const systemPrompt = `You are an expert film director assistant. Your goal is to help the user structure their film idea into a concrete list of scenes.
    
    CONTEXT:
    Project Title: ${projectContext.title}
    Current Scene Count: ${projectContext.sceneCount}
    
    INSTRUCTIONS:
    1. Analyze the chat history to understand the user's vision, genre, and plot.
    2. Propose a logical structure of scenes (3-5 scenes for a short film).
    3. For each scene, provide a 'title' and a 'description' (visual/action notes).
    4. Output STRICT JSON format only.
    
    OUTPUT FORMAT:
    {
      "scenes": [
        {
          "title": "Scene Title",
          "description": "Visual description of action..."
        }
      ]
    }`;

        const messages = [
            { role: "system", content: systemPrompt },
            ...chatHistory.map((msg: any) => ({
                role: msg.role,
                content: msg.content,
            })),
        ];

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://bedroom-director.vercel.app", // Optional, for including your app on openrouter.ai rankings.
                "X-Title": "Bedroom Director", // Optional. Shows in rankings on openrouter.ai.
            },
            body: JSON.stringify({
                "model": "openai/gpt-4o-mini", // Fast, cheap, good for structure
                "messages": messages,
                "response_format": { "type": "json_object" }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("OpenRouter Error:", errorText);
            return NextResponse.json({ error: "Failed to fetch from AI" }, { status: response.status });
        }

        const data = await response.json();
        const content = data.choices[0].message.content;

        try {
            const parsed = JSON.parse(content);
            return NextResponse.json(parsed);
        } catch (e) {
            console.error("JSON Parse Error:", e);
            return NextResponse.json({ error: "Invalid JSON response from AI" }, { status: 500 });
        }

    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
