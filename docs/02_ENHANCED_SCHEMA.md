# Enhanced CSV Schema Documentation
**Version: 2.0**
**Date: November 3, 2025**

---

## New Column Structure

### **Added Columns (7 new)**

1. **Primary_Category** (NEW)
   - Purpose: Main classification for filtering
   - Values:
     - `IMAGE_GENERATION`
     - `VIDEO_GENERATION`
     - `VOICE_AUDIO`
     - `MUSIC_GENERATION`
     - `AVATAR_PLATFORM`
     - `LIP_SYNC_TOOL`
     - `PLATFORM_AGGREGATOR`
     - `API_INFRASTRUCTURE`

2. **Capabilities** (NEW)
   - Purpose: Pipe-separated tags for multi-capability filtering
   - Format: `capability1|capability2|capability3`
   - Common Values:
     - `text_to_video` - Generates video from text
     - `image_to_video` - Animates images
     - `native_audio` - Generates audio with video
     - `dialogue_generation` - Creates speaking characters natively
     - `post_lipsync` - Adds lip sync to existing video
     - `avatar_lipsync` - Specialized avatar talking heads
     - `voice_cloning` - Clones user's voice
     - `physics_simulation` - Realistic physics
     - `camera_control` - Precise camera movement
     - `keyframes` - Timeline-based editing
     - `motion_brush` - Selective animation
     - `cameo_feature` - Personal avatar insertion
     - `multilingual` - Multiple language support
     - `enterprise_api` - API access for developers
     - `opensource` - Open-source/open-weights
     - `real_time` - Real-time generation

3. **Best_For** (NEW)
   - Purpose: Primary use case recommendation
   - Values (examples):
     - `Cinematic storytelling with dialogue`
     - `Professional presenter videos`
     - `Dubbing existing videos`
     - `Social media content`
     - `Enterprise training`
     - `Creative music videos`
     - `Technical users / custom workflows`
     - `Photorealistic images`
     - `Anime/manga art`

4. **Skill_Level** (NEW)
   - Purpose: Technical expertise required
   - Values:
     - `Beginner` - No technical skills needed
     - `Intermediate` - Some prompt engineering/creative skills
     - `Advanced` - Understanding of video production concepts
     - `Developer` - API integration, coding required

5. **Platform_Access** (NEW) ⭐ CRITICAL
   - Purpose: How users can access the model
   - Values:
     - `official_platform` - Has dedicated consumer platform
     - `third_party_only` - Only via aggregators (Pollo.ai, fal.ai, etc.)
     - `api_only` - Developers only, no consumer UI
     - `multiple_options` - Official + third-party available
     - `open_source` - Self-host or community platforms

6. **Official_Platform_URL** (NEW) ⭐ CRITICAL
   - Purpose: Direct link to official platform (if exists)
   - Format: Full URL
   - Examples:
     - `app.hailuo.ai`
     - `app.klingai.com`
     - `runwayml.com`
     - `midjourney.com`
     - (empty if no official platform)

7. **Third_Party_Platforms** (NEW)
   - Purpose: Alternative access points
   - Format: Pipe-separated list
   - Examples:
     - `pollo.ai|fal.ai|replicate`
     - `google_ai_studio|vertex_ai|fal.ai`
     - (empty if not available on third-party)

8. **API_Available** (NEW)
   - Purpose: Developer API access
   - Values:
     - `yes` - API currently available
     - `no` - No API
     - `coming_soon` - Announced but not released
     - `enterprise_only` - Requires enterprise agreement

### **Existing Columns (Retained)**

5. Vendor
6. Model
7. Modality
8. Key Features
9. Duration/Resolution
10. Controls
11. Speed
12. Pricing
13. License
14. Update Cadence
15. Distinctive Edge
16. Drawbacks
17. Notable Sources

---

## Capability Tag Reference

### **Video Generation Capabilities**

| Tag | Meaning | Models |
|-----|---------|--------|
| `text_to_video` | Generate video from text prompts | Sora, Veo, Runway, Pika, Kling, Luma |
| `image_to_video` | Animate still images | Most video models |
| `native_audio` | Generates synchronized audio | Sora 2, Veo 3/3.1 |
| `dialogue_generation` | Creates speaking characters from text | Sora 2, Veo 3/3.1 |
| `post_lipsync` | Adds lip sync to existing footage | Kling, Runway, Pika, Wav2Lip |
| `avatar_lipsync` | Specialized talking head avatars | HeyGen, Synthesia, D-ID |
| `physics_simulation` | Realistic physics modeling | Sora 2, Veo 3 |
| `camera_control` | Precise camera movement controls | Runway Gen-4, Veo 3.1 |
| `keyframes` | Timeline-based editing | Runway, Adobe Firefly |
| `motion_brush` | Paint motion onto specific areas | Kling, Runway Gen-2 |
| `cameo_feature` | Insert personal avatar | Sora 2 |

### **Audio/Voice Capabilities**

| Tag | Meaning | Models |
|-----|---------|--------|
| `voice_cloning` | Clone user's voice | ElevenLabs, PlayHT, Murf.ai, HeyGen |
| `text_to_speech` | Convert text to speech | All voice platforms |
| `multilingual` | Multiple language support | ElevenLabs, Azure, Google Cloud |
| `emotional_control` | Adjust tone/emotion | ElevenLabs, Hume |
| `real_time` | Real-time voice generation | Hume, Altered |

### **Music Capabilities**

| Tag | Meaning | Models |
|-----|---------|--------|
| `text_to_music` | Generate music from text | Suno, Udio, Stable Audio |
| `audio_to_music` | Transform audio to music | AIVA, Mureka |
| `stem_separation` | Separate instruments | Suno, Udio, Moises |
| `custom_training` | Train on user's music | Mureka |

### **Platform Capabilities**

| Tag | Meaning | Models |
|-----|---------|--------|
| `model_aggregator` | Hosts multiple models | Freepik, OpenArt, NightCafe |
| `enterprise_api` | Developer API access | Azure, Google Cloud, Replicate |
| `opensource` | Open-source/open-weights | SDXL, Flux, Wav2Lip, ComfyUI |
| `workflow_builder` | Node-based workflows | ComfyUI, Glif |

---

## Use Case to Capability Mapping

### **"I want to create a video with someone talking"**
**Required Capabilities:** `dialogue_generation` OR `avatar_lipsync`
**Recommended Models:**
- Sora 2 (if cinematic scene needed)
- Veo 3 (if realistic conversation needed)
- HeyGen (if professional presenter needed)
- Synthesia (if enterprise training needed)

### **"I have a video and need to change the dialogue"**
**Required Capabilities:** `post_lipsync`
**Recommended Models:**
- Kling (professional quality)
- Runway (creative control)
- Pika (social media)
- Wav2Lip (technical/open-source)

### **"I need to translate my video to another language"**
**Required Capabilities:** `post_lipsync` + `multilingual`
**Recommended Models:**
- Kling + ElevenLabs
- HeyGen (if avatar acceptable)
- Vozo.ai (specialized for translation)

### **"I want to animate a photo of someone"**
**Required Capabilities:** `image_to_video` + (`post_lipsync` OR `avatar_lipsync`)
**Recommended Models:**
- SadTalker (expressive animation)
- D-ID (quick photo-to-video)
- HeyGen (if avatar style acceptable)

### **"I need a presenter for training videos"**
**Required Capabilities:** `avatar_lipsync` + `multilingual`
**Recommended Models:**
- HeyGen (best quality)
- Synthesia (enterprise features)
- D-ID (API integration)

---

## Skill Level Guidelines

### **Beginner**
- Web-based interface
- No technical setup required
- Preset options/templates
- Instant preview
- Examples: Sora 2 Standard, HeyGen, Synthesia, Midjourney

### **Intermediate**
- Prompt engineering helpful
- Understanding of creative concepts
- Some parameter tuning
- Examples: Sora 2 Pro, Veo 3, Runway, Kling, ElevenLabs

### **Advanced**
- Video production knowledge
- Complex parameter control
- Post-processing skills
- Examples: Runway Gen-4 (with keyframes), ComfyUI workflows, Pika advanced features

### **Developer**
- API integration required
- Code/scripting needed
- Infrastructure setup
- Examples: Azure AI, Google Cloud, Replicate, Wav2Lip, fal.ai

---

## Implementation Notes

### **For Website Filtering:**

1. **Multi-select filters:**
   - Allow users to select multiple capabilities
   - Use AND/OR logic: "Show models with dialogue_generation OR post_lipsync"

2. **Smart recommendations:**
   - Based on user's selected use case, highlight relevant capabilities
   - Example: User selects "Dub video" → auto-filter to `post_lipsync` models

3. **Skill level badges:**
   - Visual indicators (🟢 Beginner, 🟡 Intermediate, 🟠 Advanced, 🔴 Developer)
   - Filter by skill level to avoid overwhelming beginners

4. **"Best For" tags:**
   - Prominent display of primary use case
   - Quick-match users to right tool

### **For Search:**

Allow natural language queries that map to capabilities:
- "lip sync" → filter to `dialogue_generation|post_lipsync|avatar_lipsync`
- "translate video" → filter to `post_lipsync` + `multilingual`
- "talking avatar" → filter to `avatar_lipsync`
- "cinematic video" → filter to `text_to_video` + `physics_simulation` + `camera_control`

---

## Migration Strategy

1. **Phase 1:** Add new columns to existing CSV
2. **Phase 2:** Populate capability tags for all models
3. **Phase 3:** Add Best_For and Skill_Level
4. **Phase 4:** Update website to use new schema
5. **Phase 5:** Implement smart filtering and recommendations

---

**This schema enables:**
✅ Accurate model discovery based on user intent
✅ Multi-dimensional filtering
✅ Skill-appropriate recommendations
✅ Clear differentiation between similar-sounding capabilities
✅ Future-proof extensibility (add new capabilities as models evolve)
