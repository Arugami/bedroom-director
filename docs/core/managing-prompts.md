# Managing Prompt Library

**Last Updated:** November 13, 2025  
**Purpose:** Guide for adding, editing, and managing prompts in the Prompt Library

---

## 📁 File Structure

```
bedroom-director-web/
├── src/
│   ├── data/
│   │   └── prompts.json              ← Main prompts data file
│   ├── lib/data/
│   │   └── prompts.ts                ← Data loader utilities
│   ├── components/prompts/
│   │   └── PromptCard.tsx            ← Prompt card component
│   └── app/
│       └── prompts/
│           ├── page.tsx               ← Prompts library listing
│           └── [slug]/
│               └── page.tsx           ← Individual prompt pages
```

---

## ✅ Adding a New Prompt

### Step 1: Add to `prompts.json`

Open `/bedroom-director-web/src/data/prompts.json` and add a new object to the `prompts` array:

```json
{
  "id": "prompt-016",
  "title": "Your Prompt Title",
  "slug": "your-prompt-slug",
  "prompt_text": "The actual prompt text that was used...",
  "result_image": "/prompts/your-result.jpg",
  "result_video": "/prompts/your-result.mp4",
  "result_audio": "/prompts/your-result.mp3",
  "category": "video|image|voice|music",
  "tool_used": "Tool Name",
  "tool_slug": "tool-slug",
  "style_tags": ["Cinematic", "Photorealistic"],
  "outcome_type": "commercial|social|experimental",
  "settings": "4K, 10 seconds, cinematic mode",
  "author": {
    "name": "Author Name",
    "username": "username",
    "avatar": "/avatars/author.jpg"
  },
  "likes": 0,
  "views": 0,
  "date_added": "2025-11-13",
  "featured": false,
  "tips": "Optional pro tips for using this prompt..."
}
```

### Step 2: Add Result Media (Optional)

1. Add your result image/video/audio to `/bedroom-director-web/public/prompts/`
2. Name it descriptively: `your-prompt-name.jpg`
3. Recommended sizes:
   - Images: 1920x1080 (16:9 aspect ratio)
   - Videos: Keep under 10MB
   - Audio: MP3 format, under 5MB

### Step 3: Test Locally

```bash
cd bedroom-director-web
npm run dev
```

Visit:
- Library: http://localhost:3000/prompts
- Detail page: http://localhost:3000/prompts/your-prompt-slug

---

## 📝 Field Explanations

### Required Fields

- **id**: Unique identifier (e.g., `prompt-016`)
- **title**: Display title of the prompt
- **slug**: URL-friendly version (kebab-case)
- **prompt_text**: The actual prompt that was used
- **category**: One of: `video`, `image`, `voice`, `music`
- **tool_used**: Name of the AI tool
- **tool_slug**: Slug matching the tool in your tools database
- **style_tags**: Array of style descriptors (see list below)
- **outcome_type**: One of: `commercial`, `social`, `experimental`
- **settings**: Settings used (resolution, duration, mode, etc.)
- **author**: Object with name, username, avatar
- **likes**: Number of likes (start at 0)
- **views**: Number of views (start at 0)
- **date_added**: ISO date format (YYYY-MM-DD)
- **featured**: Boolean - show in featured section?

### Optional Fields

- **result_image**: Path to result image
- **result_video**: Path to result video
- **result_audio**: Path to result audio
- **tips**: Pro tips for using this prompt

---

## 🎨 Available Style Tags

Choose from these predefined styles (or add new ones to the `styles` array):

- **Cinematic** - Movie-like, dramatic lighting
- **Photorealistic** - Looks like a real photograph
- **Animated** - Cartoon or animation style
- **Abstract** - Non-representational, artistic
- **Vintage** - Retro, nostalgic feel
- **Futuristic** - Sci-fi, modern tech aesthetic
- **Minimalist** - Clean, simple, less is more
- **Dramatic** - High contrast, intense mood
- **Ethereal** - Dreamy, otherworldly
- **Gritty** - Raw, textured, urban

---

## 🎯 Best Practices

### Writing Prompt Text

**Good prompts are:**
- Specific and detailed
- Include lighting descriptions
- Mention camera angles/movements (for video)
- Specify mood and atmosphere
- Reference styles or aesthetics
- Include technical details (resolution, duration)

**Example:**
```
"Aerial drone shot rising up a snow-covered mountain peak, 
revealing vast mountain range in background, golden hour lighting, 
dramatic clouds, cinematic camera movement, epic landscape"
```

### Choosing Categories

- **video**: AI-generated video content
- **image**: AI-generated still images
- **voice**: Voice synthesis, narration, dialogue
- **music**: AI-generated music and soundtracks

### Outcome Types

- **commercial**: Brand work, ads, product videos
- **social**: Social media content, viral videos
- **experimental**: Artistic, avant-garde, testing

### Featured vs Non-Featured

**Featured prompts** (`featured: true`):
- Show prominently on homepage
- Should be high-quality, inspiring examples
- Rotate regularly to keep content fresh

**Non-featured prompts**:
- Still fully searchable and accessible
- Great for building library depth

---

## 🔄 Updating Existing Prompts

1. Find the prompt in `prompts.json` by `id`
2. Edit the fields you want to change
3. Save the file
4. Restart dev server (`npm run dev`)
5. Changes appear immediately

---

## 🗑️ Removing Prompts

1. Find the prompt object in `prompts.json`
2. Delete the entire object (including commas)
3. Make sure JSON is still valid (no trailing commas)
4. Update `metadata.total_prompts` count
5. Save and restart dev server

---

## 🔍 Adding New Styles

To add a new style tag:

1. Add to the `styles` array in `prompts.json`:

```json
"styles": [
  "Cinematic",
  "Photorealistic",
  "Your New Style"
]
```

2. Use it in prompt `style_tags` arrays

---

## 💡 Pro Tips for Curating Prompts

### Finding Good Prompts

Look for prompts that:
- Produce consistently good results
- Are educational (teach techniques)
- Show creative use of tools
- Demonstrate specific styles
- Solve common problems

### Getting Permission

Always:
- Ask permission to feature prompts
- Credit creators properly
- Link to their profiles
- Share the prompt page with them

### Keeping Data Fresh

- Add new prompts weekly
- Update view/like counts monthly
- Rotate featured prompts
- Remove outdated or broken prompts

---

## 🚀 Deployment

After adding/editing prompts:

```bash
# Build for production
npm run build

# Deploy (if using Wrangler CLI)
npx wrangler pages deploy out --project-name=bedroom-director
```

Or push to GitHub and Cloudflare Pages will auto-deploy.

---

## 🐛 Troubleshooting

**Prompt not showing up:**
- Check JSON syntax (use jsonlint.com)
- Verify category spelling matches exactly
- Check slug is unique
- Restart dev server

**Result media not loading:**
- Verify file exists in `/public/prompts/`
- Check path starts with `/prompts/` (not `./` or `../`)
- Ensure file extension matches (`.jpg`, `.mp4`, `.mp3`)

**Detail page 404:**
- Verify `slug` matches URL
- Check for typos in slug
- Ensure slug is unique

---

## 📊 Prompt Submission Guidelines

When accepting user-submitted prompts:

### Quality Standards

- ✅ Prompt must be clear and reproducible
- ✅ Result must be high quality
- ✅ Settings must be documented
- ✅ Tool must be in our database
- ❌ No offensive or inappropriate content
- ❌ No copyrighted material without permission

### Moderation Checklist

- [ ] Prompt text is clear and detailed
- [ ] Result matches the prompt
- [ ] Tool and settings are accurate
- [ ] Author information is complete
- [ ] Style tags are appropriate
- [ ] No inappropriate content
- [ ] Media files are optimized

---

## 📞 Need Help?

If you encounter issues:
1. Check this documentation
2. Validate JSON at jsonlint.com
3. Check browser console for errors
4. Review similar working examples in `prompts.json`

---

**Happy prompting! ✨🎬**
