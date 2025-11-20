import React from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Scene } from "@/lib/types/scene";
import { Film, GripVertical } from "lucide-react";

interface TimelineRailProps {
    scenes: Scene[];
    activeSceneId: string | null;
    onSceneSelect: (id: string) => void;
    onReorder: (startIndex: number, endIndex: number) => void;
}

export default function TimelineRail({
    scenes,
    activeSceneId,
    onSceneSelect,
    onReorder,
}: TimelineRailProps) {
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        onReorder(result.source.index, result.destination.index);
    };

    return (
        <div className="h-36 bg-black/40 backdrop-blur-xl border-t border-white/5 flex flex-col shrink-0 relative z-30">
            {/* Rail Header */}
            <div className="px-4 py-2 flex items-center justify-between text-[10px] text-screen-white/40 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <span className="uppercase tracking-widest font-bold text-[9px]">Timeline</span>
                    <span className="w-px h-3 bg-white/10" />
                    <span>{scenes.length} Scenes</span>
                </div>
            </div>

            {/* Scrollable Area */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="timeline-rail" direction="horizontal">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex-1 overflow-x-auto overflow-y-hidden flex items-center px-4 gap-2 scrollbar-thin scrollbar-thumb-bedroom-purple/20 scrollbar-track-transparent"
                        >
                            {scenes.map((scene, index) => (
                                <Draggable key={scene.id} draggableId={scene.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            onClick={() => onSceneSelect(scene.id)}
                                            className={`
                        relative group flex-shrink-0 w-48 h-24 rounded-xl border transition-all cursor-pointer overflow-hidden
                        ${scene.id === activeSceneId
                                                    ? "border-bedroom-purple/50 bg-bedroom-purple/10 shadow-[0_0_15px_rgba(124,58,237,0.1)]"
                                                    : "border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10"
                                                }
                        ${snapshot.isDragging ? "opacity-90 scale-105 rotate-1 z-50 shadow-2xl ring-1 ring-white/20" : ""}
                      `}
                                        >
                                            {/* Thumbnail / Visual */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                                            {/* Content */}
                                            <div className="absolute inset-0 p-2 flex flex-col justify-between">
                                                <div className="flex items-start justify-between">
                                                    <span className={`
                            text-[10px] font-bold px-1.5 py-0.5 rounded 
                            ${scene.id === activeSceneId ? "bg-bedroom-purple text-white" : "bg-white/10 text-white/60"}
                          `}>
                                                        {index + 1}
                                                    </span>
                                                    <GripVertical className="w-3 h-3 text-white/20 opacity-0 group-hover:opacity-100" />
                                                </div>

                                                <div className="space-y-0.5">
                                                    <h4 className="text-[10px] font-medium text-screen-white truncate w-full">
                                                        {scene.title}
                                                    </h4>
                                                    <p className="text-[9px] text-screen-white/40 truncate">
                                                        {scene.compiledPrompt || "No description"}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Active Indicator Bar */}
                                            {scene.id === activeSceneId && (
                                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-bedroom-purple to-transparent" />
                                            )}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}

                            {/* Add Scene Placeholder */}
                            <div className="w-24 h-24 rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center shrink-0 opacity-30 hover:opacity-60 hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer gap-2">
                                <Film className="w-4 h-4 text-white" />
                                <span className="text-[9px] font-medium text-white">Add Scene</span>
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}
