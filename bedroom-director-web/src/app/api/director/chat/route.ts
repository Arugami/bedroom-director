import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { messages, projectContext } = await request.json();

        if (!process.env.OPENROUTER_API_KEY) {
            return NextResponse.json(
                { error: "Missing API Key" },
                { status: 500 }
            );
        }

        const systemPrompt = `You are an expert film director assistant. You are chatting with a user to help them develop their film idea.
    
    CONTEXT:
    Project Title: ${projectContext.title}
    Current Bible: ${JSON.stringify(projectContext.bible)}
    
    VISUAL REFERENCES:
    ${projectContext.bible?.visualAssets?.map((a: any) => `[${a.category.toUpperCase()}] ${a.label}: ${a.description}`).join("\n") || "None"}
    
    GOAL:
    1. Chat naturally with the user. Ask probing questions about characters, setting, and tone.
    2. If the user mentions new details about characters, locations, or aesthetic, use the 'update_bible' tool to save them.
    3. If the user refers to a visual asset (e.g., "Jack's jacket"), acknowledge the visual details provided in the reference.
    4. Be concise, encouraging, and "in the zone" (creative partner vibe).
    `;

        const tools = [
            {
                type: "function",
                function: {
                    name: "update_bible",
                    description: "Update the project bible with new or modified entities (characters, locations, aesthetic).",
                    parameters: {
                        type: "object",
                        properties: {
                            characters: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        name: { type: "string" },
                                        description: { type: "string" },
                                    },
                                    required: ["name", "description"],
                                },
                            },
                            locations: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        name: { type: "string" },
                                        description: { type: "string" },
                                    },
                                    required: ["name", "description"],
                                },
                            },
                            aesthetic: {
                                type: "object",
                                properties: {
                                    mood: { type: "array", items: { type: "string" } },
                                    palette: { type: "array", items: { type: "string" } },
                                    era: { type: "string" },
                                },
                            },
                        },
                    },
                },
            },
        ];

        const apiMessages = [
            { role: "system", content: systemPrompt },
            ...messages.map((msg: any) => ({
                role: msg.role,
                content: msg.content,
            })),
        ];

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://bedroom-director.vercel.app",
                "X-Title": "Bedroom Director",
            },
            body: JSON.stringify({
                "model": "openai/gpt-4o-mini",
                "messages": apiMessages,
                "tools": tools,
                "tool_choice": "auto",
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("OpenRouter Error:", errorText);
            return NextResponse.json({ error: "Failed to fetch from AI" }, { status: response.status });
        }

        const data = await response.json();
        const choice = data.choices[0];
        const message = choice.message;

        // Return both the content and any tool calls
        return NextResponse.json({
            role: "assistant",
            content: message.content,
            tool_calls: message.tool_calls,
        });

    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
