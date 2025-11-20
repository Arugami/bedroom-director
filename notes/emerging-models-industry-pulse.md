# Emerging Models & Industry Pulse

**Purpose:** Track upcoming AI models, platform moves, and unconfirmed rumors for the website's "What's Coming" and industry coverage sections.

**Last Updated:** November 4, 2025

---

## 🔴 READY TO ADD (Public Releases - Not Yet in Database)

- **Nano Banana 2 (Gemini Flow)** — Newest Google research build showing reasoning-heavy prompt handling (political TV graphics, accurate vote totals) plus pristine text rendering and instruction following. Currently gated in Flow projects with Nano Banana 2 firmware; creators report multi-model routing between Gemini 3.0 Pro, GPT-5.1, and Genie 3. *Sources:* `Screenshot 2025-11-14 at 1.09.08 PM`, `1.12.47 PM`, `1.12.55 PM`
- **Microsoft MAI-Image-1** — Microsoft's first in-house image generator, debuting in top 10 on LMArena. Excels at photorealistic imagery, lighting physics (bounce light, reflections), and landscapes. Available now. *Source:* [Microsoft AI News](https://microsoft.ai/news/introducing-mai-image-1)
- **Luma Ray3** — World's first "reasoning video model" with built-in inference capabilities. Released Sept 18, 2025. Next-gen cinematic quality, now integrated into Adobe Firefly. *Source:* [Luma AI](https://lumalabs.ai/ray3), [Adobe Blog](https://blog.adobe.com/en/publish/2025/09/18/unlock-new-creative-possibilities-luma-ais-ray3-video-model-now-adobe-firefly)
- **Midjourney Video V1** — Midjourney's first video model, released June 18, 2025 to entire community. Turns single images into 5-second cinematic videos. *Source:* [Midjourney Updates](https://updates.midjourney.com/introducing-our-v1-video-model/)
- **OpenAI GPT-4o Image Generation** — Native image generation in ChatGPT with superior text rendering, context-aware generation from conversation, and precise prompt following. Rolling out to Plus/Pro users. *Source:* [OpenAI](https://openai.com/index/introducing-4o-image-generation/)
- **Amazon Titan Image Generator V2** — Enterprise-focused model on AWS Bedrock with reference image guidance, visual editing, background removal, invisible watermarking, and C2PA metadata. *Source:* [AWS Bedrock](https://aws.amazon.com/blogs/aws/amazon-titan-image-generator-v2-is-now-available-in-amazon-bedrock/)
- **Tencent Hunyuan Image 3.0** — 80 billion parameter open-source image generator (largest open-source), released Sept 28, 2025. *Source:* [Skywork.ai](https://skywork.ai/blog/tencent-hunyuan-releases-3-0-image-generation-model/)
- **ByteDance Jimeng AI** — Text-to-video and image platform from TikTok parent company. Currently Chinese language only, paid subscription model. *Source:* [Videomaker](https://www.videomaker.com/news/bytedance-launches-new-text-to-video-app-jimeng-ai/)
- **NVIDIA Cosmos (WFMs)** — Physical AI platform with World Foundation Models. Generates 30-second videos from single frame, world state prediction. Cosmos Predict 2.5 unified model. Released at CoRL 2025. *Source:* [NVIDIA](https://www.nvidia.com/en-us/ai/cosmos/)
- **Stability AI SV4D 2.0** — Video-to-4D diffusion model for novel-view video synthesis. Released May 20, 2025. Open-source. *Source:* [GitHub](https://github.com/Stability-AI/generative-models)

> **Status Update (Nov 4, 2025):** Added `Reve Video (Veo 3.1 powered)` plus `Reve Fast Edit` and `Reve Fast Remix` rows to `data/ai_video_image_models.csv` with pricing, limits, and API distribution (fal.ai). Replicate's MiniMax Hailuo 2.3 Fast launch noted in database via Notable Sources.

## 🟡 COMING SOON (Developer Previews & Roadmaps)

- **Meta Movie Gen** — Research preview with 16-second HD videos + synchronized audio (13B audio model). Four capabilities: video generation, personalized video, video editing, and audio generation (45s). Expected Instagram rollout in 2025. *Source:* [Meta AI](https://ai.meta.com/research/movie-gen/), [VentureBeat](https://venturebeat.com/ai/meta-is-entering-the-ai-video-wars-with-powerful-movie-gen-set-to-hit-instagram-in-2025)
- **Runway Gen-5 developer preview** — Runway has begun briefing partners on a "Runway 5.0" update that focuses on deeper multi-image fusion, improved character persistence, and expanded model integrations beyond Gen-4 Turbo. *Source:* [ReelMind.ai](https://reelmind.ai/blog/runway-5-0-developer-preview-a-glimpse-of-ai-s-future)
- **PixVerse 5.5 roadmap** — PixVerse's team is teasing a 5.5 release with finer camera paths and improved motion blur, slated for the ReelMind ecosystem later this year. *Source:* [ReelMind.ai](https://reelmind.ai/blog/pixverse-5-5-release-timeline-anticipating-ai-innovations)
- **Midjourney video extensions (post-V1)** — With Video V1 now in public release, the Midjourney team has hinted in community calls that 12–16 second clips and native audio are on the internal roadmap. *Source:* [Midjourney developer Q&A recap](https://updates.midjourney.com/introducing-our-v1-video-model/)

## 🔵 IMAGE EDITING & SPECIALIZED TOOLS (Not Yet in Database)

- **Qwen-Image-2509-MultipleAngles** — Alibaba's camera angle control model for single images. Rotate camera 45°/90° left/right, look up/down at subjects. LoRA-based image transformation at 1024x1024. Free demo on Hugging Face Spaces; ComfyUI plugin available. Released Sept 2025. **Use Case:** Product shots, character turnarounds, quick angle changes. **Note:** Image editing model (not generation), potential future IMAGE_EDITING category. *Source:* [Hugging Face](https://huggingface.co/spaces/tori29umai/Qwen-Image-2509-MultipleAngles), [Victor M tweet](https://twitter.com/victormustar/status/)

## 🟢 PLATFORM & DISTRIBUTION UPDATES (Nov 2025)

- **Freepik Spaces Workflow Canvas** - Shared infinite canvas for teams to chain Mystic, Veo, Kling, FLUX, and upscalers with reusable templates, approval checkpoints, and live collaboration. *Source:* [Forbes](https://www.forbes.com/sites/ronschmelzer/2025/11/04/freepiks-spaces-makes-ai-a-team-sport-for-creators/), [Freepik Spaces](https://www.freepik.com/spaces)
- **Reve Fast Endpoints on fal.ai** - Newly launched `fal-ai/reve/fast/edit` and `fal-ai/reve/fast/remix` endpoints at $0.01/image for commercial use, delivering sub-second edits and multi-reference remixes for production pipelines. *Source:* [fal.ai Fast Edit](https://fal.ai/models/fal-ai/reve/fast/edit), [fal.ai Fast Remix](https://fal.ai/models/fal-ai/reve/fast/remix)
- **Replicate MiniMax Hailuo 2.3 Fast** - Replicate now hosts `minimax/hailuo-2.3` and `.../fast`, simplifying pay-per-second access to MiniMax's latest release alongside fal.ai distribution. *Source:* [Replicate](https://replicate.com/minimax/hailuo-2.3-fast)

## 🟢 INDUSTRY NEWS & UPDATES (Last 30 Days)

- **Disney+ Opens AI Shorts Submissions** (Nov 13, 2025) — Bob Iger confirmed the platform will soon host user-generated short-form content made with AI tools, giving bedroom creators a mainstream distribution outlet. *Source:* [Hollywood Reporter](https://www.hollywoodreporter.com/business/digital)
- **ComfyUI Cloud Public Beta** (Nov 4, 2025) — No more waitlist! $20/mo with NVIDIA A100 GPUs, 400+ models, 17 extensions. Browser-based ComfyUI. *Source:* [ComfyUI Blog](https://blog.comfy.org/p/comfy-cloud-is-now-in-public-beta)
- **Google Veo 3.1 Fast Unlimited** (Nov 2025) — Gemini Ultra ($249.99/mo) now offers TRUE unlimited Veo 3.1 Fast generation with no daily caps. *Source:* [Gemini Subscriptions](https://gemini.google/subscriptions/)
- **NVIDIA GEN3C-Cosmos** (CVPR 2025) — 3D-informed video generation with precise camera control. Open-source release. *Source:* [NVIDIA Research](https://research.nvidia.com/labs/toronto-ai/GEN3C/)
- **Pika 2.2 Pricing Update** (Nov 2025) — New tier structure: Free Basic (80 credits), Standard $8/mo, Pro $28/mo, Fancy $76/mo. *Source:* [Pika Pricing](https://pika.art/pricing)

## ⚪ RUMORS & UNCONFIRMED

- **OpenAI Sora 3** — Rumored to be in testing with 4K support and 60-second clips. No official announcement yet.
- **Runway Gen-5** — Whispers of improved character consistency and multi-image fusion. Developer preview mentioned in partner briefings.
- **Midjourney V7** — Community speculation about native video integration beyond V1. No official roadmap shared.
- **Meta Movie Gen Public Release** — Expected Instagram rollout in 2025, but no confirmed date.

## ✅ VERIFY VERSIONS IN DATABASE

- **Adobe Firefly + Gemini Nano Banana** — Adobe is integrating Google's Gemini 2.5 Flash Image ("Nano Banana") inside Firefly as the next partner model, highlighting text-accurate edits for designers. *Source:* [Adobe Firefly partner announcement](https://www.adobe.com/products/firefly/partner-models/google-gemini-nano-banana.html)
- **Adobe Firefly Image Model 5** — Released Oct 2025 at Adobe MAX. Check if database has v5 or earlier version.
- **Recraft V3** — Verify database has V3 details (only model generating images with long text).

---

## 📋 Update Guidelines

### For Website "What's Coming" Section:
- **🔴 READY TO ADD** → "Available Now" badge
- **🟡 COMING SOON** → "Developer Preview" badge  
- **🔵 SPECIALIZED TOOLS** → "Emerging Category" badge
- **🟢 INDUSTRY NEWS** → "Recent Updates" section
- **⚪ RUMORS** → "Unconfirmed" disclaimer

### Update Frequency:
- Check daily for major announcements
- Weekly review of READY TO ADD → move to CSV
- Monthly cleanup of outdated rumors

---

> **Last Updated:** November 4, 2025
> **Action Required:** Move models from "READY TO ADD" section to main CSV database after verification
> Keep this list in sync with **data/ai_video_image_models.csv** so the site can highlight what's shipping vs. what's coming next.
> **See also:** research/pricing-audit-findings.md for verification details
