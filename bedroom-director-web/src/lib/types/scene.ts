// Scene Canvas Types

export type ChatRole = "user" | "assistant" | "system";

export interface ProjectChatMessage {
  id: string;
  projectId: string;
  role: ChatRole;
  content: string;
  createdAt: Date;
  linkedSceneId?: string;
  linkedBeatId?: string;
  tags?: string[];
  toolCalls?: { name: string; args: any; result?: any }[];
}

export interface CameraOption {
  angle: string; // "wide shot", "close-up", "bird's eye", "POV", etc.
  movement: string; // "static", "tracking", "dolly zoom", "pan", etc.
  lens: string; // "35mm", "50mm", "wide angle", "telephoto", etc.
  shotType?: string; // Legacy/UI field for "Wide", "Medium", etc.
}

export interface LightingOption {
  mood: string; // "golden hour", "neon noir", "harsh sunlight", "soft diffused", etc.
  direction: string; // "front", "backlit", "rim light", "three-point", etc.
  color: string; // "warm", "cool", "vibrant", "monochrome", etc.
  timeOfDay?: string; // Legacy/UI field for "Day", "Night", etc.
}

export interface StyleOption {
  aesthetic: string; // "cinematic", "documentary", "music video", "commercial", etc.
  era: string; // "modern", "80s", "90s", "retro futuristic", etc.
  influences: string[]; // ["Wes Anderson", "Christopher Nolan", etc.]
}

export interface PromptSlots {
  subject: string;
  camera: CameraOption;
  lighting: LightingOption;
  style: StyleOption;
  advanced?: {
    negativePrompt?: string;
    weights?: Record<string, number>;
    cfgScale?: number;
    steps?: number;
  };
}

export interface SceneVersion {
  id: string;
  prompt: string;
  thumbnail?: string;
  timestamp: Date;
  notes?: string;
  metadata?: {
    model?: string;
    duration?: number;
    resolution?: string;
  };
}

export interface SceneSnapshot {
  id: string;
  prompt: string;
  thumbnail?: string;
  notes: string;
  createdAt: Date;
  promptSlots: PromptSlots;
}

export interface GeneratedMedia {
  id: string;
  url: string;
  timestamp: Date;
  status: "processing" | "completed" | "failed";
  metadata?: {
    model: string;
    duration?: number;
    resolution?: string;
    seed?: number;
  };
}

export type SceneStatus = "exploring" | "refining" | "locked";

export interface Scene {
  id: string;
  order: number;
  title: string;
  selectedModel: string; // Tool ID from models database
  promptSlots: PromptSlots;
  compiledPrompt: string;
  generatedMedia: GeneratedMedia[];
  status: SceneStatus;
  versions: SceneVersion[];
  snapshots: SceneSnapshot[];
  createdAt: Date;
  modifiedAt: Date;
  notes?: string;
}

export interface GlobalStyle {
  palette?: string[]; // Color hex codes
  characterRefs?: {
    name: string;
    description: string;
    imageUrl?: string;
  }[];
  brandGuidelines?: string;
  visualTheme?: string;
  consistencyNotes?: string;
}

export interface VisualAsset {
  id: string;
  url: string;
  category: "character" | "location" | "prop" | "style" | "shot_ref";
  label: string;
  description: string;
  tags: string[];
  createdAt: Date;
}

export interface ProjectBible {
  characters: { id: string; name: string; description: string }[];
  locations: { id: string; name: string; description: string }[];
  aesthetic: { palette: string[]; mood: string[]; era: string };
  visualAssets: VisualAsset[];
}

export interface SceneProject {
  id: string;
  title: string;
  description?: string;
  created: Date;
  modified: Date;
  scenes: Scene[];
  globalStyle?: GlobalStyle;
  bible?: ProjectBible;
  tags?: string[];
  isArchived?: boolean;
}

export interface SceneTemplate {
  id: string;
  name: string;
  category: "video" | "image" | "animation" | "transition";
  description: string;
  thumbnail?: string;
  defaultPromptSlots: Partial<PromptSlots>;
  recommendedModels: string[]; // Tool IDs
  tags: string[];
  difficulty?: "beginner" | "intermediate" | "advanced";
  isPro?: boolean; // For freemium monetization
}

// Prompt compilation options per model
export interface ModelPromptConfig {
  modelId: string;
  modelName: string;
  supportsNegativePrompt: boolean;
  supportsWeights: boolean;
  promptFormat: "natural" | "structured" | "json";
  maxLength?: number;
  templateFormat?: string; // e.g., "{subject}, {camera}, {lighting}, {style}"
  specialSyntax?: {
    weight: string; // e.g., "(text:1.5)" or "text::1.5"
    negative: string; // e.g., "no: " or "--no"
  };
}
