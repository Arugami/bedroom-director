import { NextResponse } from "next/server";
import {
    DIRECTOR_TEXT_MODEL,
    DIRECTOR_TEXT_REASONING_EFFORT,
    DIRECTOR_TEXT_TEMPERATURE,
    buildDirectorChatSystemPrompt,
} from "@/lib/directorAiConfig";

export async function POST(request: Request) {
    try {
        const { messages, projectContext } = await request.json();

        if (!process.env.OPENROUTER_API_KEY) {
            return NextResponse.json(
                { error: "Missing API Key" },
                { status: 500 }
            );
        }

        const systemPrompt = buildDirectorChatSystemPrompt(projectContext);

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
            {
                type: "function",
                function: {
                    name: "propose_structure",
                    description: "Propose a complete project structure based on the user's vision. Use this when the user has described their film idea sufficiently (logline, key scenes, characters, tone).",
                    parameters: {
                        type: "object",
                        properties: {
                            suggestedTitle: {
                                type: "string",
                                description: "A compelling title for the project based on their vision"
                            },
                            logline: {
                                type: "string",
                                description: "One-sentence summary of the story"
                            },
                            scenes: {
                                type: "array",
                                description: "Breakdown of key scenes for the project",
                                items: {
                                    type: "object",
                                    properties: {
                                        title: { type: "string", description: "Scene title (e.g., 'Opening: Jack wakes up')" },
                                        notes: { type: "string", description: "Scene description and creative notes" },
                                        duration: { type: "number", description: "Estimated duration in seconds" }
                                    },
                                    required: ["title", "notes"]
                                }
                            },
                            bibleNotes: {
                                type: "object",
                                description: "Initial project bible with key details",
                                properties: {
                                    characters: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                name: { type: "string" },
                                                description: { type: "string" }
                                            }
                                        }
                                    },
                                    locations: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                name: { type: "string" },
                                                description: { type: "string" }
                                            }
                                        }
                                    },
                                    aesthetic: {
                                        type: "object",
                                        properties: {
                                            mood: { type: "array", items: { type: "string" } },
                                            palette: { type: "array", items: { type: "string" } },
                                            era: { type: "string" }
                                        }
                                    }
                                }
                            }
                        },
                        required: ["suggestedTitle", "scenes"]
                    }
                }
            }
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
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://bedroom-director.vercel.app",
                "X-Title": "Bedroom Director",
            },
            body: JSON.stringify({
                model: DIRECTOR_TEXT_MODEL,
                messages: apiMessages,
                tools,
                tool_choice: "auto",
                temperature: DIRECTOR_TEXT_TEMPERATURE,
                reasoning: {
                    effort: DIRECTOR_TEXT_REASONING_EFFORT,
                    exclude: true,
                },
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("OpenRouter Error:", errorText);
            return NextResponse.json({ error: "Failed to fetch from AI" }, { status: response.status });
        }

        const data = await response.json();
        console.log("OpenRouter response data:", JSON.stringify(data, null, 2));

        if (!data.choices || data.choices.length === 0) {
            console.error("No choices in response:", data);
            return NextResponse.json(
                { error: "No choices in AI response", data },
                { status: 500 }
            );
        }

        const choice = data.choices[0];
        const message = choice.message;

        if (!message) {
            console.error("No message in choice:", choice);
            return NextResponse.json(
                { error: "No message in AI response", choice },
                { status: 500 }
            );
        }

        // Return both the content and any tool calls
        return NextResponse.json({
            role: "assistant",
            content: message.content || "", // Handle null content when tool is called
            tool_calls: message.tool_calls || [],
        });

    } catch (error) {
        console.error("API Route Error:", error);
        console.error("Error details:", {
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined
        });
        return NextResponse.json(
            {
                error: "Internal Server Error",
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}
