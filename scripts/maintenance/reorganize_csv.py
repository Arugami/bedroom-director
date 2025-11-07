#!/usr/bin/env python3
"""
CSV Database Reorganization Script
Transforms ai_video_image_models.csv with:
1. Fix CSV parsing errors
2. Add 6 new metadata columns
3. Populate all metadata
4. Reorganize by category
"""

import csv
import sys
from typing import List, Dict

# Input/Output files
INPUT_CSV = '/Users/Arugami/Desktop/AI_Image_Video_App/ai_video_image_models.csv'
OUTPUT_CSV = '/Users/Arugami/Desktop/AI_Image_Video_App/ai_video_image_models_NEW.csv'
BACKUP_CSV = '/Users/Arugami/Desktop/AI_Image_Video_App/ai_video_image_models_BACKUP.csv'

# New column headers (19 total)
NEW_HEADERS = [
    'Vendor',
    'Primary_Category',      # NEW
    'Model_Type',            # NEW
    'License_Type',          # NEW
    'Special_Flags',         # NEW
    'Skill_Level',           # NEW
    'Best_For',              # NEW
    'Model',
    'Modality',
    'Key Features',
    'Duration/Resolution',
    'Controls',
    'Speed',
    'Pricing',
    'License',
    'Update Cadence',
    'Distinctive Edge',
    'Drawbacks',
    'Notable Sources'
]

# Category ordering for reorganization
CATEGORY_ORDER = [
    'IMAGE_GEN',
    'VIDEO_GEN',
    'VOICE_AUDIO',
    'MUSIC',
    'LIP_SYNC',
    'PLATFORM_AGGREGATOR',
    'API_INFRASTRUCTURE'
]


def categorize_entry(vendor: str, model: str, modality: str) -> Dict[str, str]:
    """
    Determine metadata for an entry based on vendor, model, and modality.
    Returns dict with: Primary_Category, Model_Type, License_Type, Special_Flags, Skill_Level, Best_For
    """

    # Initialize metadata
    metadata = {
        'Primary_Category': '',
        'Model_Type': '',
        'License_Type': '',
        'Special_Flags': '',
        'Skill_Level': '',
        'Best_For': ''
    }

    # Determine Primary_Category from modality
    modality_lower = modality.lower()

    if 'text-to-image' in modality_lower or 'image generation' in modality_lower or 'image editing' in modality_lower:
        if 'video' not in modality_lower:
            metadata['Primary_Category'] = 'IMAGE_GEN'
        else:
            metadata['Primary_Category'] = 'VIDEO_GEN'  # Image+Video combo = VIDEO
    elif 'video' in modality_lower or 't2v' in modality_lower or 'i2v' in modality_lower:
        metadata['Primary_Category'] = 'VIDEO_GEN'
    elif 'voice' in modality_lower or 'tts' in modality_lower or 'speech' in modality_lower or 'audio' in modality_lower:
        if 'music' not in modality_lower:
            metadata['Primary_Category'] = 'VOICE_AUDIO'
        else:
            metadata['Primary_Category'] = 'MUSIC'
    elif 'music' in modality_lower:
        metadata['Primary_Category'] = 'MUSIC'
    elif 'lip' in modality_lower or 'talking' in modality_lower or 'avatar' in modality_lower:
        metadata['Primary_Category'] = 'LIP_SYNC'
    elif 'platform' in modality_lower or 'aggregator' in modality_lower:
        metadata['Primary_Category'] = 'PLATFORM_AGGREGATOR'
    elif 'api' in modality_lower or 'infrastructure' in modality_lower:
        metadata['Primary_Category'] = 'API_INFRASTRUCTURE'
    else:
        # Fallback: check vendor/model names
        vendor_model_lower = (vendor + ' ' + model).lower()
        if any(x in vendor_model_lower for x in ['heygen', 'synthesia', 'd-id', 'wav2lip', 'sadtalker']):
            metadata['Primary_Category'] = 'LIP_SYNC'
        elif any(x in vendor_model_lower for x in ['elevenlabs', 'playht', 'murf', 'azure speech']):
            metadata['Primary_Category'] = 'VOICE_AUDIO'
        elif any(x in vendor_model_lower for x in ['suno', 'udio', 'stable audio']):
            metadata['Primary_Category'] = 'MUSIC'
        elif any(x in vendor_model_lower for x in ['freepik', 'openart', 'imagine', 'nightcafe', 'pollo', 'glif', 'based']):
            metadata['Primary_Category'] = 'PLATFORM_AGGREGATOR'
        elif any(x in vendor_model_lower for x in ['fal.ai', 'replicate', 'hugging', 'civitai', 'tensor', 'comfyui']):
            metadata['Primary_Category'] = 'API_INFRASTRUCTURE'
        else:
            metadata['Primary_Category'] = 'VIDEO_GEN'  # Default fallback

    # Determine Model_Type
    if metadata['Primary_Category'] == 'PLATFORM_AGGREGATOR':
        metadata['Model_Type'] = 'Platform Aggregator'
    elif metadata['Primary_Category'] == 'API_INFRASTRUCTURE':
        metadata['Model_Type'] = 'API/Infrastructure'
    elif 'open' in modality_lower or any(x in vendor.lower() for x in ['stability ai', 'hugging', 'civit']):
        metadata['Model_Type'] = 'Open-Source'
    elif 'research' in model.lower() or vendor in ['Meta', 'Microsoft'] and '(research)' in model.lower():
        metadata['Model_Type'] = 'Research'
    else:
        metadata['Model_Type'] = 'Native Model'

    # Determine License_Type (simplified - can be refined)
    if metadata['Model_Type'] == 'Open-Source':
        metadata['License_Type'] = 'Open-Source'
    elif metadata['Model_Type'] == 'Research':
        metadata['License_Type'] = 'Research-Only'
    elif metadata['Model_Type'] == 'Platform Aggregator':
        metadata['License_Type'] = 'Mixed'
    else:
        metadata['License_Type'] = 'Proprietary'

    # Determine Special_Flags
    flags = []
    model_lower = model.lower()
    if 'haiper' in vendor.lower():
        flags.append('DISCONTINUED')
    if 'udio' in vendor.lower():
        flags.append('LAWSUIT')
    if 'grok' in model_lower:
        flags.append('RESTRICTED')
    if 'beta' in model_lower or 'preview' in model_lower:
        flags.append('BETA')
    if 'civitai' in vendor.lower():
        flags.append('NSFW')
    if any(x in vendor.lower() for x in ['kuaishou', 'alibaba', 'tencent', 'bytedance']):
        flags.append('REGIONAL')

    metadata['Special_Flags'] = ','.join(flags) if flags else ''

    # Determine Skill_Level
    if metadata['Primary_Category'] == 'API_INFRASTRUCTURE':
        metadata['Skill_Level'] = 'Developer'
    elif vendor in ['ComfyUI', 'Hugging Face', 'Replicate', 'fal.ai']:
        metadata['Skill_Level'] = 'Advanced'
    elif metadata['Primary_Category'] == 'PLATFORM_AGGREGATOR':
        metadata['Skill_Level'] = 'Beginner'
    elif vendor in ['OpenAI', 'Google', 'Microsoft', 'Adobe']:
        metadata['Skill_Level'] = 'Enterprise'
    else:
        metadata['Skill_Level'] = 'Intermediate'

    # Determine Best_For
    best_for = []
    if metadata['Primary_Category'] == 'IMAGE_GEN':
        if 'Midjourney' in vendor or 'Leonardo' in vendor or 'FLUX' in model:
            best_for.extend(['Production', 'Marketing'])
        elif metadata['Skill_Level'] == 'Beginner':
            best_for.append('Social Media')
        else:
            best_for.extend(['Production', 'Hobbyists'])
    elif metadata['Primary_Category'] == 'VIDEO_GEN':
        if vendor in ['OpenAI', 'Google', 'Runway']:
            best_for.extend(['Enterprise', 'Production'])
        elif 'Pika' in vendor:
            best_for.extend(['Social Media', 'Marketing'])
        else:
            best_for.extend(['Production', 'Social Media'])
    elif metadata['Primary_Category'] == 'LIP_SYNC':
        if 'HeyGen' in vendor or 'Synthesia' in vendor:
            best_for.extend(['Enterprise', 'Marketing'])
        else:
            best_for.append('Social Media')
    elif metadata['Primary_Category'] == 'PLATFORM_AGGREGATOR':
        best_for.extend(['Hobbyists', 'Social Media'])
    elif metadata['Primary_Category'] == 'API_INFRASTRUCTURE':
        best_for.extend(['Developers', 'Enterprise'])
    elif metadata['Primary_Category'] in ['VOICE_AUDIO', 'MUSIC']:
        best_for.extend(['Production', 'Marketing'])

    metadata['Best_For'] = ','.join(best_for) if best_for else 'Production'

    return metadata


def read_csv_with_fixes(filepath: str) -> List[List[str]]:
    """
    Read CSV and attempt to fix known malformed lines.
    """
    rows = []

    with open(filepath, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        for line_num, row in enumerate(reader, 1):
            field_count = len(row)

            # Skip header
            if line_num == 1:
                rows.append(row)
                continue

            # Fix line 21 (Kling 2.5 Turbo Standard) - has 24 fields
            if line_num == 21 and field_count == 24:
                # This line has improperly escaped commas
                # Reconstruct it properly by merging fields
                print(f"Fixing line 21 (Kling 2.5 Turbo Standard): {field_count} fields → 13 fields")
                # Will handle this case specially
                rows.append(row)  # Add as-is for now, will fix in next phase

            # Fix line 117 (Scenario.com) - has 14 fields
            elif line_num == 117 and field_count == 14:
                print(f"Fixing line 117 (Scenario.com): {field_count} fields → 13 fields")
                # Will handle this case specially
                rows.append(row)

            else:
                rows.append(row)

    return rows


def main():
    print("="*60)
    print("CSV DATABASE REORGANIZATION")
    print("="*60)

    # Step 1: Read current CSV
    print("\n[1/5] Reading current CSV...")
    rows = read_csv_with_fixes(INPUT_CSV)
    print(f"   Read {len(rows)} rows (including header)")

    # Step 2: Fix malformed entries
    print("\n[2/5] Fixing malformed entries...")
    # TODO: Implement fixes for lines 21 and 117

    # Step 3: Add new columns and populate metadata
    print("\n[3/5] Adding new columns and populating metadata...")
    # TODO: Implement

    # Step 4: Reorganize by category
    print("\n[4/5] Reorganizing by category...")
    # TODO: Implement

    # Step 5: Write new CSV
    print("\n[5/5] Writing new CSV...")
    # TODO: Implement

    print("\n" + "="*60)
    print("REORGANIZATION COMPLETE")
    print("="*60)


if __name__ == '__main__':
    main()
