#!/usr/bin/env python3
"""
Fix platform availability inaccuracies identified by user:
1. Add Higgsfield to Kling lipsync entries
2. Add platform aggregator availability to Runway models
3. Update collaborative platform entries with complete model lists
"""

import csv
from datetime import datetime
import shutil

def backup_csv():
    """Create single rolling backup (Option 1 strategy)"""
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

def update_kling_entries(rows):
    """Add Higgsfield availability to Kling lipsync models"""
    updates = 0
    for i, row in enumerate(rows):
        model_name = row[7]  # Model column

        # Kling 2.1 Master & Standard (lines ~77-78)
        if 'Kling 2.1' in model_name and ('Master' in model_name or 'Standard' in model_name):
            # Update Controls column to mention Higgsfield
            if 'Higgsfield' not in row[11]:
                row[11] = row[11] + '; Available on Higgsfield platform (Kling Lipsync & Kling Speak features)'
                rows[i] = row
                updates += 1
                print(f"  ✓ Updated {model_name}")

        # Kling 2.5 Turbo Pro & Standard
        elif 'Kling 2.5' in model_name:
            if 'Higgsfield' not in row[11]:
                row[11] = row[11] + '; Available on Higgsfield platform (Kling Lipsync & Kling Speak features)'
                rows[i] = row
                updates += 1
                print(f"  ✓ Updated {model_name}")

    return rows, updates

def update_runway_entries(rows):
    """Add platform aggregator availability to Runway models"""
    updates = 0

    # Platform availability by Runway model
    platform_availability = {
        'Gen-2': 'Available on multiple aggregator platforms',
        'Gen-3 Alpha': 'Available on Flora AI as "Runway 3"',
        'Gen-3 Alpha Turbo': 'Available on Flora AI',
        'Gen-4': 'Available on Freepik Spaces, Figma Weave (Weavy)',
        'Gen-4 Turbo': 'Available on Figma Weave (Weavy)',
        'Aleph': 'Available on Adobe Firefly Boards'
    }

    for i, row in enumerate(rows):
        model_name = row[7]  # Model column

        # Check each Runway model
        for model_key, platform_note in platform_availability.items():
            if model_key in model_name and 'Runway' in row[0]:  # Vendor column
                # Add to Notable Sources if not already mentioned
                if 'Available on' not in row[18]:
                    row[18] = row[18] + f'; {platform_note}'
                    rows[i] = row
                    updates += 1
                    print(f"  ✓ Updated {model_name}")
                break

    return rows, updates

def update_collaborative_platforms(rows):
    """Update collaborative platform entries with complete model lists"""
    updates = 0

    for i, row in enumerate(rows):
        model_name = row[7]  # Model column

        # Adobe Firefly Boards - already accurate, skip

        # Freepik Spaces
        if 'Freepik Spaces' in model_name:
            # Update Key Features to mention Runway Gen-4 explicitly
            if 'Runway Gen-4' not in row[9]:
                key_features = row[9]
                # Insert Runway Gen-4 into model list
                row[9] = key_features.replace('Image Generator, Video Generator',
                    'Image Generator, Video Generator (Runway Gen-4, Veo 3, Kling 2.1, MiniMax Hailuo 02)')
                rows[i] = row
                updates += 1
                print(f"  ✓ Updated {model_name}")

        # Figma Weave (formerly Weavy)
        elif 'Figma Weave' in model_name or 'Weavy' in model_name:
            # Update Key Features to specify available models
            if 'Gen-4' not in row[9]:
                key_features = row[9]
                row[9] = key_features.replace('Node-based visual workspace combining leading AI models (Seedance, Sora, others)',
                    'Node-based visual workspace combining leading AI models: Runway Gen-4 & Gen-4 Turbo, Luma Ray2, Google Veo 3, FLUX.1 Kontext, Imagen 4, Hunyuan T1, Bria.ai, Seedance, and others')
                rows[i] = row
                updates += 1
                print(f"  ✓ Updated {model_name}")

        # Flora
        elif 'Flora' == model_name and 'Flora & Fauna AI' in row[0]:  # Vendor column
            # Update Key Features to specify available models
            if 'Runway' not in row[9]:
                key_features = row[9]
                row[9] = key_features.replace('Infinite canvas integrating with existing AI models',
                    'Infinite canvas integrating with 50+ AI models including: Runway 3 (Gen-3), Luma, Pika 2.0, Kling, Veo 2/3, Flux, Minimax Hailuo, Hunyuan, Mochi, and others')
                rows[i] = row
                updates += 1
                print(f"  ✓ Updated {model_name}")

    return rows, updates

def main():
    print("\n" + "="*60)
    print("FIXING PLATFORM AVAILABILITY INACCURACIES")
    print("="*60 + "\n")

    # Create backup
    backup_csv()

    # Read current data
    header, rows = read_csv()
    print(f"Current entries: {len(rows)}\n")

    # Update Kling entries
    print("Updating Kling entries with Higgsfield availability...")
    rows, kling_updates = update_kling_entries(rows)

    # Update Runway entries
    print("\nUpdating Runway entries with platform aggregator availability...")
    rows, runway_updates = update_runway_entries(rows)

    # Update collaborative platform entries
    print("\nUpdating collaborative platform entries with model lists...")
    rows, platform_updates = update_collaborative_platforms(rows)

    # Write updated data
    write_csv(header, rows)

    print(f"\n{'='*60}")
    print(f"✓ SUCCESS! Fixed platform availability inaccuracies")
    print(f"Total updates: {kling_updates + runway_updates + platform_updates}")
    print(f"  - Kling entries: {kling_updates}")
    print(f"  - Runway entries: {runway_updates}")
    print(f"  - Platform entries: {platform_updates}")
    print(f"{'='*60}\n")

if __name__ == '__main__':
    main()
