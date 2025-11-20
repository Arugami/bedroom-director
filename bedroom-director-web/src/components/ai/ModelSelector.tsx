"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, ChevronDown, Settings2, Zap, Check } from "lucide-react";
import { MODELS, Model } from "@/constants/ai-models";

interface ModelSelectorProps {
    selectedModelId: string;
    onSelectModel: (modelId: string) => void;
    onOpenPatchBay: () => void;
}

export default function ModelSelector({
    selectedModelId,
    onSelectModel,
    onOpenPatchBay,
}: ModelSelectorProps) {
    const selectedModel = MODELS.find((m) => m.id === selectedModelId) || MODELS[0];

    return (
        <button
            onClick={onOpenPatchBay}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-white/5 border-white/5 text-screen-white/70 hover:bg-white/10 hover:text-white transition-all duration-200 group"
        >
            <div className="flex items-center gap-2">
                <div className={`
            w-2 h-2 rounded-full
            ${selectedModel.speed === 'premium' ? 'bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.5)]' : ''}
            ${selectedModel.speed === 'fast' ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : ''}
            ${selectedModel.speed === 'balanced' ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]' : ''}
          `} />
                <span className="text-xs font-medium">{selectedModel.name}</span>
            </div>
            <Settings2 className="w-3 h-3 text-white/40 group-hover:text-white transition-colors" />
        </button>
    );
}
