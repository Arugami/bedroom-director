#!/usr/bin/env python3
"""
Quick fix to remove duplicate platform names in Notable Sources column.
Fixes entries like "fal.ai, fal.ai" or "Replicate, Replicate"
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

def remove_duplicate_platforms(rows):
    """Remove duplicate platform names from Notable Sources column"""
    updates = 0

    for i, row in enumerate(rows):
        notable_sources = row[18]

        # Check if there are duplicate platforms
        if ', fal.ai' in notable_sources or ', Replicate' in notable_sources:
            # Split by semicolons to get sections
            sections = notable_sources.split(';')

            # Process the API availability section
            for j, section in enumerate(sections):
                if 'Available via API:' in section:
                    # Extract the platforms list
                    parts = section.split('Available via API:')
                    if len(parts) == 2:
                        platforms_str = parts[1].strip()
                        platforms = [p.strip() for p in platforms_str.split(',')]

                        # Remove duplicates while preserving order
                        unique_platforms = []
                        seen = set()
                        for p in platforms:
                            if p not in seen:
                                unique_platforms.append(p)
                                seen.add(p)

                        # If we removed duplicates, rebuild the section
                        if len(unique_platforms) < len(platforms):
                            new_platforms = ', '.join(unique_platforms)
                            sections[j] = f' Available via API: {new_platforms}'
                            row[18] = ';'.join(sections)
                            rows[i] = row
                            updates += 1
                            print(f"  ✓ Fixed {row[7]}: {platforms} → {unique_platforms}")

    return rows, updates

def main():
    print("\n" + "="*60)
    print("FIXING DUPLICATE PLATFORM NAMES")
    print("="*60 + "\n")

    # Create backup
    backup_csv()

    # Read current data
    header, rows = read_csv()
    print(f"Current entries: {len(rows)}\n")

    # Remove duplicates
    print("Removing duplicate platform names...")
    rows, updates = remove_duplicate_platforms(rows)

    # Write updated data
    write_csv(header, rows)

    print(f"\n{'='*60}")
    print(f"✓ SUCCESS! Fixed {updates} entries")
    print(f"{'='*60}\n")

if __name__ == '__main__':
    main()
