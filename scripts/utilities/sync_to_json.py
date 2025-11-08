#!/usr/bin/env python3
"""
CSV to JSON Sync Script
Converts ai_video_image_models.csv to models.json for website use
"""

import csv
import json
from datetime import datetime
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).parent.parent.parent
CSV_PATH = BASE_DIR / "data" / "ai_video_image_models.csv"
JSON_PATH = BASE_DIR / "data" / "models.json"

def csv_to_json():
    """Convert CSV to structured JSON"""
    models = []
    
    with open(CSV_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Clean up the row
            model = {
                'vendor': row['Vendor'],
                'primary_category': row['Primary_Category'],
                'model_type': row['Model_Type'],
                'license_type': row['License_Type'],
                'regional_restrictions': row.get('Regional_Restrictions', ''),
                'skill_level': row.get('Skill_Level', ''),
                'best_for': row.get('Best_For', ''),
                'model': row['Model'],
                'modality': row['Modality'],
                'key_features': row['Key Features'],
                'duration_resolution': row['Duration/Resolution'],
                'controls': row['Controls'],
                'speed': row['Speed'],
                'pricing': row['Pricing'],
                'license': row['License'],
                'update_cadence': row['Update Cadence'],
                'distinctive_edge': row['Distinctive Edge'],
                'pro_tips': row.get('Pro Tips', ''),
                'drawbacks': row['Drawbacks'],
                'notable_sources': row['Notable Sources']
            }
            models.append(model)
    
    # Create output structure
    output = {
        'metadata': {
            'version': '3.0',
            'last_updated': datetime.now().isoformat(),
            'total_models': len(models),
            'categories': {
                'IMAGE_GEN': len([m for m in models if m['primary_category'] == 'IMAGE_GEN']),
                'VIDEO_GEN': len([m for m in models if m['primary_category'] == 'VIDEO_GEN']),
                'VOICE_AUDIO': len([m for m in models if m['primary_category'] == 'VOICE_AUDIO']),
                'MUSIC': len([m for m in models if m['primary_category'] == 'MUSIC']),
                'LIP_SYNC': len([m for m in models if m['primary_category'] == 'LIP_SYNC']),
                'PLATFORM_AGGREGATOR': len([m for m in models if m['primary_category'] == 'PLATFORM_AGGREGATOR']),
                'POST_PROCESSING': len([m for m in models if m['primary_category'] == 'POST_PROCESSING']),
                'API_INFRASTRUCTURE': len([m for m in models if m['primary_category'] == 'API_INFRASTRUCTURE'])
            }
        },
        'models': models
    }
    
    # Write JSON
    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Successfully converted {len(models)} models to JSON")
    print(f"📁 Output: {JSON_PATH}")
    print(f"📊 Categories: {output['metadata']['categories']}")

if __name__ == "__main__":
    csv_to_json()
