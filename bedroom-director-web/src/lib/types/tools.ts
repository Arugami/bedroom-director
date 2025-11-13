export interface Tool {
  id: string;
  slug: string;
  vendor: string;
  category: string;
  modelType: string;
  licenseType: string;
  regionalRestrictions?: string;
  skillLevel: string;
  bestFor: string;
  model: string;
  modality: string;
  keyFeatures: string;
  durationResolution: string;
  controls: string;
  speed: string;
  pricing: string;
  license: string;
  updateCadence: string;
  distinctiveEdge: string;
  proTips: string;
  drawbacks: string;
  notableSources: string;
  // New fields for dynamic features
  featured?: boolean;
  dateAdded?: string;
  isNew?: boolean;
}

export const CATEGORIES = {
  IMAGE_GEN: 'IMAGE_GEN',
  VIDEO_GEN: 'VIDEO_GEN',
  VOICE_AUDIO: 'VOICE_AUDIO',
  MUSIC: 'MUSIC',
  LIP_SYNC: 'LIP_SYNC',
  PLATFORM_AGGREGATOR: 'PLATFORM_AGGREGATOR',
  POST_PROCESSING: 'POST_PROCESSING',
  API_INFRASTRUCTURE: 'API_INFRASTRUCTURE',
} as const;

export const CATEGORY_LABELS: Record<string, string> = {
  IMAGE_GEN: 'Image Generation',
  VIDEO_GEN: 'Video Generation',
  VOICE_AUDIO: 'Voice & Audio',
  MUSIC: 'Music Generation',
  LIP_SYNC: 'Lip Sync',
  PLATFORM_AGGREGATOR: 'Platforms',
  POST_PROCESSING: 'Post Processing',
  API_INFRASTRUCTURE: 'API Infrastructure',
};

export const CATEGORY_COLORS: Record<string, string> = {
  IMAGE_GEN: 'bg-blue-500',
  VIDEO_GEN: 'bg-bedroom-purple',
  VOICE_AUDIO: 'bg-green-500',
  MUSIC: 'bg-yellow-500',
  LIP_SYNC: 'bg-pink-500',
  PLATFORM_AGGREGATOR: 'bg-indigo-500',
  POST_PROCESSING: 'bg-orange-500',
  API_INFRASTRUCTURE: 'bg-gray-500',
};
