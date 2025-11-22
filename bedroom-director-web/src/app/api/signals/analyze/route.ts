import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const DATA_ROOT = path.join(process.cwd(), "..", "data");
const SIGNALS_DIR = path.join(DATA_ROOT, "signals");
const LOG_PATH = path.join(SIGNALS_DIR, "signals.jsonl");

export const runtime = "nodejs";

interface CuratedSignal {
  id: string;
  createdAt: string;
  notes: string;
  source: string;
  filePath: string;
  status: "pending" | "approved" | "rejected";
  analysis: any;

async function ensureSignalsDir() {
  await fs.mkdir(SIGNALS_DIR, { recursive: true });
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENROUTER_API_KEY" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const notes = (formData.get("notes") as string | null) || "";
    const source = (formData.get("source") as string | null) || "unknown";

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    await ensureSignalsDir();

    const id = randomUUID();
    const originalName = file.name || "signal.png";
    const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filename = `${id}_${safeName}`;
    const filePath = path.join(SIGNALS_DIR, filename);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);

    const mimeType = file.type || "image/png";
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64}`;

    const systemPrompt = `
You are an analyst for Bedroom Director, an AI film and tool discovery platform.
You receive screenshots of social posts or product pages about AI tools, models, workflows, and platforms.

Return a single JSON object with this shape:
{
  "type": "model_release" | "workflow_pattern" | "new_platform" | "platform_model_add" | "platform_feature" | "platform_promo" | "pricing_change" | "ux_pattern" | "insight" | "other",
  "summary": "1-2 sentence summary of what this screenshot is about",
  "tools": ["Tool or platform names mentioned"],
  "models": ["Specific model names mentioned (e.g., \\"Nano Banana Pro\\", \\"Veo 3.1\\")],
  "vendors": ["Vendors / companies referenced"],
  "urls": ["Any URLs or domains visible in the screenshot"],
  "is_wrapper": true | false,
  "underlying_models": ["If this is a wrapper/platform built on another model, list the underlying model names"],
  "should_add_to_catalog": "yes" | "no" | "maybe",
  "reason_catalog": "Why this should or should not be a first-class entry in our Tool Catalog",
  "notes_for_catalog": "Any extra notes relevant to the catalog or AI curator (e.g., limited-time promo, regional, enterprise-only, etc.)",
  "notes_for_strategy": "Short note on whether this contains UX, workflow, or business insights we should capture in strategy docs (e.g., new features like Midjourney Style Creator, promotional patterns, education hooks)"
}

Be concise but specific. If something is uncertain, include it but call it out as "uncertain".
`;

    const messages: any[] = [
      { role: "system", content: systemPrompt },
    ];

    const userContent: any[] = [];

    if (notes) {
      userContent.push({
        type: "text",
        text: `Context from uploader: ${notes}`,
      });
    } else {
      userContent.push({
        type: "text",
        text: "No extra text context was provided.",
      });
    }

    userContent.push({
      type: "image_url",
      image_url: {
        url: dataUrl,
      },
    });

    messages.push({
      role: "user",
      content: userContent,
    });

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://bedroom-director.com",
        "X-Title": "Bedroom Director Signals Curator",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("OpenRouter error:", text);
      return NextResponse.json(
        { error: "Failed to analyze signal via OpenRouter" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    let analysis: any = {};

    try {
      analysis = typeof content === "string" ? JSON.parse(content) : content;
    } catch {
      analysis = { raw: content };
    }

    const record: CuratedSignal = {
      id,
      createdAt: new Date().toISOString(),
      notes,
      source,
      filePath,
      status: "pending",
      analysis,
    };

    const line = JSON.stringify(record);
    await fs.appendFile(LOG_PATH, line + "\n", { encoding: "utf-8" });

    return NextResponse.json({
      id,
      analysis,
    });
  } catch (error) {
    console.error("Signal analysis error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
