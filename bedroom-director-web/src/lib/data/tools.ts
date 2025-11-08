import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';
import { Tool } from '@/lib/types/tools';

export type { Tool } from '@/lib/types/tools';
export { CATEGORIES, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/types/tools';

let cachedTools: Tool[] | null = null;

export function getTools(): Tool[] {
  if (cachedTools) {
    return cachedTools;
  }

  try {
    // Path to CSV file in public folder
    // During build, we need to go up from .next directory
    let csvPath = path.join(process.cwd(), 'public/ai_video_image_models.csv');

    // If file doesn't exist, try alternate path for build process
    if (!fs.existsSync(csvPath)) {
      csvPath = path.join(process.cwd(), '../public/ai_video_image_models.csv');
    }

    const csvData = fs.readFileSync(csvPath, 'utf-8');

    const { data } = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
    });

    cachedTools = data.map((row: any, index: number) => ({
      id: `tool-${index}`,
      slug: createSlug(row['Model'] || row['model'] || `tool-${index}`),
      vendor: row['Vendor'] || '',
      category: row['Primary_Category'] || '',
      modelType: row['Model_Type'] || '',
      licenseType: row['License_Type'] || '',
      specialFlags: row['Special_Flags'] || '',
      skillLevel: row['Skill_Level'] || '',
      bestFor: row['Best_For'] || '',
      model: row['Model'] || '',
      modality: row['Modality'] || '',
      keyFeatures: row['Key Features'] || '',
      durationResolution: row['Duration/Resolution'] || '',
      controls: row['Controls'] || '',
      speed: row['Speed'] || '',
      pricing: row['Pricing'] || '',
      license: row['License'] || '',
      updateCadence: row['Update Cadence'] || '',
      distinctiveEdge: row['Distinctive Edge'] || '',
      proTips: row['Pro Tips'] || '',
      drawbacks: row['Drawbacks'] || '',
      notableSources: row['Notable Sources'] || '',
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
  // For now, return first N tools. Later can add "featured" flag
  return tools.slice(0, limit);
}

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
