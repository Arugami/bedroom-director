# AI Model Database - Category Organization

**Total Entries: 152 models and platforms**
**Last Updated: November 4, 2025 (4:25pm - Added 2 VOICE_AUDIO models from Executive Summary review: Resemble.ai, Coqui TTS/XTTS)**

---

## 📊 Database Structure

Your CSV now has **19 columns** (13 original + 6 new metadata):

### New Metadata Columns (for filtering & organization):
1. **Vendor**
2. **Primary_Category** 🆕 - Main category (IMAGE_GEN, VIDEO_GEN, etc.)
3. **Model_Type** 🆕 - Native Model, Open-Source, Platform Aggregator, etc.
4. **License_Type** 🆕 - Proprietary, Open-Source, Research-Only, Mixed
5. **Special_Flags** 🆕 - DISCONTINUED, LAWSUIT, RESTRICTED, BETA, NSFW, REGIONAL
6. **Skill_Level** 🆕 - Beginner, Intermediate, Advanced, Developer, Enterprise
7. **Best_For** 🆕 - Production, Social Media, Marketing, Hobbyists, etc.

### Original Data Columns:
8. Model
9. Modality
10. Key Features
11. Duration/Resolution
12. Controls
13. Speed
14. Pricing
15. License
16. Update Cadence
17. Distinctive Edge
18. Drawbacks
19. Notable Sources

---

## 🗂️ Content by Category

**CSV Organization:** Database is now organized by Primary_Category (lines 2-38: IMAGE_GEN, 39-112: VIDEO_GEN, 113-121: VOICE_AUDIO, 122-127: MUSIC, 128-132: LIP_SYNC, 133-146: PLATFORM_AGGREGATOR, 147-148: POST_PROCESSING, 149-154: API_INFRASTRUCTURE)

---

### **CATEGORY 1: IMAGE GENERATION (37 entries) - Lines 2-38**

#### **Commercial/Proprietary Models:**
- OpenAI: DALL-E 2, DALL-E 3, gpt-image-1 (latest flagship API model) 🆕, GPT-4o Image Generation
- Microsoft: MAI-Image-1
- Google: Imagen 3 / Nano Banana
- Amazon: Titan Image Generator V2
- Adobe: Firefly Image Model 3, Firefly Image Model 5
- Midjourney: v5, v6, v7, Niji v6
- Ideogram: v2, v3.0
- Recraft AI
- Leonardo.ai: Phoenix, Kino XL, Vision XL

#### **Open-Source Models:**
- Stability AI: SD 3.5 Large, SD 3.5 Large Turbo, SD 3.5 Medium, SDXL
- Stability AI: SD 3 Medium
- Black Forest Labs: FLUX 1.0 (Dev & Schnell), FLUX 1.1 Pro, FLUX 1.1 Ultra
- Playground AI: Playground v2.5
- Tencent: Hunyuan Image 3.0 (80B params - largest open-source) 🆕

#### **Platform Aggregators (Image-focused):**
- ByteDance: Seedream 4.0
- Reve V1

---

### **CATEGORY 2: VIDEO GENERATION (73 entries) - Lines 39-112**

#### **Text-to-Video Leaders:**
- OpenAI: Sora v1, Sora 2 (Standard & Pro)
- Microsoft/OpenAI: Sora (Azure AI Foundry)
- Google: Veo 2, Veo 3 (Audio & Fast variants), Veo 3.1 (Audio & Fast variants)
- Runway: Gen-2, Gen-3 (Alpha & Turbo), Gen-4, Gen-4 Turbo
  - 🆕 **Cross-Platform:** Gen-4 available on Freepik Spaces, Figma Weave; Gen-3 available on Flora AI
- Pika Lab: Pika 1.0, Pika 1.5, Pika 2.1, Pika 2.2
- Luma: Dream Machine, Ray 2, Ray 3 (reasoning video model) 🆕
- Kuaishou: Kling 2.1 (Master & Standard), Kling 2.5 Turbo (Pro & Standard) 🆕
  - 🆕 **Cross-Platform:** Available on Higgsfield (Kling Lipsync & Kling Speak features)
- ByteDance: Seedance v1 (Pro & Lite), Jimeng AI 🆕
- Adobe: Firefly Video (Beta)
- Alibaba: Wan 2.1, Wan 2.2, Wan 2.2 Animate 14B, Wan 2.5
- MiniMax: Hailuo 02 (Standard, Pro, Fast), Hailuo 2.3/2.3 Fast
- Shengshu AI: Vidu Q2 "Reference-to-Video" (up to 7 reference images, multi-entity consistency, improved emotions) 🆕
- Higgsfield: DoP I2V-01

#### **Creative/Music Video Platforms:**
- Kaiber AI
- Midjourney: Video V1 🆕
- Haiper AI ⚠️ DISCONTINUED (Feb 2025)
- Morph Studio

#### **AI Avatar/Presenter Platforms:**
- Synthesia AI Avatars
- HeyGen AI Avatars
- D-ID Creative Reality

#### **Research/Open-Source Video:**
- Stability AI: Stable Video Diffusion (14 & 25 frames), Stable Video 4D (SV4D 2.0) 🆕
- NVIDIA: Cosmos (World Foundation Models for Physical AI) 🆕
- HPC-AI Tech: Open-Sora 2.0
- Tencent: HunyuanVideo
- Genmo: Mochi 1
- Tsinghua Univ: CogVideo-X
- Various: VideoCrafter 2
- Meta: Emu Video
- Lightricks: LTX-2 (open-source DiT model)

#### **Experimental/Other:**
- xAI (Elon Musk): Grok "Imagine"
- Meta: Emu Edit (image editing)
- Microsoft: VASA-1 (talking heads)
- LetzAI: V4 Video (Early Access)
- Adobe: Firefly Video (Beta)

---

### **CATEGORY 3: VOICE/AUDIO (9 entries) - Lines 113-121**

#### **Text-to-Speech/Voice Cloning:**
- ElevenLabs Voice Generation
- PlayHT Voice Generation
- Murf.ai AI Studio
- Azure AI: Azure Speech (Neural TTS)
- Google Cloud: Cloud Text-to-Speech
- MiniMax: Speech 2.6 (ultra-low latency <250ms)
- Cartesia: Sonic-3 (90ms latency, 4x faster)
- **Resemble.ai Voice Platform** (real-time Speech-to-Speech conversion) 🆕
- **Coqui TTS / XTTS** (open-source, cross-lingual cloning) 🆕

#### **Enterprise TTS:**
- Azure AI: Azure Speech (Neural TTS)
- Google Cloud: Cloud Text-to-Speech

---

### **CATEGORY 4: MUSIC GENERATION (6 entries) - Lines 122-127**

#### **AI Music Platforms:**
- Suno: v3, v4, v5
- Udio Music Generation ⚠️ **(download restrictions after lawsuit)**
- Stability AI: Stable Audio 2.0
- MiniMax: Music 2.0 (5-minute complete songs with vocals + instruments) 🆕

---

### **CATEGORY 5: LIP SYNC & TALKING VIDEOS (5 entries) - Lines 128-132**

#### **Native Dialogue Generation (Generate from scratch):**
- OpenAI: Sora 2 (Standard & Pro) - Cinematic scenes with native dialogue
- Google: Veo 3, Veo 3.1 (all variants) - Realistic conversations with frame-perfect lip sync

#### **Post-Production Lip Sync (Dub existing video):**
- Kuaishou: Kling 2.1, Kling 2.5 - Professional dubbing with mouth tracking
  - Also available on Higgsfield platform (Kling Lipsync & Kling Speak specialized features)
- Runway: Gen-2, Gen-3, Gen-4 - Creative lip sync with timeline editor
- Pika Lab: Pika 1.0+ - Social media dubbing with ElevenLabs integration
- Meta: Wav2Lip - Open-source research-grade (technical users)

#### **Avatar/Presenter Platforms (Professional talking heads):**
- HeyGen AI Avatars - Superior lip sync quality, best for presenters
- Synthesia AI Avatars - Enterprise-grade, 230+ avatars, 140+ languages
- D-ID Creative Reality - API-first, best lip sync accuracy

#### **Photo Animation (Still to video with speech):**
- SadTalker - Expressive facial animation with head movements (open-source)
- D-ID - Quick photo-to-talking-head conversion

---

### **CATEGORY 6: PLATFORM AGGREGATORS (14 entries) - Lines 133-146**

#### **Collaborative AI Workspaces (NEW - Multi-Model Creative Canvases):**
- **Adobe Firefly Boards** (10+ models, Sept 2024) 🆕
  - Models: Firefly Image 4/5, Firefly Video, Runway Aleph, Moonvalley Marey, Google Veo 3 & Gemini 2.5, Luma Ray2/Ray3, Pika 2.2, FLUX 1.1 Kontext
  - Adobe ecosystem integration (Photoshop, Express)

- **Freepik Spaces** (Node-based workflows, Nov 4 2025, free tier) 🆕
  - Models: Runway Gen-4, Google Veo 3, Kling 2.1, MiniMax Hailuo 02, Magnific upscaler
  - 600K+ teams using platform (Google, Ogilvy, Coca-Cola)

- **Figma Weave** (formerly Weavy, design-focused, acquired Oct 2025) 🆕
  - Models: Runway Gen-4 & Gen-4 Turbo, Luma Ray2, Google Veo 3, FLUX.1 Kontext, Imagen 4, Hunyuan T1, Bria.ai, Seedance
  - Figma design integration

- **Flora AI** (infinite canvas, 50+ models, indie startup) 🆕
  - Models: Runway 3 (Gen-3), Luma, Pika 2.0, Kling, Veo 2/3, Flux, Minimax Hailuo, Hunyuan, Mochi, and 40+ more
  - Multi-modal focus: text, image, video generation

#### **Multi-Model Creative Platforms:**
- Freepik AI Suite (Mystic, Magnific, Pikaso) - Native + Aggregator
- OpenArt Creative Platform - Native + Aggregator
- ImagineArt Creative Suite - Native + Aggregator
- NightCafe Studio - Pure Aggregator
- Artbreeder - Native + Collaborative
- Pollo.ai - Video Aggregator
- BasedLabs.ai - Free Aggregator (20+ models)
- Glif.app - Workflow Remix Platform
- LetzAI V4 - Image + Video Suite

---

### **CATEGORY 7: POST-PROCESSING / ENHANCEMENT (2 entries) - Lines 147-148** 🆕

#### **Image Upscalers:**
- Clarity AI: Crystal Upscaler (#1 AI upscaler, 22M+ upscales, 64px → 13,000px, controllable detail, open-source) 🆕

#### **Video Upscalers:**
- Runway: Upscaler v1 (4K video upscaling, 4x resolution, temporal consistency, industry-standard) 🆕

---

### **CATEGORY 8: API/INFRASTRUCTURE PLATFORMS (6 entries) - Lines 149-154**

#### **Developer/API Platforms:**
- fal.ai API Platform - Optimized inference (4x faster)
- Replicate API Platform - Pay-per-second GPU hosting
- Hugging Face Hub - Model repository + inference
- CivitAI Model Hub - SD/Flux community hub
- Tensor.art Platform - Asian-focused generation + repository
- ComfyUI - Workflow builder (local/self-hosted)

---

## 🔗 Cross-Platform Model Access Matrix

**Quick Reference: Where to Access Popular AI Models**

### **Runway Model Family:**
| Platform | Gen-2 | Gen-3 Alpha | Gen-4 | Gen-4 Turbo | Aleph | Access Type |
|----------|-------|-------------|-------|-------------|-------|-------------|
| **RunwayML** (Official) | ✅ | ✅ | ✅ | ✅ | ✅ | Subscription + Credits |
| **Replicate** (API) | ✅ | - | - | ✅ | - | Pay-per-second API |
| **Freepik Spaces** | - | - | ✅ | - | - | Free tier + Paid credits |
| **Figma Weave** | - | - | ✅ | ✅ | - | Figma subscription (TBA) |
| **Flora AI** | - | ✅ | - | - | - | Team workspace pricing |
| **Adobe Firefly Boards** | - | - | - | - | ✅ | Adobe subscription |

### **Kling Model Family:**
| Platform | 2.1 Master | 2.1 Standard | 2.5 Pro | 2.5 Standard | Lipsync Feature |
|----------|------------|--------------|---------|--------------|-----------------|
| **Kling** (Official) | ✅ | ✅ | ✅ | ✅ | ✅ Standard |
| **fal.ai** (API) | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Replicate** (API) | ✅ | ✅ | - | - | ❌ |
| **Higgsfield** | ✅ | ✅ | ✅ | ✅ | ✅ **Specialized** |
| **Pollo.ai** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Flora AI** | ✅ | ✅ | - | - | ❌ |

### **Google Veo Model Family:**
| Platform | Veo 2 | Veo 3 | Veo 3.1 | Veo 3 Audio | Access |
|----------|-------|-------|---------|-------------|--------|
| **Google AI Studio** (Official) | ✅ | ✅ | ✅ | ✅ | Limited beta/invite |
| **fal.ai** (API) | - | ✅ | ✅ | - | Pay-per-second API |
| **Replicate** (API) | ✅ | ✅ | ✅ | ✅ | Pay-per-second API |
| **Freepik Spaces** | - | ✅ | - | - | Paid credits |
| **Figma Weave** | - | ✅ | - | - | Figma subscription |
| **Flora AI** | ✅ | ✅ | - | - | Team workspace |
| **Adobe Firefly Boards** | - | ✅ | - | - | Adobe subscription |

### **Luma Ray Model Family:**
| Platform | Dream Machine | Ray 2 | Ray 3 | Access Type |
|----------|---------------|-------|-------|-------------|
| **Luma AI** (Official) | ✅ | ✅ | ✅ | Free tier + Paid |
| **Replicate** (API) | - | ✅ | - | Pay-per-second API |
| **Figma Weave** | - | ✅ | - | Figma subscription |
| **Adobe Firefly Boards** | - | ✅ | ✅ | Adobe subscription |

### **OpenAI Sora Model Family:**
| Platform | Sora 2 Pro | Sora 2 Standard | Access Type |
|----------|------------|-----------------|-------------|
| **ChatGPT** (Official) | ✅ | ✅ | $20/mo ChatGPT Pro |
| **fal.ai** (API) | ✅ | ✅ | Pay-per-second API |
| **Flora AI** | - | ✅ | Team workspace pricing |

### **MiniMax Wan Model Family:**
| Platform | Wan 2.1 | Wan 2.2 | Wan 2.5 | Access Type |
|----------|---------|---------|---------|-------------|
| **MiniMax** (Official) | ✅ | ✅ | ✅ | Free tier + Paid |
| **fal.ai** (API) | - | ✅ | ✅ | Pay-per-second API |
| **Replicate** (API) | ✅ | ✅ | - | Pay-per-second API |

### **MiniMax Hailuo Model Family:**
| Platform | Hailuo 02 | Hailuo 02 Fast | Hailuo 02 Pro | Access Type |
|----------|-----------|----------------|---------------|-------------|
| **MiniMax** (Official) | ✅ | ✅ | ✅ | Free tier + Paid |
| **fal.ai** (API) | ✅ | ✅ | ✅ | Pay-per-second API |
| **Replicate** (API) | ✅ | ✅ | - | Pay-per-second API |
| **Freepik Spaces** | ✅ | - | - | Free tier + Paid credits |

### **FLUX Image Model Family:**
| Platform | FLUX 1.1 Pro | FLUX 1.1 Ultra | FLUX 1.1 Kontext | FLUX Dev/Schnell | Access Type |
|----------|--------------|----------------|------------------|------------------|-------------|
| **Black Forest Labs** (Official) | ✅ | ✅ | ✅ | ✅ | API access |
| **fal.ai** (API) | ✅ | ✅ | ✅ | ✅ | Pay-per-second API |
| **Replicate** (API) | ✅ | - | - | ✅ | Pay-per-second API |
| **Figma Weave** | - | - | ✅ | - | Figma subscription |

### **Multi-Model Aggregators (Comprehensive Access):**
| Platform | Model Count | Notable Models | Primary Focus | Free Tier? |
|----------|-------------|----------------|---------------|------------|
| **fal.ai** (API) | 50+ | Veo 3/3.1, Sora 2, Kling 2.1/2.5, Wan 2.2/2.5, Hailuo 02, FLUX 1.1 | Developer API platform | ❌ |
| **Replicate** (API) | 30+ | Veo 2/3/3.1, Kling 2.1, Wan 2.1/2.2, Hailuo 02, FLUX 1.1, Runway Gen-4 | Developer API platform | ❌ |
| **Flora AI** | 50+ | Runway 3, Sora 2, Veo 3, Kling, Luma, Pika 2.0 | Professional workflows | ❌ |
| **Adobe Firefly Boards** | 10+ | Firefly native, Runway Aleph, Veo 3, Ray2/Ray3 | Adobe ecosystem | ❌ |
| **Figma Weave** | 15+ | Runway Gen-4/Turbo, Ray2, Veo 3, FLUX Kontext | Design integration | ❌ |
| **Freepik Spaces** | 10+ | Runway Gen-4, Veo 3, Kling 2.1, Hailuo 02 | Team collaboration | ✅ (3 Spaces) |
| **Pollo.ai** | 20+ | Kling, Veo, Sora, Luma, Various Chinese models | Video aggregator | ✅ Limited |
| **BasedLabs.ai** | 20+ | Community models, various generators | Free access | ✅ |

**Legend:**
- ✅ Full feature access available
- 🟨 Limited features or beta access
- ❌ Not available on this platform
- **Specialized** = Enhanced features beyond official platform

**Key Insights:**
- **API Platforms**: fal.ai (50+ models) and Replicate (30+ models) provide developer-focused API access to most major video/image models
- **Runway Gen-4**: Most widely accessible premium model (3 aggregators + Replicate API)
- **Kling Models**: Available via fal.ai, Replicate, and specialized Higgsfield platform for superior lipsync
- **Google Veo**: Comprehensive API availability (fal.ai + Replicate) alongside collaborative platforms
- **Flora AI**: Broadest model selection (50+), best for professional multi-model workflows
- **Freepik Spaces**: Only collaborative workspace with free tier (3 Spaces)
- **MiniMax Models (Wan, Hailuo)**: Strong API presence on both fal.ai and Replicate

---

## 📈 Coverage Breakdown

### By Primary Category (organized in CSV):
- **IMAGE_GEN**: 37 entries (+3: MAI-Image-1, Hunyuan Image 3.0, Amazon Titan v2)
- **VIDEO_GEN**: 73 entries (+4: Midjourney Video V1, NVIDIA Cosmos, Jimeng AI 3.0, Stable Video 4D 2.0)
- **VOICE_AUDIO**: 9 entries (+2: Resemble.ai, Coqui TTS/XTTS) 🆕
- **MUSIC**: 6 entries (added MiniMax Music 2.0)
- **LIP_SYNC**: 5 entries
- **PLATFORM_AGGREGATOR**: 14 entries (added Adobe Firefly Boards, Freepik Spaces, Figma Weave, Flora)
- **POST_PROCESSING**: 2 entries (NEW CATEGORY - Clarity AI Crystal Upscaler, RunwayML Upscaler v1)
- **API_INFRASTRUCTURE**: 6 entries
- **TOTAL**: 152 entries

### By Model Type:
- **Native Model**: ~90 entries (individual vendor models)
- **Platform Aggregator**: 9 entries (combine multiple models)
- **API/Infrastructure**: 6 entries (developer platforms)
- **Open-Source**: ~18 entries
- **Research**: ~5 entries

### By License Type:
- **Proprietary**: ~85 entries
- **Open-Source**: ~18 entries
- **Mixed**: 9 entries (platform aggregators)
- **Research-Only**: ~5 entries

### By Skill Level:
- **Beginner**: 9 entries (platform aggregators)
- **Intermediate**: ~75 entries
- **Advanced**: ~15 entries
- **Developer**: 6 entries (API/infrastructure)
- **Enterprise**: ~23 entries

### By Best For:
- **Production**: ~85 entries
- **Social Media**: ~60 entries
- **Marketing**: ~45 entries
- **Enterprise**: ~30 entries
- **Hobbyists**: ~25 entries
- **Developers**: 6 entries

---

## 🚨 Special Flags Needed

### Models with Restrictions:
1. **Udio** - Cannot download after Oct 2025 UMG settlement
2. **Suno v5** - Pro/Premier only (no free tier)
3. **Grok "Imagine"** - X Premium Plus subscription required
4. **Midjourney** - Discord-first, subscription required
5. **Various Research Models** - Non-commercial use only

### Models with Regional Restrictions:
1. **Jimeng AI** - Chinese language only, ByteDance platform
2. **Kling models** - Chinese platform, limited English docs
3. **Wan models** - Chinese platform
4. **Tensor.art** - Asian-focused, Chinese-first interface
5. **Sora 2** - Region-limited invite rollout

### Platform-Specific Notes:
1. **CivitAI** - NSFW content warning needed
2. **ComfyUI** - Technical setup required
3. **Hugging Face** - Quality varies by community model
4. **Replicate** - Developer-focused, API only

---

## ✅ Database Reorganization Complete

### **Implemented Structure:**
The CSV has been fully reorganized with the following improvements:

1. ✅ **6 New Metadata Columns Added:**
   - `Primary_Category` - Main category classification
   - `Model_Type` - Native Model, Open-Source, Platform Aggregator, etc.
   - `License_Type` - Proprietary, Open-Source, Research-Only, Mixed
   - `Special_Flags` - DISCONTINUED, LAWSUIT, RESTRICTED, BETA, NSFW, REGIONAL
   - `Skill_Level` - Beginner, Intermediate, Advanced, Developer, Enterprise
   - `Best_For` - Production, Social Media, Marketing, Hobbyists, Developers

2. ✅ **Categorical Organization:**
   - All 128 entries reorganized by Primary_Category
   - Entries grouped in logical order: IMAGE → VIDEO → VOICE → MUSIC → LIP_SYNC → PLATFORM → API
   - Line numbers documented for easy navigation

3. ✅ **Data Quality Fixes:**
   - Fixed CSV parsing errors (lines 21 & 117)
   - All entries validated with 19 consistent fields
   - Backup created before reorganization

### **Usage Tips:**
- **Filtering**: Use Primary_Category column to filter by type
- **Skill Matching**: Use Skill_Level to recommend appropriate tools
- **Discovery**: Use Best_For tags to match user needs
- **Warnings**: Check Special_Flags for important restrictions

---

**Your database is now the most comprehensive and well-organized AI creative tools catalog available! 🎉**
