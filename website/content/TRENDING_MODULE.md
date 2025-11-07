# Trending AI Ads & Shorts Module

**Purpose:** Provide a repeatable content structure for showcasing inspiring AI-generated ads, shorts, and community films on the website. This module complements the database by showing narrative use cases alongside the underlying models.

**Last Updated:** November 4, 2025

---

## 1. Module Overview
- **Placement:** Landing page "Featured" zone (beneath hero stats) and dedicated `/trending` route.
- **Audience Goal:** Help newcomers connect model capabilities to real-world creative outputs ("I can make *that* with these tools").
- **Source of Truth:** `notes/trending_ads.md` (editorial log) + `data/ai_video_image_models.csv` (model metadata).

---

## 2. Card Schema

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Slug (e.g., `coca-cola-holidays-2025`) |
| `title` | string | Campaign or short title |
| `creator` | string | Brand, studio, or artist |
| `format` | enum | `ad`, `short-film`, `music-video`, `community-demo` |
| `release_date` | ISO string | YYYY-MM-DD |
| `tool_stack` | string[] | Primary models/platforms (e.g., `Reve Video`, `Veo 3.1 Fast`, `Secret Level pipeline`) |
| `hook` | string | 90-char headline shown on cards |
| `why_it_matters` | string | 1-2 sentence context explaining audience value |
| `call_to_action` | { label, url } | Link to watch/case study |
| `related_models` | string[] | Model slugs referencing CSV entries |
| `credit_cost` | string | Optional note on pricing/usage (e.g., "Reve Pro - 250 seconds/mo") |
| `status` | enum | `featured`, `archived`, `queued` |
| `tags` | string[] | Themes (e.g., `holiday`, `sci-fi`, `brand`) |

> Store cards in `data/trending_spotlights.json` (to be generated from an editor-friendly YAML/MD source).

---

## 3. Content Workflow
1. **Research & Logging:** Add new campaigns to `notes/trending_ads.md` with sources and tool breakdowns.
2. **Editorial Selection:** For each release cycle, pick 2-3 active `featured` entries; move prior ones to `archived`.
3. **Metadata Sync:** Cross-reference `related_models` with CSV rows to auto-populate "Tools Used" chips and pricing snippets.
4. **Asset Prep:** Create 16:9 thumbnail (hero image) and optional portrait crop for mobile; host in `website/assets/trending/`.
5. **Deployment:** Generate `data/trending_spotlights.json` via script (to be built) that merges editorial notes with CSV metadata.

---

## 4. UX Guidelines
- Each card shows: thumbnail, title, 1-line hook, tool chips, CTA button.
- Home page carousel auto-rotates; pause on hover; includes "See Full Breakdown" link.
- `/trending` page offers filters (`format`, `tool`, `skill_level`) and supporting copy describing how to reproduce the workflow.
- Add "Try this Stack" CTA linking directly to relevant model detail pages or platform partners.
- Display credit/pricing notes for any tool that requires paid tiers (e.g., Reve boosts, Veo per-second rates).

---

## 5. Open Tasks
- [ ] Create YAML-to-JSON conversion script for spotlight cards (similar pattern to `scripts/utilities/sync_to_json.py`).
- [ ] Design thumbnail template (Figma) for consistent visual style.
- [ ] Wire module into homepage layout (update `website/TECHNICAL_ARCHITECTURE.md` once frontend spec is ready).
- [ ] Define analytics tracking (click-through, CTA usage) to gauge interest.

> **Maintainers:** Update this document whenever the schema changes or new automation is added.
