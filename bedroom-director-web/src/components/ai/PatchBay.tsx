"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

import { MODELS } from "@/constants/ai-models";

interface PatchBayProps {
    currentModel: string;
    onModelChange: (modelId: string) => void;
    onClose: () => void;
    variant?: 'modal' | 'drawer';
}

export default function PatchBay({ currentModel, onModelChange, onClose, variant = 'modal' }: PatchBayProps) {
    const [selectedModel, setSelectedModel] = useState(currentModel);
    const [isDragging, setIsDragging] = useState(false);
    const [isPlugging, setIsPlugging] = useState(false);
    const [hoveredModel, setHoveredModel] = useState<string | null>(null);
    const inputRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const modelRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const socketRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
        const socketEl = socketRefs.current[modelId];
        if (!socketEl || !containerRef.current) return null;
        const socketRect = socketEl.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        return {
            x: socketRect.left - containerRect.left + socketRect.width / 2,
            y: socketRect.top - containerRect.top + socketRect.height / 2,
        };
    };

    // Interaction state
    const [dragPos, setDragPos] = useState({ x: 0, y: 0 });

    const handleWireDrag = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        let x = e.clientX - containerRect.left;
        let y = e.clientY - containerRect.top;

        // Magnetic Latch
        let snappedModel: string | null = null;
        for (const model of MODELS) {
            const modelPos = getModelPosition(model.id);
            if (modelPos) {
                const distance = Math.sqrt(Math.pow(x - modelPos.x, 2) + Math.pow(y - modelPos.y, 2));

                // Strong snap zone
                if (distance < SNAP_DISTANCE) {
                    snappedModel = model.id;
                    // HARD LATCH: Lock exactly to the socket center
                    x = modelPos.x;
                    y = modelPos.y;
                    break;
                }
            }
        }

        setHoveredModel(snappedModel);
        setDragPos({ x, y });
    };

    const handleWireStart = () => {
        const inputPos = getInputPosition();
        setDragPos(inputPos);
        setIsDragging(true);
    };

    const handleWireEnd = () => {
        if (hoveredModel) {
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
    // More realistic wire path with natural sag (Cubic Bezier with straight exit)
    const getWirePath = (startX: number, startY: number, endX: number, endY: number) => {
        const dx = endX - startX;
        const dy = endY - startY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Subtle gravity: keep the cable tidy but still soft.
        // Less multiplier + lower cap = tighter curve that doesn't dive.
        const tension = Math.max(20, Math.min(distance * 0.4, 100));
        const exitLength = 20; // Shorter straight section out of the boot

        // Control points pull down from the end of the straight segments
        const cp1x = startX;
        const cp1y = startY + exitLength + tension;
        const cp2x = endX;
        const cp2y = endY + exitLength + tension;

        return `M ${startX} ${startY} 
                L ${startX} ${startY + exitLength} 
                C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY + exitLength}
                L ${endX} ${endY}`;
    };

    const isDrawer = variant === 'drawer';

    return (
        <div
            className={`
                ${isDrawer
                    ? 'absolute top-[60px] left-0 right-0 z-40 animate-in slide-in-from-top-4 duration-300 ease-out'
                    : 'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200'
                }
            `}
            onMouseMove={handleWireDrag}
            onMouseUp={handleWireEnd}
            style={{ cursor: isDragging ? 'grabbing' : 'default' }}
        >
            <div
                ref={containerRef}
                className={`
                    bg-[#1a1a1a] border-white/10 overflow-hidden relative
                    ${isDrawer
                        ? 'w-full border-b shadow-2xl'
                        : 'border-2 rounded-xl w-full max-w-3xl mx-4 shadow-2xl'
                    }
                `}
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                }}
            >
                {/* Header */}
                <div className="border-b border-white/5 px-6 py-3 flex items-center justify-between bg-black/20">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-bedroom-purple shadow-[0_0_8px_rgba(124,58,237,0.8)]" />
                        <h2 className="text-[10px] font-bold text-white/90 uppercase tracking-[0.2em] font-mono">Patch Bay</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="group p-1.5 rounded hover:bg-white/5 transition-colors"
                    >
                        <X className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
                    </button>
                </div>

                {/* Patch Bay Layout */}
                <div className="p-6 flex flex-col md:flex-row gap-8 items-stretch">
                    {/* Left: Input */}
                    <div className="flex-none w-full md:w-32 flex flex-row md:flex-col items-center justify-center md:justify-start gap-6 pt-2">
                        <div className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">Source</div>

                        {/* Input Patch Point */}
                        <div
                            className="relative group cursor-grab active:cursor-grabbing"
                            onMouseDown={handleWireStart}
                        >
                            {/* Jack itself gets the ref so our wire origin is the true socket center,
                               not the combined block with the label underneath (which was offsetting
                               the wire and making it look like it disappeared into the boot). */}
                            {/* Socket depth */}
                            <div className="absolute inset-0 rounded-full bg-black/40 blur-md" />

                            {/* Main patch point - Realistic Socket */}
                            <div
                                ref={inputRef}
                                className={`
                relative w-16 h-16 rounded-full 
                bg-gradient-to-b from-[#2a2a2a] to-[#111]
                border-2 border-[#444]
                flex items-center justify-center transition-all duration-300
                shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_2px_5px_rgba(0,0,0,0.5)]
                ${isDragging ? 'ring-2 ring-bedroom-purple/50' : ''}
              `}
                            >
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

                            {/* No extra label under the jack to keep copy focused on the column title above */}
                        </div>
                    </div>

                    {/* Right: Models */}
                    <div className="flex-1 w-full min-w-0">
                        <div className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em] mb-4 text-center md:text-left">Destinations</div>
                        <div className="grid grid-cols-1 gap-2">
                            {MODELS.map((model) => {
                                const isSelected = model.id === selectedModel;
                                const isHovered = model.id === hoveredModel;

                                return (
                                    <div
                                        key={model.id}
                                        ref={(el) => { modelRefs.current[model.id] = el; }}
                                        onClick={() => !isDragging && handleModelClick(model.id)}
                                        className="group relative flex items-center gap-4 p-3 rounded border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-pointer overflow-hidden"
                                        onMouseDown={(e) => {
                                            // Optional: Add a subtle press effect to the background only if needed
                                        }}
                                    >
                                        {/* Selection State Background */}
                                        <div
                                            className={`
                                                absolute inset-0 transition-all duration-300 ease-out
                                                ${isSelected
                                                    ? 'bg-bedroom-purple/10 border-bedroom-purple/40 shadow-[inset_0_0_20px_rgba(124,58,237,0.1)]'
                                                    : 'border-transparent'
                                                }
                                            `}
                                        />

                                        {/* Content */}
                                        <div className="relative flex items-center justify-between w-full z-10 gap-4">

                                            {/* Left: Output Patch Point */}
                                            <div
                                                ref={(el) => { socketRefs.current[model.id] = el; }}
                                                className="relative flex-none cursor-grab active:cursor-grabbing"
                                                onMouseDown={(e) => {
                                                    e.stopPropagation(); // Don't trigger card click
                                                    if (isSelected) {
                                                        setIsDragging(true);
                                                        const modelPos = getModelPosition(model.id);
                                                        if (modelPos) {
                                                            setDragPos(modelPos);
                                                        }
                                                    }
                                                }}
                                            >
                                                {/* Socket depth */}
                                                <div className="absolute inset-0 rounded-full bg-black/60 blur-[1px]" />

                                                <div className={`
                                                    relative w-8 h-8 rounded-full 
                                                    bg-gradient-to-b from-[#222] to-[#111]
                                                    border border-[#333]
                                                    flex items-center justify-center transition-all duration-200
                                                    shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]
                                                    ${isSelected || isHovered
                                                        ? 'border-bedroom-purple/50 shadow-[0_0_10px_rgba(124,58,237,0.2)]'
                                                        : 'group-hover:border-[#444]'
                                                    }
                                                `}>
                                                    {/* Inner Socket Hole */}
                                                    <div className="w-3.5 h-3.5 rounded-full bg-black shadow-[inset_0_1px_2px_rgba(0,0,0,1)] flex items-center justify-center">
                                                        {/* Contact Pin */}
                                                        <div className="w-1 h-1 rounded-full bg-[#222]" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right: Info */}
                                            <div className="flex-1 min-w-0 flex flex-col gap-1 items-end text-right">
                                                <div className="flex items-center gap-2 flex-row-reverse">
                                                    <span className={`text-xs font-bold tracking-wide truncate ${isSelected ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                                                        {model.name}
                                                    </span>
                                                    {model.speed === 'premium' && <div className="w-1 h-1 rounded-full bg-purple-400 shadow-[0_0_4px_rgba(192,132,252,0.8)]" />}
                                                </div>
                                                <div className="flex items-center gap-2 text-[9px] font-mono text-white/30 uppercase tracking-wider flex-row-reverse">
                                                    <span>{model.provider}</span>
                                                    <span className="w-px h-2 bg-white/10" />
                                                    <span>{model.cost}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* SVG Wire Overlay */}
                <svg className="absolute inset-0 pointer-events-none z-20" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
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
                            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.4" />
                        </filter>
                    </defs>

                    {/* Helper to draw a realistic plug */}
                    {/* We use a component-like function inside the render for the plug visuals */}
                    {/* But since we can't define components inside render easily, we'll inline the SVG groups */}

                    {/* Connected wire */}
                    {!isDragging && selectedModel && selectedModelPos && (
                        <g>
                            {/* Wire Path - starts at boot exit */}
                            <path
                                d={getWirePath(inputPos.x, inputPos.y + 15, selectedModelPos.x, selectedModelPos.y + 15)}
                                stroke="url(#wireGradient)"
                                strokeWidth="8"
                                fill="none"
                                strokeLinecap="round"
                                filter="url(#wireGlow)"
                            />

                            {/* Input Plug (Heavy Duty) - positioned at socket */}
                            <g transform={`translate(${inputPos.x}, ${inputPos.y - 15})`} filter="url(#plugShadow)">
                                {/* Strain Relief (Boot) */}
                                <path d="M -6 10 L -5 30 L 5 30 L 6 10 Z" fill="#1a1a1a" />
                                {/* Plug Body */}
                                <rect x="-10" y="-10" width="20" height="25" rx="4" fill="url(#plugBodyGradient)" stroke="#111" strokeWidth="1" />
                                {/* Color Ring */}
                                <rect x="-10" y="8" width="20" height="3" fill="#7c3aed" />
                                {/* Screw/Detail */}
                                <circle cx="0" cy="-2" r="3" fill="#111" opacity="0.5" />
                            </g>

                            {/* Output Plug (Heavy Duty) - positioned at socket */}
                            <g transform={`translate(${selectedModelPos.x}, ${selectedModelPos.y - 15})`} filter="url(#plugShadow)">
                                {/* Strain Relief (Boot) */}
                                <path d="M -6 10 L -5 30 L 5 30 L 6 10 Z" fill="#1a1a1a" />
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
                            {/* Wire Path - starts at boot exit */}
                            <path
                                d={getWirePath(inputPos.x, inputPos.y + 15, dragPos.x, dragPos.y + 15)}
                                stroke="url(#wireGradient)"
                                strokeWidth="8"
                                fill="none"
                                strokeLinecap="round"
                                filter="url(#wireGlow)"
                                strokeDasharray={hoveredModel ? "0" : "12 6"}
                                className={hoveredModel ? '' : 'opacity-70'}
                            />

                            {/* Input Plug (Fixed) */}
                            <g transform={`translate(${inputPos.x}, ${inputPos.y - 15})`} filter="url(#plugShadow)">
                                <path d="M -6 10 L -5 30 L 5 30 L 6 10 Z" fill="#1a1a1a" />
                                <rect x="-10" y="-10" width="20" height="25" rx="4" fill="url(#plugBodyGradient)" stroke="#111" strokeWidth="1" />
                                <rect x="-10" y="8" width="20" height="3" fill="#7c3aed" />
                                <circle cx="0" cy="-2" r="3" fill="#111" opacity="0.5" />
                            </g>

                            {/* Dragging Plug (Follows Cursor) */}
                            <g transform={`translate(${dragPos.x}, ${dragPos.y - 15})`} filter="url(#plugShadow)">
                                {/* Strain Relief */}
                                <path d="M -6 10 L -5 30 L 5 30 L 6 10 Z" fill="#1a1a1a" />
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
                <div className="px-6 pb-4">
                    <div className="py-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-white/30 uppercase tracking-wider">
                        <div className="flex items-center gap-4">
                            <span>Status: Active</span>
                            <span>Latency: {selectedModelData?.speed === 'premium' ? '120ms' : '45ms'}</span>
                        </div>
                        <div>
                            {selectedModelData?.provider} // {selectedModelData?.name}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
