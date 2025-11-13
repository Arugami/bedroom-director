import creationsData from "@/data/creations.json";

export interface Creator {
  name: string;
  type: "brand" | "indie" | "artist" | "studio";
  link?: string;
  bio?: string;
}

export interface Tool {
  name: string;
  category: string;
  role: string;
}

export interface Prompt {
  tool: string;
  prompt: string;
  settings: string;
}

export interface Breakdown {
  concept: string;
  budget?: string;
  timeline?: string;
  process: string[];
  challenges: string[];
  results: string[];
}

export interface Creation {
  id: string;
  title: string;
  slug: string;
  creator: Creator;
  category: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  longDescription: string;
  views: string;
  likes: number;
  publishedDate: string;
  featured: boolean;
  awards?: string[];
  tools: Tool[];
  breakdown: Breakdown;
  prompts: Prompt[];
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export function getAllCreations(): Creation[] {
  return creationsData.creations as unknown as Creation[];
}

export function getFeaturedCreations(limit?: number): Creation[] {
  const featured = (creationsData.creations as unknown as Creation[]).filter((c) => c.featured);
  return limit ? featured.slice(0, limit) : (featured as Creation[]);
}

export function getCreationBySlug(slug: string): Creation | undefined {
  return creationsData.creations.find((c) => c.slug === slug) as Creation | undefined;
}

export function getCreationsByCategory(category: string): Creation[] {
  return creationsData.creations.filter((c) => c.category === category) as Creation[];
}

export function getAllCategories(): Category[] {
  return creationsData.categories as Category[];
}

export function searchCreations(query: string): Creation[] {
  const lowerQuery = query.toLowerCase();
  return creationsData.creations.filter((c) => {
    return (
      c.title.toLowerCase().includes(lowerQuery) ||
      c.description.toLowerCase().includes(lowerQuery) ||
      c.creator.name.toLowerCase().includes(lowerQuery) ||
      c.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      c.tools.some((tool) => tool.name.toLowerCase().includes(lowerQuery))
    );
  }) as Creation[];
}
