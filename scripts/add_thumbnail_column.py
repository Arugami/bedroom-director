#!/usr/bin/env python3
"""
Add thumbnail_url column to ai_video_image_models.csv
Sprint 1, Track 1: Visual-First Redesign
"""

import csv
import shutil
from datetime import datetime

# Paths
CSV_PATH = 'data/ai_video_image_models.csv'
BACKUP_PATH = 'data/backups/ai_video_image_models_BACKUP.csv'

def main():
    print("🎬 Adding thumbnail_url column to CSV...")

    # 1. Backup first (critical safety step)
    print(f"📦 Creating backup: {BACKUP_PATH}")
    shutil.copy(CSV_PATH, BACKUP_PATH)

    # 2. Read existing data
    print(f"📖 Reading {CSV_PATH}...")
    with open(CSV_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    original_count = len(rows)
    print(f"✅ Found {original_count} tools")

    # 3. Add thumbnail_url field (empty for now)
    print("➕ Adding thumbnail_url column...")
    for row in rows:
        row['thumbnail_url'] = ''  # Empty initially, will be populated later

    # 4. Define new column order (add thumbnail_url after Notable Sources)
    fieldnames = [
        'Vendor', 'Primary_Category', 'Model_Type', 'License_Type',
        'Special_Flags', 'Skill_Level', 'Best_For', 'Model', 'Modality',
        'Key Features', 'Duration/Resolution', 'Controls', 'Speed',
        'Pricing', 'License', 'Update Cadence', 'Distinctive Edge',
        'Pro Tips', 'Drawbacks', 'Notable Sources', 'thumbnail_url'
    ]

    # 5. Write back to CSV
    print(f"💾 Writing updated CSV...")
    with open(CSV_PATH, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    # 6. Verify
    with open(CSV_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        new_rows = list(reader)

    final_count = len(new_rows)

    print("\n" + "="*60)
    print("✅ THUMBNAIL COLUMN ADDED SUCCESSFULLY")
    print("="*60)
    print(f"Original row count: {original_count}")
    print(f"Final row count:    {final_count}")
    print(f"Backup saved:       {BACKUP_PATH}")
    print(f"\n📋 New columns: {', '.join(fieldnames[-3:])}")
    print("\n💡 Next step: Populate thumbnail URLs using a separate script")
    print("="*60)

if __name__ == "__main__":
    main()
