# Technical Architecture Document

**Project:** Bedroom Director  
**Brand:** bedroomdirector.com  
**Version:** 2.0  
**Last Updated:** November 4, 2025

---

## Technology Stack

### Frontend Framework
- **Next.js 14+** (App Router with Static Export)
  - Static site generation for performance
  - Server Components for data fetching
  - Client Components for interactivity
  - Built-in optimization (images, fonts, scripts)
  - Deployed as static files to Cloudflare Pages

### UI & Styling
- **React 18+** - Component library
- **TailwindCSS** - Utility-first styling
- **shadcn/ui** - Pre-built accessible components
- **Lucide React** - Icon library
- **Framer Motion** (optional) - Animations and transitions

### Database & Backend
- **Supabase** - PostgreSQL database
  - Tool database (migrated from CSV)
  - User authentication (future)
  - Real-time subscriptions (future)
  - Storage for images/videos
  - Edge functions for serverless

### Search & Discovery
- **Meilisearch** or **Algolia** - Instant search
  - Typo tolerance
  - Faceted search
  - Fast autocomplete
- **Alternative:** Supabase full-text search (simpler, free)

### AI Features (Future)
- **Cloudflare Workers** - AI chatbot API
  - Claude/Gemini integration
  - Streaming responses
  - Edge deployment
- **Google Gemini 2.5 Pro** - AI-powered features
  - Smart search recommendations
  - Tool matching
  - Content generation

### Development Tools
- **TypeScript** - Type safety
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

### Deployment & Hosting
- **Cloudflare Pages** - Static site hosting
  - Unlimited bandwidth
  - Global CDN
  - Automatic deployments from GitHub
  - Preview deployments
- **Cloudflare Workers** - Serverless functions
  - AI chatbot API
  - Edge functions
- **Cloudflare R2** - Object storage
  - Tool screenshots
  - Demo videos
  - User uploads (future)
- **GitHub** - Version control

---

## Project Structure

```
AI_Image_Video_App/
├── public/
│   ├── data/
│   │   └── models.json          # Parsed from CSV
│   ├── images/
│   │   ├── logos/               # Vendor logos
│   │   ├── examples/            # Model output examples
│   │   └── icons/               # Custom icons
│   └── favicon.ico
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Homepage
│   │   ├── browse/
│   │   │   └── page.tsx         # Model gallery
│   │   ├── models/
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Model detail
│   │   ├── compare/
│   │   │   └── page.tsx         # Comparison page
│   │   ├── wizard/
│   │   │   └── page.tsx         # Decision helper
│   │   ├── learn/
│   │   │   └── page.tsx         # Glossary
│   │   └── api/
│   │       ├── models/
│   │       │   └── route.ts     # Model data API
│   │       └── search/
│   │           └── route.ts     # Search API
│   │
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── slider.tsx
│   │   │   └── tabs.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileMenu.tsx
│   │   │
│   │   ├── models/
│   │   │   ├── ModelCard.tsx
│   │   │   ├── ModelGrid.tsx
│   │   │   ├── ModelDetail.tsx
│   │   │   ├── ModelBadge.tsx
│   │   │   └── RatingDots.tsx
│   │   │
│   │   ├── filters/
│   │   │   ├── FilterPanel.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   ├── BudgetFilter.tsx
│   │   │   ├── SpeedQualitySlider.tsx
│   │   │   ├── FeatureFilter.tsx
│   │   │   └── FilterChips.tsx
│   │   │
│   │   ├── comparison/
│   │   │   ├── ComparisonBar.tsx
│   │   │   ├── ComparisonTable.tsx
│   │   │   ├── ComparisonChart.tsx
│   │   │   └── WinnerBadge.tsx
│   │   │
│   │   ├── search/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SearchAutocomplete.tsx
│   │   │   └── SearchResults.tsx
│   │   │
│   │   ├── wizard/
│   │   │   ├── WizardContainer.tsx
│   │   │   ├── WizardStep.tsx
│   │   │   ├── WizardProgress.tsx
│   │   │   └── WizardResults.tsx
│   │   │
│   │   └── charts/
│   │       ├── SpeedQualityScatter.tsx
│   │       ├── PriceComparison.tsx
│   │       └── FeatureMatrix.tsx
│   │
│   ├── lib/
│   │   ├── data/
│   │   │   ├── parseCSV.ts      # CSV to JSON parser
│   │   │   ├── modelData.ts     # Model data utilities
│   │   │   └── filterModels.ts  # Filtering logic
│   │   │
│   │   ├── search/
│   │   │   ├── fuzzySearch.ts   # Fuse.js setup
│   │   │   └── autocomplete.ts  # Suggestion logic
│   │   │
│   │   ├── comparison/
│   │   │   ├── compareModels.ts
│   │   │   └── generateShareURL.ts
│   │   │
│   │   ├── wizard/
│   │   │   ├── scoringAlgorithm.ts
│   │   │   └── recommendations.ts
│   │   │
│   │   └── utils/
│   │       ├── cn.ts            # Class name utility
│   │       ├── formatters.ts    # Data formatters
│   │       └── constants.ts     # App constants
│   │
│   ├── types/
│   │   ├── model.ts             # Model type definitions
│   │   ├── filter.ts            # Filter type definitions
│   │   └── wizard.ts            # Wizard type definitions
│   │
│   ├── hooks/
│   │   ├── useModels.ts         # Fetch and filter models
│   │   ├── useFilters.ts        # Filter state management
│   │   ├── useComparison.ts     # Comparison state
│   │   ├── useFavorites.ts      # Favorites management
│   │   └── useSearch.ts         # Search functionality
│   │
│   ├── context/
│   │   ├── FilterContext.tsx    # Global filter state
│   │   ├── ComparisonContext.tsx # Comparison state
│   │   └── ThemeContext.tsx     # Dark/light mode
│   │
│   └── styles/
│       └── globals.css          # Global styles
│
├── scripts/
│   ├── parseCSV.js              # Build-time CSV parser
│   └── generateTypes.js         # Generate types from data
│
├── .env.local                   # Environment variables
├── .eslintrc.json              # ESLint config
├── .prettierrc                 # Prettier config
├── next.config.js              # Next.js config
├── package.json                # Dependencies
├── tailwind.config.ts          # Tailwind config
├── tsconfig.json               # TypeScript config
├── DESIGN_SPEC.md              # Design specification
├── TECHNICAL_ARCHITECTURE.md   # This file
└── README.md                   # Project documentation
```

---

## Data Flow

### CSV to Application

```
1. Build Time:
   ai_video_image_models.csv
   ↓
   scripts/parseCSV.js
   ↓
   public/data/models.json
   ↓
   Deployed with app

2. Runtime:
   User visits site
   ↓
   Next.js loads models.json
   ↓
   React Context provides data
   ↓
   Components consume via hooks
```

### Filtering Flow

```
User interacts with filters
↓
FilterContext updates state
↓
URL params updated (shareable)
↓
useModels hook recomputes filtered list
↓
ModelGrid re-renders with filtered models
```

### Comparison Flow

```
User clicks "Compare" on model card
↓
ComparisonContext adds model (max 4)
↓
ComparisonBar shows at bottom
↓
User clicks "Compare Now"
↓
Navigate to /compare with model IDs in URL
↓
ComparisonTable renders side-by-side
```

---

## Type Definitions

### Core Types

```typescript
// types/model.ts

export type ModelCategory = 'video' | 'image' | 'voice' | 'lipsync' | 'music';

export type LicenseType = 'open-source' | 'closed-source' | 'proprietary';

export type Platform = 'cloud' | 'local' | 'both';

export interface Model {
  id: string;
  name: string;
  vendor: string;
  category: ModelCategory;
  description: string;
  tagline: string;
  
  ratings: {
    speed: number;      // 1-5
    cost: number;       // 1-5
    quality: number;    // 1-5
    ease: number;       // 1-5
  };
  
  modality: string;
  keyFeatures: string[];
  
  output: {
    duration?: string;
    resolution?: string;
    frameRate?: string;
    hasAudio: boolean;
  };
  
  controls: string[];
  
  performance: {
    generationTime: string;
    platform: Platform;
  };
  
  pricing: {
    summary: string;
    tiers: PricingTier[];
  };
  
  license: {
    type: LicenseType;
    commercialUse: boolean;
    attribution: boolean;
    details: string;
  };
  
  updates: {
    cadence: string;
    lastUpdate: string;
    version: string;
  };
  
  distinctiveEdge: string;
  drawbacks: string[];
  sources: string[];
  badges: string[];
  
  // Computed fields
  slug: string;
  searchText: string;
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
  credits?: string;
}
```

```typescript
// types/filter.ts

export interface FilterState {
  categories: ModelCategory[];
  budget: BudgetRange;
  speedQuality: number;        // 0-100 (0=speed, 100=quality)
  skillLevel: SkillLevel;
  licenses: string[];
  features: string[];
  vendors: string[];
  searchQuery: string;
}

export type BudgetRange = 'free' | 'under-20' | 'under-100' | 'enterprise' | 'any';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export interface FilterOption {
  label: string;
  value: string;
  count: number;
  disabled: boolean;
}
```

```typescript
// types/wizard.ts

export interface WizardStep {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'slider' | 'text';
  options?: WizardOption[];
  min?: number;
  max?: number;
}

export interface WizardOption {
  label: string;
  value: string;
  icon?: string;
  description?: string;
}

export interface WizardAnswers {
  useCase: string;
  budget: BudgetRange;
  speedQuality: number;
  skillLevel: SkillLevel;
  requirements: string[];
}

export interface WizardResult {
  model: Model;
  score: number;
  reasoning: string[];
  warnings: string[];
}
```

---

## Key Algorithms

### 1. Model Filtering

```typescript
// lib/data/filterModels.ts

export function filterModels(
  models: Model[],
  filters: FilterState
): Model[] {
  return models.filter(model => {
    // Category filter
    if (filters.categories.length > 0) {
      if (!filters.categories.includes(model.category)) {
        return false;
      }
    }
    
    // Budget filter
    if (filters.budget !== 'any') {
      if (!matchesBudget(model, filters.budget)) {
        return false;
      }
    }
    
    // Speed/Quality preference
    const speedWeight = (100 - filters.speedQuality) / 100;
    const qualityWeight = filters.speedQuality / 100;
    const modelScore = (model.ratings.speed * speedWeight) + 
                       (model.ratings.quality * qualityWeight);
    if (modelScore < 2.5) {
      return false;
    }
    
    // Skill level filter
    if (filters.skillLevel === 'beginner' && model.ratings.ease < 3) {
      return false;
    }
    
    // License filter
    if (filters.licenses.length > 0) {
      if (!filters.licenses.some(lic => matchesLicense(model, lic))) {
        return false;
      }
    }
    
    // Feature filter
    if (filters.features.length > 0) {
      if (!filters.features.every(feat => hasFeature(model, feat))) {
        return false;
      }
    }
    
    // Vendor filter
    if (filters.vendors.length > 0) {
      if (!filters.vendors.includes(model.vendor)) {
        return false;
      }
    }
    
    // Search query
    if (filters.searchQuery) {
      if (!matchesSearch(model, filters.searchQuery)) {
        return false;
      }
    }
    
    return true;
  });
}
```

### 2. Wizard Scoring Algorithm

```typescript
// lib/wizard/scoringAlgorithm.ts

export function scoreModel(
  model: Model,
  answers: WizardAnswers
): number {
  let score = 0;
  
  // Use case match (40 points)
  score += scoreUseCase(model, answers.useCase);
  
  // Budget match (25 points)
  score += scoreBudget(model, answers.budget);
  
  // Speed/Quality preference (15 points)
  score += scoreSpeedQuality(model, answers.speedQuality);
  
  // Skill level match (10 points)
  score += scoreSkillLevel(model, answers.skillLevel);
  
  // Requirements match (10 points)
  score += scoreRequirements(model, answers.requirements);
  
  return Math.min(score, 100);
}

function scoreUseCase(model: Model, useCase: string): number {
  const useCaseMap: Record<string, string[]> = {
    'social-videos': ['fast', 'short', 'vertical'],
    'professional': ['quality', 'control', 'commercial'],
    'concept-art': ['image', 'creative', 'style'],
    'game-assets': ['batch', 'consistent', 'api'],
    'educational': ['clear', 'reliable', 'affordable'],
  };
  
  const keywords = useCaseMap[useCase] || [];
  const matches = keywords.filter(kw => 
    model.searchText.toLowerCase().includes(kw)
  );
  
  return (matches.length / keywords.length) * 40;
}
```

### 3. Fuzzy Search

```typescript
// lib/search/fuzzySearch.ts

import Fuse from 'fuse.js';

export function createSearchIndex(models: Model[]) {
  return new Fuse(models, {
    keys: [
      { name: 'name', weight: 2 },
      { name: 'vendor', weight: 1.5 },
      { name: 'tagline', weight: 1.5 },
      { name: 'description', weight: 1 },
      { name: 'keyFeatures', weight: 1 },
      { name: 'modality', weight: 1 },
    ],
    threshold: 0.4,
    includeScore: true,
  });
}

export function searchModels(
  searchIndex: Fuse<Model>,
  query: string
): Model[] {
  if (!query.trim()) return [];
  
  const results = searchIndex.search(query);
  return results.map(result => result.item);
}
```

---

## State Management

### Filter Context

```typescript
// context/FilterContext.tsx

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterContextType {
  filters: FilterState;
  updateFilters: (updates: Partial<FilterState>) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<FilterState>(() => 
    parseFiltersFromURL(searchParams)
  );
  
  const updateFilters = (updates: Partial<FilterState>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    
    // Update URL
    const params = serializeFilters(newFilters);
    router.push(`/browse?${params}`, { scroll: false });
  };
  
  const resetFilters = () => {
    setFilters(getDefaultFilters());
    router.push('/browse');
  };
  
  return (
    <FilterContext.Provider value={{ filters, updateFilters, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within FilterProvider');
  }
  return context;
}
```

### Comparison Context

```typescript
// context/ComparisonContext.tsx

import { createContext, useContext, useState } from 'react';

interface ComparisonContextType {
  selectedModels: Model[];
  addModel: (model: Model) => void;
  removeModel: (modelId: string) => void;
  clearAll: () => void;
  isSelected: (modelId: string) => boolean;
  canAddMore: boolean;
}

const MAX_COMPARISON = 4;

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [selectedModels, setSelectedModels] = useState<Model[]>([]);
  
  const addModel = (model: Model) => {
    if (selectedModels.length >= MAX_COMPARISON) return;
    if (selectedModels.some(m => m.id === model.id)) return;
    
    setSelectedModels([...selectedModels, model]);
  };
  
  const removeModel = (modelId: string) => {
    setSelectedModels(selectedModels.filter(m => m.id !== modelId));
  };
  
  const clearAll = () => {
    setSelectedModels([]);
  };
  
  const isSelected = (modelId: string) => {
    return selectedModels.some(m => m.id === modelId);
  };
  
  const canAddMore = selectedModels.length < MAX_COMPARISON;
  
  return (
    <ComparisonContext.Provider value={{
      selectedModels,
      addModel,
      removeModel,
      clearAll,
      isSelected,
      canAddMore,
    }}>
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within ComparisonProvider');
  }
  return context;
}
```

---

## Performance Optimization

### 1. Image Optimization
- Use Next.js `<Image>` component
- Lazy load images below fold
- Serve WebP with fallbacks
- Responsive image sizes

### 2. Code Splitting
- Dynamic imports for heavy components
- Route-based code splitting (automatic with App Router)
- Lazy load charts and visualizations

### 3. Data Loading
- Server Components for initial data
- Client Components for interactivity
- Incremental Static Regeneration for model data
- Cache API responses

### 4. Bundle Size
- Tree-shaking unused code
- Minimize dependencies
- Use lightweight alternatives where possible
- Analyze bundle with `@next/bundle-analyzer`

---

## SEO Implementation

### Metadata

```typescript
// app/layout.tsx

export const metadata: Metadata = {
  title: 'AI Model Explorer | Find the Perfect AI Tool',
  description: 'Compare AI image, video, voice, and lip sync models. Find the perfect tool for your creative projects.',
  keywords: ['AI models', 'text-to-video', 'text-to-image', 'AI comparison'],
  openGraph: {
    title: 'AI Model Explorer',
    description: 'Compare AI models and find the perfect tool',
    images: ['/og-image.png'],
  },
};
```

### Dynamic Metadata

```typescript
// app/models/[id]/page.tsx

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const model = await getModel(params.id);
  
  return {
    title: `${model.name} by ${model.vendor} | AI Model Explorer`,
    description: model.tagline,
    openGraph: {
      title: model.name,
      description: model.tagline,
    },
  };
}
```

### Structured Data

```typescript
// components/StructuredData.tsx

export function ModelStructuredData({ model }: { model: Model }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: model.name,
    description: model.description,
    applicationCategory: 'MultimediaApplication',
    offers: {
      '@type': 'Offer',
      price: model.pricing.summary,
    },
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

---

## Testing Strategy

### Unit Tests
- Utility functions
- Filtering logic
- Scoring algorithms
- Data parsers

### Component Tests
- Model card rendering
- Filter interactions
- Search functionality
- Wizard flow

### Integration Tests
- Complete user journeys
- Filter + search combination
- Comparison workflow
- Wizard to results

### E2E Tests
- Critical paths
- Mobile responsiveness
- Cross-browser compatibility

---

## Deployment Pipeline

```
1. Development
   - Local development with hot reload
   - Feature branches for new work
   
2. Pull Request
   - Automated tests run
   - Preview deployment on Vercel
   - Code review
   
3. Merge to Main
   - Automated deployment to production
   - Vercel handles build and deploy
   - Analytics monitoring
   
4. Post-Deployment
   - Monitor performance
   - Check error logs
   - Verify analytics
```

---

## Environment Variables

```bash
# .env.local

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Analytics (optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=

# Feature Flags (optional)
NEXT_PUBLIC_ENABLE_VOICE_MODELS=false
NEXT_PUBLIC_ENABLE_LIPSYNC_MODELS=false
```

---

## Build Scripts

```json
// package.json

{
  "scripts": {
    "dev": "next dev",
    "build": "npm run parse-csv && next build",
    "start": "next start",
    "lint": "next lint",
    "parse-csv": "node scripts/parseCSV.js",
    "type-check": "tsc --noEmit",
    "format": "prettier --write ."
  }
}
```

---

## Accessibility Checklist

- [ ] Semantic HTML elements
- [ ] ARIA labels where needed
- [ ] Keyboard navigation support
- [ ] Focus indicators visible
- [ ] Color contrast ratios meet WCAG AA
- [ ] Alt text for all images
- [ ] Skip to content link
- [ ] Screen reader testing
- [ ] Form labels and error messages
- [ ] Responsive text sizing

---

## Security Considerations

- No user authentication (public site)
- No sensitive data storage
- Sanitize user search inputs
- CSP headers configured
- HTTPS enforced
- Rate limiting on API routes (if needed)

---

**End of Technical Architecture**
