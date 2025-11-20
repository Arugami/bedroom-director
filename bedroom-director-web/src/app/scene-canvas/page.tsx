"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { useScene } from "@/contexts/SceneContext";
import { supabase } from "@/lib/supabase";
import DirectorSidebar, { SidebarSection } from "@/components/layout/DirectorSidebar";
import TimelineRail from "@/components/scene/TimelineRail";
import { Film, FolderOpen, Save, Lock, Unlock, Plus, Edit3, X, ChevronRight, Sparkles, LayoutTemplate, Camera, Sun, Palette, MessageSquare, Check } from "lucide-react";
import PatchBay from "@/components/ai/PatchBay";
import ModelSelector from "@/components/ai/ModelSelector";

const AnalyzingProgressBar = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    // Trigger animation shortly after mount
    const timer = setTimeout(() => setWidth(100), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 h-1 bg-black/20 z-20">
      <div
        className="h-full bg-gradient-to-r from-bedroom-purple to-indigo-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] transition-all duration-[1500ms] ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

export default function SceneCanvasPage() {
  const {
    project,
    projects,
    activeSceneId,
    createProject,
    loadProject,
    saveProject,
    addScene,
    updateScene,
    setActiveScene,
    updatePromptSlots,
    updateProjectTitle,
    chatMessages,
    addChatMessage,
    updateProjectGlobalStyle,
    updateProjectBible,
    reorderScenes,
  } = useScene();

  const [hasAutoCreatedProject, setHasAutoCreatedProject] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [showCustomCamera, setShowCustomCamera] = useState(false);
  const [showCustomLighting, setShowCustomLighting] = useState(false);
  const [showCustomStyle, setShowCustomStyle] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [outlinePreview, setOutlinePreview] = useState<
    { id: string; title: string; description: string }[] | null
  >(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mobileTab, setMobileTab] = useState<"chat" | "canvas">("chat");
  const [showBible, setShowBible] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showPatchBay, setShowPatchBay] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini"); // Default model

  const generateDefaultProjectTitle = () => {
    return "Untitled Project";
  };

  // Auto-create first project with a branded name if none exist
  useEffect(() => {
    if (!hasAutoCreatedProject && projects.length === 0 && !project) {
      const defaultTitle = generateDefaultProjectTitle();
      createProject(defaultTitle);
      setHasAutoCreatedProject(true);
    }
  }, [hasAutoCreatedProject, projects, project, createProject]);

  // Auto-open inspector when there's an active scene
  useEffect(() => {
    if (activeSceneId && project) {
      setInspectorOpen(true);
    }
  }, [activeSceneId, project]);

  // Auto-save with debounce
  useEffect(() => {
    if (!project) return;

    const timer = setTimeout(() => {
      saveProject();
      setLastSaved(new Date());
    }, 1500); // 1.5s debounce

    return () => clearTimeout(timer);
  }, [project, saveProject]);

  // Format time ago for auto-save indicator
  const getTimeAgo = () => {
    if (!lastSaved) return 'not saved';
    const seconds = Math.floor((Date.now() - lastSaved.getTime()) / 1000);
    if (seconds < 5) return 'just now';
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  const activeScene = project?.scenes.find((s) => s.id === activeSceneId);

  // Use a ref to track the current project for event listeners
  const projectRef = useRef(project);
  useEffect(() => {
    projectRef.current = project;
  }, [project]);

  // Sidebar configuration
  const sidebarSections: SidebarSection[] = [
    {
      title: "Projects",
      items: projects.map((p) => ({
        id: p.id,
        label: p.title,
        icon: <FolderOpen className="w-5 h-5" />,
        onClick: () => loadProject(p.id),
        active: project?.id === p.id,
        color: "text-bedroom-purple",
      })),
    },
  ];

  const [uploadProgress, setUploadProgress] = useState<{ fileName: string; progress: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);
  const [confirmDelete, setConfirmDelete] = useState<{ show: boolean; assetId: string | null }>({ show: false, assetId: null });

  // Keep a ref to the latest processImageUpload to avoid stale closures in the stable event listener
  const processImageUploadRef = useRef<(file: File) => Promise<void>>(async () => { });

  // Update the ref on every render
  useEffect(() => {
    processImageUploadRef.current = processImageUpload;
  });

  useEffect(() => {
    const handleWindowDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current += 1;
      if (e.dataTransfer?.types.includes("Files")) {
        setIsDragging(true);
      }
    };

    const handleWindowDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current -= 1;
      if (dragCounter.current === 0) {
        setIsDragging(false);
      }
    };

    const handleWindowDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleWindowDrop = async (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounter.current = 0;

      const file = e.dataTransfer?.files[0];
      if (file && file.type.startsWith('image/')) {
        // Ensure Bible is open to show the result
        setShowBible(true);
        await processImageUploadRef.current(file);
      }
    };

    window.addEventListener('dragenter', handleWindowDragEnter);
    window.addEventListener('dragleave', handleWindowDragLeave);
    window.addEventListener('dragover', handleWindowDragOver);
    window.addEventListener('drop', handleWindowDrop);

    return () => {
      window.removeEventListener('dragenter', handleWindowDragEnter);
      window.removeEventListener('dragleave', handleWindowDragLeave);
      window.removeEventListener('dragover', handleWindowDragOver);
      window.removeEventListener('drop', handleWindowDrop);
    };
  }, []);

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processImageUpload(file);
    }
  };

  // Compress image before upload for faster speeds
  const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1920;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: 'image/jpeg' }));
            } else {
              resolve(file);
            }
          }, 'image/jpeg', 0.85);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const deleteVisualAsset = (assetId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the preview
    setConfirmDelete({ show: true, assetId });
  };

  const handleConfirmDelete = () => {
    if (!projectRef.current || !confirmDelete.assetId) return;

    const currentAssets = projectRef.current.bible?.visualAssets || [];
    const updatedAssets = currentAssets.filter(a => a.id !== confirmDelete.assetId);

    updateProjectBible({
      visualAssets: updatedAssets
    });

    setConfirmDelete({ show: false, assetId: null });
  };

  const processImageUpload = async (file: File) => {

    const currentProject = projectRef.current;
    if (!currentProject) {
      console.error('No project found (in ref)');
      return;
    }

    try {
      console.log('Starting upload for:', file.name);

      // 1. Create Immediate Optimistic Preview
      const tempId = Date.now().toString();
      const tempUrl = URL.createObjectURL(file);

      const optimisticAsset: any = {
        id: tempId,
        url: tempUrl,
        label: "Analyzing...",
        description: "AI is analyzing this image...",
        tags: ["analyzing"],
        category: "shot_ref",
        createdAt: new Date()
      };

      updateProjectBible({
        visualAssets: [...(currentProject.bible?.visualAssets || []), optimisticAsset]
      });

      // Yield to main thread to allow UI to render optimistic state
      await new Promise(resolve => setTimeout(resolve, 10));

      // 2. Compress
      const compressedFile = await compressImage(file);

      // 3. Upload to Supabase
      const fileExt = 'jpg';
      const fileName = `${currentProject.id}/${tempId}.${fileExt}`;

      if (!supabase) throw new Error("Supabase client not initialized");

      const { error: uploadError, data } = await supabase.storage
        .from('visual-bible')
        .upload(fileName, compressedFile);

      if (uploadError) {
        console.error('Supabase upload error:', uploadError);
        throw uploadError;
      }

      // 4. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('visual-bible')
        .getPublicUrl(fileName);

      // 5. Update Asset with Real URL (keep analyzing state)
      const uploadedAsset = {
        ...optimisticAsset,
        url: publicUrl
      };

      updateProjectBible({
        visualAssets: [...(currentProject.bible?.visualAssets || []).filter(a => a.id !== tempId), uploadedAsset]
      });

      // 6. Trigger AI Analysis
      const response = await fetch('/api/director/vision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: publicUrl })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Vision API error:', response.status, errorText);
        throw new Error(`Analysis failed: ${response.status}`);
      }

      const analysis = await response.json();

      // 7. Update Asset with AI Data
      const finalAsset = {
        ...uploadedAsset,
        label: analysis.label || "Uploaded Image",
        description: analysis.description || "No description available",
        tags: analysis.tags || []
      };

      updateProjectBible({
        visualAssets: [...(currentProject.bible?.visualAssets || []).filter(a => a.id !== tempId), finalAsset]
      });

    } catch (error) {
      console.error('Upload failed:', error);
      alert(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setUploadProgress(null);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-screen-black text-screen-white font-sans selection:bg-bedroom-purple/30 relative">

      {/* Main App Content - Scales/Blurs on Drag */}
      <div
        className={`
          flex h-full w-full transition-all duration-300 ease-out
          ${isDragging ? 'scale-[0.98] blur-sm opacity-50 grayscale-[0.5]' : 'scale-100 blur-0 opacity-100 grayscale-0'}
        `}
      >
        {/* Sidebar - Fixed Left */}
        <DirectorSidebar sections={sidebarSections} mode="full-arsenal" />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">

          {/* Top Bar - Project Title & Actions */}
          <div className="h-14 flex-none border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between px-6 z-50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-screen-white/40 text-xs font-medium uppercase tracking-wider">
                <span>Projects</span>
                <ChevronRight className="w-3 h-3" />
              </div>
              {project ? (
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateProjectTitle(e.target.value)}
                  className="bg-transparent border-none text-sm font-bold text-screen-white focus:ring-0 p-0 w-64 placeholder-screen-white/20"
                  placeholder="Untitled Project"
                />
              ) : (
                <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-white/40">
              <Check className="w-3 h-3" />
              <span>Auto-saved {getTimeAgo()}</span>
            </div>
          </div>

          {/* Workspace - Chat + Canvas + Inspector */}
          <div className="flex-1 flex overflow-hidden relative">

            {/* Left Panel: Director Chat & Visual Bible */}
            <div className={`
              flex flex-col border-r border-white/5 bg-black/40 backdrop-blur-xl transition-all duration-300 z-20
              ${mobileTab === "chat" ? "w-full absolute inset-0 z-30" : "hidden"}
              lg:relative lg:block lg:w-[400px] lg:min-w-[400px] lg:max-w-[400px]
            `}>

              {/* Visual Bible Section (Collapsible) */}
              <div className="flex-none border-b border-white/5">
                <button
                  onClick={() => setShowBible(!showBible)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-8 bg-bedroom-purple rounded-full shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
                    <span className="font-black tracking-tight text-sm">VISUAL BIBLE</span>
                  </div>
                  {showBible ? <ChevronRight className="w-4 h-4 rotate-90 transition-transform" /> : <ChevronRight className="w-4 h-4 transition-transform" />}
                </button>

                {showBible && (
                  <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-200">
                    <div
                      className="relative group rounded-xl border-2 border-dashed border-white/10 bg-black/20 hover:border-bedroom-purple/50 hover:bg-white/5 transition-all duration-300 overflow-hidden"
                    >
                      <input
                        type="file"
                        id="visual-upload"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleFileInputChange}
                      />
                      <label
                        htmlFor="visual-upload"
                        className="cursor-pointer flex flex-col items-center justify-center p-6 gap-3"
                      >
                        <div className="w-10 h-10 rounded-full bg-white/5 text-bedroom-purple flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-bedroom-purple group-hover:text-white">
                          <Plus className="w-5 h-5" />
                        </div>
                        <div className="text-center">
                          <div className="text-xs font-bold text-screen-white group-hover:text-bedroom-purple transition-colors">
                            Add Reference
                          </div>
                          <div className="text-[10px] text-screen-white/40 mt-1">
                            Drag & drop or click to browse
                          </div>
                        </div>
                      </label>
                    </div>

                    {/* Visual Assets Grid */}
                    {project?.bible?.visualAssets && project.bible.visualAssets.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-3 max-h-[200px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
                        {project.bible.visualAssets.map((asset, i) => {
                          const isAnalyzing = asset.tags.includes("analyzing");
                          return (
                            <div key={i} className={`group relative aspect-square rounded-lg overflow-hidden border border-white/10 bg-black/50 cursor-pointer hover:border-bedroom-purple/50 transition-colors ${isAnalyzing ? 'animate-pulse border-bedroom-purple/50' : ''}`}>
                              <img src={asset.url} alt={asset.label} className={`w-full h-full object-cover ${isAnalyzing ? 'opacity-50 blur-[2px]' : ''}`} />

                              {/* Analyzing Overlay */}
                              {isAnalyzing && (
                                <>
                                  <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px]" />
                                  <AnalyzingProgressBar />
                                </>
                              )}

                              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2">
                                <button
                                  onClick={(e) => deleteVisualAsset(asset.id, e)}
                                  className="absolute top-1 right-1 p-1.5 rounded-full bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-white/60 transition-colors"
                                  title="Remove asset"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Director Chat Section */}
              <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-transparent to-black/20">
                {/* Chat Header */}
                <div className="flex-none px-4 py-3 border-b border-white/5 flex items-center justify-between bg-black/20">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowPatchBay(true)}
                      className="relative group cursor-pointer"
                      title="Configure AI Model"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-bedroom-purple to-indigo-600 flex items-center justify-center shadow-lg shadow-bedroom-purple/20 group-hover:shadow-bedroom-purple/40 transition-all">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full" />
                    </button>
                    <div>
                      <div className="text-xs font-bold text-screen-white">Director AI</div>
                      <div className="text-[10px] text-screen-white/40">Always active</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <ModelSelector
                      selectedModelId={selectedModel}
                      onSelectModel={setSelectedModel}
                      onOpenPatchBay={() => setShowPatchBay(true)}
                    />
                  </div>
                </div>

                {/* Patch Bay Drawer */}
                {showPatchBay && (
                  <PatchBay
                    currentModel={selectedModel}
                    onModelChange={(model) => {
                      setSelectedModel(model);
                    }}
                    onClose={() => setShowPatchBay(false)}
                    variant="drawer"
                  />
                )}

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {chatMessages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 opacity-50">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 rotate-3">
                        <Sparkles className="w-6 h-6 text-bedroom-purple" />
                      </div>
                      <h3 className="text-sm font-bold text-screen-white mb-1">Director Chat</h3>
                      <p className="text-xs text-screen-white/50 max-w-[200px]">
                        Discuss your vision, brainstorm scenes, or ask for structural advice.
                      </p>
                    </div>
                  ) : (
                    chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        {/* Avatar */}
                        <div className={`
                          flex-none w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg mt-1
                          ${message.role === "user" ? "bg-white text-black" : "bg-bedroom-purple text-white"}
                        `}>
                          {message.role === "user" ? "U" : "AI"}
                        </div>

                        <div className={`
                          relative max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm
                          ${message.role === "user"
                            ? "bg-bedroom-purple text-white rounded-tr-sm"
                            : "bg-white/10 text-white border border-white/10 rounded-tl-sm backdrop-blur-sm"}`}
                        >
                          {message.content}

                          {/* Tool Output (if any) */}
                          {message.toolCalls && (
                            <div className="mt-2 pt-2 border-t border-white/10 space-y-1">
                              {message.toolCalls.map((tool, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 text-[10px] text-screen-white/50 bg-black/20 rounded px-2 py-1">
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                                  <span>Used tool: <span className="font-mono text-screen-white/70">{tool.name}</span></span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  <div className="h-px" /> {/* Spacer */}
                </div>

                {/* Input Area */}
                <div className="flex-none p-4 bg-black/40 border-t border-white/5 backdrop-blur-xl">
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!chatInput.trim() || isGenerating || !project) return;

                      const userMessage = chatInput.trim();
                      setChatInput("");
                      setIsGenerating(true);

                      // Add user message
                      addChatMessage({ content: userMessage, role: "user" });

                      try {
                        // Call chat API with full conversation history
                        const response = await fetch('/api/director/chat', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            messages: [
                              ...chatMessages.map(m => ({ role: m.role, content: m.content })),
                              { role: 'user', content: userMessage }
                            ],
                            projectContext: {
                              title: project.title,
                              scenes: project.scenes,
                              bible: project.bible
                            }
                          })
                        });

                        if (!response.ok) {
                          throw new Error('Chat API failed');
                        }

                        const data = await response.json();

                        // Add AI response
                        addChatMessage({
                          content: data.content || "I'm here to help with your project!",
                          role: "assistant",
                        });
                      } catch (error) {
                        console.error('Chat error:', error);
                        addChatMessage({
                          content: "Sorry, I encountered an error. Please try again.",
                          role: "assistant"
                        });
                      } finally {
                        setIsGenerating(false);
                      }
                    }}
                    className="relative"
                  >
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Describe a scene or ask for ideas..."
                      disabled={isGenerating}
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-bedroom-purple/50 focus:bg-black/60 transition-all shadow-inner disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={!chatInput.trim() || isGenerating}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-bedroom-purple text-white hover:bg-bedroom-purple/80 disabled:opacity-0 disabled:scale-90 transition-all duration-200 shadow-lg shadow-bedroom-purple/20"
                    >
                      {isGenerating ? (
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <ChevronRight className="w-3 h-3" />
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Center Panel: Reel Wall */}
            <div className="flex-1 relative bg-black/20 overflow-hidden">
              {/* Background Grid/Glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-bedroom-purple/5 blur-[100px] rounded-full pointer-events-none" />
              </div>

              {/* Scrollable Reel Wall Container */}
              <div className="absolute inset-0 overflow-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="min-h-full p-8 pb-32">
                  {project?.scenes.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center pt-20">
                      <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(124,58,237,0.1)]">
                        <Film className="w-10 h-10 text-bedroom-purple" />
                      </div>
                      <h2 className="text-3xl font-black text-screen-white mb-4 tracking-tight">Start Your First Scene</h2>
                      <p className="text-screen-white/50 max-w-md text-center mb-12 text-sm leading-relaxed">
                        Every great film begins with a single frame. Choose a template below to get started, or use Director Chat to brainstorm your vision.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                        {[
                          { title: "Opening Shot", desc: "Establish the world", icon: <Camera className="w-6 h-6" /> },
                          { title: "Main Beat", desc: "Core action sequence", icon: <Sparkles className="w-6 h-6" /> },
                          { title: "Closing Shot", desc: "Leave them wanting more", icon: <Film className="w-6 h-6" /> },
                        ].map((template, i) => (
                          <button
                            key={i}
                            onClick={() => addScene(undefined, { title: template.title })}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-bedroom-purple/50 transition-all duration-300 text-left hover:-translate-y-1 hover:shadow-xl"
                          >
                            <div className="mb-4 text-bedroom-purple group-hover:scale-110 transition-transform duration-300">
                              {template.icon}
                            </div>
                            <h3 className="text-lg font-bold text-screen-white mb-2">{template.title}</h3>
                            <p className="text-xs text-screen-white/50">{template.desc}</p>
                          </button>
                        ))}
                      </div>

                      <div className="mt-12 p-4 rounded-xl bg-bedroom-purple/10 border border-bedroom-purple/20 flex items-center gap-4 max-w-lg">
                        <div className="p-2 rounded-lg bg-bedroom-purple/20">
                          <MessageSquare className="w-4 h-4 text-bedroom-purple" />
                        </div>
                        <div className="text-xs text-screen-white/70">
                          <span className="text-bedroom-purple font-bold">Pro tip:</span> Not sure where to start? Use <span className="text-screen-white font-bold">Director Chat</span> on the left to brainstorm ideas.
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-8 items-start justify-center">
                      {project?.scenes.map((scene, index) => (
                        <div
                          key={scene.id}
                          onClick={() => setActiveScene(scene.id)}
                          className={`
                            group relative flex-none transition-all duration-500 ease-out
                            ${activeSceneId === scene.id ? 'scale-105 z-10' : 'hover:scale-102 opacity-80 hover:opacity-100'}
                          `}
                          style={{ minWidth: '450px', width: '450px' }}
                        >
                          {/* Cinematic Card */}
                          <div className={`
                            relative aspect-video bg-black rounded-lg overflow-hidden border-2 shadow-2xl
                            ${activeSceneId === scene.id
                              ? 'border-bedroom-purple shadow-[0_0_50px_rgba(124,58,237,0.3)]'
                              : 'border-white/10 hover:border-white/30'}
                          `}>
                            {/* Film Perforations (Top/Bottom) */}
                            <div className="absolute top-0 left-0 right-0 h-4 bg-black z-20 flex justify-between px-2 items-center opacity-50">
                              {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className="w-2 h-3 bg-white/20 rounded-[1px]" />
                              ))}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-4 bg-black z-20 flex justify-between px-2 items-center opacity-50">
                              {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className="w-2 h-3 bg-white/20 rounded-[1px]" />
                              ))}
                            </div>

                            {/* Scene Content */}
                            <div className="absolute inset-0 my-4 bg-zinc-900 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
                              {/* Giant Scene Number */}
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                                <span
                                  className="font-black text-white/5 select-none transform -rotate-12 translate-y-4"
                                  style={{ fontSize: '180px', lineHeight: 1 }}
                                >
                                  {index + 1}
                                </span>
                              </div>

                              <div className="relative z-10 text-center px-8">
                                <h3 className="text-2xl font-black text-screen-white mb-2 tracking-tight drop-shadow-lg">
                                  {scene.title}
                                </h3>
                                <p className="text-sm text-screen-white/60 line-clamp-3 font-medium drop-shadow-md">
                                  {scene.notes || "No description yet..."}
                                </p>
                              </div>
                            </div>

                            {/* Active Indicator */}
                            {activeSceneId === scene.id && (
                              <div className="absolute top-6 right-6 z-30">
                                <div className="px-3 py-1 rounded-full bg-bedroom-purple text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                                  Editing
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Scene Meta Below Card */}
                          <div className="mt-4 flex items-center justify-between px-2">
                            <div className="flex items-center gap-3">
                              <span className="text-4xl font-black text-white/20 font-mono">
                                {(index + 1).toString().padStart(2, '0')}
                              </span>
                              <div className="h-8 w-px bg-white/10" />
                              <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-wider text-bedroom-purple font-bold">
                                  {scene.promptSlots.camera.shotType || "Wide Shot"}
                                </span>
                                <span className="text-[10px] text-white/40">
                                  {scene.promptSlots.lighting.timeOfDay || "Day"} • {scene.promptSlots.style.aesthetic || "Cinematic"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Add New Scene Button (End of Reel) */}
                      <button
                        onClick={() => addScene()}
                        className="flex-none w-[200px] aspect-[9/16] rounded-2xl border-2 border-dashed border-white/10 hover:border-bedroom-purple/50 hover:bg-white/5 transition-all flex flex-col items-center justify-center gap-4 group"
                      >
                        <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-bedroom-purple/20 flex items-center justify-center transition-colors">
                          <Plus className="w-8 h-8 text-white/20 group-hover:text-bedroom-purple transition-colors" />
                        </div>
                        <span className="text-xs font-bold text-white/30 group-hover:text-white/60 uppercase tracking-widest">
                          New Scene
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Panel: Inspector (Fixed Width) */}
            {inspectorOpen && activeScene && (
              <div className="w-96 flex-none border-l border-white/5 bg-black/40 backdrop-blur-xl overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                <div className="p-6 space-y-8 pb-32">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold text-screen-white uppercase tracking-wider">Inspector</h2>
                    <button onClick={() => setInspectorOpen(false)} className="text-white/40 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Scene Title Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-bedroom-purple uppercase tracking-wider">Scene Heading</label>
                    <input
                      type="text"
                      value={activeScene.title}
                      onChange={(e) => updateScene(activeScene.id, { title: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 py-2 text-xl font-black text-screen-white focus:border-bedroom-purple focus:outline-none transition-colors placeholder-white/20"
                      placeholder="SCENE TITLE"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-bedroom-purple uppercase tracking-wider">Action & Description</label>
                    <textarea
                      value={activeScene.notes}
                      onChange={(e) => updateScene(activeScene.id, { notes: e.target.value })}
                      className="w-full h-32 bg-white/5 rounded-xl border border-white/10 p-4 text-sm text-screen-white/80 focus:border-bedroom-purple/50 focus:bg-white/10 focus:outline-none transition-all resize-none leading-relaxed"
                      placeholder="Describe what happens in this scene..."
                    />
                  </div>

                  {/* Camera Controls */}
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-screen-white/60">
                      <Camera className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase">Camera</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {["Wide", "Medium", "Close-up", "Extreme Close-up"].map((shot) => (
                        <button
                          key={shot}
                          onClick={() => updatePromptSlots(activeScene.id, { camera: { ...activeScene.promptSlots.camera, shotType: shot } })}
                          className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wide border transition-all ${activeScene.promptSlots.camera.shotType === shot
                            ? "bg-bedroom-purple text-white border-bedroom-purple"
                            : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
                            }`}
                        >
                          {shot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lighting Controls */}
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-screen-white/60">
                      <Sun className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase">Lighting</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {["Day", "Golden Hour", "Night", "Studio"].map((time) => (
                        <button
                          key={time}
                          onClick={() => updatePromptSlots(activeScene.id, { lighting: { ...activeScene.promptSlots.lighting, timeOfDay: time } })}
                          className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wide border transition-all ${activeScene.promptSlots.lighting.timeOfDay === time
                            ? "bg-bedroom-purple text-white border-bedroom-purple"
                            : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
                            }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Style Controls */}
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-screen-white/60">
                      <Palette className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase">Style</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {["Cinematic", "Film Noir", "Cyberpunk", "Documentary", "Wes Anderson"].map((style) => (
                        <button
                          key={style}
                          onClick={() => updatePromptSlots(activeScene.id, { style: { ...activeScene.promptSlots.style, aesthetic: style } })}
                          className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${activeScene.promptSlots.style.aesthetic === style
                            ? "bg-white text-black border-white"
                            : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
                            }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* Timeline Rail (Bottom Dock) */}
          {project && (
            <TimelineRail
              scenes={project.scenes}
              activeSceneId={activeSceneId}
              onSceneSelect={setActiveScene}
              onReorder={reorderScenes}
            />
          )}
        </div>
      </div>

      {/* Global Drag Overlay - Outside the blurred container */}
      <div
        className={`
          fixed inset-0 z-[100] bg-black/40 backdrop-blur-md flex items-center justify-center transition-all duration-500 pointer-events-none
          ${isDragging ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-bedroom-purple/20 to-indigo-600/20 border border-bedroom-purple/30 flex items-center justify-center backdrop-blur-xl shadow-[0_0_60px_rgba(124,58,237,0.4)] transition-all duration-700">
            <Plus className="w-10 h-10 text-bedroom-purple" strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-white/90 tracking-tight">Add to Visual Bible</h2>
            <p className="text-sm text-white/50 font-normal max-w-xs">
              AI will analyze and catalog your reference
            </p>
          </div>
        </div>
      </div>

      {/* Custom Confirmation Modal */}
      {confirmDelete.show && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-screen-black border border-white/10 rounded-2xl p-6 max-w-sm mx-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-semibold text-white mb-2">Remove Reference?</h3>
            <p className="text-sm text-white/60 mb-6">This image will be removed from your Visual Bible.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDelete({ show: false, assetId: null })}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm font-medium transition-colors border border-red-500/30"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
