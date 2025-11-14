# Claude Code Prompt - Bedroom Director Website

**Date:** November 4, 2025  
**Project:** Bedroom Director (bedroomdirector.com)  
**Goal:** Build the complete website using Next.js + Tailwind + Cloudflare Pages

---

## 🎯 Project Overview

Build a discovery and education platform for AI creative tools. The site helps "bedroom directors" (indie filmmakers, content creators) find the right AI tools for their projects.

**Brand:** Bedroom Director  
**Tagline:** "From bedroom to big screen"  
**Mission:** Democratizing filmmaking through AI

---

## 📚 IMPORTANT: Read These Files First

Before starting, please read and understand these key documents:

### **1. Brand Identity & Messaging:**
- `BRAND_IDENTITY.md` - Complete brand guidelines, voice, messaging
- `website/DESIGN_SPEC.md` - Design system, colors, typography, copy examples
- `LOGO_DESIGNER_BRIEF.md` - Logo specifications

### **2. Technical Architecture:**
- `website/TECHNICAL_ARCHITECTURE.md` - Full tech stack and architecture
- `website/ENHANCED_UX_VISION.md` - UX strategy and features
- `website/VISUAL_MOCKUPS.md` - UI mockups and layouts

### **3. Data & Content:**
- `data/ai_video_image_models.csv` - 156 AI tools (our core data)
- `research/CREATIVE_PARTNERS_INDEX.md` - Brand voice guidelines

---

## 🎨 Brand Guidelines (Critical!)

### **Visual Identity:**

**Colors:**
```css
/* Brand Colors */
--director-black: #0F172A;    /* Primary background */
--bedroom-purple: #8B5CF6;    /* Primary accent */
--screen-white: #F8FAFC;      /* Text on dark */
--spotlight-yellow: #FCD34D;  /* Highlights */
--action-red: #EF4444;        /* CTAs */

/* Category Colors */
--video: #8B5CF6;
--image: #3B82F6;
--voice: #10B981;
--music: #F59E0B;
--lip-sync: #EC4899;
--platforms: #6366F1;
```

**Typography:**
- Font: Inter (all weights)
- Headings: Bold (700)
- Body: Regular (400)

**Logo:**
- Wordmark only: "BEDROOM DIRECTOR"
- All caps, bold, minimal
- No icons or decorations

---

### **Brand Voice:**

**Hero Copy (Use This Exactly):**
```
BEDROOM DIRECTOR
From bedroom to big screen

Your bedroom is your studio.
Your laptop is your camera.
Your imagination is your budget.

[Discover Tools] [Join the Movement]
```

**About Section (Use This):**
```
Here's to the Bedroom Directors.

The ones who turn prompts into pictures.
The ones who light scenes with imagination, not spotlights.
The ones who know that great stories don't need permission.

They're not waiting for Hollywood.
They're building the next Hollywood.

Bedroom Director.
```

---

## 🚀 Tech Stack

### **Frontend:**
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide React icons

### **Deployment:**
- Cloudflare Pages (static export)
- Configure for static site generation

### **Database (Phase 2):**
- Supabase (PostgreSQL)
- For now: Use CSV data directly

---

## 📋 What to Build (Phase 1 - MVP)

### **1. Project Setup**
```bash
# Initialize Next.js in a subfolder
cd /Users/Arugami/Desktop/AI_Image_Video_App
npx create-next-app@latest bedroom-director-web \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd bedroom-director-web
```

### **2. Install Dependencies**
```bash
# shadcn/ui
npx shadcn-ui@latest init

# Add components we'll need
npx shadcn-ui@latest add button card input select tabs badge

# Other dependencies
npm install lucide-react papaparse
npm install -D @types/papaparse
```

### **3. Configure Tailwind with Brand Colors**

Update `tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'director-black': '#0F172A',
        'bedroom-purple': '#8B5CF6',
        'screen-white': '#F8FAFC',
        'spotlight-yellow': '#FCD34D',
        'action-red': '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
```

### **4. Build These Pages (Priority Order):**

#### **A. Homepage (`app/page.tsx`)**

**Layout:**
```
┌─────────────────────────────────────────┐
│  Header (Logo + Nav)                    │
├─────────────────────────────────────────┤
│  Hero Section                           │
│  - Logo wordmark                        │
│  - Tagline                              │
│  - W+K copy (bedroom/laptop/imagination)│
│  - Search bar                           │
│  - CTAs                                 │
├─────────────────────────────────────────┤
│  Stats Section                          │
│  - "156 AI Tools Cataloged"            │
│  - "Updated Daily"                      │
│  - "10,000+ Bedroom Directors"          │
├─────────────────────────────────────────┤
│  Featured Tools                         │
│  - 6-8 tool cards                       │
│  - Category badges                      │
├─────────────────────────────────────────┤
│  About Section                          │
│  - "Here's to the Bedroom Directors"    │
│  - Chiat/Day manifesto copy             │
├─────────────────────────────────────────┤
│  Footer                                 │
│  - Links, social, copyright             │
└─────────────────────────────────────────┘
```

**Design:**
- Dark background (`director-black`)
- White text (`screen-white`)
- Purple accents (`bedroom-purple`)
- Cinematic grain texture (subtle)
- Minimal, elegant, professional

#### **B. Tools Directory (`app/tools/page.tsx`)**

**Features:**
- Grid of tool cards
- Search bar
- Category filters (Video, Image, Voice, Music, Lip Sync, Platforms)
- Sort options (Newest, Popular, Name)
- Pagination or infinite scroll

**Tool Card:**
```
┌─────────────────────────┐
│  [Tool Logo/Icon]       │
│  Tool Name              │
│  Vendor                 │
│  Category Badge         │
│  Short description...   │
│  [View Details] →       │
└─────────────────────────┘
```

#### **C. Tool Detail Page (`app/tools/[slug]/page.tsx`)**

**Layout:**
```
┌─────────────────────────────────────────┐
│  Tool Name + Vendor                     │
│  Category Badge                         │
├─────────────────────────────────────────┤
│  Description                            │
│  Key Features (bullets)                 │
├─────────────────────────────────────────┤
│  Pricing                                │
│  Platform Availability                  │
│  Notable Sources                        │
├─────────────────────────────────────────┤
│  [Try Tool] [Learn More]               │
└─────────────────────────────────────────┘
```

#### **D. About Page (`app/about/page.tsx`)**

**Content:**
- "Here's to the Bedroom Directors" manifesto
- Mission statement
- How it works
- Contact info

---

## 🎨 Component Guidelines

### **Header Component:**
```tsx
// components/layout/Header.tsx
- Logo (wordmark): "BEDROOM DIRECTOR"
- Navigation: Tools, About, Blog (future)
- Search icon (opens search modal)
- Dark background, white text
- Sticky on scroll
```

### **Hero Component:**
```tsx
// components/home/Hero.tsx
- Full viewport height
- Centered content
- Logo wordmark (large)
- Tagline
- W+K copy (3 lines)
- Search bar (prominent)
- Two CTAs: "Discover Tools" (purple), "Join Movement" (red)
- Cinematic grain overlay (subtle)
```

### **Tool Card Component:**
```tsx
// components/tools/ToolCard.tsx
- Dark card background (#1E293B)
- Tool name (bold)
- Vendor (smaller, gray)
- Category badge (colored by category)
- Short description (2 lines max)
- Hover effect (lift + glow)
- Click → tool detail page
```

### **Search Bar Component:**
```tsx
// components/search/SearchBar.tsx
- Large input field
- Placeholder: "What do you want to create?"
- Search icon
- Autocomplete dropdown (future)
- Focus state: purple glow
```

---

## 📊 Data Integration

### **Parse CSV Data:**

```typescript
// lib/data/tools.ts
import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';

export interface Tool {
  id: string;
  name: string;
  vendor: string;
  category: string;
  description: string;
  pricing: string;
  platforms: string;
  sources: string;
  // ... other fields from CSV
}

export function getTools(): Tool[] {
  const csvPath = path.join(process.cwd(), '../data/ai_video_image_models.csv');
  const csvData = fs.readFileSync(csvPath, 'utf-8');
  
  const { data } = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
  });
  
  return data.map((row: any, index) => ({
    id: `tool-${index}`,
    name: row['Model Name'] || '',
    vendor: row['Vendor/Developer'] || '',
    category: row['Category'] || '',
    description: row['Description'] || '',
    pricing: row['Pricing Summary'] || '',
    platforms: row['Platform Availability'] || '',
    sources: row['Notable Sources'] || '',
    // Map other CSV columns
  }));
}
```

---

## 🎯 Key Features to Implement

### **Phase 1 (MVP - This Sprint):**
- [x] Project setup
- [ ] Homepage with hero
- [ ] Tools directory page
- [ ] Tool detail pages
- [ ] Basic search (client-side filter)
- [ ] Category filters
- [ ] About page
- [ ] Responsive design (mobile-first)

### **Phase 2 (Next Sprint):**
- [ ] Supabase integration
- [ ] Advanced search (Meilisearch)
- [ ] User accounts
- [ ] Favorites
- [ ] AI chatbot (Cloudflare Worker)

---

## 🎨 Design Principles

### **Visual Style:**
- **Dark mode first** (director-black background)
- **Minimal and clean** (like A24, Apple)
- **Cinematic feel** (grain texture, elegant typography)
- **Bold accents** (purple for primary, red for CTAs)
- **Professional, not playful**

### **Typography:**
- **Headings:** Large, bold, confident
- **Body:** Readable, clean, 16-18px
- **Spacing:** Generous whitespace
- **Hierarchy:** Clear visual hierarchy

### **Interactions:**
- **Smooth transitions** (200-300ms)
- **Hover states:** Lift + glow effect
- **Focus states:** Purple outline
- **Loading states:** Skeleton screens

---

## ✅ Checklist Before Starting

- [ ] Read `BRAND_IDENTITY.md`
- [ ] Read `website/DESIGN_SPEC.md`
- [ ] Understand brand colors and typography
- [ ] Review hero copy (use exact wording)
- [ ] Check CSV data structure
- [ ] Understand Next.js App Router
- [ ] Know Tailwind CSS utilities

---

## 🚀 Let's Build!

**Start with:**
1. Initialize Next.js project
2. Set up Tailwind with brand colors
3. Install shadcn/ui
4. Build Header component
5. Build Hero section
6. Parse CSV data
7. Build Tool Card component
8. Build Tools directory page

**Remember:**
- Use exact brand copy from DESIGN_SPEC.md
- Follow color palette strictly
- Keep it minimal and cinematic
- Mobile-first responsive design
- Dark mode by default

---

## 📝 Notes

- **Logo:** Just text "BEDROOM DIRECTOR" in bold Inter font
- **No placeholder text:** Use real copy from brand docs
- **No Lorem Ipsum:** All copy should be final brand copy
- **CSV location:** `../data/ai_video_image_models.csv` (relative to web folder)
- **Static export:** Configure Next.js for static site generation

---

## 🎬 Final Reminders

**Brand Voice:**
- Empowering, not intimidating
- Professional, not corporate
- Rebellious, not chaotic
- Cinematic, not techy

**Visual Style:**
- Dark, cinematic, minimal
- Like A24 meets Apple
- Professional but accessible

**Copy:**
- Use exact wording from DESIGN_SPEC.md
- Don't improvise brand messaging
- Follow W+K, Chiat/Day, Jobs principles

---

**Let's build Bedroom Director! 🎬✨**
