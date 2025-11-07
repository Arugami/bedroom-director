# Project Cleanup Plan

**Date:** November 4, 2025  
**Purpose:** Organize files, remove redundancies, consolidate documentation

---

## 📊 Current File Structure Analysis

### **Root Level:**
- ✅ BRAND_IDENTITY.md (KEEP - new, essential)
- ⚠️ DOCUMENTATION_UPDATES_NOV4.md (ARCHIVE - temporary log)
- ✅ MASTER_TODO.md (KEEP - project tracker)
- ✅ README.md (KEEP - main documentation)

### **docs/ folder:**
- ✅ 00_INDEX.md (KEEP - navigation)
- ✅ 01_QUICK_START_GUIDE.md (KEEP)
- ✅ 02_ENHANCED_SCHEMA.md (KEEP)
- ✅ 03_MODEL_CATEGORIES.md (KEEP)
- ✅ 04_USER_JOURNEY_GUIDE.md (KEEP)
- ✅ 05_PLATFORM_ACCESS_GUIDE.md (KEEP)
- ⚠️ 06_WEBSITE_IMPLEMENTATION_GUIDE.md (REVIEW - may be outdated)
- ⚠️ 07_RESEARCH_LIP_SYNC_ANALYSIS.md (MOVE to research/)
- ⚠️ 07_WEBSITE_AUTO_UPDATE_STRATEGY.md (CONSOLIDATE)
- ⚠️ 08_RESEARCH_CATEGORIZATION.md (MOVE to research/)
- ⚠️ 09_RESEARCH_PLATFORM_ACCESS.md (MOVE to research/)
- ⚠️ 00_IMPLEMENTATION_SUMMARY.md (REVIEW - may be outdated)
- ⚠️ DOCUMENTATION_INDEX.md (REDUNDANT with 00_INDEX.md)

### **research/ folder:**
- ✅ ADVISORY_TARGETS.md (KEEP - new)
- ✅ ARUGAMI_INTEGRATION_STRATEGY.md (KEEP - new, essential)
- ✅ COMPETITIVE_ANALYSIS.md (KEEP - new)
- ✅ POSITIONING_STRATEGY.md (KEEP - new)
- ✅ PRICING_AUDIT_FINDINGS.md (KEEP)
- ✅ Prompting Research.md (KEEP)
- ✅ RESEARCH_FINDINGS_LIVE.md (KEEP - new)

### **website/ folder:**
- ⚠️ DESIGN_SPEC.md (REVIEW - may be outdated with new branding)
- ✅ ENHANCED_UX_VISION.md (KEEP - updated)
- ⚠️ TECHNICAL_ARCHITECTURE.md (REVIEW - may need updates)
- ✅ VISUAL_MOCKUPS.md (KEEP - new)

---

## 🎯 Cleanup Actions

### **Action 1: Archive Temporary Files**

Move to `archive/temp/`:
- [ ] DOCUMENTATION_UPDATES_NOV4.md (temporary log, not needed long-term)

### **Action 2: Consolidate Research Files**

Move from `docs/` to `research/`:
- [ ] 07_RESEARCH_LIP_SYNC_ANALYSIS.md → research/LIP_SYNC_ANALYSIS.md
- [ ] 08_RESEARCH_CATEGORIZATION.md → research/CATEGORIZATION_RESEARCH.md
- [ ] 09_RESEARCH_PLATFORM_ACCESS.md → research/PLATFORM_ACCESS_RESEARCH.md

### **Action 3: Remove Redundant Files**

Delete (after confirming content is captured elsewhere):
- [ ] docs/DOCUMENTATION_INDEX.md (redundant with 00_INDEX.md)

### **Action 4: Update Outdated Files**

Review and update with "Bedroom Director" branding:
- [ ] website/DESIGN_SPEC.md → Update with Bedroom Director branding
- [ ] website/TECHNICAL_ARCHITECTURE.md → Review and update if needed
- [ ] docs/06_WEBSITE_IMPLEMENTATION_GUIDE.md → Update or archive
- [ ] docs/00_IMPLEMENTATION_SUMMARY.md → Update or archive

### **Action 5: Consolidate Auto-Update Strategy**

Merge into one comprehensive document:
- [ ] docs/07_WEBSITE_AUTO_UPDATE_STRATEGY.md → Merge into scripts/README.md or archive

---

## 📁 Proposed Final Structure

```
AI_Image_Video_App/
├── README.md                          ✅ Main documentation
├── MASTER_TODO.md                     ✅ Project tracker
├── BRAND_IDENTITY.md                  ✅ Brand guidelines
│
├── data/                              ✅ Database files
│   ├── ai_video_image_models.csv
│   ├── models.json
│   └── backups/
│
├── docs/                              ✅ Technical documentation
│   ├── 00_INDEX.md                    ✅ Navigation
│   ├── 01_QUICK_START_GUIDE.md
│   ├── 02_ENHANCED_SCHEMA.md
│   ├── 03_MODEL_CATEGORIES.md
│   ├── 04_USER_JOURNEY_GUIDE.md
│   └── 05_PLATFORM_ACCESS_GUIDE.md
│
├── research/                          ✅ Research & strategy
│   ├── ADVISORY_TARGETS.md            ✅ Who to consult
│   ├── ARUGAMI_INTEGRATION_STRATEGY.md ✅ Integration plan
│   ├── COMPETITIVE_ANALYSIS.md        ✅ Competitor research
│   ├── POSITIONING_STRATEGY.md        ✅ Positioning
│   ├── RESEARCH_FINDINGS_LIVE.md      ✅ User research
│   ├── PRICING_AUDIT_FINDINGS.md      ✅ Pricing research
│   ├── Prompting Research.md          ✅ Prompting techniques
│   ├── LIP_SYNC_ANALYSIS.md           🔄 Moved from docs/
│   ├── CATEGORIZATION_RESEARCH.md     🔄 Moved from docs/
│   └── PLATFORM_ACCESS_RESEARCH.md    🔄 Moved from docs/
│
├── website/                           ✅ Website design
│   ├── ENHANCED_UX_VISION.md          ✅ UX strategy
│   ├── VISUAL_MOCKUPS.md              ✅ UI mockups
│   ├── DESIGN_SPEC.md                 🔄 Update with branding
│   ├── TECHNICAL_ARCHITECTURE.md      🔄 Review
│   └── content/
│
├── scripts/                           ✅ Automation scripts
│   ├── maintenance/
│   ├── monitoring/
│   ├── updates/
│   └── utilities/
│
├── notes/                             ✅ Working notes
│   ├── EMERGING_MODELS.md
│   └── trending_ads.md
│
└── archive/                           ✅ Old/deprecated files
    ├── temp/                          🔄 Temporary logs
    └── deprecated/                    🔄 Outdated docs
```

---

## ✅ Cleanup Checklist

### **Phase 1: Move Files (Low Risk)**

- [ ] Move `docs/07_RESEARCH_LIP_SYNC_ANALYSIS.md` → `research/LIP_SYNC_ANALYSIS.md`
- [ ] Move `docs/08_RESEARCH_CATEGORIZATION.md` → `research/CATEGORIZATION_RESEARCH.md`
- [ ] Move `docs/09_RESEARCH_PLATFORM_ACCESS.md` → `research/PLATFORM_ACCESS_RESEARCH.md`
- [ ] Move `DOCUMENTATION_UPDATES_NOV4.md` → `archive/temp/`

### **Phase 2: Remove Redundancies (Medium Risk)**

- [ ] Review `docs/DOCUMENTATION_INDEX.md` vs `docs/00_INDEX.md`
- [ ] If identical content, delete `DOCUMENTATION_INDEX.md`
- [ ] Update any references to point to `00_INDEX.md`

### **Phase 3: Update Branding (High Priority)**

- [ ] Update `website/DESIGN_SPEC.md` with "Bedroom Director" branding
- [ ] Review `website/TECHNICAL_ARCHITECTURE.md` for outdated info
- [ ] Review `docs/06_WEBSITE_IMPLEMENTATION_GUIDE.md` - update or archive
- [ ] Review `docs/00_IMPLEMENTATION_SUMMARY.md` - update or archive

### **Phase 4: Consolidate Strategies (Low Priority)**

- [ ] Review `docs/07_WEBSITE_AUTO_UPDATE_STRATEGY.md`
- [ ] Merge into `scripts/README.md` or archive if outdated

---

## 🎯 Priority Actions (Do First)

### **Immediate (Today):**

1. **Move research files** (5 min)
   - Keeps research/ folder organized
   - Low risk, high clarity

2. **Archive temp log** (1 min)
   - DOCUMENTATION_UPDATES_NOV4.md → archive/temp/
   - Cleans up root directory

3. **Update DESIGN_SPEC.md** (15 min)
   - Critical for brand consistency
   - Needs "Bedroom Director" branding

### **This Week:**

4. **Review and update/archive** (30 min)
   - docs/06_WEBSITE_IMPLEMENTATION_GUIDE.md
   - docs/00_IMPLEMENTATION_SUMMARY.md
   - Decide: Update or archive?

5. **Remove redundant DOCUMENTATION_INDEX.md** (5 min)
   - After confirming 00_INDEX.md has all content

---

## 📝 Files to Keep (Essential)

### **Core Documentation:**
- ✅ README.md - Main entry point
- ✅ MASTER_TODO.md - Project tracker
- ✅ BRAND_IDENTITY.md - Brand guidelines

### **Database:**
- ✅ data/ai_video_image_models.csv - Source of truth
- ✅ data/models.json - Generated file

### **Technical Docs:**
- ✅ docs/00_INDEX.md - Navigation
- ✅ docs/01-05_*.md - Core documentation

### **Research:**
- ✅ All files in research/ (all recent and valuable)

### **Website:**
- ✅ website/ENHANCED_UX_VISION.md - UX strategy
- ✅ website/VISUAL_MOCKUPS.md - UI mockups

---

## 🗑️ Files to Archive/Remove

### **Archive (move to archive/temp/):**
- ⚠️ DOCUMENTATION_UPDATES_NOV4.md - Temporary log

### **Consider Archiving (review first):**
- ⚠️ docs/00_IMPLEMENTATION_SUMMARY.md - May be outdated
- ⚠️ docs/06_WEBSITE_IMPLEMENTATION_GUIDE.md - May be outdated
- ⚠️ docs/07_WEBSITE_AUTO_UPDATE_STRATEGY.md - May be outdated

### **Remove (after confirming redundancy):**
- ⚠️ docs/DOCUMENTATION_INDEX.md - Redundant with 00_INDEX.md

---

## 🎯 Success Criteria

After cleanup, we should have:

✅ **Clear folder structure** - Each folder has a clear purpose
✅ **No redundancies** - No duplicate content
✅ **Consistent branding** - All docs reflect "Bedroom Director"
✅ **Easy navigation** - Clear index and organization
✅ **Archive for history** - Old files preserved, not deleted

---

## 🚀 Next Steps

1. **Review this plan** - Confirm actions
2. **Execute Phase 1** - Move research files (low risk)
3. **Execute Phase 2** - Archive temp files
4. **Execute Phase 3** - Update branding in key docs
5. **Execute Phase 4** - Review and archive outdated docs

**Estimated time:** 1-2 hours total

---

**Let's clean this up!** 🧹✨
