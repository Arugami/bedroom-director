# Bedroom Director – Finance & Business Strategy

> **Role:** Master financial strategy document. Covers monetization model, pricing strategy, unit economics, growth targets, and competitive positioning.  
> **Related docs:**  
> - Model costs: `research/bedroom-director-pricing-tiers.md`  
> - Market positioning: `research/market-competitive/competitive-analysis.md`  
> - Product roadmap: `master-todo.md`, `current-sprint.md`  
> - Target users: `research/personas/`

**Last Updated:** November 20, 2025  
**Status:** Living document – update as product evolves

---

## Executive Summary

**Business Model:** Freemium SaaS with tiered AI model quality  
**Primary Revenue:** Subscription tiers ($0, $5-9, $19-29, $49-99/month)  
**Target Market:** AI filmmakers, content creators, indie studios  
**Competitive Edge:** Best AI director assistant, premium models at accessible prices  
**Break-Even:** ~500 paid users at $19/month average  
**12-Month Goal:** 5,000 users (4,000 free, 1,000 paid), $15-20K MRR

---

## 1. Monetization Model

### Revenue Streams

#### **Primary: Subscription Tiers**
| Tier | Price | Target Users | Revenue Model |
|------|-------|--------------|---------------|
| **Free** | $0 | New users, testers | Loss leader for acquisition |
| **Starter** | $5-9 | Students, hobbyists | High-volume, low-margin |
| **Professional** | $19-29 | Indie creators, YouTubers | Core revenue driver |
| **Premium** | $49-99 | Studios, agencies | Premium margin, white-glove |

#### **Secondary Revenue (Future)**
- **Overage fees:** $10 per 10M tokens beyond plan limits
- **Enterprise:** Custom pricing for teams (5+ seats)
- **Marketplace:** Premium scene templates (20% cut)
- **White-label:** API access for other tools ($99-299/month)

---

## 2. Unit Economics by Tier

### Assumptions
- **Typical usage:** Light user = 10M tokens + 5K images/month
- **API costs:** Based on Goldilocks config (GPT-5.1 + Gemini Flash)
- **Infrastructure:** $1-3/user/month (hosting, DB, storage)
- **Customer acquisition cost (CAC):** $10-15 initially (organic growth)
- **Lifetime value (LTV):** 12-month retention average

---

### FREE Tier Economics

**Pricing:** $0/month  
**Limits:** 3 projects, 20 scenes, 5M tokens, 500 images  
**Models:** Grok 4.1 Fast (free) + gpt-oss-20b (free) + GPT-4o-mini ($0.15/$0.60)

**Monthly cost per user:**
- API: $4.83 (Vision only)
- Infrastructure: $2
- **Total cost:** $6.83/user/month

**Revenue:** $0  
**Net:** -$6.83/user/month

**Strategy:**
- **Purpose:** Viral growth, user acquisition, try-before-buy
- **Conversion target:** 10-15% upgrade to Starter within 90 days
- **Break-even math:** 10% × $5/month × 12 months = $6 LTV (covers cost)
- **Acceptable loss:** $7/month per free user for growth

---

### STARTER Tier Economics

**Pricing:** $5-9/month  
**Models:** Gemini 2.5 Flash + Flash Lite (all Google)

**Monthly cost per user (typical light usage: 10M tokens, 5K images):**
- API: $7.34 × 10 = $73.40
- Infrastructure: $1
- **Total cost:** $74.40/user/month

**Revenue:** $5-9/month  
**Net:** -$65-69/user/month (loss leader)

**Reality check:**
- **Most users (80%):** Under 5M tokens = $36.70 API cost → **Break-even at $9/month**
- **Heavy users (20%):** 10M+ tokens = subsidized by upsells

**Strategy:**
- **Purpose:** Volume play, gateway to Professional
- **Upsell target:** 5% upgrade to Professional within 6 months
- **Blended LTV:** $60 (Starter) + $68.40 (5% Pro conversion) = **$128.40 LTV**
- **Loss:** Acceptable at early stage for user base growth

---

### PROFESSIONAL Tier Economics (CORE REVENUE)

**Pricing:** $19-29/month  
**Models:** GPT-5.1 + Gemini Flash Lite + Gemini Flash (Goldilocks config)

**Monthly cost per user (typical usage: 20M tokens, 5K images):**
- API: $15.79 × 20 = $315.80
- Infrastructure: $2
- **Total cost:** $317.80/user/month

**Revenue:** $19-29/month  
**Net:** -$288-298/user/month (appears unprofitable, BUT...)

**Reality check (usage distribution):**
- **70% Light users:** 10M tokens = $157.90 API → Revenue $228 → **+$70 profit/user**
- **20% Medium users:** 25M tokens = $394.75 API → Revenue $228 + overages → **Break-even**
- **10% Heavy users:** 50M+ tokens = Pay overages ($10 per 10M) → **Profitable**

**Blended economics:**
- Average profit: **$40-60/user/month**
- **LTV:** $480-720/year (assuming 12-month retention)
- **Target:** 500-1,000 Professional users = **$9,500-29,000 MRR**

**Strategy:**
- **Purpose:** Core revenue driver, balances experience + profitability
- **Pricing:** $19 base (most users profit), overages for heavy users
- **Volume goal:** 1,000 Professional users = $19K MRR

---

### PREMIUM Tier Economics

**Pricing:** $49-99/month  
**Models:** Claude Sonnet 4.5 + GPT-4.1 + Gemini 3 Pro

**Monthly cost per user (typical usage: 15M tokens, 10K images):**
- API: $50.26 × 15 = $753.90
- Infrastructure: $3
- **Total cost:** $756.90/user/month

**Revenue:** $49-99/month  
**Net:** -$657-707/user/month (highly unprofitable at low usage)

**Reality check:**
- **Target usage:** 10-15M tokens (sweet spot for profitability)
- **At 12M tokens:** $603 API cost vs $588 revenue → **Break-even at $49**
- **Enterprise pricing:** Custom ($99-299/month for heavy users)

**Strategy:**
- **Purpose:** Prestige tier, enterprise gateway, competitive positioning
- **Target:** 50-100 Premium users initially
- **Enterprise:** Custom pricing for 30M+ tokens, white-glove support
- **Positioning:** "Best AI director in the industry"

---

## 3. Growth Targets & Milestones

### Phase 1: MVP Launch (Months 1-3)
**Goal:** Validate product-market fit, build initial user base

- **100 total users** (80 free, 20 paid)
- **$100-200/month MRR**
- **Metrics:** Retention, feature usage, conversion rate
- **Focus:** Free + Starter tiers only
- **CAC:** $5-10 (organic, word-of-mouth, Twitter)

---

### Phase 2: Early Growth (Months 4-6)
**Goal:** Scale user acquisition, validate Professional tier

- **1,000 total users** (700 free, 300 paid)
- **$2,500-4,000/month MRR**
- **Tiers:** Free + Starter (250) + Professional (50)
- **Metrics:** Starter→Pro conversion (target 5%), churn (<10%)
- **CAC:** $10-15 (content marketing, partnerships)

---

### Phase 3: Revenue Growth (Months 7-12)
**Goal:** Profitability, scale Professional tier

- **5,000 total users** (4,000 free, 1,000 paid)
- **$15,000-20,000/month MRR**
- **Tiers:** Free (4,000) + Starter (500) + Pro (450) + Premium (50)
- **Metrics:** Pro tier dominance (45% of paid users), <5% churn
- **Break-even:** ~$12K MRR covers infrastructure + AI costs
- **Profit:** $3-8K/month net

---

### 12-Month Financial Targets

| Metric | Month 3 | Month 6 | Month 12 |
|--------|---------|---------|----------|
| **Total Users** | 100 | 1,000 | 5,000 |
| **Free Users** | 80 | 700 | 4,000 |
| **Paid Users** | 20 | 300 | 1,000 |
| **MRR** | $200 | $3,500 | $18,000 |
| **ARR** | $2,400 | $42,000 | $216,000 |
| **API Costs** | $500 | $4,000 | $15,000 |
| **Infrastructure** | $100 | $800 | $3,500 |
| **Net Profit/Loss** | -$400 | -$1,300 | -$500 to +$2K |

**Break-even:** Month 10-12 at ~500 Professional users

---

## 4. Competitive Positioning

### Market Landscape

**Direct Competitors:**
- Runway, Pika Labs, LumaLabs (video generation tools)
- Kling, Hailuo (international players)
- Traditional tools: DaVinci Resolve, Premiere Pro

**Our Differentiation:**
1. **AI Director Assistant** (conversational, agentic, not just generation)
2. **Visual Bible integration** (AI understands your references)
3. **Scene-first workflow** (structured storytelling vs random clips)
4. **Premium AI models** (GPT-5.1, Claude Sonnet, Gemini 3 Pro)
5. **Accessible pricing** ($19 Pro tier vs $95+ competitors)

### Pricing vs Competition

| Product | Entry | Pro | Enterprise | Notes |
|---------|-------|-----|------------|-------|
| **Runway** | $12 | $28-76 | Custom | Pay-per-use credits |
| **Pika Labs** | $0 | $10-58 | - | Limited free tier |
| **LumaLabs** | $0 | $29.99 | - | Pay-per-credit |
| **BedroomDirector** | $0 | $19-29 | $49-99 | AI director + generation |

**Competitive advantage:**
- **Lower Pro tier:** $19 vs $28-76 (Runway)
- **Better free tier:** 5M tokens vs limited credits
- **AI conversation:** Only product with director assistant
- **Transparent pricing:** Subscription vs confusing credits

---

## 5. Pricing Strategy & Psychology

### Tier Positioning

**Free:** "Try before you buy"
- **Goal:** Viral growth, remove friction
- **Messaging:** "Start creating for free, upgrade when ready"
- **Limits:** 3 projects, 20 scenes (creates scarcity)
- **CTA:** "Upgrade for unlimited projects"

**Starter ($5-9):** "Smart creator's choice"
- **Goal:** Volume, gateway to Pro
- **Messaging:** "1M context, better than GPT-4o-mini, cheaper than you think"
- **Value prop:** Unlimited projects, advanced AI
- **CTA:** "Need better models? Upgrade to Professional"

**Professional ($19-29):** "Industry standard" (ANCHOR)
- **Goal:** Core revenue, profitability
- **Messaging:** "Serious filmmakers use Professional"
- **Value prop:** GPT-5.1, 1M context, premium experience
- **Positioning:** Most popular tier (social proof)

**Premium ($49-99):** "Best in the world"
- **Goal:** Prestige, enterprise, competitive edge
- **Messaging:** "The best AI filmmaking assistant money can buy"
- **Value prop:** Claude Sonnet 4.5, unlimited, white-glove support
- **Positioning:** "If you have to ask, you can't afford it"

---

### Anchoring Strategy

**Show tiers in this order:**
1. **Premium** ($49-99) – Anchor high
2. **Professional** ($19-29) – "Smart choice" (target)
3. **Starter** ($5-9) – "Great value"
4. **Free** ($0) – "No risk"

**Psychology:**
- Premium anchors expectations ("$49 is the best")
- Professional looks like a steal ($19 vs $49)
- Starter is impulse-buy territory ($5-9)
- Free removes all friction

---

## 6. Key Financial Risks & Mitigations

### Risk 1: API Cost Overruns
**Scenario:** Heavy users abuse system, API costs spiral  
**Impact:** $10K-50K unexpected costs  
**Probability:** Medium

**Mitigation:**
- ✅ Token/image limits per tier
- ✅ Overage fees ($10 per 10M tokens)
- ✅ Rate limiting (max 100 requests/day for Free tier)
- ✅ Monitor top 10% users weekly, contact if needed
- ✅ Fallback to cheaper models if costs spike

---

### Risk 2: Low Conversion Rates
**Scenario:** Free users don't convert, <5% upgrade rate  
**Impact:** Unsustainable free tier costs  
**Probability:** Medium-Low

**Mitigation:**
- ✅ Aggressive project/scene limits on Free (3/20)
- ✅ In-app upsell prompts ("Upgrade to unlock")
- ✅ Email drip campaigns (feature highlights)
- ✅ Reduce free tier limits if <10% conversion
- ✅ Watermark free tier exports ("Made with Bedroom Director Free")

---

### Risk 3: Churn / Retention Issues
**Scenario:** Users subscribe, export project, cancel (one-time use)  
**Impact:** Low LTV, unsustainable unit economics  
**Probability:** High initially

**Mitigation:**
- ✅ Annual plans (discount 15%, lock in retention)
- ✅ Project continuity (multi-project workflows)
- ✅ Community features (share templates, get feedback)
- ✅ Regular updates (new models, features monthly)
- ✅ Success metrics dashboard (show value: "You've created X scenes this month")

---

### Risk 4: Model Price Increases
**Scenario:** OpenAI/Google raise API prices 20-50%  
**Impact:** Profit margins collapse  
**Probability:** Low-Medium

**Mitigation:**
- ✅ Multi-provider strategy (OpenAI + Google + Anthropic)
- ✅ Fallback models (cheaper alternatives ready)
- ✅ Price adjustments clause in ToS
- ✅ Lock in API credits with providers (pre-pay)
- ✅ Optimize prompts to reduce token usage

---

## 7. Path to Profitability

### Break-Even Analysis

**Fixed costs (monthly):**
- Infrastructure: $500 (hosting, DB, monitoring)
- Development: $0 (founder time)
- Marketing: $500 (organic initially)
- **Total fixed:** $1,000/month

**Variable costs:**
- API: $15.79 per 1M tokens (Goldilocks config)
- Infra per user: $2/month

**Break-even calculation (Professional tier @$19):**
- Need to cover: $1,000 fixed + variable costs
- Average profit per Pro user: $50/month (light usage)
- **Break-even: 20 Professional users = $1,000 fixed costs covered**
- **Comfortable: 100 Pro users = $5K MRR, ~$3K profit**

### Profitability Scenarios

**Conservative (Month 12):**
- 500 Professional users @ $19 = $9,500 MRR
- 200 Starter users @ $7 = $1,400 MRR
- 20 Premium users @ $49 = $980 MRR
- **Total: $11,880 MRR**
- API costs: $6,000
- Infrastructure: $2,500
- **Net profit: $3,380/month** ($40K/year)

**Optimistic (Month 12):**
- 1,000 Professional users @ $22 avg = $22,000 MRR
- 500 Starter users @ $7 = $3,500 MRR
- 50 Premium users @ $65 avg = $3,250 MRR
- **Total: $28,750 MRR**
- API costs: $12,000
- Infrastructure: $4,500
- **Net profit: $12,250/month** ($147K/year)

---

## 8. 2025-2026 Roadmap

### Q1 2025 (Months 1-3): Foundation
- [ ] Launch Free + Starter tiers
- [ ] 100 users (MVP validation)
- [ ] Goldilocks config (GPT-5.1 + Gemini)
- [ ] Metrics dashboard (usage, conversion, churn)
- [ ] Goal: $200 MRR, <20% churn

### Q2 2025 (Months 4-6): Growth
- [ ] Launch Professional tier ($19)
- [ ] 1,000 users (scale acquisition)
- [ ] Overage fee implementation
- [ ] Referral program (10% discount for referrer)
- [ ] Goal: $3,500 MRR, 5% Free→Starter conversion

### Q3 2025 (Months 7-9): Revenue
- [ ] Launch Premium tier ($49-99)
- [ ] Annual plans (15% discount)
- [ ] Enterprise pilot (custom pricing)
- [ ] Community features (marketplace MVP)
- [ ] Goal: $10K MRR, 100+ Pro users

### Q4 2025 (Months 10-12): Profitability
- [ ] Break-even (500 Pro users)
- [ ] White-label API (pilot)
- [ ] Template marketplace (revenue share)
- [ ] International expansion (pricing parity)
- [ ] Goal: $18K MRR, profitability

---

## 9. Key Metrics Dashboard

### North Star Metrics
- **Primary:** Monthly Recurring Revenue (MRR)
- **Secondary:** Paid user count
- **Tertiary:** Free→Paid conversion rate

### Weekly Tracking
| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **Total Users** | 5,000 (12mo) | - | - |
| **MRR** | $18K (12mo) | - | - |
| **Free→Starter** | 10-15% | - | - |
| **Starter→Pro** | 5% | - | - |
| **Churn (monthly)** | <10% | - | - |
| **API Cost/User** | <$150 | - | - |
| **CAC** | <$15 | - | - |
| **LTV:CAC** | >3:1 | - | - |

---

## 10. Decision Framework

### When to Adjust Pricing

**Raise Prices If:**
- Conversion >15% (Free→Paid)
- Churn <5% monthly
- Demand > capacity (waitlist)
- Competitors raise prices

**Lower Prices If:**
- Conversion <5% (Free→Paid)
- Churn >15% monthly
- Negative feedback on value
- API costs drop 30%+

### When to Add/Remove Tiers

**Add Premium Tier If:**
- 20+ users request "unlimited"
- Enterprise inquiries (5+ seats)
- Competition launches $50+ tiers

**Sunset Starter Tier If:**
- Conversion <5% after 6 months
- API costs make it unprofitable
- Too much support burden

---

## Conclusion

**Financial strategy:**
- **Freemium growth** (acquire 4,000 free users)
- **Professional tier** as core revenue (1,000 users @ $19 = $19K MRR)
- **Premium tier** as prestige/enterprise (50 users @ $65 avg = $3K MRR)
- **Break-even** at ~500 Professional users (Month 10-12)
- **Profitability** at 1,000 Professional users ($12K+ monthly profit)

**Success criteria:**
- Month 6: $3,500 MRR, 300 paid users
- Month 12: $18K MRR, 1,000 paid users, profitable
- Month 24: $75K MRR, 5,000 paid users, $40K+ monthly profit

**Next steps:**
1. Launch Goldilocks config (GPT-5.1 + Gemini)
2. Implement Free + Starter tiers
3. Track metrics weekly
4. Iterate based on data
5. Add Professional tier at Month 4
