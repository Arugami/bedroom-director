# 🚨 Active Concerns & Issues

**Purpose:** Track known problems, performance issues, and blockers so all AI agents stay aligned across sessions.

**Last Updated:** November 14, 2025

---

## 🔴 Critical Issues

### 1. Production Site Performance - Tools Page Slow
**Reported:** Nov 14, 2025 @ 1:18pm  
**Status:** 🔴 Active  
**Severity:** High (impacts user experience)

**Problem:**
After implementing Sprint 1 visual-first redesign (thumbnails, new card layout, skeleton screens), the production `/tools` page is noticeably slow.

**Likely Causes:**
1. **150+ cards rendered at once** (no pagination/virtualization)
2. **Image optimization unclear:**
   - Are `thumbnail_url` values pointing to optimized thumbnails (640×360 webp) or full-size marketing images?
   - Are domains configured in `next.config.js` for Next.js Image optimization?
   - How many tools actually have thumbnails vs. falling back to placeholder?
3. **Heavy visual effects on every card:**
   - `backdrop-blur-sm` (GPU-intensive)
   - Multiple gradients + shadows
   - Hover scale transforms × 150 cards
4. **Network payload:** Total MB transferred unknown

**Next Steps:**
- [ ] Check Network tab: total MB for `/tools` page
- [ ] Run Lighthouse audit: get Performance score, LCP, CLS
- [ ] Verify thumbnail sizes in CSV (are they populated? what URLs?)
- [ ] Test on mobile: scroll performance
- [ ] Consider quick fixes:
  - Add pagination (24 tools per page)
  - Remove `backdrop-blur-sm` temporarily
  - Ensure Next.js Image optimization is working

**Files Involved:**
- `bedroom-director-web/src/components/tools/ToolCard.tsx`
- `bedroom-director-web/src/components/tools/ToolsClient.tsx`
- `data/ai_video_image_models.csv` (thumbnail_url column)
- `bedroom-director-web/next.config.js` (image domains?)

---

## 🟡 Medium Priority Issues

### 2. Thumbnail Data Completeness Unknown
**Reported:** Nov 14, 2025  
**Status:** 🟡 Needs Investigation  
**Severity:** Medium

**Problem:**
We added `thumbnail_url` column to CSV and mapped it through the pipeline, but we don't know:
- How many of 156 tools have actual thumbnail URLs populated?
- Are they placeholder paths or real image URLs?
- Do we need to generate/curate thumbnails for tools missing them?

**Next Steps:**
- [ ] Audit CSV: count how many `thumbnail_url` values are non-empty
- [ ] If mostly empty: decide on thumbnail generation strategy (AI-generated? scraped? manual curation?)
- [ ] If populated: verify URLs are accessible and optimized

**Files Involved:**
- `data/ai_video_image_models.csv`
- `scripts/utilities/sync_to_json.py`

---

### 3. No Comparison Feature Yet
**Reported:** Nov 14, 2025  
**Status:** 🟡 Planned (Sprint 2)  
**Severity:** Medium (our #1 differentiator is missing)

**Problem:**
Comparison feature is our core value prop but not yet implemented. Users can't compare tools side-by-side.

**Sprint 2 Plan:**
- Add "Compare" button functionality on cards
- Build comparison queue (sidebar or floating)
- Create `/compare` page with side-by-side table
- Add "Highlight Differences" toggle

**Files to Create:**
- `bedroom-director-web/src/lib/contexts/ComparisonContext.tsx`
- `bedroom-director-web/src/app/compare/page.tsx`
- `bedroom-director-web/src/components/compare/ComparisonTable.tsx`

---

## 🟢 Low Priority / Future Concerns

### 4. Mobile UX Not Optimized Yet
**Status:** 🟢 Planned (Sprint 3)  
**Severity:** Low (current mobile nav is "fine")

**Problem:**
No bottom tab navigation, no swipe gestures, no mobile-specific optimizations beyond responsive grid.

**Sprint 3 Plan:**
- Bottom tab bar (Home, Browse, Compare, Search)
- Swipe-to-compare gestures
- Filter drawer (instead of sidebar)

---

### 5. Use-Case Landing Pages Missing
**Status:** 🟢 Planned (Sprint 3)  
**Severity:** Low

**Problem:**
No `/for/marketing`, `/for/film`, `/for/social`, `/for/beginners` pages yet. Users can't filter by use-case.

**Sprint 3 Plan:**
- Create dynamic route `/for/[useCase]`
- Write Chiat/Day voice copy for each use-case
- Pre-filter tools based on `use_cases` tags (need to add to CSV)

---

### 6. Voice Guide Not Yet Documented
**Status:** 🟢 Planned (Sprint 1)  
**Severity:** Low

**Problem:**
We have creative partner lenses (W+K, Chiat/Day, Jobs, Hybrid) but no concrete voice guide with examples for devs to reference.

**Sprint 1 Plan:**
- Create `/docs/VOICE_GUIDE.md`
- Include 20+ example copy pairs per lens
- Add decision tree: which voice for which surface

---

## 📋 Resolved Issues

### ✅ Tool Cards Were Text-Only
**Resolved:** Nov 14, 2025  
**Solution:** Implemented visual-first card redesign with thumbnails, trust badges, and skeleton loading.

---

## 🔧 How to Use This File

**For AI Agents:**
1. Read this file at the start of each session to understand current blockers
2. Update status/next steps as you work on issues
3. Move resolved issues to "Resolved" section with date + solution
4. Add new concerns as they're discovered

**For Humans:**
1. Reference this when prioritizing work
2. Update after testing/debugging
3. Link to this file in sprint planning docs

---

## 📝 Template for New Concerns

```markdown
### [Issue Number]. [Brief Title]
**Reported:** [Date]  
**Status:** 🔴 Critical / 🟡 Medium / 🟢 Low  
**Severity:** High/Medium/Low

**Problem:**
[Clear description of the issue]

**Next Steps:**
- [ ] Action item 1
- [ ] Action item 2

**Files Involved:**
- `path/to/file.tsx`
```

---

**Last Reviewed:** November 14, 2025  
**Next Review:** After Sprint 1 completion
