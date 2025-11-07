#!/usr/bin/env python3
"""
Add MiniMax Music 2.0 and MiniMax Speech 2.6 to the database
"""

import csv
import shutil
from datetime import datetime

INPUT_CSV = '/Users/Arugami/Desktop/AI_Image_Video_App/ai_video_image_models.csv'
OUTPUT_CSV = '/Users/Arugami/Desktop/AI_Image_Video_App/ai_video_image_models.csv'
BACKUP_CSV = f'/Users/Arugami/Desktop/AI_Image_Video_App/ai_video_image_models_BACKUP_{datetime.now().strftime("%Y%m%d_%H%M%S")}.csv'

def main():
    print("="*60)
    print("ADDING MINIMAX MUSIC 2.0 AND SPEECH 2.6")
    print("="*60)

    # Create backup
    print("\n[1/4] Creating backup...")
    shutil.copy(INPUT_CSV, BACKUP_CSV)
    print(f"   Backup created: {BACKUP_CSV}")

    # Read CSV
    print("\n[2/4] Reading CSV...")
    with open(INPUT_CSV, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        rows = list(reader)
    print(f"   Read {len(rows)} rows")

    # Define new entries
    minimax_speech_26 = [
        'MiniMax',                                          # Vendor
        'VOICE_AUDIO',                                      # Primary_Category
        'Native Model',                                     # Model_Type
        'Proprietary',                                      # License_Type
        'REGIONAL',                                         # Special_Flags (Chinese company)
        'Developer',                                        # Skill_Level
        'Enterprise,Production',                            # Best_For
        'MiniMax Speech 2.6',                              # Model
        'Text-to-Speech (TTS)',                            # Modality
        'Ultra-low latency (<250ms); voice cloning with Fluent LoRA; seamless handling of URLs, emails, phone numbers, dates, currency; 40+ language support; natural prosody; used by LiveKit (ChatGPT), Pipecat, Vapi, smart hardware',  # Key Features
        'Streaming audio output',                           # Duration/Resolution
        'Voice selection; voice cloning; Fluent LoRA for accent correction; format auto-processing',  # Controls
        '<250ms latency (industry-leading)',               # Speed
        'API: $100/1M characters (HD), $60/1M characters (Turbo) = $0.10/1K chars (HD), $0.06/1K chars (Turbo)',  # Pricing
        'Proprietary / Commercial API',                    # License
        'Active (v2.6 Oct 2025)',                          # Update Cadence
        'Ultra-low 250ms latency for real-time voice agents; direct processing of complex text formats without pre-processing; Fluent LoRA technology corrects accents in cloned voices',  # Distinctive Edge
        'Chinese company (potential regional restrictions); API-only (developer-focused); pricing per character not per second',  # Drawbacks
        'MiniMax (Oct 2025), LiveKit, Pipecat, Vapi integration announcements'  # Notable Sources
    ]

    minimax_music_20 = [
        'MiniMax',                                          # Vendor
        'MUSIC',                                            # Primary_Category
        'Native Model',                                     # Model_Type
        'Proprietary',                                      # License_Type
        'REGIONAL',                                         # Special_Flags (Chinese company)
        'Intermediate',                                     # Skill_Level
        'Production,Marketing',                             # Best_For
        'MiniMax Music 2.0',                               # Model
        'AI Music Generation',                             # Modality
        'Generate up to 5-minute complete songs with vocals + instruments; dynamic vocals with diverse singing styles; precise instrument control and multi-instrument arrangements; supports pop, jazz, blues, rock, folk, duets, a cappella; voice cloning with style variations; film-grade monologue soundtracks; 40+ languages',  # Key Features
        'Up to 5 minutes per song (typically 2-4 min)',    # Duration/Resolution
        'Text prompts for genre, mood, style, instruments; vocal timbre control; lyrics input or AI generation; style-switching for one voice',  # Controls
        '~60 seconds generation time',                      # Speed
        'Credit-based: $9.9/120 credits, $29.9/460 credits, $59.9/1089 credits, $89.9/1998 credits (1 credit = 1 song). Effective cost: $0.04-0.08/song. Credits never expire',  # Pricing
        'Proprietary / Commercial',                        # License
        'Active (v2.0 Oct 31, 2025)',                      # Update Cadence
        'Can generate full 5-minute tracks with vocals + instruments in one generation; precise vocal timbre control allowing "one voice, multiple styles"; film-grade monologue capability; natural human-like vocal texture',  # Distinctive Edge
        'Chinese company (potential regional restrictions); credit-based pricing may be complex for new users; Reddit feedback mentions demos are "pretty basic"',  # Drawbacks
        'MiniMax (Oct 31, 2025), Reddit r/SunoAI discussion'  # Notable Sources
    ]

    # Separate by category
    print("\n[3/4] Adding new entries...")
    header = rows[0]
    data_rows = rows[1:]

    # Separate by category
    voice_audio_rows = [r for r in data_rows if r[1] == 'VOICE_AUDIO']
    music_rows = [r for r in data_rows if r[1] == 'MUSIC']
    image_gen_rows = [r for r in data_rows if r[1] == 'IMAGE_GEN']
    video_gen_rows = [r for r in data_rows if r[1] == 'VIDEO_GEN']
    lipsync_rows = [r for r in data_rows if r[1] == 'LIP_SYNC']
    platform_rows = [r for r in data_rows if r[1] == 'PLATFORM_AGGREGATOR']
    api_rows = [r for r in data_rows if r[1] == 'API_INFRASTRUCTURE']

    # Add new entries
    voice_audio_rows.append(minimax_speech_26)
    music_rows.append(minimax_music_20)

    print(f"   Added MiniMax Speech 2.6 to VOICE_AUDIO (now {len(voice_audio_rows)} entries)")
    print(f"   Added MiniMax Music 2.0 to MUSIC (now {len(music_rows)} entries)")

    # Rebuild with category order
    new_data_rows = (
        image_gen_rows +
        video_gen_rows +
        voice_audio_rows +
        music_rows +
        lipsync_rows +
        platform_rows +
        api_rows
    )

    new_rows = [header] + new_data_rows

    # Write updated CSV
    print("\n[4/4] Writing updated CSV...")
    with open(OUTPUT_CSV, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerows(new_rows)

    print(f"   Written {len(new_rows)} rows")

    print("\n" + "="*60)
    print("MINIMAX MODELS ADDED SUCCESSFULLY")
    print("="*60)
    print(f"\nDatabase now has {len(new_rows)-1} total entries:")
    print(f"  - IMAGE_GEN: {len(image_gen_rows)} entries")
    print(f"  - VIDEO_GEN: {len(video_gen_rows)} entries")
    print(f"  - VOICE_AUDIO: {len(voice_audio_rows)} entries (added MiniMax Speech 2.6)")
    print(f"  - MUSIC: {len(music_rows)} entries (added MiniMax Music 2.0)")
    print(f"  - LIP_SYNC: {len(lipsync_rows)} entries")
    print(f"  - PLATFORM_AGGREGATOR: {len(platform_rows)} entries")
    print(f"  - API_INFRASTRUCTURE: {len(api_rows)} entries")

if __name__ == '__main__':
    main()
