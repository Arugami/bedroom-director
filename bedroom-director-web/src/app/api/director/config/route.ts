import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import {
  DirectorAiConfigFile,
  ReasoningEffort,
  getDirectorAiConfig,
  buildDirectorChatPromptPreview,
} from "@/lib/directorAiConfig";

const DATA_ROOT = path.join(process.cwd(), "..", "data");
const CONFIG_DIR = path.join(DATA_ROOT, "director_ai");
const CONFIG_PATH = path.join(CONFIG_DIR, "config.json");

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cfg = getDirectorAiConfig();
    const promptPreview = buildDirectorChatPromptPreview();
    return NextResponse.json({ ...cfg, promptPreview });
  } catch (error) {
    console.error("Director config load error:", error);
    const fallback = {
      textModel: "x-ai/grok-4-fast",
      visionModel: "google/gemini-2.5-flash",
      reasoningEffort: "low" as ReasoningEffort,
      chatPromptExtra: "",
      chatPromptOverride: "",
      temperature: 0.7,
      promptPreview: buildDirectorChatPromptPreview(),
    };
    return NextResponse.json(fallback);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DirectorAiConfigFile;

    const allowedEfforts: ReasoningEffort[] = [
      "high",
      "medium",
      "low",
      "minimal",
      "none",
    ];

    const payload: DirectorAiConfigFile = {};

    if (typeof body.textModel === "string" && body.textModel.trim()) {
      payload.textModel = body.textModel.trim();
    }

    if (typeof body.visionModel === "string" && body.visionModel.trim()) {
      payload.visionModel = body.visionModel.trim();
    }

    if (
      typeof body.reasoningEffort === "string" &&
      allowedEfforts.includes(body.reasoningEffort as ReasoningEffort)
    ) {
      payload.reasoningEffort = body.reasoningEffort as ReasoningEffort;
    }

    if (typeof body.chatPromptExtra === "string") {
      payload.chatPromptExtra = body.chatPromptExtra;
    }

    if (typeof (body as any).chatPromptOverride === "string") {
      payload.chatPromptOverride = (body as any).chatPromptOverride;
    }

    if (typeof (body as any).temperature === "number") {
      payload.temperature = (body as any).temperature;
    }

    await fs.promises.mkdir(CONFIG_DIR, { recursive: true });
    await fs.promises.writeFile(
      CONFIG_PATH,
      JSON.stringify(payload, null, 2),
      "utf-8"
    );

    const merged = getDirectorAiConfig();
    const promptPreview = buildDirectorChatPromptPreview();
    return NextResponse.json({ ...merged, promptPreview });
  } catch (error) {
    console.error("Director config update error:", error);
    return NextResponse.json(
      { error: "Failed to update Director AI config" },
      { status: 500 }
    );
  }
}
