import modelsData from '@/data/models.json';
import { Tool } from '@/lib/types/tools';

export type { Tool } from '@/lib/types/tools';
export { CATEGORIES, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/types/tools';

let cachedTools: Tool[] | null = null;

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getTools(): Tool[] {
  if (cachedTools) {
    return cachedTools;
  }

  try {
    cachedTools = (modelsData.models as any[]).map((model: any, index: number) => ({
      id: `tool-${index}`,
      slug: createSlug(model.model || `tool-${index}`),
      vendor: model.vendor || '',
      category: model.primary_category || '',
      modelType: model.model_type || '',
      licenseType: model.license_type || '',
      regionalRestrictions: model.regional_restrictions || '',
      skillLevel: model.skill_level || '',
      bestFor: model.best_for || '',
      model: model.model || '',
      modality: model.modality || '',
      keyFeatures: model.key_features || '',
      durationResolution: model.duration_resolution || '',
      controls: model.controls || '',
      speed: model.speed || '',
      pricing: model.pricing || '',
      license: model.license || '',
      updateCadence: model.update_cadence || '',
      distinctiveEdge: model.distinctive_edge || '',
      proTips: model.pro_tips || '',
      drawbacks: model.drawbacks || '',
      notableSources: model.notable_sources || '',
      featured: model.featured || false,
      dateAdded: model.date_added || null,
      isNew: model.is_new || false,
      thumbnailUrl: model.thumbnail_url || '',
    }));

    return cachedTools;
  } catch (error) {
    console.error('Error loading tools data:', error);
    return [];
  }
}

export function getToolBySlug(slug: string): Tool | undefined {
  const tools = getTools();
  return tools.find(tool => tool.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  const tools = getTools();
  return tools.filter(tool => tool.category === category);
}

export function getFeaturedTools(limit: number = 6): Tool[] {
  const tools = getTools();
  const featured = tools.filter(tool => tool.featured);
  return featured.length > 0 ? featured.slice(0, limit) : tools.slice(0, limit);
}

export function getLatestTools(limit: number = 4): Tool[] {
  const tools = getTools();
  const newTools = tools.filter(tool => tool.isNew);
  return newTools.slice(0, limit);
}
