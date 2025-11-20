"use client";

import { useState, useEffect, FormEvent } from "react";
import { useScene } from "@/contexts/SceneContext";
import { supabase } from "@/lib/supabase";
import DirectorSidebar, { SidebarSection } from "@/components/layout/DirectorSidebar";
import TimelineRail from "@/components/scene/TimelineRail";
import { Film, FolderOpen, Save, Lock, Unlock, Plus, Edit3, X, ChevronRight, Sparkles } from "lucide-react";

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

  const activeScene = project?.scenes.find((s) => s.id === activeSceneId);

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      await processImageUpload(file);
    }
  };

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

  const processImageUpload = async (file: File) => {
    if (!project) return;

    setUploadProgress({ fileName: file.name, progress: 0 });
    setIsGenerating(true);

    try {
      // 1. Check for Supabase configuration
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || !supabase) {
        alert("Visual Bible uploads are not configured. Please add your Supabase keys to .env.local (and deployment env) to enable cloud uploads.");
        setIsGenerating(false);
        return;
      }

      // 2. Compress image for faster upload
      setUploadProgress({ fileName: file.name, progress: 10 });
      const compressedFile = await compressImage(file);

      // 3. Upload to Supabase
      setUploadProgress({ fileName: file.name, progress: 30 });
      const fileExt = compressedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('visual-bible')
        .upload(filePath, compressedFile);

      if (uploadError) {
        console.error("Supabase Upload Error:", uploadError);
        throw new Error("Failed to upload image to Supabase. Make sure the 'visual-bible' bucket exists and is public.");
      }

      // 4. Get Public URL
      setUploadProgress({ fileName: file.name, progress: 60 });
      const { data: { publicUrl } } = supabase.storage
        .from('visual-bible')
        .getPublicUrl(filePath);

      // 5. Create Asset (Optimistic)
      const newAsset = {
        id: `asset-${Date.now()}`,
        url: publicUrl,
        category: "prop" as const,
        label: file.name.split(".")[0],
        description: "AI Analyzing visual content...",
        tags: ["analyzing"],
        createdAt: new Date(),
      };

      // Add immediately
      const currentAssets = project.bible?.visualAssets || [];
      updateProjectBible({
        visualAssets: [...currentAssets, newAsset]
      });

      // 6. Call Vision API
      fetch("/api/director/vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: publicUrl }),
      })
        .then(res => res.json())
        .then(analysis => {
          if (analysis.error) throw new Error(analysis.error);

          // Update the asset with AI analysis
          updateProjectBible({
            visualAssets: [...currentAssets, {
              ...newAsset,
              description: analysis.description || "No description available",
              tags: analysis.tags || [],
              // We could also store palette/mood if we extended the schema
            }]
          });
        })
        .catch(err => {
          console.error("Vision Analysis Failed", err);
          // Fallback update
          updateProjectBible({
            visualAssets: [...currentAssets, {
              ...newAsset,
              description: "Analysis failed. You can add a description manually.",
              tags: ["upload"],
            }]
          });
        });

    } catch (error) {
      console.error("Upload failed", error);
      alert(error instanceof Error ? error.message : "Failed to upload image");
    } finally {
      setIsGenerating(false);
      setUploadProgress(null);
    }
  };

  const handleChatSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed) return;

    // 1. Add User Message
    addChatMessage({
      role: "user",
      content: trimmed,
    });

    setChatInput("");
    setIsGenerating(true);

    try {
      // 2. Call API
      const response = await fetch("/api/director/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, { role: "user", content: trimmed }],
          projectContext: {
            title: project?.title,
            bible: project?.bible,
          },
        }),
      });

      if (!response.ok) throw new Error("Failed to chat");

      const data = await response.json();

      // 3. Handle Tool Calls (Update Bible)
      if (data.tool_calls) {
        data.tool_calls.forEach((toolCall: any) => {
          if (toolCall.function.name === "update_bible") {
            try {
              const args = JSON.parse(toolCall.function.arguments);
              updateProjectBible(args);
              // Optional: Add a system message saying what was updated?
            } catch (e) {
              console.error("Failed to parse tool args", e);
            }
          }
        });
      }

      // 4. Add Assistant Message
      if (data.content) {
        addChatMessage({
          role: "assistant",
          content: data.content,
        });
      }
    } catch (error) {
      console.error("Chat failed", error);
      addChatMessage({
        role: "system",
        content: "Error: Failed to connect to the Director AI.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-director-black">
      {/* Film grain texture */}
      <div className="fixed inset-0 grain-texture opacity-5 pointer-events-none z-0" />

      {/* Sidebar */}
      <DirectorSidebar mode="full-arsenal" sections={sidebarSections} storageKey="scene-canvas-sidebar" />

      {/* Main Canvas Area */}
      <div className="flex-1 relative z-10 flex flex-col">
        {!project ? (
          // Loading State
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-6 max-w-md px-6">
              <div className="w-24 h-24 mx-auto bg-bedroom-purple/10 rounded-2xl flex items-center justify-center animate-pulse">
                <Film className="w-12 h-12 text-bedroom-purple" />
              </div>
              <h1 className="text-4xl font-bold text-screen-white">Scene Canvas</h1>
              <p className="text-screen-white/70 text-lg">Loading your creative workspace...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Top Bar - Project Info */}
            <div className="px-6 py-4 border-b border-bedroom-purple/10 bg-black/20 backdrop-blur-sm">
              <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                  <div className="relative group">
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => updateProjectTitle(e.target.value)}
                      className="bg-transparent border-b border-transparent hover:border-bedroom-purple/30 focus:border-bedroom-purple text-xl font-bold text-screen-white px-2 py-1 outline-none min-w-[8rem] transition-all"
                      aria-label="Project title"
                      title="Click to rename your project"
                    />
                    <Edit3 className="w-3 h-3 absolute -right-4 top-1/2 -translate-y-1/2 text-screen-white/30 group-hover:text-bedroom-purple/50 transition-colors" />
                    <div className="absolute left-0 -bottom-8 bg-black/90 text-screen-white/90 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 border border-bedroom-purple/20">
                      Click to rename anytime
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-screen-white/40 text-sm">
                      {project.scenes.length} {project.scenes.length === 1 ? "scene" : "scenes"}
                    </span>
                    {project.globalStyle?.visualTheme && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-bedroom-purple/30 bg-bedroom-purple/10 px-2.5 py-1 text-[11px] text-screen-white/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-bedroom-purple" />
                        {project.globalStyle.visualTheme}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={saveProject}
                  className="px-4 py-2 bg-bedroom-purple hover:bg-bedroom-purple/80 text-screen-white font-medium rounded-lg transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>

            {/* Mobile Tab Toggle */}
            <div className="lg:hidden px-4 py-2 border-b border-bedroom-purple/10 bg-black/20">
              <div className="flex p-1 bg-black/40 rounded-lg border border-bedroom-purple/20">
                <button
                  onClick={() => setMobileTab("chat")}
                  className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${mobileTab === "chat"
                    ? "bg-bedroom-purple text-screen-white shadow-lg"
                    : "text-screen-white/50 hover:text-screen-white/80"
                    }`}
                >
                  Director Chat
                </button>
                <button
                  onClick={() => setMobileTab("canvas")}
                  className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${mobileTab === "canvas"
                    ? "bg-bedroom-purple text-screen-white shadow-lg"
                    : "text-screen-white/50 hover:text-screen-white/80"
                    }`}
                >
                  Reel Wall
                </button>
              </div>
            </div>

            {/* Main Layout: Director Chat + Reel Wall + Inspector */}
            <div className="flex-1 flex overflow-hidden relative">
              {/* Background Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-bedroom-purple/5 via-transparent to-bedroom-purple/5 pointer-events-none" />

              {/* Director Chat Panel */}
              <aside
                className={`
                  flex-col border-r border-white/5 bg-black/20 backdrop-blur-xl transition-all duration-300 relative z-10
                  ${mobileTab === "chat" ? "flex w-full" : "hidden"}
                  lg:flex lg:w-[400px] xl:w-[450px] shrink-0
                `}
              >
                <div className="px-4 py-3 border-b border-bedroom-purple/10 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-screen-white flex items-center gap-2">
                      <span className="inline-flex h-2 w-2 rounded-full bg-bedroom-purple" />
                      Director Chat
                    </h2>
                    <p className="mt-1 text-xs text-screen-white/50">
                      Brain-dump your project.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowBible(!showBible)}
                    className={`text-[10px] px-2 py-1 rounded border ${showBible
                      ? "bg-bedroom-purple text-screen-white border-bedroom-purple"
                      : "bg-transparent text-screen-white/60 border-screen-white/20 hover:border-screen-white/40"
                      }`}
                  >
                    {showBible ? "Hide Bible" : "Show Bible"}
                  </button>
                </div>

                {/* Project Bible Panel (Collapsible) */}
                {
                  showBible && project?.bible && (
                    <div className="bg-black/40 border-b border-bedroom-purple/10 p-3 text-xs space-y-3 max-h-48 overflow-auto">
                      {project.bible.characters.length > 0 && (
                        <div>
                          <h4 className="font-bold text-bedroom-purple mb-1">Characters</h4>
                          <div className="space-y-1">
                            {project.bible.characters.map((c, i) => (
                              <div key={i} className="flex gap-2">
                                <span className="text-screen-white font-medium">{c.name}:</span>
                                <span className="text-screen-white/60 truncate">{c.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {project.bible.locations.length > 0 && (
                        <div>
                          <h4 className="font-bold text-bedroom-purple mb-1">Locations</h4>
                          <div className="space-y-1">
                            {project.bible.locations.map((l, i) => (
                              <div key={i} className="flex gap-2">
                                <span className="text-screen-white font-medium">{l.name}:</span>
                                <span className="text-screen-white/60 truncate">{l.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {project.bible.aesthetic.palette.length > 0 && (
                        <div>
                          <h4 className="font-bold text-bedroom-purple mb-1">Aesthetic</h4>
                          <div className="flex gap-1">
                            {project.bible.aesthetic.palette.map((color, i) => (
                              <div key={i} className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: color }} title={color} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                }

                {/* Visual Assets Section */}
                <div>
                  <h4 className="font-bold text-bedroom-purple mb-2">Visual References</h4>

                  {/* Drag-and-Drop Upload Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative mb-3 border-2 border-dashed rounded-xl p-6 transition-all duration-300 ${isDragging
                      ? 'border-bedroom-purple bg-bedroom-purple/20 scale-105 shadow-[0_0_40px_rgba(124,58,237,0.4)]'
                      : 'border-white/10 hover:border-bedroom-purple/50 bg-white/5 scale-100'
                      }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="visual-upload"
                      onChange={handleFileInputChange}
                    />
                    <label
                      htmlFor="visual-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      {uploadProgress ? (
                        <>
                          <div className="text-[10px] text-bedroom-purple font-medium">
                            {uploadProgress.fileName}
                          </div>
                          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-bedroom-purple transition-all duration-300"
                              style={{ width: `${uploadProgress.progress}%` }}
                            />
                          </div>
                          <div className="text-[9px] text-screen-white/60">
                            {uploadProgress.progress}% uploaded
                          </div>
                        </>
                      ) : (
                        <>
                          <svg
                            className={`w-8 h-8 mb-1 transition-all ${isDragging ? 'text-bedroom-purple scale-110' : 'text-bedroom-purple/60'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <div className={`text-[10px] font-medium transition-all ${isDragging ? 'text-bedroom-purple' : 'text-bedroom-purple/80'}`}>
                            {isDragging ? 'Drop to upload' : 'Drop images here or click to browse'}
                          </div>
                          <div className="text-[9px] text-screen-white/40">
                            JPG, PNG, GIF up to 10MB
                          </div>
                        </>
                      )}
                    </label>
                  </div>

                  {(!project.bible?.visualAssets || project.bible.visualAssets.length === 0) ? (
                    <div className="text-screen-white/30 italic text-[10px]">No visual references yet.</div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {project.bible?.visualAssets.map((asset, i) => {
                        const isAnalyzing = asset.tags.includes("analyzing");
                        return (
                          <div key={i} className="group relative aspect-square rounded-lg overflow-hidden border border-white/10 bg-black/50">
                            <img src={asset.url} alt={asset.label} className={`w-full h-full object-cover ${isAnalyzing ? 'opacity-50' : ''}`} />
                            {isAnalyzing && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="animate-spin h-6 w-6 border-2 border-bedroom-purple border-t-transparent rounded-full" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 gap-1">
                              <span className="text-[9px] text-center text-screen-white font-medium leading-tight">{asset.label}</span>
                              <span className="text-[8px] text-center text-screen-white/60 leading-tight line-clamp-2">{asset.description}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>



                <div className="flex-1 overflow-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {chatMessages.length > 0 && !outlinePreview && (
                    <button
                      type="button"
                      disabled={isGenerating}
                      onClick={async () => {
                        setIsGenerating(true);
                        try {
                          const response = await fetch("/api/director/structure", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              chatHistory: chatMessages,
                              projectContext: {
                                title: project.title,
                                sceneCount: project.scenes.length,
                              },
                            }),
                          });

                          if (!response.ok) throw new Error("Failed to generate");

                          const data = await response.json();
                          if (data.scenes) {
                            const previewScenes = data.scenes.map((s: any, i: number) => ({
                              id: `preview-${i}`,
                              title: s.title,
                              description: s.description
                            }));
                            setOutlinePreview(previewScenes);
                          }
                        } catch (error) {
                          console.error("Generation failed", error);
                          alert("Failed to generate structure. Check console.");
                        } finally {
                          setIsGenerating(false);
                        }
                      }}
                      className="w-full rounded-lg border border-bedroom-purple/40 bg-bedroom-purple/10 px-3 py-2 text-[11px] font-medium text-bedroom-purple hover:bg-bedroom-purple/15 hover:border-bedroom-purple/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isGenerating ? (
                        <>
                          <span className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />
                          Thinking...
                        </>
                      ) : (
                        "Propose structure from chat (AI)"
                      )}
                    </button>
                  )}

                  {outlinePreview && (
                    <div className="rounded-lg border border-bedroom-purple/30 bg-black/70 p-3 text-[11px] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-screen-white">Proposed outline</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setOutlinePreview(null)}
                            className="text-[10px] text-screen-white/50 hover:text-screen-white/80"
                          >
                            Clear
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (!project || !outlinePreview) return;

                              // 1. Update existing scenes
                              const limit = Math.min(project.scenes.length, outlinePreview.length);
                              for (let index = 0; index < limit; index += 1) {
                                const scene = project.scenes[index];
                                const outlineScene = outlinePreview[index];
                                updateScene(scene.id, {
                                  title: outlineScene.title,
                                  notes: outlineScene.description,
                                });
                              }

                              // 2. Create new scenes for the rest
                              if (outlinePreview.length > project.scenes.length) {
                                for (let index = project.scenes.length; index < outlinePreview.length; index += 1) {
                                  const outlineScene = outlinePreview[index];
                                  addScene(undefined, {
                                    title: outlineScene.title,
                                    notes: outlineScene.description,
                                  });
                                }
                              }

                              setOutlinePreview(null);
                            }}
                            className="rounded-md bg-bedroom-purple px-2 py-1 text-[10px] font-semibold text-screen-white hover:bg-bedroom-purple/80"
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                      <ul className="space-y-1">
                        {outlinePreview.map((scene, index) => (
                          <li key={scene.id} className="text-screen-white/80">
                            <span className="font-semibold">Scene {index + 1}:</span>{" "}
                            <span>{scene.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {chatMessages.length === 0 && (
                    <div className="text-xs text-screen-white/50">
                      Start by telling the assistant what you&apos;re trying to make: goals, platform, vibes, references.
                    </div>
                  )}

                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`rounded-xl px-4 py-3 text-xs leading-relaxed max-w-[90%] ${message.role === "user"
                        ? "bg-gradient-to-br from-bedroom-purple/80 to-bedroom-purple/40 text-screen-white ml-auto rounded-tr-none shadow-lg shadow-bedroom-purple/10"
                        : "bg-white/5 text-screen-white/90 mr-auto rounded-tl-none border border-white/5 backdrop-blur-md"
                        }`}
                    >
                      <div className="mb-1 flex items-center justify-between">
                        <div className="text-[10px] uppercase tracking-wide text-screen-white/40">
                          {message.role === "user"
                            ? "You"
                            : message.role === "assistant"
                              ? "Assistant"
                              : "System"}
                        </div>
                        <div className="flex items-center gap-2">
                          {activeScene && message.role !== "system" && (
                            <button
                              type="button"
                              onClick={() => {
                                updatePromptSlots(activeScene.id, {
                                  subject: message.content,
                                });
                              }}
                              className="text-[10px] font-medium text-bedroom-purple hover:text-bedroom-purple/80"
                            >
                              Use for current scene
                            </button>
                          )}
                          {message.role !== "system" && (
                            <button
                              type="button"
                              onClick={() => {
                                updateProjectGlobalStyle({
                                  visualTheme: message.content,
                                });
                              }}
                              className="text-[10px] font-medium text-screen-white/60 hover:text-screen-white"
                            >
                              Pin as style
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleChatSubmit} className="border-t border-white/5 p-3 bg-black/20">
                  <div className="flex items-end gap-2">
                    <textarea
                      value={chatInput}
                      onChange={(event) => setChatInput(event.target.value)}
                      rows={1}
                      className="flex-1 resize-none rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-screen-white placeholder:text-screen-white/30 focus:outline-none focus:border-bedroom-purple/50 focus:bg-white/10 transition-all"
                      placeholder="Type a command or describe your vision..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleChatSubmit(e);
                        }
                      }}
                    />
                    <button
                      type="submit"
                      className="h-[42px] w-[42px] inline-flex items-center justify-center rounded-xl bg-bedroom-purple text-screen-white hover:bg-bedroom-purple/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-bedroom-purple/20"
                      disabled={!chatInput.trim() || isGenerating}
                    >
                      {isGenerating ? (
                        <span className="animate-spin h-4 w-4 border-2 border-white/50 border-t-transparent rounded-full" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </form>
              </aside>

              {/* Reel Wall - Primary Canvas */}
              <div
                className={`flex-1 overflow-hidden transition-all duration-300 bg-gradient-radial from-bedroom-purple/5 via-black/20 to-black/30 relative
                  ${mobileTab === "canvas" ? "block" : "hidden"}
                  lg:block
                `}
              >
                {/* Film Grain Texture Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
                />

                <div className="h-full overflow-auto relative z-10">
                  <div className={`px-8 py-8 ${inspectorOpen ? 'pr-[400px]' : 'pr-8'} transition-all duration-300`}>
                    {/* Reel Wall Header */}
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-3">
                        <Film className="w-8 h-8 text-bedroom-purple" />
                        <h2 className="text-3xl font-black text-screen-white tracking-tight">Reel Wall</h2>
                      </div>
                      <p className="text-screen-white/60 text-sm pl-12">
                        Your film at a glance. Click any scene to direct.
                      </p>
                    </div>

                    {/* Empty State with Starter Templates */}
                    {project.scenes.length === 0 ? (
                      <div className="max-w-4xl mx-auto text-center py-20">
                        {/* Hero Icon + Headline */}
                        <div className="mb-12">
                          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-bedroom-purple/10 border-4 border-bedroom-purple/30 mb-6">
                            <Film className="w-12 h-12 text-bedroom-purple" />
                          </div>
                          <h3 className="text-4xl font-black text-screen-white mb-3 tracking-tight">
                            Start Your First Scene
                          </h3>
                          <p className="text-screen-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
                            Every great film begins with a single frame. Choose a template below to get started, or use Director Chat to brainstorm your vision.
                          </p>
                        </div>

                        {/* 3 Starter Templates */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                          {[
                            {
                              title: "Opening Shot",
                              desc: "Establish the world",
                              icon: "🎬",
                              notes: "Set the tone and introduce your audience to the story's universe. Think wide shots, atmospheric lighting, and world-building."
                            },
                            {
                              title: "Main Beat",
                              desc: "Core action sequence",
                              icon: "⚡",
                              notes: "The heart of your story. This is where the drama unfolds, conflicts arise, and your vision takes center stage."
                            },
                            {
                              title: "Closing Shot",
                              desc: "Leave them wanting more",
                              icon: "✨",
                              notes: "End with impact. A memorable finale that resonates long after the credits roll."
                            }
                          ].map((template) => (
                            <button
                              key={template.title}
                              onClick={() => addScene(undefined, { title: template.title, compiledPrompt: template.notes })}
                              className="group relative p-8 rounded-2xl border-2 border-bedroom-purple/30 hover:border-bedroom-purple/70 bg-black/40 hover:bg-black/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.3)]"
                            >
                              <div className="text-6xl mb-4">{template.icon}</div>
                              <h4 className="text-xl font-black text-screen-white mb-2 tracking-tight">
                                {template.title}
                              </h4>
                              <p className="text-sm text-screen-white/50 mb-4">
                                {template.desc}
                              </p>
                              <div className="text-xs text-screen-white/40 leading-relaxed">
                                {template.notes}
                              </div>
                              <div className="absolute inset-0 rounded-2xl bg-bedroom-purple/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </button>
                          ))}
                        </div>

                        {/* Secondary CTA - Director Chat */}
                        <div className="p-6 rounded-xl border border-white/10 bg-black/20 max-w-2xl mx-auto">
                          <p className="text-sm text-screen-white/60 mb-3">
                            <span className="font-semibold text-bedroom-purple">Pro tip:</span> Not sure where to start? Use <span className="font-semibold">Director Chat</span> on the left to brainstorm ideas. The AI will help structure your scenes automatically.
                          </p>
                          <button
                            onClick={() => setMobileTab("chat")}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-bedroom-purple/10 hover:bg-bedroom-purple/20 border border-bedroom-purple/30 hover:border-bedroom-purple/60 rounded-lg text-sm font-medium text-screen-white transition-all"
                          >
                            <Sparkles className="w-4 h-4" />
                            Open Director Chat
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Horizontal Film Strip */
                      <div className="flex gap-8 overflow-x-auto pb-6" style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(124, 58, 237, 0.2) transparent'
                      }}>
                        {project.scenes.map((scene, index) => (
                          <button
                            key={scene.id}
                            onClick={() => {
                              setActiveScene(scene.id);
                              setInspectorOpen(true);
                            }}
                            style={{ minWidth: '450px', width: '450px' }}
                            className={`
                          group relative flex-shrink-0 transition-all duration-500 cursor-pointer
                          ${activeSceneId === scene.id
                                ? "scale-105"
                                : "hover:scale-[1.02]"
                              }
                        `}
                          >
                            {/* Film Frame Container */}
                            <div className={`
                          relative rounded-2xl overflow-hidden
                          border-8 border-black
                          ${activeSceneId === scene.id
                                ? "shadow-[0_0_60px_rgba(124,58,237,0.4)] ring-4 ring-bedroom-purple/30"
                                : "shadow-2xl shadow-black/60 hover:shadow-[0_0_40px_rgba(124,58,237,0.2)]"
                              }
                        `}>
                              {/* Film Frame Visual Area */}
                              <div className="aspect-video bg-gradient-to-br from-black/90 via-black/80 to-black/70 border-2 border-black/60 relative">

                                {/* Giant Scene Number */}
                                <div
                                  style={{ fontSize: '60px' }}
                                  className={`
                              absolute top-6 left-6 
                              font-black tracking-tighter leading-none
                              drop-shadow-[0_0_20px_rgba(124,58,237,0.6)]
                              ${activeSceneId === scene.id ? "text-bedroom-purple" : "text-screen-white"}
                              transition-colors duration-300
                            `}>
                                  {index + 1}
                                </div>

                                {/* Status Badge */}
                                {scene.status === "locked" && (
                                  <div className="absolute top-6 right-6 bg-yellow-500/90 text-director-black p-3 rounded-xl shadow-xl backdrop-blur-sm">
                                    <Lock className="w-6 h-6" />
                                  </div>
                                )}

                                {/* Center Visual - Takes Count or Empty */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  {scene.generatedMedia.length > 0 ? (
                                    <div className="text-center">
                                      <div className="text-6xl font-black text-bedroom-purple mb-3 drop-shadow-2xl">
                                        {scene.generatedMedia.length}
                                      </div>
                                      <div className="text-sm text-screen-white/60 uppercase tracking-widest font-bold">
                                        {scene.generatedMedia.length === 1 ? "Take" : "Takes"}
                                      </div>
                                    </div>
                                  ) : (
                                    <Film className="w-24 h-24 text-screen-white/5" />
                                  )}
                                </div>

                                {/* Active Scene Glow Overlay */}
                                {scene.id === activeSceneId && (
                                  <div className="absolute inset-0 bg-gradient-to-t from-bedroom-purple/20 to-transparent pointer-events-none animate-pulse" />
                                )}
                              </div>

                              {/* Clapperboard Film Slate */}
                              <div className="bg-black border-t-4 border-bedroom-purple/30 p-5 relative">
                                {/* Diagonal Stripes (Clapperboard) */}
                                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-bedroom-purple/20 to-transparent" />

                                <h3 className={`
                              text-xl font-black mb-2 truncate tracking-tight
                              ${scene.id === activeSceneId ? "text-bedroom-purple" : "text-screen-white"}
                              transition-colors duration-300
                            `}>
                                  {scene.title}
                                </h3>
                                <p className="text-xs text-screen-white/50 line-clamp-2 leading-relaxed">
                                  {scene.compiledPrompt || "Empty scene - click to direct"}
                                </p>

                                {/* Footer Meta */}
                                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/5">
                                  <span className="text-[10px] uppercase tracking-wider text-screen-white/40 font-bold">
                                    {scene.status}
                                  </span>
                                  {scene.generatedMedia.length > 0 && (
                                    <>
                                      <span className="text-screen-white/20">•</span>
                                      <span className="text-[10px] text-screen-white/40">
                                        {scene.generatedMedia.length} {scene.generatedMedia.length === 1 ? "take" : "takes"}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}

                        {/* Add Scene Card */}
                        <button
                          onClick={() => addScene()}
                          style={{ minWidth: '450px', width: '450px' }}
                          className="flex-shrink-0 aspect-video rounded-2xl border-4 border-dashed border-bedroom-purple/30 hover:border-bedroom-purple/60 bg-black/40 hover:bg-black/60 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(124,58,237,0.2)] transition-all duration-300 flex items-center justify-center group"
                        >
                          <div className="text-center">
                            <Plus className="w-16 h-16 text-bedroom-purple/60 group-hover:text-bedroom-purple mx-auto mb-3 transition-colors" />
                            <span className="text-lg font-black text-screen-white/60 group-hover:text-screen-white/90 transition-colors tracking-tight">
                              New Scene
                            </span>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </div >
              </div>

              {/* Inspector Drawer - Right Side */}
              {
                inspectorOpen && activeScene && (
                  <div className="fixed right-0 top-16 bottom-0 w-96 bg-director-black border-l border-bedroom-purple/20 shadow-2xl z-40 overflow-auto">
                    <div className="relative h-full">
                      {/* Film grain in inspector */}
                      <div className="absolute inset-0 grain-texture opacity-5 pointer-events-none" />

                      {/* Inspector Content */}
                      <div className="relative z-10 p-6 space-y-6">
                        {/* Inspector Header */}
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-screen-white flex items-center gap-2">
                            <ChevronRight className="w-5 h-5 text-bedroom-purple" />
                            Scene Inspector
                          </h3>
                          <button
                            onClick={() => setInspectorOpen(false)}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                          >
                            <X className="w-5 h-5 text-screen-white/60 hover:text-screen-white" />
                          </button>
                        </div>

                        {/* Scene Title */}
                        <div>
                          <label className="block text-xs uppercase tracking-wide text-screen-white/40 mb-2">
                            Scene Title
                          </label>
                          <input
                            type="text"
                            value={activeScene.title}
                            onChange={(e) => updateScene(activeScene.id, { title: e.target.value })}
                            className="w-full px-4 py-2 bg-black/60 border border-bedroom-purple/20 rounded-lg text-screen-white focus:border-bedroom-purple focus:ring-1 focus:ring-bedroom-purple outline-none transition-all"
                          />
                        </div>

                        {/* Main Prompt Field */}
                        <div>
                          <label className="block text-xs uppercase tracking-wide text-screen-white/40 mb-2">
                            What's happening in this scene?
                          </label>
                          <textarea
                            value={activeScene.promptSlots.subject}
                            onChange={(e) =>
                              updatePromptSlots(activeScene.id, {
                                subject: e.target.value,
                              })
                            }
                            placeholder="Describe the action, emotion, or moment..."
                            className="w-full px-4 py-3 bg-black/60 border border-bedroom-purple/20 rounded-lg text-screen-white placeholder-screen-white/40 focus:border-bedroom-purple focus:ring-1 focus:ring-bedroom-purple outline-none transition-all resize-none"
                            rows={4}
                            disabled={activeScene.status === "locked"}
                          />
                        </div>

                        {/* Camera Controls */}
                        <div>
                          <label className="block text-xs uppercase tracking-wide text-screen-white/40 mb-3">
                            Camera
                          </label>

                          {/* Preset Chips */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {["Handheld", "Locked Off", "Tracking", "Drone", "Dolly Zoom", "POV"].map((preset) => {
                              const isActive =
                                activeScene.promptSlots.camera.movement?.toLowerCase().includes(preset.toLowerCase()) ||
                                activeScene.promptSlots.camera.angle?.toLowerCase().includes(preset.toLowerCase());

                              return (
                                <button
                                  key={preset}
                                  onClick={() => {
                                    const current = activeScene.promptSlots.camera.movement || "";
                                    // Toggle: remove if exists, add if doesn't
                                    const newValue = isActive
                                      ? current.replace(new RegExp(preset, "gi"), "").trim()
                                      : current ? `${current}, ${preset}` : preset;

                                    updatePromptSlots(activeScene.id, {
                                      camera: {
                                        ...activeScene.promptSlots.camera,
                                        movement: newValue
                                      },
                                    });
                                  }}
                                  disabled={activeScene.status === "locked"}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${isActive
                                    ? "bg-bedroom-purple border-bedroom-purple text-screen-white shadow-lg shadow-bedroom-purple/20"
                                    : "bg-black/60 border-bedroom-purple/20 text-screen-white/70 hover:border-bedroom-purple/50 hover:text-screen-white"
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                  {preset}
                                </button>
                              );
                            })}
                          </div>

                          {/* Custom Input Toggle */}
                          <button
                            onClick={() => setShowCustomCamera(!showCustomCamera)}
                            className="text-xs text-bedroom-purple hover:text-bedroom-purple/80 transition-colors mb-2"
                          >
                            {showCustomCamera ? "− Hide Custom" : "+ Custom Camera"}
                          </button>

                          {/* Custom Camera Input */}
                          {showCustomCamera && (
                            <div className="space-y-2 pt-2">
                              <input
                                type="text"
                                value={activeScene.promptSlots.camera.angle}
                                onChange={(e) =>
                                  updatePromptSlots(activeScene.id, {
                                    camera: { ...activeScene.promptSlots.camera, angle: e.target.value },
                                  })
                                }
                                placeholder="Custom angle..."
                                className="w-full px-3 py-2 bg-black/60 border border-bedroom-purple/20 rounded-lg text-screen-white text-sm placeholder-screen-white/40 focus:border-bedroom-purple outline-none transition-all"
                                disabled={activeScene.status === "locked"}
                              />
                              <input
                                type="text"
                                value={activeScene.promptSlots.camera.lens}
                                onChange={(e) =>
                                  updatePromptSlots(activeScene.id, {
                                    camera: { ...activeScene.promptSlots.camera, lens: e.target.value },
                                  })
                                }
                                placeholder="Custom lens..."
                                className="w-full px-3 py-2 bg-black/60 border border-bedroom-purple/20 rounded-lg text-screen-white text-sm placeholder-screen-white/40 focus:border-bedroom-purple outline-none transition-all"
                                disabled={activeScene.status === "locked"}
                              />
                            </div>
                          )}
                        </div>

                        {/* Lighting Controls */}
                        <div>
                          <label className="block text-xs uppercase tracking-wide text-screen-white/40 mb-3">
                            Lighting
                          </label>

                          {/* Preset Chips */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {["Golden Hour", "Neon Night", "Harsh Sun", "Soft Studio", "Moonlight", "Twilight"].map((preset) => {
                              const isActive =
                                activeScene.promptSlots.lighting.mood?.toLowerCase().includes(preset.toLowerCase()) ||
                                activeScene.promptSlots.lighting.direction?.toLowerCase().includes(preset.toLowerCase());

                              return (
                                <button
                                  key={preset}
                                  onClick={() => {
                                    const current = activeScene.promptSlots.lighting.mood || "";
                                    const newValue = isActive
                                      ? current.replace(new RegExp(preset, "gi"), "").trim()
                                      : current ? `${current}, ${preset}` : preset;

                                    updatePromptSlots(activeScene.id, {
                                      lighting: {
                                        ...activeScene.promptSlots.lighting,
                                        mood: newValue
                                      },
                                    });
                                  }}
                                  disabled={activeScene.status === "locked"}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${isActive
                                    ? "bg-bedroom-purple border-bedroom-purple text-screen-white shadow-lg shadow-bedroom-purple/20"
                                    : "bg-black/60 border-bedroom-purple/20 text-screen-white/70 hover:border-bedroom-purple/50 hover:text-screen-white"
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                  {preset}
                                </button>
                              );
                            })}
                          </div>

                          {/* Custom Input Toggle */}
                          <button
                            onClick={() => setShowCustomLighting(!showCustomLighting)}
                            className="text-xs text-bedroom-purple hover:text-bedroom-purple/80 transition-colors mb-2"
                          >
                            {showCustomLighting ? "− Hide Custom" : "+ Custom Lighting"}
                          </button>

                          {/* Custom Lighting Input */}
                          {showCustomLighting && (
                            <div className="space-y-2 pt-2">
                              <input
                                type="text"
                                value={activeScene.promptSlots.lighting.direction}
                                onChange={(e) =>
                                  updatePromptSlots(activeScene.id, {
                                    lighting: { ...activeScene.promptSlots.lighting, direction: e.target.value },
                                  })
                                }
                                placeholder="Custom direction..."
                                className="w-full px-3 py-2 bg-black/60 border border-bedroom-purple/20 rounded-lg text-screen-white text-sm placeholder-screen-white/40 focus:border-bedroom-purple outline-none transition-all"
                                disabled={activeScene.status === "locked"}
                              />
                              <input
                                type="text"
                                value={activeScene.promptSlots.lighting.color}
                                onChange={(e) =>
                                  updatePromptSlots(activeScene.id, {
                                    lighting: { ...activeScene.promptSlots.lighting, color: e.target.value },
                                  })
                                }
                                placeholder="Custom color..."
                                className="w-full px-3 py-2 bg-black/60 border border-bedroom-purple/20 rounded-lg text-screen-white text-sm placeholder-screen-white/40 focus:border-bedroom-purple outline-none transition-all"
                                disabled={activeScene.status === "locked"}
                              />
                            </div>
                          )}
                        </div>

                        {/* Style Controls */}
                        <div>
                          <label className="block text-xs uppercase tracking-wide text-screen-white/40 mb-3">
                            Style
                          </label>

                          {/* Preset Chips */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {["Cinematic", "Documentary", "Music Video", "Commercial", "Noir", "Retro"].map((preset) => {
                              const isActive =
                                activeScene.promptSlots.style.aesthetic?.toLowerCase().includes(preset.toLowerCase()) ||
                                activeScene.promptSlots.style.era?.toLowerCase().includes(preset.toLowerCase());

                              return (
                                <button
                                  key={preset}
                                  onClick={() => {
                                    const current = activeScene.promptSlots.style.aesthetic || "";
                                    const newValue = isActive
                                      ? current.replace(new RegExp(preset, "gi"), "").trim()
                                      : current ? `${current}, ${preset}` : preset;

                                    updatePromptSlots(activeScene.id, {
                                      style: {
                                        ...activeScene.promptSlots.style,
                                        aesthetic: newValue
                                      },
                                    });
                                  }}
                                  disabled={activeScene.status === "locked"}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${isActive
                                    ? "bg-bedroom-purple border-bedroom-purple text-screen-white shadow-lg shadow-bedroom-purple/20"
                                    : "bg-black/60 border-bedroom-purple/20 text-screen-white/70 hover:border-bedroom-purple/50 hover:text-screen-white"
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                  {preset}
                                </button>
                              );
                            })}
                          </div>

                          {/* Custom Input Toggle */}
                          <button
                            onClick={() => setShowCustomStyle(!showCustomStyle)}
                            className="text-xs text-bedroom-purple hover:text-bedroom-purple/80 transition-colors mb-2"
                          >
                            {showCustomStyle ? "− Hide Custom" : "+ Custom Style"}
                          </button>

                          {/* Custom Style Input */}
                          {showCustomStyle && (
                            <div className="space-y-2 pt-2">
                              <input
                                type="text"
                                value={activeScene.promptSlots.style.era}
                                onChange={(e) =>
                                  updatePromptSlots(activeScene.id, {
                                    style: { ...activeScene.promptSlots.style, era: e.target.value },
                                  })
                                }
                                placeholder="Custom era (e.g., 80s, modern)..."
                                className="w-full px-3 py-2 bg-black/60 border border-bedroom-purple/20 rounded-lg text-screen-white text-sm placeholder-screen-white/40 focus:border-bedroom-purple outline-none transition-all"
                                disabled={activeScene.status === "locked"}
                              />
                            </div>
                          )}
                        </div>

                        {/* Lock/Unlock Toggle */}
                        <div className="pt-4 border-t border-bedroom-purple/10">
                          <button
                            onClick={() =>
                              updateScene(activeScene.id, {
                                status: activeScene.status === "locked" ? "exploring" : "locked",
                              })
                            }
                            className={`w-full px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${activeScene.status === "locked"
                              ? "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
                              : "bg-bedroom-purple/20 text-bedroom-purple hover:bg-bedroom-purple/30"
                              }`}
                          >
                            {activeScene.status === "locked" ? (
                              <>
                                <Lock className="w-4 h-4" />
                                Scene Locked
                              </>
                            ) : (
                              <>
                                <Unlock className="w-4 h-4" />
                                Lock Scene
                              </>
                            )}
                          </button>
                        </div>

                        {/* Current Director's Notes */}
                        {activeScene.compiledPrompt && (
                          <div className="pt-4 border-t border-bedroom-purple/10">
                            <label className="block text-xs uppercase tracking-wide text-screen-white/30 mb-2">
                              Current Director's Notes
                            </label>
                            <div className="p-3 bg-black/40 rounded-lg border border-bedroom-purple/10">
                              <p className="text-screen-white/60 text-sm font-mono leading-relaxed">
                                {activeScene.compiledPrompt}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </>
        )
        }
      </div >

      {/* Timeline Rail (Bottom Dock) */}
      {
        project && (
          <TimelineRail
            scenes={project.scenes}
            activeSceneId={activeSceneId}
            onSceneSelect={setActiveScene}
            onReorder={reorderScenes}
          />
        )
      }
    </div >
  );
}
