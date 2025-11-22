"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { useScene } from "@/contexts/SceneContext";
import { supabase } from "@/lib/supabase";
import DirectorSidebar, { SidebarSection } from "@/components/layout/DirectorSidebar";
import DirectorChat from "@/components/chat/DirectorChat";

import TimelineRail from "@/components/scene/TimelineRail";
import { Film, FolderOpen, Save, Lock, Unlock, Plus, Edit3, X, ChevronRight, Sparkles, LayoutTemplate, Camera, Sun, Palette, MessageSquare, Check, Copy, ExternalLink, Settings, Download, Pin, Columns, Image as ImageIcon, LayoutGrid, Users, Wand2, Clock, Smartphone, Monitor, Square, RectangleHorizontal, PanelLeft, PanelRight } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";

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
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [proposalData, setProposalData] = useState<any>(null);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);

  const generateDefaultProjectTitle = () => {
    return "Untitled Project";
  };

  // Compile prompt from scene data
  const compilePrompt = (scene: any) => {
    if (!scene) return "";

    const parts = [];

    // Add scene title and description
    if (scene.title) parts.push(`Scene: ${scene.title}`);
    if (scene.notes) parts.push(scene.notes);

    // Add camera settings
    if (scene.promptSlots?.camera?.shotType) {
      parts.push(`Camera: ${scene.promptSlots.camera.shotType} shot`);
    }

    // Add lighting
    if (scene.promptSlots?.lighting?.timeOfDay) {
      parts.push(`Lighting: ${scene.promptSlots.lighting.timeOfDay}`);
    }

    // Add style
    if (scene.promptSlots?.style?.aesthetic) {
      parts.push(`Style: ${scene.promptSlots.style.aesthetic}`);
    }

    return parts.join(", ");
  };

  // Copy prompt to clipboard
  const copyPromptToClipboard = async () => {
    if (!activeScene) return;

    const prompt = compilePrompt(activeScene);
    await navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // Accept proposed structure and populate project
  const acceptProposal = () => {
    if (!proposalData || !project) return;

    // Update project title
    if (proposalData.suggestedTitle) {
      updateProjectTitle(proposalData.suggestedTitle);
    }

    // Update Bible with proposed data
    if (proposalData.bibleNotes) {
      const updatedBible = { ...project.bible };

      if (proposalData.bibleNotes.characters) {
        updatedBible.characters = proposalData.bibleNotes.characters;
      }
      if (proposalData.bibleNotes.locations) {
        updatedBible.locations = proposalData.bibleNotes.locations;
      }
      if (proposalData.bibleNotes.aesthetic) {
        updatedBible.aesthetic = proposalData.bibleNotes.aesthetic;
      }

      updateProjectBible(updatedBible);
    }

    // Create all proposed scenes
    if (proposalData.scenes && proposalData.scenes.length > 0) {
      proposalData.scenes.forEach((sceneData: any) => {
        addScene(undefined, {
          title: sceneData.title,
          notes: sceneData.notes
        });
      });
    }

    // Close modal and show success message
    setShowProposalModal(false);
    setProposalData(null);

    // Add success message to chat
    addChatMessage({
      content: "Perfect! I've populated your project with the structure. You can now start working on individual scenes!",
      role: "assistant"
    });
  };

  // Create scene from chat message
  const createSceneFromMessage = (messageContent: string) => {
    if (!project) return;

    // Generate a scene title from the first line or first ~50 chars
    const title = messageContent.split('\n')[0].substring(0, 50).trim() + (messageContent.length > 50 ? '...' : '');

    addScene(undefined, {
      title: title || "Scene from chat",
      notes: messageContent
    });

    // Show success feedback
    addChatMessage({
      content: "Scene created! I've added it to your timeline.",
      role: "assistant"
    });
  };

  // Pin message content to Visual Bible (via AI analysis)
  const pinMessageToBible = async (messageContent: string) => {
    if (!project || !project.bible) return;

    setIsGenerating(true);

    try {
      // Send to AI to analyze and categorize
      const response = await fetch("/api/director/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...chatMessages.map(m => ({ role: m.role, content: m.content })),
            {
              role: "user",
              content: `Please analyze this message and pin relevant information to my Visual Bible: "${messageContent}"`
            }
          ],
          projectContext: {
            title: project.title,
            bible: project.bible
          }
        }),
      });

      if (!response.ok) throw new Error("Failed to pin to Bible");

      const data = await response.json();

      // Check if AI called update_bible tool
      if (data.tool_calls && data.tool_calls.length > 0) {
        const updateCall = data.tool_calls.find((tc: any) => tc.function.name === "update_bible");
        if (updateCall) {
          const updates = JSON.parse(updateCall.function.arguments);
          const updatedBible = { ...project.bible };

          // Apply character updates
          if (updates.characters && updates.characters.length > 0) {
            const newCharacters = updates.characters.map((c: any) => ({
              id: `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              name: c.name,
              description: c.description
            }));
            updatedBible.characters = [...updatedBible.characters, ...newCharacters];
          }

          // Apply location updates
          if (updates.locations && updates.locations.length > 0) {
            const newLocations = updates.locations.map((l: any) => ({
              id: `loc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              name: l.name,
              description: l.description
            }));
            updatedBible.locations = [...updatedBible.locations, ...newLocations];
          }

          // Apply aesthetic updates
          if (updates.aesthetic) {
            if (updates.aesthetic.mood) {
              updatedBible.aesthetic.mood = [...updatedBible.aesthetic.mood, ...updates.aesthetic.mood];
            }
            if (updates.aesthetic.palette) {
              updatedBible.aesthetic.palette = [...updatedBible.aesthetic.palette, ...updates.aesthetic.palette];
            }
            if (updates.aesthetic.era) {
              updatedBible.aesthetic.era = updates.aesthetic.era;
            }
          }

          updateProjectBible(updatedBible);

          // Add AI success message
          addChatMessage({
            content: data.content || "I've analyzed and added the relevant details to your Visual Bible!",
            role: "assistant"
          });
        }
      } else {
        // Fallback if no tool call
        addChatMessage({
          content: data.content || "I've noted that information!",
          role: "assistant"
        });
      }
    } catch (error) {
      console.error("Error pinning to Bible:", error);
      addChatMessage({
        content: "Sorry, I had trouble pinning that to your Bible. Please try again.",
        role: "assistant"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle chat message submission
  const handleChatMessage = async (messageContent: string) => {
    if (!project || !messageContent.trim()) return;

    // Add user message immediately
    addChatMessage({
      role: 'user',
      content: messageContent
    });

    setIsGenerating(true);

    try {
      // Call AI chat API
      const response = await fetch("/api/director/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...chatMessages.map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: messageContent }
          ],
          projectContext: {
            title: project.title,
            bible: project.bible,
            sceneCount: project.scenes.length
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat API error: ${response.status}`);
      }

      const data = await response.json();

      // Process tool calls if any
      if (data.tool_calls && data.tool_calls.length > 0) {
        for (const toolCall of data.tool_calls) {
          if (toolCall.function.name === "create_scene") {
            const args = JSON.parse(toolCall.function.arguments);
            addScene(undefined, {
              title: args.title || "New Scene",
              notes: args.description || ""
            });
          } else if (toolCall.function.name === "update_bible") {
            const updates = JSON.parse(toolCall.function.arguments);
            const updatedBible = { ...project.bible };

            if (updates.characters && updates.characters.length > 0) {
              const newCharacters = updates.characters.map((c: any) => ({
                id: `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                name: c.name,
                description: c.description
              }));
              updatedBible.characters = [...(updatedBible.characters || []), ...newCharacters];
            }

            if (updates.locations && updates.locations.length > 0) {
              const newLocations = updates.locations.map((l: any) => ({
                id: `loc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                name: l.name,
                description: l.description
              }));
              updatedBible.locations = [...(updatedBible.locations || []), ...newLocations];
            }

            if (updates.aesthetic) {
              if (!updatedBible.aesthetic) {
                updatedBible.aesthetic = { palette: [], mood: [], era: "" };
              }
              if (updates.aesthetic.mood) {
                updatedBible.aesthetic.mood = [...(updatedBible.aesthetic.mood || []), ...updates.aesthetic.mood];
              }
              if (updates.aesthetic.palette) {
                updatedBible.aesthetic.palette = [...(updatedBible.aesthetic.palette || []), ...updates.aesthetic.palette];
              }
              if (updates.aesthetic.era) {
                updatedBible.aesthetic.era = updates.aesthetic.era;
              }
            }

            updateProjectBible(updatedBible);
          }
        }
      }

      // Add AI response
      addChatMessage({
        role: 'assistant',
        content: data.content || "I'm here to help with your project!"
      });

    } catch (error) {
      console.error("Chat error:", error);
      addChatMessage({
        role: 'assistant',
        content: "Sorry, I encountered an error. Please try again."
      });
    } finally {
      setIsGenerating(false);
    }
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

    let currentProject = projectRef.current;

    // Auto-create project if none exists
    if (!currentProject) {
      console.log('No project found, creating one...');
      const defaultTitle = generateDefaultProjectTitle();
      await createProject(defaultTitle);
      // Wait a bit for the project to be created and ref to update
      await new Promise(resolve => setTimeout(resolve, 100));
      currentProject = projectRef.current;

      if (!currentProject) {
        console.error('Failed to create project for image upload');
        alert('Please create a project first before uploading images.');
        return;
      }
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

          {/* Project Header Band - Scene Count, Tags, Actions */}
          <div className="h-12 flex-none border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between px-6 z-40">
            {/* Left: Scene Count & Tags */}
            <div className="flex items-center gap-4">
              {/* Scene Count */}
              <div className="flex items-center gap-2 text-xs">
                <Film className="w-3.5 h-3.5 text-bedroom-purple" />
                <span className="font-bold text-screen-white">
                  {project?.scenes?.length || 0}
                </span>
                <span className="text-screen-white/40">
                  {project?.scenes?.length === 1 ? 'Scene' : 'Scenes'}
                </span>
              </div>

              {/* Project Tags (if any) */}
              {project?.tags && project.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  {project.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-md bg-bedroom-purple/20 text-bedroom-purple text-[10px] font-bold uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Export All Scenes */}
              <button
                onClick={() => {
                  // TODO: Implement export functionality
                  console.log('Export all scenes');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-screen-white/60 hover:text-screen-white text-xs font-medium transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>

              {/* Settings */}
              <button
                onClick={() => {
                  // TODO: Open project settings modal
                  console.log('Open settings');
                }}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-screen-white/60 hover:text-screen-white transition-all"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
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
                  <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-200 space-y-3">

                    {/* Bible Content Viewer */}
                    {project?.bible && (
                      <div className="space-y-2 text-xs">
                        {/* Characters */}
                        {project.bible.characters && project.bible.characters.length > 0 && (
                          <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                            <div className="font-bold text-bedroom-purple mb-2">Characters</div>
                            <div className="space-y-1.5">
                              {project.bible.characters.map((char: any) => (
                                <div key={char.id} className="text-screen-white/70">
                                  <span className="font-semibold text-white">{char.name}:</span> {char.description}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Locations */}
                        {project.bible.locations && project.bible.locations.length > 0 && (
                          <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                            <div className="font-bold text-bedroom-purple mb-2">Locations</div>
                            <div className="space-y-1.5">
                              {project.bible.locations.map((loc: any) => (
                                <div key={loc.id} className="text-screen-white/70">
                                  <span className="font-semibold text-white">{loc.name}:</span> {loc.description}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Aesthetic */}
                        {project.bible.aesthetic && (
                          <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                            <div className="font-bold text-bedroom-purple mb-2">Aesthetic</div>
                            <div className="space-y-1.5 text-screen-white/70">
                              {project.bible.aesthetic.era && (
                                <div><span className="font-semibold text-white">Era:</span> {project.bible.aesthetic.era}</div>
                              )}
                              {project.bible.aesthetic.mood && project.bible.aesthetic.mood.length > 0 && (
                                <div><span className="font-semibold text-white">Mood:</span> {project.bible.aesthetic.mood.join(", ")}</div>
                              )}
                              {project.bible.aesthetic.palette && project.bible.aesthetic.palette.length > 0 && (
                                <div><span className="font-semibold text-white">Palette:</span> {project.bible.aesthetic.palette.join(", ")}</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Visual Assets Grid */}
                    {project?.bible?.visualAssets && project.bible.visualAssets.length > 0 && (
                      <div className="space-y-2">
                        <div className="font-bold text-bedroom-purple text-xs">Visual References</div>
                        <div className="grid grid-cols-2 gap-2">
                          {project.bible.visualAssets.map((asset: any) => (
                            <div
                              key={asset.id}
                              className="group relative aspect-square rounded-lg overflow-hidden bg-black/40 border border-white/10 hover:border-bedroom-purple/50 transition-all cursor-pointer"
                              onClick={() => window.open(asset.url, '_blank')}
                            >
                              <img
                                src={asset.url}
                                alt={asset.label || 'Visual reference'}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-0 left-0 right-0 p-2">
                                  <div className="text-[10px] font-bold text-white line-clamp-1">
                                    {asset.label || 'Untitled'}
                                  </div>
                                  {asset.description && (
                                    <div className="text-[9px] text-white/60 line-clamp-2 mt-0.5">
                                      {asset.description}
                                    </div>
                                  )}
                                </div>
                              </div>
                              {asset.tags?.includes('analyzing') && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                  <div className="text-[10px] text-bedroom-purple font-bold animate-pulse">
                                    Analyzing...
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}


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
                  </div>
                )}
              </div>

              {/* Director Chat - Fills remaining space */}
              <div className="flex-1 overflow-hidden relative">
                <DirectorChat
                  messages={chatMessages}
                  onSendMessage={handleChatMessage}
                  isGenerating={isGenerating}
                />
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
                  {(!project?.scenes || project.scenes.length === 0) ? (
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

                  {/* Camera Controls - Collapsible */}
                  <details className="group border-b border-white/5 pb-4" open>
                    <summary className="cursor-pointer flex items-center justify-between py-4 hover:opacity-80 transition-opacity">
                      <div className="flex items-center gap-2 text-screen-white/60">
                        <Camera className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase">Camera</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {activeScene.promptSlots?.camera?.shotType && (
                          <span className="text-[10px] text-bedroom-purple font-medium">
                            {activeScene.promptSlots.camera.shotType}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-white/40 group-open:rotate-90 transition-transform" />
                      </div>
                    </summary>

                    <div className="grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
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
                  </details>

                  {/* Lighting Controls - Collapsible */}
                  <details className="group border-b border-white/5 pb-4">
                    <summary className="cursor-pointer flex items-center justify-between py-4 hover:opacity-80 transition-opacity">
                      <div className="flex items-center gap-2 text-screen-white/60">
                        <Sun className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase">Lighting</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {activeScene.promptSlots?.lighting?.timeOfDay && (
                          <span className="text-[10px] text-bedroom-purple font-medium">
                            {activeScene.promptSlots.lighting.timeOfDay}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-white/40 group-open:rotate-90 transition-transform" />
                      </div>
                    </summary>

                    <div className="grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
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
                  </details>

                  {/* Style Controls - Collapsible */}
                  <details className="group border-b border-white/5 pb-4">
                    <summary className="cursor-pointer flex items-center justify-between py-4 hover:opacity-80 transition-opacity">
                      <div className="flex items-center gap-2 text-screen-white/60">
                        <Palette className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase">Style</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {activeScene.promptSlots?.style?.aesthetic && (
                          <span className="text-[10px] text-bedroom-purple font-medium">
                            {activeScene.promptSlots.style.aesthetic}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-white/40 group-open:rotate-90 transition-transform" />
                      </div>
                    </summary>

                    <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
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
                  </details>

                  {/* Format & Workflow Controls - Collapsible (NEW) */}
                  <details className="group border-b border-white/5 pb-4">
                    <summary className="cursor-pointer flex items-center justify-between py-4 hover:opacity-80 transition-opacity">
                      <div className="flex items-center gap-2 text-screen-white/60">
                        <LayoutTemplate className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase">Format & Workflow</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {activeScene.promptSlots?.workflow && activeScene.promptSlots.workflow !== "standard" && (
                          <span className="text-[10px] text-bedroom-purple font-medium">
                            {activeScene.promptSlots.workflow.replace("_", " ")}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-white/40 group-open:rotate-90 transition-transform" />
                      </div>
                    </summary>

                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                      {/* Workflow Selector */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Workflow Mode</label>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            { id: "standard", label: "Standard Scene", desc: "Single cinematic shot" },
                            { id: "stacked_frames", label: "Stacked Frames", desc: "4 vertical panels (9:16)" },
                            { id: "storyboard", label: "Storyboard Grid", desc: "Rough sketch layout" },
                            { id: "poster", label: "Movie Poster", desc: "Key art & typography (2:3)" },
                            { id: "character_sheet", label: "Character Sheet", desc: "Multi-angle reference" },
                          ].map((wf) => (
                            <button
                              key={wf.id}
                              onClick={() => updatePromptSlots(activeScene.id, { workflow: wf.id })}
                              className={`p-3 rounded-lg border text-left transition-all ${activeScene.promptSlots.workflow === wf.id
                                ? "bg-bedroom-purple/20 border-bedroom-purple text-white"
                                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                                }`}
                            >
                              <div className="text-xs font-bold">{wf.label}</div>
                              <div className="text-[10px] opacity-60">{wf.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Aspect Ratio Selector - Quick Select */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Aspect Ratio</label>
                        <div className="grid grid-cols-5 gap-2">
                          {[
                            { id: "9:16", label: "Social", icon: Smartphone },
                            { id: "2.35:1", label: "Cinema", icon: RectangleHorizontal },
                            { id: "16:9", label: "TV", icon: Monitor },
                            { id: "2:3", label: "Poster", icon: ImageIcon },
                            { id: "1:1", label: "Square", icon: Square },
                          ].map((ar) => (
                            <button
                              key={ar.id}
                              onClick={() => updatePromptSlots(activeScene.id, { aspectRatio: ar.id })}
                              className={`group flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${activeScene.promptSlots.aspectRatio === ar.id
                                ? "bg-white text-black border-white"
                                : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10 hover:border-white/20"
                                }`}
                              title={ar.label}
                            >
                              <ar.icon className={`w-4 h-4 mb-1 ${activeScene.promptSlots.aspectRatio === ar.id ? "text-black" : "text-white/40 group-hover:text-white/60"}`} />
                              <span className="text-[8px] font-bold uppercase">{ar.id}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </details>

                  {/* Compiled Prompt Preview - NEW */}
                  <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-bedroom-purple uppercase tracking-wider">Compiled Prompt</h3>
                      <button
                        onClick={copyPromptToClipboard}
                        className="flex items-center gap-1.5 text-[10px] text-white/40 hover:text-bedroom-purple transition-colors"
                      >
                        {copiedPrompt ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-black/40 rounded-xl p-4 border border-white/10">
                      <p className="text-xs text-white/80 leading-relaxed font-mono">
                        {compilePrompt(activeScene) || "Configure camera, lighting, and style to generate prompt..."}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        // TODO: Open tool catalog with pre-filled prompt
                        window.open('/tools', '_blank');
                      }}
                      className="w-full py-2.5 rounded-lg bg-bedroom-purple/20 hover:bg-bedroom-purple/30 text-bedroom-purple text-xs font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Try in Tool Catalog</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
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

      {/* Proposal Structure Modal */}
      {showProposalModal && proposalData && (
        <div className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300 p-4">
          <div className="bg-screen-black border border-bedroom-purple/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-[0_0_80px_rgba(124,58,237,0.3)] animate-in zoom-in-95 duration-300">

            {/* Header */}
            <div className="bg-gradient-to-r from-bedroom-purple/10 to-indigo-600/10 border-b border-white/10 p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Project Structure Preview</h2>
                  <p className="text-sm text-white/50">Review the proposed structure for your project</p>
                </div>
                <button
                  onClick={() => {
                    setShowProposalModal(false);
                    setProposalData(null);
                  }}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">

              {/* Title & Logline */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-bedroom-purple mb-2">Suggested Title</h3>
                  <p className="text-lg font-bold text-white">{proposalData.suggestedTitle}</p>
                </div>
                {proposalData.logline && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-bedroom-purple mb-2">Logline</h3>
                    <p className="text-sm text-white/80 leading-relaxed">{proposalData.logline}</p>
                  </div>
                )}
              </div>

              {/* Scenes Breakdown */}
              {proposalData.scenes && proposalData.scenes.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-bedroom-purple mb-3">Scene Breakdown ({proposalData.scenes.length} scenes)</h3>
                  <div className="space-y-2">
                    {proposalData.scenes.map((scene: any, idx: number) => (
                      <div key={idx} className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="flex items-start gap-3">
                          <div className="flex-none w-6 h-6 rounded-full bg-bedroom-purple/20 text-bedroom-purple text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-white mb-1">{scene.title}</h4>
                            <p className="text-xs text-white/60 leading-relaxed">{scene.notes}</p>
                            {scene.duration && (
                              <p className="text-[10px] text-bedroom-purple mt-1">{scene.duration}s</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bible Notes */}
              {proposalData.bibleNotes && (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-bedroom-purple">Project Bible</h3>

                  {/* Characters */}
                  {proposalData.bibleNotes.characters && proposalData.bibleNotes.characters.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-white/60 mb-2">Characters</h4>
                      <div className="space-y-2">
                        {proposalData.bibleNotes.characters.map((char: any, idx: number) => (
                          <div key={idx} className="bg-white/5 rounded-lg p-2 border border-white/5">
                            <p className="text-xs font-bold text-white">{char.name}</p>
                            <p className="text-[10px] text-white/50 mt-0.5">{char.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Locations */}
                  {proposalData.bibleNotes.locations && proposalData.bibleNotes.locations.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-white/60 mb-2">Locations</h4>
                      <div className="space-y-2">
                        {proposalData.bibleNotes.locations.map((loc: any, idx: number) => (
                          <div key={idx} className="bg-white/5 rounded-lg p-2 border border-white/5">
                            <p className="text-xs font-bold text-white">{loc.name}</p>
                            <p className="text-[10px] text-white/50 mt-0.5">{loc.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Aesthetic */}
                  {proposalData.bibleNotes.aesthetic && (
                    <div>
                      <h4 className="text-xs font-medium text-white/60 mb-2">Aesthetic</h4>
                      <div className="bg-white/5 rounded-lg p-3 border border-white/5 space-y-2">
                        {proposalData.bibleNotes.aesthetic.mood && (
                          <div>
                            <p className="text-[10px] text-white/40 mb-1">Mood</p>
                            <div className="flex flex-wrap gap-1">
                              {proposalData.bibleNotes.aesthetic.mood.map((m: string, idx: number) => (
                                <span key={idx} className="px-2 py-0.5 rounded bg-bedroom-purple/20 text-bedroom-purple text-[10px]">
                                  {m}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {proposalData.bibleNotes.aesthetic.era && (
                          <div>
                            <p className="text-[10px] text-white/40 mb-1">Era</p>
                            <p className="text-xs text-white">{proposalData.bibleNotes.aesthetic.era}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="border-t border-white/10 p-4 bg-black/40 flex gap-3">
              <button
                onClick={() => {
                  setShowProposalModal(false);
                  setProposalData(null);
                }}
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 text-sm font-medium transition-all"
              >
                Keep Chatting
              </button>
              <button
                onClick={acceptProposal}
                className="flex-1 px-4 py-3 rounded-lg bg-bedroom-purple hover:bg-bedroom-purple/80 text-white text-sm font-bold transition-all shadow-lg shadow-bedroom-purple/20"
              >
                Accept Structure
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Director's Lens - Floating Action Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-2xl shadow-black/50 flex items-center gap-1 animate-in slide-in-from-bottom-4 duration-500">
          <div className="px-3 py-1.5 flex items-center gap-2 border-r border-white/10 mr-1">
            <div className="w-2 h-2 rounded-full bg-bedroom-purple animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">Director's Lens</span>
          </div>

          {[
            { id: "stacked_frames", label: "Stacked Frames", icon: Columns, color: "text-cyan-400", hover: "hover:bg-cyan-500/20 hover:text-cyan-300" },
            { id: "poster", label: "Movie Poster", icon: ImageIcon, color: "text-amber-400", hover: "hover:bg-amber-500/20 hover:text-amber-300" },
            { id: "storyboard", label: "Storyboard", icon: LayoutGrid, color: "text-emerald-400", hover: "hover:bg-emerald-500/20 hover:text-emerald-300" },
            { id: "character_sheet", label: "Character Sheet", icon: Users, color: "text-pink-400", hover: "hover:bg-pink-500/20 hover:text-pink-300" },
            { id: "moodboard", label: "Moodboard", icon: Palette, color: "text-purple-400", hover: "hover:bg-purple-500/20 hover:text-purple-300" },
            { id: "temporal_progression", label: "Time Sequence", icon: Clock, color: "text-orange-400", hover: "hover:bg-orange-500/20 hover:text-orange-300" },
          ].map((action) => (
            <button
              key={action.id}
              onClick={() => {
                // Create new scene with workflow
                addScene(undefined, {
                  title: `${action.label} Scene`,
                  notes: `New ${action.label.toLowerCase()} workflow`,
                  promptSlots: {
                    subject: "",
                    camera: { angle: "", movement: "", lens: "" },
                    lighting: { mood: "", direction: "", color: "" },
                    style: { aesthetic: "", era: "", influences: [] },
                    workflow: action.id,
                    aspectRatio: action.id === "stacked_frames" ? "9:16" : action.id === "poster" ? "2:3" : action.id === "character_sheet" ? "1:1" : action.id === "moodboard" ? "1:1" : "16:9"
                  },
                  // Auto-select recommended models if available
                  selectedModel: action.id === "stacked_frames" || action.id === "character_sheet"
                    ? "midjourney/niji-v6" // Niji v6 for anime/character
                    : action.id === "poster" || action.id === "moodboard" || action.id === "temporal_progression"
                      ? "google/gemini-3-pro-image-preview" // Nano Banana Pro for photorealism/text/temporal
                      : "google/gemini-2.5-flash" // Flash for storyboards
                });

                // Show toast (simulated with chat message for now)
                addChatMessage({
                  role: "assistant",
                  content: `I've set up a **${action.label}** scene for you! Check the Inspector to tweak the details.`
                });
              }}
              className={`group relative p-2.5 rounded-full transition-all duration-300 ${action.hover}`}
            >
              <action.icon className={`w-5 h-5 ${action.color} transition-transform group-hover:scale-110`} />

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded text-[10px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {action.label}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black/80" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
