# Website Auto-Update Strategy

**Last Updated:** November 4, 2025

---

## Goal: Keep Website Current

Three-tier update system:
1. **Critical** (same day): Major releases, pricing changes
2. **Regular** (weekly): New models from EMERGING_MODELS.md
3. **Maintenance** (monthly): Pricing audits, API checks

---

## Automation Tools Needed

### 1. Model Monitoring Bot (High Priority)
- Monitors RSS feeds, Twitter, Reddit
- Sends daily digest of new models
- Auto-updates EMERGING_MODELS.md

### 2. CSV-to-JSON Sync (High Priority)
- Auto-generates models.json from CSV
- Runs on Git pre-commit hook
- Validates data before deployment

### 3. Pricing Monitor (Medium Priority)
- Monthly scraping of official pricing pages
- Flags discrepancies
- Creates GitHub issues for review

### 4. Deployment Pipeline
- GitHub Actions auto-deploy on CSV changes
- Validates data before deployment
- Updates website in under 2 minutes

---

## Update Frequency

| Category | Frequency | Automation |
|----------|-----------|------------|
| New Models | Weekly | Semi-auto |
| Pricing | Monthly | Semi-auto |
| Features | Bi-weekly | Manual |
| Emerging | Daily | Automated |

---

## Implementation Priority

**Phase 1 (Week 1-2):**
- CSV-to-JSON sync script
- GitHub Actions deployment
- Pre-commit validation

**Phase 2 (Week 3-4):**
- RSS/Twitter monitoring
- Daily digest emails
- Emerging models tracker

**Phase 3 (Month 2+):**
- Pricing verification bot
- API availability checker
- Advanced analytics
