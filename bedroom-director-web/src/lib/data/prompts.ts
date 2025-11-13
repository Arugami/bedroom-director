import promptsData from "@/data/prompts.json";

export interface PromptAuthor {
  name: string;
  username: string;
  avatar: string;
}

export interface Prompt {
  id: string;
  title: string;
  slug: string;
  prompt_text: string;
  result_image?: string;
  result_video?: string;
  result_audio?: string;
  category: string;
  tool_used: string;
  tool_slug: string;
  style_tags: string[];
  outcome_type: string;
  settings: string;
  author: PromptAuthor;
  likes: number;
  views: number;
  date_added: string;
  featured: boolean;
  tips?: string;
}

export interface PromptCategory {
  id: string;
  name: string;
  description: string;
}

export function getAllPrompts(): Prompt[] {
  return promptsData.prompts as unknown as Prompt[];
}

export function getFeaturedPrompts(limit?: number): Prompt[] {
  const featured = (promptsData.prompts as unknown as Prompt[]).filter((p) => p.featured);
  return limit ? featured.slice(0, limit) : featured;
}

export function getPromptBySlug(slug: string): Prompt | undefined {
  return (promptsData.prompts as unknown as Prompt[]).find((p) => p.slug === slug);
}

export function getPromptsByCategory(category: string): Prompt[] {
  return (promptsData.prompts as unknown as Prompt[]).filter((p) => p.category === category);
}

export function getPromptsByTool(toolSlug: string): Prompt[] {
  return (promptsData.prompts as unknown as Prompt[]).filter((p) => p.tool_slug === toolSlug);
}

export function getPromptsByStyle(style: string): Prompt[] {
  return (promptsData.prompts as unknown as Prompt[]).filter((p) => 
    p.style_tags.some(tag => tag.toLowerCase() === style.toLowerCase())
  );
}

export function getPromptsByOutcome(outcomeType: string): Prompt[] {
  return (promptsData.prompts as unknown as Prompt[]).filter((p) => p.outcome_type === outcomeType);
}

export function getAllCategories(): PromptCategory[] {
  return promptsData.categories as unknown as PromptCategory[];
}

export function getAllStyles(): string[] {
  return promptsData.styles as unknown as string[];
}

export function searchPrompts(query: string): Prompt[] {
  const lowerQuery = query.toLowerCase();
  return (promptsData.prompts as unknown as Prompt[]).filter((p) => {
    return (
      p.title.toLowerCase().includes(lowerQuery) ||
      p.prompt_text.toLowerCase().includes(lowerQuery) ||
      p.tool_used.toLowerCase().includes(lowerQuery) ||
      p.style_tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      p.author.name.toLowerCase().includes(lowerQuery)
    );
  });
}

export function getMostLikedPrompts(limit: number = 10): Prompt[] {
  const sorted = [...(promptsData.prompts as unknown as Prompt[])].sort((a, b) => b.likes - a.likes);
  return sorted.slice(0, limit);
}

export function getMostViewedPrompts(limit: number = 10): Prompt[] {
  const sorted = [...(promptsData.prompts as unknown as Prompt[])].sort((a, b) => b.views - a.views);
  return sorted.slice(0, limit);
}

export function getNewestPrompts(limit: number = 10): Prompt[] {
  const sorted = [...(promptsData.prompts as unknown as Prompt[])].sort((a, b) => 
    new Date(b.date_added).getTime() - new Date(a.date_added).getTime()
  );
  return sorted.slice(0, limit);
}
