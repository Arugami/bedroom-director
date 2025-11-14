# Managing AI Creations Showcase

**Last Updated:** November 13, 2025  
**Purpose:** Guide for adding, editing, and managing AI creations in the showcase

---

## 📁 File Structure

```
bedroom-director-web/
├── src/
│   ├── data/
│   │   └── creations.json          ← Main data file
│   ├── lib/data/
│   │   └── creations.ts             ← Data loader utilities
│   ├── components/home/
│   │   └── TrendingCreations.tsx    ← Homepage component
│   └── app/
│       └── showcase/
│           ├── page.tsx              ← Showcase listing page
│           └── [slug]/
│               └── page.tsx          ← Individual creation pages
```

---

## ✅ Adding a New Creation

### Step 1: Add to `creations.json`

Open `/bedroom-director-web/src/data/creations.json` and add a new object to the `creations` array:

```json
{
  "id": "unique-id-here",
  "title": "Your Creation Title",
  "slug": "your-creation-slug",
  "creator": {
    "name": "Creator Name",
    "type": "brand|indie|artist|studio",
    "link": "https://creator-website.com",
    "bio": "Optional creator bio"
  },
  "category": "commercial|short-film|music-video|social-content|experimental",
  "thumbnail": "/creations/your-thumbnail.jpg",
  "videoUrl": "https://youtube.com/watch?v=...",
  "description": "Short description (1-2 sentences)",
  "longDescription": "Longer description for detail page (2-3 paragraphs)",
  "views": "1.2M",
  "likes": 25000,
  "publishedDate": "2025-11-13",
  "featured": true,
  "awards": [
    "Optional award 1",
    "Optional award 2"
  ],
  "tools": [
    {
      "name": "Tool Name",
      "category": "VIDEO_GEN|IMAGE_GEN|VOICE_AUDIO|MUSIC",
      "role": "What this tool was used for"
    }
  ],
  "breakdown": {
    "concept": "What was the creative concept?",
    "budget": "$500 (optional)",
    "timeline": "2 weeks (optional)",
    "process": [
      "Step 1 of the process",
      "Step 2 of the process",
      "Step 3 of the process"
    ],
    "challenges": [
      "Challenge 1",
      "Challenge 2"
    ],
    "results": [
      "Result 1",
      "Result 2"
    ]
  },
  "prompts": [
    {
      "tool": "Tool Name",
      "prompt": "The actual prompt used",
      "settings": "4K, 10 seconds, cinematic mode"
    }
  ],
  "tags": ["tag1", "tag2", "tag3"]
}
```

### Step 2: Add Thumbnail Image

1. Add your thumbnail image to `/bedroom-director-web/public/creations/`
2. Name it something descriptive: `your-creation-name.jpg`
3. Recommended size: 1920x1080 (16:9 aspect ratio)
4. Keep file size under 500KB for performance

### Step 3: Test Locally

```bash
cd bedroom-director-web
npm run dev
```

Visit:
- Homepage: http://localhost:3000 (should show in Trending if `featured: true`)
- Showcase: http://localhost:3000/showcase (should appear in grid)
- Detail page: http://localhost:3000/showcase/your-creation-slug

---

## 📝 Field Explanations

### Required Fields

- **id**: Unique identifier (use kebab-case: `coca-cola-real-magic-2025`)
- **title**: Display title of the creation
- **slug**: URL-friendly version (same as id usually)
- **creator.name**: Creator's name or company
- **creator.type**: One of: `brand`, `indie`, `artist`, `studio`
- **category**: One of: `commercial`, `short-film`, `music-video`, `social-content`, `experimental`
- **thumbnail**: Path to thumbnail image (starts with `/creations/`)
- **videoUrl**: Link to the actual video (YouTube, Vimeo, etc.)
- **description**: Short description for cards (1-2 sentences)
- **longDescription**: Full description for detail page
- **views**: View count as string (e.g., "1.2M", "890K")
- **likes**: Number of likes/engagements
- **publishedDate**: ISO date format (YYYY-MM-DD)
- **featured**: Boolean - show on homepage?
- **tools**: Array of tools used (at least 1)
- **breakdown**: Object with process details
- **tags**: Array of searchable tags

### Optional Fields

- **creator.link**: Link to creator's website/profile
- **creator.bio**: Short bio about the creator
- **awards**: Array of award names
- **breakdown.budget**: Budget information
- **breakdown.timeline**: How long it took
- **prompts**: Array of actual prompts used

---

## 🎯 Best Practices

### Writing Descriptions

**Short description (for cards):**
- 1-2 sentences max
- Focus on the hook
- Example: "Heartwarming holiday campaign showcasing AI-generated family moments"

**Long description (for detail pages):**
- 2-3 paragraphs
- Tell the story
- Include impact/results
- Example: "Coca-Cola's groundbreaking 2025 holiday campaign used AI to create deeply personal family moments. The campaign generated over 2.3M views and set a new standard for AI-generated advertising."

### Choosing Categories

- **commercial**: Brand campaigns, ads, sponsored content
- **short-film**: Narrative films, documentaries, storytelling
- **music-video**: Music videos, visual albums
- **social-content**: TikTok, Instagram, viral content
- **experimental**: Artistic, avant-garde, experimental work

### Featured vs Non-Featured

**Featured creations** (`featured: true`):
- Show on homepage (top 3)
- Should be high-quality, inspiring examples
- Rotate regularly to keep homepage fresh

**Non-featured creations**:
- Only appear on `/showcase` page
- Still fully functional with detail pages

### Tools Array

List tools in order of importance:
1. Primary tool (main generation)
2. Secondary tools (refinement, effects)
3. Supporting tools (audio, music, etc.)

Include the **role** each tool played:
- "Primary video generation"
- "Post-processing and refinement"
- "Voiceover and narration"

---

## 🔄 Updating Existing Creations

1. Find the creation in `creations.json` by `id`
2. Edit the fields you want to change
3. Save the file
4. Restart dev server (`npm run dev`)
5. Changes appear immediately

---

## 🗑️ Removing Creations

1. Find the creation object in `creations.json`
2. Delete the entire object (including commas)
3. Make sure JSON is still valid (no trailing commas)
4. Save and restart dev server

---

## 📊 Adding New Categories

To add a new category:

1. Add to the `categories` array in `creations.json`:

```json
{
  "id": "new-category",
  "name": "New Category",
  "description": "Description of this category"
}
```

2. Update creations to use the new category ID

---

## 🚀 Deployment

After adding/editing creations:

```bash
# Build for production
npm run build

# Deploy (if using Wrangler CLI)
npx wrangler pages deploy out --project-name=bedroom-director
```

Or push to GitHub and Cloudflare Pages will auto-deploy.

---

## 💡 Tips

### Finding Good Examples

Look for:
- High view counts (viral potential)
- Professional quality
- Clear tool usage
- Interesting process/story
- Educational value

### Getting Creator Permission

Always:
- Ask permission to feature their work
- Credit them properly
- Link to their profiles
- Share the showcase page with them

### Keeping Data Fresh

- Update view counts monthly
- Add new creations weekly
- Rotate featured creations
- Remove outdated content

---

## 🐛 Troubleshooting

**Creation not showing up:**
- Check JSON syntax (use a JSON validator)
- Verify `featured` is `true` for homepage
- Check category spelling matches exactly
- Restart dev server

**Thumbnail not loading:**
- Verify file exists in `/public/creations/`
- Check path starts with `/creations/` (not `./` or `../`)
- Ensure file extension matches (`.jpg`, `.png`)

**Detail page 404:**
- Verify `slug` matches URL
- Check for typos in slug
- Ensure slug is unique

---

## 📞 Need Help?

If you encounter issues:
1. Check this documentation
2. Validate JSON at jsonlint.com
3. Check browser console for errors
4. Review similar working examples in `creations.json`

---

**Happy showcasing! 🎬✨**
