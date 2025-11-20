export interface Model {
    id: string;
    name: string;
    provider: string;
    cost: string;
    speed: "fast" | "balanced" | "premium";
    quality: number;
}

export const MODELS: Model[] = [
    { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", cost: "$2.50/M", speed: "premium", quality: 5 },
    { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI", cost: "$0.15/M", speed: "fast", quality: 4 },
    { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", provider: "Google", cost: "$0.30/M", speed: "balanced", quality: 4 },
    { id: "gemini-2.5-lite", name: "Gemini 2.5 Lite", provider: "Google", cost: "$0.10/M", speed: "fast", quality: 3 },
];
