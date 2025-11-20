"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

interface Model {
    id: string;
    name: string;
    provider: string;
    cost: string;
    speed: "fast" | "balanced" | "premium";
    quality: number;
}

const MODELS: Model[] = [
    { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", cost: "$2.50/M", speed: "premium", quality: 5 },
    { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI", cost: "$0.15/M", speed: "fast", quality: 4 },
    { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", provider: "Google", cost: "$0.30/M", speed: "balanced", quality: 4 },
    { id: "gemini-2.5-lite", name: "Gemini 2.5 Lite", provider: "Google", cost: "$0.10/M", speed: "fast", quality: 3 },
];

interface PatchBayProps {
    currentModel: string;
    onModelChange: (modelId: string) => void;
    onClose: () => void;
}

export default function PatchBay({ currentModel, onModelChange, onClose }: PatchBayProps) {
    const [selectedModel, setSelectedModel] = useState(currentModel);
    const [isDragging, setIsDragging] = useState(false);
    const [wireEnd, setWireEnd] = useState({ x: 0, y: 0 });
    const [isPlugging, setIsPlugging] = useState(false);
    const [hoveredModel, setHoveredModel] = useState<string | null>(null);
    const inputRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const modelRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const SNAP_DISTANCE = 40; // Tighter snap - must be close to model

    const getInputPosition = () => {
        if (!inputRef.current || !containerRef.current) return { x: 0, y: 0 };
        const inputRect = inputRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        return {
            x: inputRect.left - containerRect.left + inputRect.width / 2,
            y: inputRect.top - containerRect.top + inputRect.height / 2,
        };
    };

    const getModelPosition = (modelId: string) => {
        const modelEl = modelRefs.current[modelId];
        if (!modelEl || !containerRef.current) return null;
        const modelRect = modelEl.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        return {
            x: modelRect.left - containerRect.left + 20, // Offset to patch point
            y: modelRect.top - containerRect.top + modelRect.height / 2,
        };
    };

    const handleWireDrag = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        let x = e.clientX - containerRect.left;
        let y = e.clientY - containerRect.top;

        // Check for visual snap indicator (but don't auto-select)
        let snappedModel: string | null = null;
        for (const model of MODELS) {
            const modelPos = getModelPosition(model.id);
            if (modelPos) {
                const distance = Math.sqrt(Math.pow(x - modelPos.x, 2) + Math.pow(y - modelPos.y, 2));
                if (distance < SNAP_DISTANCE) {
                    // Visual feedback only - don't snap position
                    snappedModel = model.id;
                    break;
                }
            }
        }

        setHoveredModel(snappedModel);
        setWireEnd({ x, y }); // Wire follows cursor exactly
    };

    const handleWireStart = () => {
        setIsDragging(true);
        const inputPos = getInputPosition();
        setWireEnd(inputPos);
    };

    const handleWireEnd = () => {
        if (hoveredModel) {
            // Only connect if dropped on a model
            handleModelClick(hoveredModel);
        }
        setIsDragging(false);
        setHoveredModel(null);
    };

    const handleModelClick = (modelId: string) => {
        if (modelId === selectedModel) return;

        // Instant change - wire appears immediately
        setSelectedModel(modelId);
        onModelChange(modelId);
    };

    const inputPos = getInputPosition();
    const selectedModelData = MODELS.find(m => m.id === selectedModel);
    const selectedModelPos = getModelPosition(selectedModel);

    // More realistic wire path with natural sag
    const getWirePath = (startX: number, startY: number, endX: number, endY: number) => {
        const dx = endX - startX;
        const dy = endY - startY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Natural sag based on wire length (gravity effect)
        const sag = Math.min(distance * 0.15, 40); // Max 40px sag
        const midX = (startX + endX) / 2;
        const midY = Math.max(startY, endY) + sag;

        // Smooth catenary-like curve
        return `M ${startX} ${startY} Q ${midX} ${midY}, ${endX} ${endY}`;
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200"
            onMouseMove={handleWireDrag}
            onMouseUp={handleWireEnd}
            style={{ cursor: isDragging ? 'grabbing' : 'default' }}
        >
            <div
                ref={containerRef}
                className="bg-[#1a1a1a] border-2 border-white/10 rounded-xl w-full max-w-3xl mx-4 shadow-2xl overflow-hidden relative"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] border-b border-white/10 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Director AI Routing</h2>
                        <p className="text-xs text-white/40 mt-0.5">Drag wire from input to model</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Patch Bay Layout */}
                <div className="p-8 flex gap-12">
                    {/* Left: Input */}
                    <div className="flex-none w-32 flex flex-col items-center gap-4">
                        <div className="text-xs font-mono text-white/60 uppercase tracking-wider">Input</div>

                        {/* Input Patch Point */}
                        <div
                            ref={inputRef}
                            className="relative cursor-grab active:cursor-grabbing"
                            onMouseDown={handleWireStart}
                        >
                            {/* Socket depth */}
                            <div className="absolute inset-0 rounded-full bg-black/40 blur-md" />

                            {/* Main patch point - Realistic Socket */}
                            <div className={`
                relative w-16 h-16 rounded-full 
                bg-gradient-to-b from-[#2a2a2a] to-[#111]
                border-2 border-[#444]
                flex items-center justify-center transition-all duration-300
                shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_2px_5px_rgba(0,0,0,0.5)]
                ${isDragging ? 'ring-2 ring-bedroom-purple/50' : ''}
              `}>
                                {/* Metallic Rim */}
                                <div className="absolute inset-0 rounded-full border border-white/10" />

                                {/* Inner Socket Hole */}
                                <div className="w-8 h-8 rounded-full bg-black shadow-[inset_0_2px_4px_rgba(0,0,0,1)] flex items-center justify-center">
                                    {/* Contact Pin */}
                                    <div className="w-2 h-2 rounded-full bg-[#333]" />
                                </div>

                                {/* Label Ring */}
                                <div className="absolute inset-0 rounded-full border border-white/5 scale-110" />
                            </div>

                            <div className="mt-2 text-xs font-mono text-white/80 text-center font-bold">CHAT</div>
                        </div>
                    </div>

                    {/* Right: Models */}
                    <div className="flex-1">
                        <div className="text-xs font-mono text-white/60 uppercase tracking-wider mb-4">Available Models</div>
                        <div className="space-y-3">
                            {MODELS.map((model) => {
                                const isSelected = model.id === selectedModel;
                                const isHovered = model.id === hoveredModel;

                                return (
                                    <div
                                        key={model.id}
                                        ref={(el) => { modelRefs.current[model.id] = el; }}
                                        onClick={() => !isDragging && handleModelClick(model.id)}
                                        className={`
                      group relative flex items-center gap-4 p-3 rounded-lg border cursor-pointer
                      transform-gpu
                      ${isSelected
                                                ? 'bg-bedroom-purple/20 border-bedroom-purple shadow-[0_0_30px_rgba(124,58,237,0.4)]'
                                                : isHovered
                                                    ? 'bg-bedroom-purple/10 border-bedroom-purple/50 shadow-[0_0_20px_rgba(124,58,237,0.2)]'
                                                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_10px_rgba(124,58,237,0.1)]'
                                            }
                    `}
                                        style={{
                                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                            transform: isSelected ? 'scale(1.01)' : isHovered ? 'scale(1.02)' : 'scale(1)',
                                        }}
                                        onMouseDown={(e) => {
                                            e.currentTarget.style.transform = 'scale(0.98)';
                                        }}
                                        onMouseUp={(e) => {
                                            e.currentTarget.style.transform = isSelected ? 'scale(1.01)' : 'scale(1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = isSelected ? 'scale(1.01)' : 'scale(1)';
                                        }}
                                    >
                                        {/* Glow effect on selected */}
                                        {isSelected && (
                                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-bedroom-purple/20 to-indigo-500/20 animate-pulse" />
                                        )}

                                        {/* Content */}
                                        <div className="relative flex items-center gap-4 w-full z-10">
                                            {/* Output Patch Point */}
                                            <div
                                                className="relative flex-none cursor-grab active:cursor-grabbing"
                                                onMouseDown={(e) => {
                                                    e.stopPropagation(); // Don't trigger card click
                                                    if (isSelected) {
                                                        // Start dragging from this model
                                                        setIsDragging(true);
                                                        const modelPos = getModelPosition(model.id);
                                                        if (modelPos) {
                                                            setWireEnd(modelPos);
                                                        }
                                                    }
                                                }}
                                            >
                                                {/* Glow ring on selected */}
                                                {(isSelected || isHovered) && (
                                                    <div className="absolute inset-0 rounded-full bg-bedroom-purple/30 blur-md animate-pulse" />
                                                )}

                                                {/* Socket depth */}
                                                <div className="absolute inset-0 rounded-full bg-black/40 blur-sm" />

                                                <div className={`
                                                    relative w-10 h-10 rounded-full 
                                                    bg-gradient-to-b from-[#2a2a2a] to-[#111]
                                                    border border-[#444]
                                                    flex items-center justify-center transition-all duration-200
                                                    shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]
                                                    ${isSelected || isHovered
                                                        ? 'border-bedroom-purple/50 shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                                                        : 'border-white/10'
                                                    }
                                                `}>
                                                    {/* Inner Socket Hole */}
                                                    <div className="w-5 h-5 rounded-full bg-black shadow-[inset_0_1px_3px_rgba(0,0,0,1)] flex items-center justify-center">
                                                        {/* Contact Pin */}
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#333]" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Model Info */}
                                            <div className="flex-1">
                                                <div className="text-sm font-semibold text-white">{model.name}</div>
                                                <div className="text-xs text-white/50">{model.provider}</div>
                                            </div>

                                            {/* Badges */}
                                            <div className="flex items-center gap-2">
                                                <span className={`
                                                    px-2 py-1 rounded text-xs font-mono uppercase
                                                    ${model.speed === 'fast' ? 'bg-green-500/20 text-green-400' : ''}
                                                    ${model.speed === 'balanced' ? 'bg-blue-500/20 text-blue-400' : ''}
                                                    ${model.speed === 'premium' ? 'bg-purple-500/20 text-purple-400' : ''}
                                                `}>
                                                    {model.speed}
                                                </span>
                                                <span className="text-xs font-mono text-white/60">{model.cost}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* SVG Wire Overlay */}
                <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    <defs>
                        {/* Wire gradient - simulates rounded cable */}
                        <linearGradient id="wireGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="1" />
                            <stop offset="50%" stopColor="#7c3aed" stopOpacity="1" />
                            <stop offset="100%" stopColor="#6d28d9" stopOpacity="1" />
                        </linearGradient>

                        {/* Plug Body Gradient (Metallic/Matte Black) */}
                        <linearGradient id="plugBodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#333" />
                            <stop offset="50%" stopColor="#555" />
                            <stop offset="100%" stopColor="#222" />
                        </linearGradient>

                        {/* Connector Metal Gradient */}
                        <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e5e5e5" />
                            <stop offset="50%" stopColor="#a3a3a3" />
                            <stop offset="100%" stopColor="#737373" />
                        </linearGradient>

                        {/* Glow effect */}
                        <filter id="wireGlow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* Drop shadow for plugs */}
                        <filter id="plugShadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.6" />
                        </filter>
                    </defs>

                    {/* Helper to draw a realistic plug */}
                    {/* We use a component-like function inside the render for the plug visuals */}
                    {/* But since we can't define components inside render easily, we'll inline the SVG groups */}

                    {/* Connected wire */}
                    {!isDragging && selectedModel && selectedModelPos && (
                        <g>
                            {/* Wire Path - Starts lower to simulate coming out of the plug */}
                            <path
                                d={getWirePath(inputPos.x, inputPos.y + 25, selectedModelPos.x, selectedModelPos.y + 25)}
                                stroke="url(#wireGradient)"
                                strokeWidth="8"
                                fill="none"
                                strokeLinecap="round"
                                filter="url(#wireGlow)"
                            />

                            {/* Input Plug (Heavy Duty) */}
                            <g transform={`translate(${inputPos.x}, ${inputPos.y})`} filter="url(#plugShadow)">
                                {/* Strain Relief (Boot) */}
                                <path d="M -6 10 L -4 30 L 4 30 L 6 10 Z" fill="#1a1a1a" />
                                {/* Plug Body */}
                                <rect x="-10" y="-10" width="20" height="25" rx="4" fill="url(#plugBodyGradient)" stroke="#111" strokeWidth="1" />
                                {/* Color Ring */}
                                <rect x="-10" y="8" width="20" height="3" fill="#7c3aed" />
                                {/* Screw/Detail */}
                                <circle cx="0" cy="-2" r="3" fill="#111" opacity="0.5" />
                            </g>

                            {/* Output Plug (Heavy Duty) */}
                            <g transform={`translate(${selectedModelPos.x}, ${selectedModelPos.y})`} filter="url(#plugShadow)">
                                {/* Strain Relief (Boot) */}
                                <path d="M -6 10 L -4 30 L 4 30 L 6 10 Z" fill="#1a1a1a" />
                                {/* Plug Body */}
                                <rect x="-10" y="-10" width="20" height="25" rx="4" fill="url(#plugBodyGradient)" stroke="#111" strokeWidth="1" />
                                {/* Color Ring */}
                                <rect x="-10" y="8" width="20" height="3" fill="#7c3aed" />
                                {/* Screw/Detail */}
                                <circle cx="0" cy="-2" r="3" fill="#111" opacity="0.5" />
                            </g>
                        </g>
                    )}

                    {/* Dragging wire */}
                    {isDragging && (
                        <g>
                            {/* Wire Path */}
                            <path
                                d={getWirePath(inputPos.x, inputPos.y + 25, wireEnd.x, wireEnd.y + 25)}
                                stroke="url(#wireGradient)"
                                strokeWidth="8"
                                fill="none"
                                strokeLinecap="round"
                                filter="url(#wireGlow)"
                                strokeDasharray={hoveredModel ? "0" : "12 6"}
                                className={hoveredModel ? '' : 'opacity-70'}
                            />

                            {/* Input Plug (Fixed) */}
                            <g transform={`translate(${inputPos.x}, ${inputPos.y})`} filter="url(#plugShadow)">
                                <path d="M -6 10 L -4 30 L 4 30 L 6 10 Z" fill="#1a1a1a" />
                                <rect x="-10" y="-10" width="20" height="25" rx="4" fill="url(#plugBodyGradient)" stroke="#111" strokeWidth="1" />
                                <rect x="-10" y="8" width="20" height="3" fill="#7c3aed" />
                                <circle cx="0" cy="-2" r="3" fill="#111" opacity="0.5" />
                            </g>

                            {/* Dragging Plug (Follows Cursor) */}
                            <g transform={`translate(${wireEnd.x}, ${wireEnd.y})`} filter="url(#plugShadow)">
                                {/* Strain Relief */}
                                <path d="M -6 10 L -4 30 L 4 30 L 6 10 Z" fill="#1a1a1a" />
                                {/* Plug Body */}
                                <rect x="-10" y="-10" width="20" height="25" rx="4" fill="url(#plugBodyGradient)" stroke="#111" strokeWidth="1" />
                                {/* Color Ring - Pulses when hovering target */}
                                <rect x="-10" y="8" width="20" height="3" fill={hoveredModel ? "#fff" : "#7c3aed"} className={hoveredModel ? "animate-pulse" : ""} />
                                {/* Screw/Detail */}
                                <circle cx="0" cy="-2" r="3" fill="#111" opacity="0.5" />
                            </g>
                        </g>
                    )}
                </svg>

                {/* Info Footer */}
                <div className="px-8 pb-6">
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-xs text-white/60 leading-relaxed">
                            <span className="font-semibold text-white">Connected:</span> {selectedModelData?.name} •
                            Quality: {"★".repeat(selectedModelData?.quality || 0)}{"☆".repeat(5 - (selectedModelData?.quality || 0))} •
                            Cost: {selectedModelData?.cost}
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
}
