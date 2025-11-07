#!/usr/bin/env python3
"""
Add 7 new AI models discovered from research (Nov 2024 - Jan 2025):
- 3 IMAGE_GEN models
- 4 VIDEO_GEN models
"""

import csv
import shutil

def backup_csv():
    """Create single rolling backup"""
    backup_file = 'ai_video_image_models_BACKUP.csv'
    shutil.copy('ai_video_image_models.csv', backup_file)
    print(f"✓ Backup created: {backup_file}")
    return backup_file

def read_csv():
    """Read current CSV data"""
    with open('ai_video_image_models.csv', 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        header = next(reader)
        rows = list(reader)
    return header, rows

def write_csv(header, rows):
    """Write updated CSV data"""
    with open('ai_video_image_models.csv', 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(header)
        writer.writerows(rows)

# NEW IMAGE_GEN ENTRIES

# 1. MAI-IMAGE-1 (Microsoft)
mai_image_1 = [
    'Microsoft',
    'IMAGE_GEN',
    'Native Model',
    'Proprietary',
    '',
    'Intermediate',
    'Production,Marketing,Developers',
    'MAI-Image-1',
    'Text-to-Image',
    'Microsoft\'s first in-house text-to-image generator; excels at photorealistic imagery with exceptional lighting (bounce light, reflections); advanced landscapes, portraits, and complex scenes; high-speed generation with visual fidelity; debuts in top 10 on LMArena benchmark; ethical design focus with safety guardrails',
    '1024×1024 default; up to 2048×2048',
    'Text prompts; aspect ratio selection; style controls; negative prompts',
    'Fast generation (typically <10s per image)',
    'Pricing TBA; likely Azure/Copilot integration',
    'Proprietary / Microsoft Azure',
    'Announced 2025; in-house development by Microsoft AI',
    'Microsoft\'s first native image generator (not relying on third-party models); top 10 LMArena debut; exceptional photorealistic lighting and reflections; Azure enterprise integration expected; built-in safety and ethics framework',
    'New model with limited public availability; Azure integration required; pricing unclear; less established than DALL-E, Midjourney, FLUX',
    'microsoft.ai/news/introducing-mai-image-1-debuting-in-the-top-10-on-lmarena/; LMArena rankings 2025'
]

# 2. HUNYUAN IMAGE 3.0 (Tencent)
hunyuan_image_3 = [
    'Tencent',
    'IMAGE_GEN',
    'Native Model',
    'Open-Source',
    '',
    'Developer',
    'Developers,Production,Hobbyists',
    'Hunyuan Image 3.0',
    'Text-to-Image',
    'World\'s largest open-source text-to-image model (80B parameters); unified autoregressive framework (beyond DiT architecture); enhanced dual encoders with RLHF; multilingual support; breakthrough diffusion AI for stunning high-quality images; officially open-sourced Sept 28, 2025',
    'High-resolution output (up to 2048×2048)',
    'Text prompts; multilingual inputs; advanced encoder controls; RLHF-guided generation',
    'Moderate (depends on hardware for 80B model)',
    'Free (open-source); compute costs for self-hosting',
    'Open-source (Apache 2.0 license)',
    'Released Sept 28, 2025; active development by Tencent',
    'World\'s largest open-source text-to-image model (80B parameters); unified autoregressive framework innovation; open-source with commercial use allowed; multilingual native support; RLHF enhancement for quality; GitHub + Hugging Face availability',
    'Requires significant compute resources (80B params); newer model with smaller community vs. Stable Diffusion; self-hosting complexity for full capabilities',
    'hunyuan-image.com; github.com/Tencent-Hunyuan/HunyuanImage-3.0; released Sept 28, 2025'
]

# 3. AMAZON TITAN IMAGE GENERATOR V2
titan_image_v2 = [
    'Amazon',
    'IMAGE_GEN',
    'Native Model',
    'Proprietary',
    '',
    'Enterprise',
    'Enterprise,Production,Developers',
    'Amazon Titan Image Generator v2',
    'Text-to-Image; Image-to-Image',
    'Photorealistic image generation with image conditioning, subject consistency, instant customization; reference image support for guided creation; edit existing visuals; remove backgrounds; generate image variations; enterprise-grade safety and compliance; AWS Bedrock integration; supports all v1 features plus new capabilities',
    'Up to 2048×2048; multiple aspect ratios',
    'Text prompts; reference images; image conditioning; subject consistency controls; background removal; variation generation; instant customization',
    'Fast (optimized AWS Bedrock inference)',
    'Pay-per-use via AWS Bedrock; pricing varies by region and usage; no upfront costs',
    'Proprietary / AWS Bedrock',
    'v2 released 2025; ongoing updates via AWS Bedrock',
    'Reference image conditioning for guided generation; subject consistency across outputs; instant customization without retraining; AWS enterprise ecosystem integration (S3, Lambda, SageMaker); built-in safety and compliance features; seamless upgrade path from v1',
    'AWS account required; pay-per-use pricing can add up; limited to AWS Bedrock platform; newer vs. established competitors like Midjourney',
    'aws.amazon.com/blogs/aws/amazon-titan-image-generator-v2-is-now-available-in-amazon-bedrock/; AWS Bedrock docs 2025'
]

# NEW VIDEO_GEN ENTRIES

# 4. MIDJOURNEY VIDEO V1
midjourney_video_v1 = [
    'Midjourney',
    'VIDEO_GEN',
    'Native Model',
    'Proprietary',
    '',
    'Intermediate',
    'Production,Marketing,Content Creators',
    'Midjourney Video V1',
    'Image-to-Video',
    'Midjourney\'s first AI video generation model; turns single images into dynamic 5-second videos; released to entire community June 18, 2025; Discord-based generation workflow; optimized for creative content and artistic videos; cinematic motion from static images',
    '5-second clips; 1080p output',
    'Image upload (Midjourney-generated or external); motion control prompts; Discord commands',
    'Queue-based generation (typically 2-5 minutes)',
    'Included with Midjourney subscription ($10/mo Basic, $30/mo Standard, $60/mo Pro)',
    'Proprietary / Midjourney subscription',
    'Released June 18, 2025; V1 initial release',
    'First video model from industry-leading image generator; leverages Midjourney\'s artistic strengths; Discord integration for existing workflow; subscription includes both image and video; strong artistic and creative focus',
    'Limited to 5-second clips; image-to-video only (no text-to-video yet); Discord-only interface; newer vs. established video models like Runway, Pika; shorter duration than competitors',
    'updates.midjourney.com/introducing-our-v1-video-model/; released June 18, 2025; Available via API: fal.ai'
]

# 5. NVIDIA COSMOS
nvidia_cosmos = [
    'NVIDIA',
    'VIDEO_GEN',
    'Native Model (WFM)',
    'Open-Source',
    '',
    'Developer',
    'Developers,Robotics,Enterprise',
    'NVIDIA Cosmos Predict 2.5',
    'Physical AI / World Simulation',
    'State-of-the-art world foundation model (WFM) for physical AI; generates up to 30 seconds of continuous video from multimodal inputs; combines three WFMs into one unified model; superior speed, fidelity, and controllability; world state prediction for robotics, autonomous systems, industrial automation; physics-accurate simulations; multi-view outputs; Omniverse integration',
    'Up to 30-second videos; multi-view synthesis; 4K capable',
    'Multimodal inputs (text, images, sensor data); physics constraints; multi-view controls; Omniverse integration',
    'Optimized for NVIDIA hardware; real-time capable on high-end GPUs',
    'Open-source models + NVIDIA enterprise licensing; compute costs depend on deployment',
    'Mixed: Open-source models + Proprietary enterprise tools',
    'Major release Aug-Sept 2025; active development',
    'Purpose-built for physical AI (robotics, autonomous systems); up to 30-second generation; unified WFM architecture; physics-accurate simulations; NVIDIA ecosystem integration (Omniverse, Isaac); multi-view consistency; real-time capable on NVIDIA hardware',
    'Requires NVIDIA GPUs for optimal performance; complex setup for robotics applications; focused on physical AI vs. creative content; newer platform vs. general-purpose video models',
    'nvidia.com/en-us/ai/cosmos/; research.nvidia.com/publication/2025-09_world-simulation; announced Aug 2025'
]

# 6. JIMENG AI 3.0 (ByteDance)
jimeng_ai_3 = [
    'ByteDance',
    'VIDEO_GEN',
    'Native Model',
    'Proprietary',
    '',
    'Intermediate',
    'Production,Social Media,Marketing',
    'Jimeng AI 3.0',
    'Text-to-Video; Image-to-Video',
    '2K cinematic video generation with 98% text accuracy; two specialized models: PixelDance (complex motions, 10s videos) and Seaweed (up to 30s clips); DeepSeek R1 integration for detailed script generation; smart canvas and video creation tools; part of CapCut ecosystem; viral social content focus',
    'Up to 30-second videos; 2K resolution (2048×1080)',
    'Text prompts with DeepSeek R1 script generation; image-to-video; smart canvas; video editing integration; CapCut workflow',
    'Fast generation optimized for social media workflows',
    '$10/mo subscription: 160+ videos or 2,000 images/month; $90/year annual plan',
    'Proprietary / ByteDance subscription',
    'Jimeng AI 3.0 released 2025; rapid iteration from v1 (July 2024)',
    'ByteDance/TikTok AI powerhouse; 2K cinematic output with 98% text accuracy; DeepSeek R1 integration for script generation; CapCut ecosystem integration; rapid growth: 760K → 2M weekly users (Dec 2024-Feb 2025); 8.93M monthly users by March 2025; affordable pricing',
    'China-exclusive (not available internationally); newer platform vs. OpenAI/Runway; mobile-first social focus may limit professional applications; subscription required for volume',
    'jimeng.jianying.com; 8.93M MAU March 2025; DeepSeek R1 integration 2025'
]

# 7. STABLE VIDEO 4D 2.0 (Stability AI)
sv4d_2 = [
    'Stability AI',
    'VIDEO_GEN',
    'Native Model',
    'Open-Source',
    '',
    'Developer',
    'Developers,Production,3D/VFX',
    'Stable Video 4D 2.0 (SV4D 2.0)',
    '3D/4D Content Generation',
    'Latent video diffusion model for multi-frame and multi-view consistent dynamic 3D content; transforms single video into novel-view videos from 8 different angles; unified diffusion model (vs. separate models); ranks #1 across all major benchmarks (LPIPS, FVD-V, FVD-F, FV4D); sprite sheets for gaming, film assets, virtual worlds',
    '5-frame videos across 8 perspectives in ~40s; full optimization 20-25 mins',
    'Single video input; multi-view synthesis (8 angles); 4D consistency controls; dynamic 3D asset generation',
    '~40 seconds for 5-frame 8-view generation; 20-25 min full optimization',
    'Free (open-source); compute costs for self-hosting or cloud deployment',
    'Open-source (Stability AI license); available on Hugging Face',
    'v1 July 2024; v2 upgrade 2024; active research',
    'Unified diffusion model for 4D generation; #1 ranked across all benchmarks; 8-angle multi-view synthesis; open-source with commercial use; Hugging Face + GitHub availability; professional production workflows (gaming, film, VR)',
    'Requires technical expertise; compute-intensive; optimization time for full quality; focused on 3D/4D vs. traditional video generation; newer vs. established 3D tools',
    'stability.ai/news/stable-video-4d-20; huggingface.co/stabilityai/sv4d; arxiv.org/abs/2407.17470; Available via API: Replicate'
]

def main():
    print("\n" + "="*70)
    print("ADDING 7 NEW MODELS FROM NOV 2024 - JAN 2025 RESEARCH")
    print("="*70 + "\n")

    # Create backup
    backup_csv()

    # Read current data
    header, rows = read_csv()
    print(f"Current entries: {len(rows)}\n")

    # Find insertion points

    # IMAGE_GEN: Insert after last IMAGE_GEN entry
    last_image_idx = None
    for i in range(len(rows)-1, -1, -1):
        if rows[i][1] == 'IMAGE_GEN':
            last_image_idx = i
            break

    # VIDEO_GEN: Insert after last VIDEO_GEN entry
    last_video_idx = None
    for i in range(len(rows)-1, -1, -1):
        if rows[i][1] == 'VIDEO_GEN':
            last_video_idx = i
            break

    print(f"✓ Inserting IMAGE_GEN entries at index {last_image_idx + 1}")
    rows.insert(last_image_idx + 1, titan_image_v2)
    rows.insert(last_image_idx + 1, hunyuan_image_3)
    rows.insert(last_image_idx + 1, mai_image_1)

    # Re-find VIDEO_GEN insertion point (indices shifted)
    last_video_idx = None
    for i in range(len(rows)-1, -1, -1):
        if rows[i][1] == 'VIDEO_GEN':
            last_video_idx = i
            break

    print(f"✓ Inserting VIDEO_GEN entries at index {last_video_idx + 1}")
    rows.insert(last_video_idx + 1, sv4d_2)
    rows.insert(last_video_idx + 1, jimeng_ai_3)
    rows.insert(last_video_idx + 1, nvidia_cosmos)
    rows.insert(last_video_idx + 1, midjourney_video_v1)

    # Write updated data
    write_csv(header, rows)

    print(f"\n{'='*70}")
    print(f"✓ SUCCESS! Added 7 new models")
    print(f"Database: 143 → {len(rows)} entries")
    print(f"{'='*70}\n")

    print("New models added:")
    print("\n  IMAGE_GEN (3 entries):")
    print("    - MAI-Image-1 (Microsoft - first in-house image generator)")
    print("    - Hunyuan Image 3.0 (Tencent - 80B params, world's largest open-source)")
    print("    - Amazon Titan Image Generator v2 (AWS Bedrock enterprise)")
    print("\n  VIDEO_GEN (4 entries):")
    print("    - Midjourney Video V1 (first video model from Midjourney)")
    print("    - NVIDIA Cosmos Predict 2.5 (physical AI, 30s world simulation)")
    print("    - Jimeng AI 3.0 (ByteDance - 2K cinematic, DeepSeek R1)")
    print("    - Stable Video 4D 2.0 (Stability AI - #1 benchmark 4D generation)")
    print("")

if __name__ == '__main__':
    main()
