#!/usr/bin/env python3
"""
Add featured, date_added, and is_new fields to models.json
This script updates the models database with new fields for dynamic homepage features.
"""

import json
from datetime import datetime, timedelta
import random

# Models to mark as featured (high-quality, popular tools)
FEATURED_MODELS = [
    "Sora 2 Pro",
    "FLUX 1.1 Pro",
    "Veo 3.1",
    "Runway Gen-4 Turbo",
    "Midjourney v7",
    "ElevenLabs Turbo v3",
]

# Models to mark as new (recently added - within last 2 weeks)
NEW_MODELS = [
    "Veo 3.1",
    "Kling 1.6",
    "Recraft V3",
    "Suno v4",
    "FLUX 1.1 Ultra",
    "Ideogram v2.5",
]

def main():
    # Read the models.json file
    import os
    script_dir = os.path.dirname(os.path.abspath(__file__))
    models_path = os.path.join(script_dir, "../../data/models.json")
    
    with open(models_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Get current date
    now = datetime.now()
    
    # Update each model
    updated_count = 0
    for model in data['models']:
        model_name = model.get('model', '')
        
        # Add featured flag
        model['featured'] = any(featured in model_name for featured in FEATURED_MODELS)
        
        # Add is_new flag
        model['is_new'] = any(new in model_name for new in NEW_MODELS)
        
        # Add date_added (simulate dates for new models, older dates for others)
        if model['is_new']:
            # New models added within last 2 weeks
            days_ago = random.randint(1, 14)
            model['date_added'] = (now - timedelta(days=days_ago)).strftime('%Y-%m-%d')
        else:
            # Older models added 1-6 months ago
            days_ago = random.randint(30, 180)
            model['date_added'] = (now - timedelta(days=days_ago)).strftime('%Y-%m-%d')
        
        updated_count += 1
    
    # Update metadata
    data['metadata']['last_updated'] = now.isoformat()
    data['metadata']['version'] = "3.1"
    
    # Write back to file
    with open(models_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Updated {updated_count} models")
    print(f"📌 Featured: {sum(1 for m in data['models'] if m.get('featured'))}")
    print(f"✨ New: {sum(1 for m in data['models'] if m.get('is_new'))}")
    print(f"💾 Saved to {models_path}")

if __name__ == "__main__":
    main()
