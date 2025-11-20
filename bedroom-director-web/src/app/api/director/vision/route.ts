import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { imageUrl } = await request.json();

        if (!imageUrl) {
            return NextResponse.json(
                { error: "Image URL is required" },
                { status: 400 }
            );
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://bedroom-director.com", // Optional, for including your app on openrouter.ai rankings.
                "X-Title": "Bedroom Director", // Optional. Shows in rankings on openrouter.ai.
            },
            body: JSON.stringify({
                model: "openai/gpt-4o-mini", // Or google/gemini-flash-1.5
                messages: [
                    {
                        role: "system",
                        content: `You are a cinematic visual analyst. Analyze the provided image for a film director's moodboard.
            Return a JSON object with the following fields:
            - description: A concise, evocative description of the visual content (max 2 sentences).
            - tags: An array of 3-5 keywords describing the key elements (e.g., "neon", "rain", "cyberpunk").
            - palette: An array of 3-5 hex color codes representing the dominant color palette.
            - mood: A single word or short phrase describing the emotional tone (e.g., "melancholic", "high-energy").
            
            Ensure the output is valid JSON.`
                    },
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: "Analyze this image."
                            },
                            {
                                type: "image_url",
                                image_url: {
                                    url: imageUrl
                                }
                            }
                        ]
                    }
                ],
                response_format: { type: "json_object" }
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error("OpenRouter Vision API Error:", error);
            throw new Error(`Vision API failed: ${response.statusText}`);
        }

        const data = await response.json();
        const analysis = JSON.parse(data.choices[0].message.content);

        return NextResponse.json(analysis);

    } catch (error) {
        console.error("Vision analysis failed:", error);
        return NextResponse.json(
            { error: "Failed to analyze image" },
            { status: 500 }
        );
    }
}
