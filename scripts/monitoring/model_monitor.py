#!/usr/bin/env python3
"""
Model Monitoring Bot
Checks RSS feeds and Twitter for new AI model announcements
Run daily via cron or GitHub Actions
"""

import feedparser
import requests
from datetime import datetime, timedelta
from pathlib import Path

# Configuration
RSS_FEEDS = {
    'OpenAI': 'https://openai.com/blog/rss',
    'Google AI': 'https://blog.google/technology/ai/rss/',
    'Runway': 'https://runway.com/blog/rss',
    'Stability AI': 'https://stability.ai/blog/rss',
    'Anthropic': 'https://www.anthropic.com/news/rss',
}

KEYWORDS = [
    'model', 'release', 'launch', 'announce', 'available',
    'video generation', 'image generation', 'text-to-video',
    'text-to-image', 'AI model', 'foundation model'
]

def check_rss_feeds():
    """Check RSS feeds for new model announcements"""
    findings = []
    cutoff_date = datetime.now() - timedelta(days=1)
    
    for source, feed_url in RSS_FEEDS.items():
        try:
            feed = feedparser.parse(feed_url)
            for entry in feed.entries:
                # Check if entry is recent
                published = datetime(*entry.published_parsed[:6])
                if published < cutoff_date:
                    continue
                
                # Check if entry mentions model-related keywords
                title_lower = entry.title.lower()
                summary_lower = entry.get('summary', '').lower()
                
                if any(keyword in title_lower or keyword in summary_lower for keyword in KEYWORDS):
                    findings.append({
                        'source': source,
                        'title': entry.title,
                        'link': entry.link,
                        'published': published.isoformat(),
                        'summary': entry.get('summary', '')[:200] + '...'
                    })
        except Exception as e:
            print(f"❌ Error checking {source}: {e}")
    
    return findings

def generate_report(findings):
    """Generate daily digest report"""
    if not findings:
        print("✅ No new model announcements found in the last 24 hours")
        return
    
    print(f"\n🔔 Found {len(findings)} potential new model announcements:\n")
    print("=" * 80)
    
    for i, finding in enumerate(findings, 1):
        print(f"\n{i}. {finding['title']}")
        print(f"   Source: {finding['source']}")
        print(f"   Published: {finding['published']}")
        print(f"   Link: {finding['link']}")
        print(f"   Summary: {finding['summary']}")
        print("-" * 80)
    
    # TODO: Send email or Slack notification
    # TODO: Auto-create draft in EMERGING_MODELS.md

def main():
    print("🤖 Model Monitoring Bot - Daily Check")
    print(f"⏰ {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    
    findings = check_rss_feeds()
    generate_report(findings)
    
    print(f"\n✅ Monitoring complete. Checked {len(RSS_FEEDS)} sources.")

if __name__ == "__main__":
    main()
