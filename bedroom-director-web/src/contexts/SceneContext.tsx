"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  Scene,
  SceneProject,
  PromptSlots,
  SceneTemplate,
  ProjectChatMessage,
  ChatRole,
  GlobalStyle,
  ProjectBible,
} from "@/lib/types/scene";

interface SceneContextType {
  // Project state
  project: SceneProject | null;
  projects: SceneProject[];
  activeSceneId: string | null;
  chatMessages: ProjectChatMessage[];

  // Project operations
  createProject: (title: string) => void;
  loadProject: (id: string) => void;
  saveProject: () => void;
  deleteProject: (id: string) => void;
  updateProjectTitle: (title: string) => void;
  updateProjectGlobalStyle: (style: Partial<GlobalStyle>) => void;
  updateProjectBible: (updates: Partial<ProjectBible>) => void;

  // Scene operations
  addScene: (template?: SceneTemplate, initialData?: Partial<Scene>) => void;
  updateScene: (id: string, updates: Partial<Scene>) => void;
  deleteScene: (id: string) => void;
  reorderScenes: (startIndex: number, endIndex: number) => void;
  setActiveScene: (id: string) => void;

  // Prompt operations
  updatePromptSlots: (sceneId: string, slots: Partial<PromptSlots>) => void;
  compilePrompt: (sceneId: string) => string;

  // Version/Snapshot operations
  addVersion: (sceneId: string, prompt: string, thumbnail?: string, notes?: string) => void;
  createSnapshot: (sceneId: string, notes: string) => void;
  restoreSnapshot: (sceneId: string, snapshotId: string) => void;

  // Chat operations
  addChatMessage: (params: {
    role: ChatRole;
    content: string;
    linkedSceneId?: string;
    linkedBeatId?: string;
    tags?: string[];
  }) => void;
}

const SceneContext = createContext<SceneContextType | undefined>(undefined);

const STORAGE_KEY = "scene-canvas-projects";
const CHAT_STORAGE_KEY = "scene-canvas-chat";
const MAX_FREE_PROJECTS = 3; // Freemium limit

export function SceneProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<SceneProject[]>([]);
  const [project, setProject] = useState<SceneProject | null>(null);
  const [activeSceneId, setActiveSceneId] = useState<string | null>(null);
  const [chatMessagesByProject, setChatMessagesByProject] = useState<Record<string, ProjectChatMessage[]>>(
    {}
  );

  // Load projects from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Convert date strings back to Date objects
          const projectsWithDates = parsed.map((p: any) => ({
            ...p,
            created: new Date(p.created),
            modified: new Date(p.modified),
            scenes: p.scenes.map((s: any) => ({
              ...s,
              createdAt: new Date(s.createdAt),
              modifiedAt: new Date(s.modifiedAt),
              versions: s.versions.map((v: any) => ({
                ...v,
                timestamp: new Date(v.timestamp),
              })),
              snapshots: s.snapshots.map((snap: any) => ({
                ...snap,
                createdAt: new Date(snap.createdAt),
              })),
              generatedMedia: s.generatedMedia.map((m: any) => ({
                ...m,
                timestamp: new Date(m.timestamp),
              })),
            })),
          }));
          setProjects(projectsWithDates);
        } catch (error) {
          console.error("Failed to load projects from localStorage:", error);
        }
      }
    }
  }, []);

  // Load chat messages from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as Record<string, ProjectChatMessage[]>;
          const withDates: Record<string, ProjectChatMessage[]> = {};

          Object.entries(parsed).forEach(([projectId, messages]) => {
            withDates[projectId] = messages.map((m) => ({
              ...m,
              createdAt: new Date(m.createdAt),
            }));
          });

          setChatMessagesByProject(withDates);
        } catch (error) {
          console.error("Failed to load Scene Canvas chat from localStorage:", error);
        }
      }
    }
  }, []);

  // Save projects to localStorage whenever they change
  const saveToStorage = (updatedProjects: SceneProject[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
    }
  };

  const saveChatToStorage = (messagesByProject: Record<string, ProjectChatMessage[]>) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messagesByProject));
    }
  };

  const createProject = (title: string) => {
    // Check freemium limit
    const activeProjects = projects.filter((p) => !p.isArchived);
    if (activeProjects.length >= MAX_FREE_PROJECTS) {
      // TODO: Show upgrade modal
      alert(`Free tier limited to ${MAX_FREE_PROJECTS} active projects. Upgrade to Pro for unlimited projects!`);
      return;
    }

    const newProject: SceneProject = {
      id: `project-${Date.now()}`,
      title,
      created: new Date(),
      modified: new Date(),
      scenes: [],
      bible: {
        characters: [],
        locations: [],
        aesthetic: { palette: [], mood: [], era: "" },
        visualAssets: [],
      },
      tags: [],
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    setProject(newProject);
    setActiveSceneId(null);
    saveToStorage(updatedProjects);
  };

  const loadProject = (id: string) => {
    const found = projects.find((p) => p.id === id);
    if (found) {
      setProject(found);
      setActiveSceneId(found.scenes[0]?.id || null);
    }
  };

  const saveProject = () => {
    if (!project) return;

    const updatedProject = {
      ...project,
      modified: new Date(),
    };

    const updatedProjects = projects.map((p) => (p.id === project.id ? updatedProject : p));
    setProjects(updatedProjects);
    setProject(updatedProject);
    saveToStorage(updatedProjects);
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter((p) => p.id !== id);
    setProjects(updatedProjects);
    saveToStorage(updatedProjects);

    if (project?.id === id) {
      setProject(null);
      setActiveSceneId(null);
    }

    if (chatMessagesByProject[id]) {
      const updatedChat = { ...chatMessagesByProject };
      delete updatedChat[id];
      setChatMessagesByProject(updatedChat);
      saveChatToStorage(updatedChat);
    }
  };

  const updateProjectTitle = (title: string) => {
    if (!project) return;

    const updatedProject = { ...project, title, modified: new Date() };
    setProject(updatedProject);

    const updatedProjects = projects.map((p) => (p.id === project.id ? updatedProject : p));
    setProjects(updatedProjects);
    saveToStorage(updatedProjects);
  };

  const updateProjectGlobalStyle = (updates: Partial<GlobalStyle>) => {
    if (!project) return;

    const updatedProject: SceneProject = {
      ...project,
      globalStyle: {
        ...(project.globalStyle || {}),
        ...updates,
      },
      modified: new Date(),
    };

    setProject(updatedProject);

    const updatedProjects = projects.map((p) => (p.id === project.id ? updatedProject : p));
    setProjects(updatedProjects);
    saveToStorage(updatedProjects);
  };

  const updateProjectBible = (updates: Partial<ProjectBible>) => {
    if (!project) return;

    const updatedBible = {
      ...(project.bible || { characters: [], locations: [], aesthetic: { palette: [], mood: [], era: "" }, visualAssets: [] }),
      ...updates,
      // Ensure arrays exist if they were undefined
      characters: updates.characters || project.bible?.characters || [],
      locations: updates.locations || project.bible?.locations || [],
      aesthetic: updates.aesthetic || project.bible?.aesthetic || { palette: [], mood: [], era: "" },
      visualAssets: updates.visualAssets || project.bible?.visualAssets || [],
    };

    const updatedProject = { ...project, bible: updatedBible, modified: new Date() };
    setProject(updatedProject);

    const updatedProjects = projects.map((p) => (p.id === project.id ? updatedProject : p));
    setProjects(updatedProjects);
    saveToStorage(updatedProjects);
  };

  const addScene = (template?: SceneTemplate, initialData?: Partial<Scene>) => {
    if (!project) return;

    const newScene: Scene = {
      id: `scene-${Date.now()}`,
      order: project.scenes.length,
      title: template ? template.name : `Scene ${project.scenes.length + 1}`,
      selectedModel: template?.recommendedModels[0] || "",
      promptSlots: (template?.defaultPromptSlots as PromptSlots) || {
        subject: "",
        camera: { angle: "", movement: "", lens: "" },
        lighting: { mood: "", direction: "", color: "" },
        style: { aesthetic: "", era: "", influences: [] },
        aspectRatio: "16:9",
        workflow: "standard",
      },
      compiledPrompt: "",
      generatedMedia: [],
      status: "exploring",
      versions: [],
      snapshots: [],
      createdAt: new Date(),
      modifiedAt: new Date(),
      ...initialData, // Override with initial data
    };

    const updatedProject = {
      ...project,
      scenes: [...project.scenes, newScene],
      modified: new Date(),
    };

    setProject(updatedProject);
    setActiveSceneId(newScene.id);

    const updatedProjects = projects.map((p) => (p.id === project.id ? updatedProject : p));
    setProjects(updatedProjects);
    saveToStorage(updatedProjects);
  };

  const updateScene = (id: string, updates: Partial<Scene>) => {
    if (!project) return;

    const updatedScenes = project.scenes.map((s) =>
      s.id === id ? { ...s, ...updates, modifiedAt: new Date() } : s
    );

    const updatedProject = {
      ...project,
      scenes: updatedScenes,
      modified: new Date(),
    };

    setProject(updatedProject);

    const updatedProjects = projects.map((p) => (p.id === project.id ? updatedProject : p));
    setProjects(updatedProjects);
    saveToStorage(updatedProjects);
  };

  const deleteScene = (id: string) => {
    if (!project) return;

    const updatedScenes = project.scenes.filter((s) => s.id !== id);

    const updatedProject = {
      ...project,
      scenes: updatedScenes,
      modified: new Date(),
    };

    setProject(updatedProject);

    if (activeSceneId === id) {
      setActiveSceneId(updatedScenes[0]?.id || null);
    }

    const updatedProjects = projects.map((p) => (p.id === project.id ? updatedProject : p));
    setProjects(updatedProjects);
    saveToStorage(updatedProjects);
  };

  const reorderScenes = (startIndex: number, endIndex: number) => {
    if (!project) return;

    const result = Array.from(project.scenes);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    // Update order numbers
    const reorderedScenes = result.map((s, index) => ({
      ...s,
      order: index,
    }));

    const updatedProject = {
      ...project,
      scenes: reorderedScenes,
      modified: new Date(),
    };

    setProject(updatedProject);

    const updatedProjects = projects.map((p) => (p.id === project.id ? updatedProject : p));
    setProjects(updatedProjects);
    saveToStorage(updatedProjects);
  };

  const setActiveScene = (id: string) => {
    setActiveSceneId(id);
  };

  const updatePromptSlots = (sceneId: string, slots: Partial<PromptSlots>) => {
    if (!project) return;

    const scene = project.scenes.find((s) => s.id === sceneId);
    if (!scene) return;

    const updatedSlots = {
      ...scene.promptSlots,
      ...slots,
    };

    updateScene(sceneId, {
      promptSlots: updatedSlots,
      compiledPrompt: compilePromptFromSlots(updatedSlots),
    });
  };

  const compilePromptFromSlots = (slots: PromptSlots): string => {
    // Basic compilation for MVP - will be enhanced per-model later
    const parts: string[] = [];

    if (slots.subject) parts.push(slots.subject);

    if (slots.camera.angle || slots.camera.movement || slots.camera.lens) {
      const cameraParts = [slots.camera.angle, slots.camera.movement, slots.camera.lens]
        .filter(Boolean)
        .join(", ");
      if (cameraParts) parts.push(cameraParts);
    }

    if (slots.lighting.mood || slots.lighting.direction || slots.lighting.color) {
      const lightingParts = [slots.lighting.mood, slots.lighting.direction, slots.lighting.color]
        .filter(Boolean)
        .join(", ");
      if (lightingParts) parts.push(lightingParts);
    }

    if (slots.style.aesthetic || slots.style.era) {
      const styleParts = [slots.style.aesthetic, slots.style.era].filter(Boolean).join(", ");
      if (styleParts) parts.push(styleParts);
    }

    if (slots.style.influences && slots.style.influences.length > 0) {
      parts.push(`inspired by ${slots.style.influences.join(", ")}`);
    }

    // Workflow-specific prompt additions
    if (slots.workflow && slots.workflow !== "standard") {
      switch (slots.workflow) {
        case "stacked_frames":
          parts.unshift("Split screen, 4 vertical panels, sequential action, comic book style layout");
          break;
        case "storyboard":
          parts.unshift("Storyboard grid, multiple shots, rough sketch style, annotated");
          break;
        case "poster":
          parts.unshift("Movie poster key art, high contrast, title typography, cinematic composition");
          break;
        case "character_sheet":
          parts.unshift("Character sheet, multiple angles, front view, side view, close up, full body");
          break;
        case "moodboard":
          parts.unshift("Moodboard style transfer, aesthetic matching, color palette extraction, visual theme consistency");
          break;
        case "temporal_progression":
          parts.unshift("4 sequential frames, temporal progression, time evolution, before and after, storytelling sequence");
          break;
      }
    }

    // Aspect Ratio flag (Midjourney/Niji style)
    if (slots.aspectRatio) {
      parts.push(`--ar ${slots.aspectRatio}`);
    }

    return parts.join(", ");
  };

  const compilePrompt = (sceneId: string): string => {
    if (!project) return "";

    const scene = project.scenes.find((s) => s.id === sceneId);
    if (!scene) return "";

    return compilePromptFromSlots(scene.promptSlots);
  };

  const addVersion = (sceneId: string, prompt: string, thumbnail?: string, notes?: string) => {
    if (!project) return;

    const scene = project.scenes.find((s) => s.id === sceneId);
    if (!scene) return;

    const newVersion = {
      id: `version-${Date.now()}`,
      prompt,
      thumbnail,
      timestamp: new Date(),
      notes,
    };

    updateScene(sceneId, {
      versions: [...scene.versions, newVersion],
    });
  };

  const createSnapshot = (sceneId: string, notes: string) => {
    if (!project) return;

    const scene = project.scenes.find((s) => s.id === sceneId);
    if (!scene) return;

    const newSnapshot = {
      id: `snapshot-${Date.now()}`,
      prompt: scene.compiledPrompt,
      notes,
      createdAt: new Date(),
      promptSlots: scene.promptSlots,
    };

    updateScene(sceneId, {
      snapshots: [...scene.snapshots, newSnapshot],
    });
  };

  const restoreSnapshot = (sceneId: string, snapshotId: string) => {
    if (!project) return;

    const scene = project.scenes.find((s) => s.id === sceneId);
    if (!scene) return;

    const snapshot = scene.snapshots.find((s) => s.id === snapshotId);
    if (!snapshot) return;

    updateScene(sceneId, {
      promptSlots: snapshot.promptSlots,
      compiledPrompt: snapshot.prompt,
    });
  };

  const addChatMessage = (params: {
    role: ChatRole;
    content: string;
    linkedSceneId?: string;
    linkedBeatId?: string;
    tags?: string[];
  }) => {
    if (!project) return;

    const projectId = project.id;
    const existing = chatMessagesByProject[projectId] || [];

    const newMessage: ProjectChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      projectId,
      role: params.role,
      content: params.content,
      createdAt: new Date(),
      linkedSceneId: params.linkedSceneId,
      linkedBeatId: params.linkedBeatId,
      tags: params.tags,
    };

    setChatMessagesByProject((prev) => {
      const existing = prev[projectId] || [];
      const updated = {
        ...prev,
        [projectId]: [...existing, newMessage],
      };
      saveChatToStorage(updated);
      return updated;
    });
  };

  const chatMessages = project ? chatMessagesByProject[project.id] || [] : [];

  return (
    <SceneContext.Provider
      value={{
        project,
        projects,
        activeSceneId,
        chatMessages,
        createProject,
        loadProject,
        saveProject,
        deleteProject,
        updateProjectTitle,
        updateProjectGlobalStyle,
        updateProjectBible,
        addScene,
        updateScene,
        deleteScene,
        reorderScenes,
        setActiveScene,
        updatePromptSlots,
        compilePrompt,
        addVersion,
        createSnapshot,
        restoreSnapshot,
        addChatMessage,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error("useScene must be used within SceneProvider");
  }
  return context;
}
