#!/usr/bin/env python3
"""
Add 7 new AI models/platforms to the database:
- 4 Collaborative AI Workspace platforms
- 2 POST_PROCESSING upscalers
- 1 VOICE_AUDIO model
Plus update existing Vidu entry with Q2 details
"""

import csv
from datetime import datetime
import shutil

def backup_csv():
    """Create timestamped backup"""
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_file = f'ai_video_image_models_BACKUP_{timestamp}.csv'
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

def update_vidu_entry(rows):
    """Update existing Vidu entry with Q2 Reference-to-Video details"""
    for i, row in enumerate(rows):
        if 'Vidu' in row[7]:  # Model name column
            # Update Key Features to include Q2 details
            rows[i][9] = 'Transformer diffusion enabling 16 s clips; Q2 "Reference-to-Video" with up to 7 reference images (faces, gestures, scenes, props); Multiple-Entity Consistency; improved facial expressions & emotions; cinematic camera movements (smooth shifts, panning, depth of field); template workflows'
            # Update Distinctive Edge
            rows[i][16] = 'Q2 "Reference-to-Video" brings long-form 16 s coherent video with up to 7 reference images for multi-entity consistency; superior facial expressions & cinematic techniques; 30M users, 400M videos, 200+ countries'
            # Update Notable Sources
            rows[i][18] = 'arxiv.org/abs/2405.04233; vidu.com/features; PRNewswire Oct 21, 2025'
            print("✓ Updated Vidu entry with Q2 details")
            break
    return rows

# NEW ENTRIES

# 1. CARTESIA SONIC-3 (VOICE_AUDIO)
cartesia_sonic3 = [
    'Cartesia',                                         # Vendor
    'VOICE_AUDIO',                                      # Primary_Category
    'Native Model',                                     # Model_Type
    'Proprietary',                                      # License_Type
    '',                                                 # Special_Flags
    'Developer',                                        # Skill_Level
    'Enterprise,Production,Developers',                 # Best_For
    'Cartesia Sonic-3',                                # Model
    'Text-to-Speech (TTS)',                            # Modality
    'Ultra-low 90ms latency (4x faster than competitors); 42 languages; laughter & emotion support via SSML; streaming TTS with instant voice cloning; volume, speed, emotion controls; voice library; voice changer; narrations studio; multilingual localization',
    'Streaming audio output',                          # Duration/Resolution
    'Voice selection; instant voice cloning; pro voice cloning; voice design; SSML emotion tags; infilling',
    '<90ms latency (industry-leading, 4x faster)',     # Speed
    'Scale plan: $239/mo for 8M credits = ~$0.03 per 1K characters; 1 credit per character for Sonic-3 TTS; Pro Voice Cloning: 1M credits to train + 1.5 credits per character',
    'Proprietary / Commercial API',                    # License
    'Active (Sonic-3 flagship 2025)',                  # Update Cadence
    'Only TTS model with <90ms latency, outperforming competitors by 4x; used by ServiceNow, Daily, Quora, Together AI, Pipecat; state-space model architecture (SSM) for efficient real-time processing; streaming with instant cloning',
    'Developer-focused API-only (no web interface); credit-based pricing complexity; newer company (less established than ElevenLabs)',
    'cartesia.ai; ServiceNow, Daily, Quora, Together AI testimonials (2025)'
]

# 2. ADOBE FIREFLY BOARDS (PLATFORM_AGGREGATOR)
adobe_firefly_boards = [
    'Adobe',
    'PLATFORM_AGGREGATOR',
    'Platform Aggregator',
    'Mixed',
    '',
    'Intermediate',
    'Production,Marketing,Enterprise',
    'Adobe Firefly Boards',
    'Multi-Model Creative Workspace',
    'Access 10+ leading AI models in one workspace: Adobe Firefly (Image 4/5, Video), Runway Aleph, Moonvalley Marey, Google Veo 3 & Gemini 2.5 Flash (Nano Banana), Luma Ray2/Ray3, Pika 2.2, FLUX 1.1 Kontext; real-time collaboration; Presets (Product & Character, Virtual Try-On, Electric Party); Generative Text Edit (beta); Describe Image; unlimited canvases',
    'Multi-format: images, videos, text effects, audio',
    'Text prompts; image upload; preset templates; generative text editing; image description extraction; collaborative cursors',
    'Varies by model (unified interface)',
    'Flexible subscriptions: Standard/Pro/Premium plans include Photoshop (web/mobile) + Adobe Express Premium + unlimited canvas access + generative credits; Creative Cloud Pro includes same premium AI access',
    'Proprietary platform with mixed model licenses',
    'Launched globally Sept 24, 2025; active feature updates',
    'Most comprehensive model selection (10+ models) in collaborative workspace; Adobe ecosystem integration (Photoshop, Express); enterprise-grade platform; bundles professional tools with AI generation',
    'Adobe subscription required; no free tier; model selection may change; Creative Cloud familiarity needed for full integration',
    'blog.adobe.com/en/publish/2025/09/24; Adobe MAX 2025'
]

# 3. FREEPIK SPACES (PLATFORM_AGGREGATOR)
freepik_spaces = [
    'Freepik',
    'PLATFORM_AGGREGATOR',
    'Platform Aggregator',
    'Mixed',
    '',
    'Beginner',
    'Production,Marketing,Social Media',
    'Freepik Spaces',
    'AI Workflow Automation',
    'Node-based workflow automation on infinite canvas; real-time team collaboration with colored cursors; multiple node types: Upload, Text, Assistant (AI text generation/expansion), Image Generator, Video Generator, Image Upscaler (Magnific technology); preset workflows for common tasks; all-in-one creative canvas for designers',
    'Multi-format: images, videos, text, workflows',
    'Node-based visual workflows; text prompts; drag-and-drop; collaborative editing; preset templates; Magnific upscaling',
    'Varies by node/model used',
    'Free tier: 3 Spaces + AI tools from free plan; paid plans for unlimited Spaces + additional AI credits; generators consume credits',
    'Proprietary platform with mixed model licenses',
    'Launched Nov 4, 2025 (newest in category)',
    'Newest collaborative AI workspace (Nov 2025); free tier available (3 Spaces); Magnific upscaling integration; trusted by 600K+ teams including Google, Ogilvy, Coca-Cola; design asset library integration',
    'Very new platform (launched Nov 2025); free tier limited to 3 Spaces; fewer models than Adobe Boards; AI generations consume credits',
    'freepik.com/spaces; launched Nov 4, 2025'
]

# 4. FIGMA WEAVE (formerly Weavy) (PLATFORM_AGGREGATOR)
figma_weave = [
    'Figma',
    'PLATFORM_AGGREGATOR',
    'Platform Aggregator',
    'Mixed',
    '',
    'Intermediate',
    'Production,Enterprise,Developers',
    'Figma Weave (formerly Weavy)',
    'AI-Native Creation Platform',
    'Node-based visual workspace combining leading AI models (Seedance, Sora, others) with professional editing tools; design interfaces, generate images, create videos within one collaborative environment; no switching applications or exporting files; automation workflows; Figma ecosystem integration',
    'Multi-format: images, videos, animations, designs',
    'Node-based workflows; text prompts; multi-model chaining; professional editing tools; Figma design integration',
    'Varies by model',
    'Pricing TBA (acquired by Figma 2025); likely Figma subscription integration',
    'Proprietary platform with mixed model licenses',
    'Acquired by Figma 2025; rebranded as Figma Weave',
    'Acquired by Figma for design-focused AI workflows; professional editing tools integration; targets design teams already using Figma; emphasizes automation and professional workflows over consumer simplicity',
    'Recently acquired (integration ongoing); pricing unclear; Figma subscription likely required; less established than competitors',
    'figma.com/blog/welcome-weavy-to-figma; acquired 2025'
]

# 5. FLORA (PLATFORM_AGGREGATOR)
flora = [
    'Flora & Fauna AI',
    'PLATFORM_AGGREGATOR',
    'Platform Aggregator',
    'Mixed',
    '',
    'Intermediate',
    'Production,Marketing,Enterprise',
    'Flora',
    'AI-Powered Infinite Canvas',
    'Infinite canvas integrating with existing AI models; visual interface for generating blocks of text, images, videos; multi-modal platform; Team Workspaces for collaboration; shared assets, feedback management, streamlined billing; designed for creative professionals, studios, brands; all-in-one creative canvas replacing multiple tools',
    'Multi-format: text, images, videos',
    'Text prompts; image generation; video generation; infinite canvas workspace; team collaboration; asset sharing',
    'Varies by integrated model',
    'Team Workspaces available; pricing details on florafauna.ai',
    'Proprietary platform with mixed model licenses',
    'Active 2025; indie startup',
    'Pioneer of "infinite canvas" concept for AI creativity; indie startup agility; multi-modal focus (text, image, video); used by world-class design firms and studios; emphasizes replacing 5+ separate tools',
    'Smaller indie company vs. Adobe/Figma; less brand recognition; fewer public case studies; potential stability concerns vs. enterprise options',
    'florafauna.ai; TechCrunch March 2, 2025'
]

# 6. CLARITY AI CRYSTAL UPSCALER (POST_PROCESSING)
clarity_crystal = [
    'Clarity AI',
    'POST_PROCESSING',
    'Native Model',
    'Open-Source',
    '',
    'Intermediate',
    'Production,Hobbyists,Marketing',
    'Clarity AI Crystal Upscaler',
    'AI Image Upscaler',
    'High-resolution upscaler 64px minimum to 13,000px maximum (176 megapixels); controllable detail addition; remove noise/blur; fix AI artifacts; style transfer; Creative mode (adds detail) vs Crystal mode (preserves faces); suitable for landscapes, portraits, illustrations, interior design; ComfyUI plugin available',
    'Up to 13,000px (176 megapixels)',
    'Creativity slider (how much AI detail to add); scale selection; mode selection (Creative/Crystal); batch processing',
    'Fast (seconds for most images)',
    'Free tier available; paid plans for higher usage; API: $0.10+ per upscale depending on size/mode; also on WaveSpeed ($0.10/run) and Replicate',
    'Open-source (github.com/philz1337x/clarity-upscaler) / Commercial API available',
    'Active 2025; by @philz1337x',
    '#1 AI upscaler with 22M+ upscales; highest resolution available (176 megapixels); open-source with commercial API; controllable enhancement (creativity slider); multiple deployment options (direct, Replicate, WaveSpeed, ComfyUI)',
    'Open-source quality varies by use case; paid for commercial/high-volume use; newer than established upscalers like Topaz Gigapixel',
    'clarityai.co; GitHub philz1337x/clarity-upscaler; 22M+ upscales'
]

# 7. RUNWAYML UPSCALER V1 (POST_PROCESSING)
runway_upscaler = [
    'Runway',
    'POST_PROCESSING',
    'Native Model',
    'Proprietary',
    '',
    'Intermediate',
    'Production,Enterprise',
    'RunwayML Upscaler v1',
    'AI Video Upscaler',
    '4K video upscaling (4x resolution increase); maximum 4096px per side; temporal consistency across frames (no flickering); handles videos <40s, <4096px, <16MB; maintains smooth motion; intelligent detail enhancement; works on content creation clips, archival footage, production workflows, marketing materials',
    'Up to 4K (4096px per side); 4x upscale',
    'Video upload; automatic upscaling; frame-by-frame temporal consistency',
    '~60 seconds for short clips',
    'Replicate API: $0.02 per second of output video (50 seconds for $1); Runway direct pricing may vary',
    'Proprietary / Commercial API',
    'Active 2025 on Replicate',
    'Industry-standard video upscaling from Runway (leading video AI company); temporal consistency prevents flickering; 4K maximum with 4x upscale; essential for enhancing AI-generated video (Sora watermarks, resolution limits)',
    'Limited to 40s videos and 16MB files; 4K ceiling (no 8K); best on decent source quality; fast motion may show artifacts; API-only on Replicate',
    'replicate.com/runwayml/upscale-v1; Runway official model 2025'
]

def main():
    print("\n" + "="*60)
    print("ADDING 7 NEW MODELS + UPDATING VIDU")
    print("="*60 + "\n")

    # Create backup
    backup_csv()

    # Read current data
    header, rows = read_csv()
    print(f"Current entries: {len(rows)}")

    # Update Vidu entry
    rows = update_vidu_entry(rows)

    # Find insertion points for each category
    # We need to insert in the right category sections

    # Find where VOICE_AUDIO section is (around line 100)
    voice_insert_idx = None
    for i, row in enumerate(rows):
        if row[1] == 'VOICE_AUDIO':  # Primary_Category column
            voice_insert_idx = i

    # Find where PLATFORM_AGGREGATOR section is (around line 115)
    platform_insert_idx = None
    for i, row in enumerate(rows):
        if row[1] == 'PLATFORM_AGGREGATOR':
            platform_insert_idx = i

    # Since POST_PROCESSING is new, add it after PLATFORM_AGGREGATOR section
    # Find where API_INFRASTRUCTURE starts (last category)
    api_insert_idx = None
    for i, row in enumerate(rows):
        if row[1] == 'API_INFRASTRUCTURE':
            api_insert_idx = i
            break

    # Insert entries (in reverse order so indices don't shift)

    # 1. Add POST_PROCESSING entries before API_INFRASTRUCTURE
    print(f"\n✓ Adding POST_PROCESSING entries at index {api_insert_idx}")
    rows.insert(api_insert_idx, runway_upscaler)
    rows.insert(api_insert_idx, clarity_crystal)

    # 2. Add PLATFORM_AGGREGATOR entries after existing platforms
    # Find last PLATFORM_AGGREGATOR entry
    last_platform_idx = None
    for i in range(len(rows)-1, -1, -1):
        if rows[i][1] == 'PLATFORM_AGGREGATOR':
            last_platform_idx = i
            break

    print(f"✓ Adding PLATFORM_AGGREGATOR entries at index {last_platform_idx + 1}")
    rows.insert(last_platform_idx + 1, flora)
    rows.insert(last_platform_idx + 1, figma_weave)
    rows.insert(last_platform_idx + 1, freepik_spaces)
    rows.insert(last_platform_idx + 1, adobe_firefly_boards)

    # 3. Add VOICE_AUDIO entry after existing voice entries
    last_voice_idx = None
    for i in range(len(rows)-1, -1, -1):
        if rows[i][1] == 'VOICE_AUDIO':
            last_voice_idx = i
            break

    print(f"✓ Adding VOICE_AUDIO entry at index {last_voice_idx + 1}")
    rows.insert(last_voice_idx + 1, cartesia_sonic3)

    # Write updated data
    write_csv(header, rows)

    print(f"\n{'='*60}")
    print(f"✓ SUCCESS! Added 7 new entries + updated Vidu")
    print(f"Database: 136 → {len(rows)} entries")
    print(f"{'='*60}\n")

    print("New entries added:")
    print("  VOICE_AUDIO:")
    print("    - Cartesia Sonic-3")
    print("  PLATFORM_AGGREGATOR:")
    print("    - Adobe Firefly Boards")
    print("    - Freepik Spaces")
    print("    - Figma Weave (formerly Weavy)")
    print("    - Flora")
    print("  POST_PROCESSING (NEW CATEGORY):")
    print("    - Clarity AI Crystal Upscaler")
    print("    - RunwayML Upscaler v1")
    print("  UPDATED:")
    print("    - Vidu (added Q2 Reference-to-Video details)")

if __name__ == '__main__':
    main()
