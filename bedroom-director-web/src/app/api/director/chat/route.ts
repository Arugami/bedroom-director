import { NextResponse } from "next/server";
import {
    getDirectorAiConfig,
    buildDirectorChatSystemPrompt,
} from "@/lib/directorAiConfig";

// Tool definitions
const TOOL_UPDATE_BIBLE = {
    type: "function" as const,
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
                        tone: { type: "string" },
                        visualStyle: { type: "string" },
                        references: {
                            type: "array",
                            items: { type: "string" }
                        }
                    }
                }
            },
        },
    },
};

const TOOL_CREATE_SCENE = {
    type: "function" as const,
    function: {
        name: "create_scene",
        description: "Create a new scene in the project",
        parameters: {
            type: "object",
            properties: {
                title: {
                    type: "string",
                    description: "Scene title"
                },
                description: {
                    type: "string",
                    description: "Scene description"
                },
                location: {
                    type: "string",
                    description: "Scene location"
                },
                characters: {
                    type: "array",
                    items: { type: "string" },
                    description: "Characters in the scene"
                }
            },
            required: ["title", "description"]
        }
    }
};

const TOOL_PROPOSE_STRUCTURE = {
    type: "function" as const,
    function: {
        name: "propose_structure",
        description: "Propose a complete project structure with title, logline, and scenes.",
        parameters: {
            type: "object",
            properties: {
                title: {
                    type: "string",
                    description: "Project title"
                },
                logline: {
                    type: "string",
                    description: "One-sentence summary of the story"
                },
                scenes: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            title: { type: "string" },
                            description: { type: "string" },
                            location: { type: "string" },
                            characters: {
                                type: "array",
                                items: { type: "string" }
                            }
                        },
                        required: ["title", "description"]
                    }
                }
            },
            required: ["title", "scenes"]
        }
    }
};

const TOOL_APPLY_WORKFLOW = {
    type: "function" as const,
    function: {
        name: "apply_director_workflow",
        description: "Apply a Director AI workflow to generate content",
        parameters: {
            type: "object",
            properties: {
                workflow: {
                    type: "string",
                    enum: ["shot-list", "dialogue", "action"],
                    description: "Type of workflow to apply"
                },
                sceneId: {
                    type: "string",
                    description: "ID of the scene to modify (optional, defaults to creating new)"
                },
            },
            required: ["workflow"]
        }
    }
};

/**
 * Conditionally select tools based on user message and project context.
 * CORE TOOLS (always included): update_bible, create_scene
 * CONDITIONAL TOOLS: propose_structure, apply_director_workflow
 */
function selectToolsForContext(userMessage: string, projectContext: any): any[] {
    // Always include core tools
    const tools: any[] = [
        TOOL_UPDATE_BIBLE,
        TOOL_CREATE_SCENE,
    ];

    const msg = userMessage.toLowerCase();
    const sceneCount = projectContext?.sceneCount || 0;

    // Add propose_structure early in project or when explicitly requested
    if (sceneCount === 0 ||
        msg.includes('structure') ||
        msg.includes('outline') ||
        msg.includes('plan') ||
        msg.includes('organize')) {
        tools.push(TOOL_PROPOSE_STRUCTURE);
    }

    // Add workflow tool when project has scenes or when requested
    if (sceneCount > 0 ||
        msg.includes('workflow') ||
        msg.includes('storyboard') ||
        msg.includes('shot list') ||
        msg.includes('dialogue') ||
        msg.includes('action')) {
        tools.push(TOOL_APPLY_WORKFLOW);
    }

    return tools;
}

export async function POST(request: Request) {
    try {
        const { messages, projectContext } = await request.json();

        if (!process.env.OPENROUTER_API_KEY) {
            return NextResponse.json(
                { error: "Missing API Key" },
                { status: 500 }
            );
        }

        // Load config dynamically on each request
        const config = getDirectorAiConfig();

        console.log("🎬 Director Chat Config:", {
            model: config.textModel,
            reasoningEffort: config.reasoningEffort,
            temperature: config.temperature
        });

        const systemPrompt = buildDirectorChatSystemPrompt(projectContext);

        // Conditionally select tools based on context
        const lastUserMessage = messages.length > 0 ? messages[messages.length - 1].content : "";
        const tools = selectToolsForContext(lastUserMessage, projectContext);

        console.log("🔧 Selected tools:", tools.map(t => t.function.name));

        const apiMessages = [
            { role: "system", content: systemPrompt },
            ...messages.map((msg: any) => ({
                role: msg.role,
                content: msg.content,
            })),
        ];

        const requestBody = {
            model: config.textModel,
            messages: apiMessages,
            tools,
            tool_choice: "auto",
            temperature: config.temperature,
            reasoning: {
                effort: config.reasoningEffort,
                exclude: true,
            },
        };

        console.log("📤 Sending request to OpenRouter:", {
            model: requestBody.model,
            messageCount: requestBody.messages.length,
            toolCount: requestBody.tools.length,
            reasoning: requestBody.reasoning
        });

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://bedroom-director.vercel.app",
                "X-Title": "Bedroom Director",
            },
            body: JSON.stringify(requestBody)
        });

        console.log("📥 OpenRouter response status:", response.status);

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
