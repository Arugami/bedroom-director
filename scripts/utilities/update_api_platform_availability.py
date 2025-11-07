#!/usr/bin/env python3
"""
Update database with API platform availability discovered from research.

Based on comprehensive research of:
- fal.ai: 50+ video models, extensive image/audio models
- Replicate: 30+ video models with pricing/speed benchmarks
- Existing Pollo.ai, BasedLabs, etc.

This adds "Notable Sources" annotations for API platform availability.
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

# API Platform Availability Mapping
# Format: {model_key: {'fal.ai': status, 'Replicate': status, 'Pollo.ai': status}}

API_AVAILABILITY = {
    # VIDEO MODELS
    'Veo 3': {'fal.ai': True, 'Replicate': True},
    'Veo 3.1': {'fal.ai': True},
    'Veo 3 Fast': {'fal.ai': True, 'Replicate': True},
    'Veo 2': {'fal.ai': False, 'Replicate': True},

    'Sora 2': {'fal.ai': True},  # Both Standard & Pro
    'Sora v1': {'fal.ai': False, 'Replicate': False},  # Not on APIs

    'Kling 2.5 Turbo Pro': {'fal.ai': True, 'Replicate': False},
    'Kling 2.5 Turbo Standard': {'fal.ai': True, 'Replicate': False},
    'Kling 2.1 Master': {'fal.ai': True, 'Replicate': True},
    'Kling 2.1 Standard': {'fal.ai': True, 'Replicate': True},
    'Kling 1.6 Pro': {'fal.ai': False, 'Replicate': True},
    'Kling 1.6 Standard': {'fal.ai': False, 'Replicate': True},

    'Seedance v1 Pro': {'fal.ai': False, 'Replicate': True},
    'Seedance v1 Lite': {'fal.ai': False, 'Replicate': True},

    'Hailuo 02': {'fal.ai': True, 'Replicate': True},
    'Hailuo 02 Fast': {'fal.ai': False, 'Replicate': True},
    'Hailuo 2.3': {'fal.ai': False, 'Replicate': False},

    'Wan 2.5': {'fal.ai': True},
    'Wan 2.2': {'fal.ai': True, 'Replicate': True},
    'Wan 2.1': {'fal.ai': False, 'Replicate': True},

    'Gen-4 Turbo': {'fal.ai': False, 'Replicate': True},
    'Gen-4': {'fal.ai': False, 'Replicate': False},  # Not on major APIs
    'Gen-3 Alpha': {'fal.ai': False, 'Replicate': False},

    'Ray 2': {'fal.ai': False, 'Replicate': True},
    'Ray 2 Flash': {'fal.ai': False, 'Replicate': True},
    'Ray 3': {'fal.ai': False, 'Replicate': False},

    'Pika 2.2': {'fal.ai': False, 'Replicate': False},
    'PixVerse v4': {'fal.ai': False, 'Replicate': True},
    'PixVerse v4.5': {'fal.ai': False, 'Replicate': True},
    'PixVerse v5': {'fal.ai': True, 'Replicate': False},

    # IMAGE MODELS
    'FLUX 1.1 Pro': {'fal.ai': True, 'Replicate': True},
    'FLUX 1.1 Ultra': {'fal.ai': True, 'Replicate': False},
    'FLUX 1.0 Dev': {'fal.ai': True, 'Replicate': True},
    'FLUX 1.0 Schnell': {'fal.ai': True, 'Replicate': True},
    'FLUX 1.1 Kontext': {'fal.ai': True, 'Replicate': False},

    'Recraft V3': {'fal.ai': True, 'Replicate': True},
    'Imagen 4': {'fal.ai': True, 'Replicate': False},
    'Imagen 3': {'fal.ai': True, 'Replicate': False},

    'SD 3.5 Large': {'fal.ai': True, 'Replicate': True},
    'SD 3.5 Medium': {'fal.ai': True, 'Replicate': True},
    'SDXL': {'fal.ai': True, 'Replicate': True},

    # AUDIO MODELS
    'MiniMax Speech 2.6': {'fal.ai': True},
    'MiniMax Music 2.0': {'fal.ai': True},

    # UPSCALERS
    'RunwayML Upscaler v1': {'fal.ai': False, 'Replicate': True},
    'Topaz Video': {'fal.ai': True, 'Replicate': False},
}

def update_model_availability(rows):
    """Update models with API platform availability"""
    updates = 0

    for i, row in enumerate(rows):
        vendor = row[0]
        model_name = row[7]
        notable_sources = row[18]

        # Check if this model has API availability data
        matched = False
        platforms_available = []

        for model_key, platforms in API_AVAILABILITY.items():
            if model_key in model_name:
                matched = True

                # Build list of available platforms
                for platform, available in platforms.items():
                    if available and platform not in notable_sources:
                        platforms_available.append(platform)

        if matched and platforms_available:
            # Add API availability note
            api_note = f"; Available via API: {', '.join(platforms_available)}"

            # Only add if not already present
            if 'Available via API' not in notable_sources:
                row[18] = notable_sources + api_note
                rows[i] = row
                updates += 1
                print(f"  ✓ {model_name}: Added {', '.join(platforms_available)}")

    return rows, updates

def main():
    print("\n" + "="*70)
    print("UPDATE API PLATFORM AVAILABILITY")
    print("="*70 + "\n")

    # Create backup
    backup_csv()

    # Read current data
    header, rows = read_csv()
    print(f"Current entries: {len(rows)}\n")

    # Update with API availability
    print("Adding API platform availability to models...")
    rows, updates = update_model_availability(rows)

    # Write updated data
    write_csv(header, rows)

    print(f"\n{'='*70}")
    print(f"✓ SUCCESS! Updated {updates} entries with API availability")
    print(f"{'='*70}\n")

    print("API Platforms added:")
    print("  - fal.ai (50+ video models, optimized inference)")
    print("  - Replicate (30+ video models, pay-per-second)")
    print("")
    print("Models now show: 'Available via API: fal.ai, Replicate'")

if __name__ == '__main__':
    main()
