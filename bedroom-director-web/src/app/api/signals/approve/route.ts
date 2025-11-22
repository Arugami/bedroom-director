import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_ROOT = path.join(process.cwd(), "..", "data");
const SIGNALS_DIR = path.join(DATA_ROOT, "signals");
const LOG_PATH = path.join(SIGNALS_DIR, "signals.jsonl");

export const runtime = "nodejs";

type Status = "approved" | "rejected";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const id = body?.id as string | undefined;
    const status = body?.status as Status | undefined;

    if (!id || (status !== "approved" && status !== "rejected")) {
      return NextResponse.json(
        { error: "id and status ('approved' | 'rejected') are required" },
        { status: 400 }
      );
    }

    await fs.mkdir(SIGNALS_DIR, { recursive: true });

    const exists = await fs
      .access(LOG_PATH)
      .then(() => true)
      .catch(() => false);

    if (!exists) {
      return NextResponse.json(
        { error: "No signals log found" },
        { status: 404 }
      );
    }

    const lines = (await fs.readFile(LOG_PATH, "utf-8"))
      .split("\n")
      .filter((l) => l.trim().length > 0);

    let found = false;
    const updatedLines = lines.map((line) => {
      try {
        const obj = JSON.parse(line);
        if (obj.id === id) {
          obj.status = status;
          found = true;
        }
        return JSON.stringify(obj);
      } catch {
        // If a line is invalid JSON, keep it untouched.
        return line;
      }
    });

    if (!found) {
      return NextResponse.json(
        { error: "Signal not found" },
        { status: 404 }
      );
    }

    await fs.writeFile(LOG_PATH, updatedLines.join("\n") + "\n", "utf-8");

    return NextResponse.json({ id, status });
  } catch (error) {
    console.error("Signal approve error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

