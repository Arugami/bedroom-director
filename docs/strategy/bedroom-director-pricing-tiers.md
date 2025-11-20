# Bedroom Director – AI Model Pricing Tiers

> **Role:** Pricing and packaging for model configurations. This doc maps recommended model stacks to user-facing tiers (Free, Starter, Professional, Premium) and includes API cost math.  
> **Canonical model choices:** `docs/strategy/bedroom-director-model-recommendations.md`  
> **Raw per-model research:** `research/models/openrouter-model-research-bedroom-director.md`  
> **AI usage & training strategy:** `docs/strategy/ai-model-strategy-and-training-roadmap.md`

**Date:** November 20, 2025  
**Purpose:** Four distinct model configurations for different user segments and pricing tiers

---

## Tier 1: **PREMIUM** 🏆
### "Hollywood Studio Grade"

**Target User:** Professional filmmakers, agencies, studios with budget  
**Pricing:** $49-99/month subscription  
**Positioning:** "The best AI filmmaking assistant money can buy"

### Model Configuration:
- **Director Chat:** `anthropic/claude-sonnet-4.5` ($3/$15)
- **Structure/Outline:** `openai/gpt-4.1` ($2/$8)
- **Vision/Visual Bible:** `google/gemini-3-pro-preview` ($2/$12, $8.26/K imgs)

### Key Features:
- **1M context** for Director Chat (entire project bible fits in memory)
- **State-of-the-art agentic reasoning** (Claude Sonnet 4.5 leads SWE-bench)
- **Best-in-class multimodal vision** (Gemini 3 Pro: video, audio, code analysis)
- **Highest JSON reliability** (GPT-4.1: 87.4% IFEval, optimized for structured outputs)
- **Extended autonomous operation** (hundreds of tool calls without drift)
- **Zero compromises** on quality

### Cost Analysis (per 1M tokens + 1K images):
- Director Chat: $3.00 + $15.00 = **$18.00**
- Structure: $2.00 + $8.00 = **$10.00**
- Vision: $2.00 + $12.00 + $8.256 = **$22.26**
- **Total: $50.26 per 1M tokens + 1K images**

### Monthly Estimates (typical usage):
- **Light user** (10M tokens, 5K images): ~$503/month in API costs
- **Pro user** (50M tokens, 20K images): ~$2,513/month in API costs
- **Charge:** $49-99/month, absorb costs for engagement, upsell on overages

### Why Users Pay Premium:
✅ "Never worry about context limits" (1M tokens)  
✅ "Best AI director in the industry" (frontier models)  
✅ "Professional-grade visual analysis" (video/audio support)  
✅ "Most reliable scene structuring" (87% instruction compliance)  
✅ "Unlimited creative conversations" (extended autonomous operation)

---

## Tier 2: **PROFESSIONAL** 💼
### "Serious Filmmaker Standard"

**Target User:** Indie filmmakers, YouTubers, serious hobbyists  
**Pricing:** $19-29/month subscription  
**Positioning:** "Professional AI tools without the studio price tag"

### Model Configuration:
- **Director Chat:** `openai/gpt-5.1` ($1.25/$10)
- **Structure/Outline:** `google/gemini-2.5-pro` ($1.25/$10)
- **Vision/Visual Bible:** `openai/gpt-4o` ($2.50/$10, $3.61/K imgs)

### Key Features:
- **400K-1M context** (massive context for complex projects)
- **GPT-5.1 adaptive reasoning** (allocates compute intelligently)
- **Gemini 2.5 Pro thinking** (#1 LMArena leaderboard)
- **GPT-4o creative writing** (leveled-up style descriptions)
- **Excellent tool reliability** (improved vs GPT-4)
- **Superior instruction following** (natural conversational tone)

### Cost Analysis (per 1M tokens + 1K images):
- Director Chat: $1.25 + $10.00 = **$11.25**
- Structure: $1.25 + $10.00 = **$11.25**
- Vision: $2.50 + $10.00 + $3.613 = **$16.11**
- **Total: $38.61 per 1M tokens + 1K images**

### Monthly Estimates (typical usage):
- **Light user** (10M tokens, 5K images): ~$386/month in API costs
- **Standard user** (25M tokens, 10K images): ~$965/month in API costs
- **Charge:** $19-29/month, target break-even at 2-3M tokens/month

### Why Users Pay Professional:
✅ "Latest GPT-5 technology" (newest frontier models)  
✅ "Top leaderboard performance" (#1 LMArena)  
✅ "Natural director voice" (adaptive reasoning, conversational)  
✅ "Creative visual descriptions" (GPT-4o's strength)  
✅ "Huge context windows" (400K-1M tokens)

---

## Tier 3: **STARTER** ⚡
### "Smart Value for Creators"

**Target User:** Beginners, students, budget-conscious creators  
**Pricing:** $5-9/month subscription OR freemium with limits  
**Positioning:** "Better than the competition, cheaper than you think"

### Model Configuration:
- **Director Chat:** `google/gemini-2.5-flash` ($0.30/$2.50)
- **Structure/Outline:** `google/gemini-2.5-flash-lite` ($0.10/$0.40)
- **Vision/Visual Bible:** `google/gemini-2.5-flash` ($0.30/$2.50, $1.24/K imgs)

### Key Features:
- **1M context across all APIs** (8x more than GPT-4o-mini)
- **Built-in "thinking" capabilities** (advanced reasoning at workhorse price)
- **Structure API cheaper than baseline** (33% cost savings)
- **Single provider** (Google - simpler integration)
- **State-of-the-art workhorse** (378B tokens processed - very popular)
- **Configurable reasoning depth** (enable/disable thinking on demand)

### Cost Analysis (per 1M tokens + 1K images):
- Director Chat: $0.30 + $2.50 = **$2.80**
- Structure: $0.10 + $0.40 = **$0.50**
- Vision: $0.30 + $2.50 + $1.238 = **$4.04**
- **Total: $7.34 per 1M tokens + 1K images**

### Monthly Estimates (typical usage):
- **Light user** (10M tokens, 5K images): ~$73/month in API costs
- **Standard user** (20M tokens, 8K images): ~$147/month in API costs
- **Charge:** $5-9/month, use as freemium upsell funnel to Pro tier

### Why Users Choose Starter:
✅ "Massive 1M context - more than competitors" (8x vs baseline)  
✅ "Advanced reasoning at budget price" (thinking capabilities)  
✅ "Cheaper than baseline" (Structure API saves 33%)  
✅ "Same provider, consistent experience" (all Google)  
✅ "Try premium features affordably" (gateway to Pro tier)

### Freemium Strategy:
- **Free tier:** 5M tokens/month + 500 images (≈$37 API cost, loss leader)
- **Limit:** 3 projects, 20 scenes total
- **Upsell:** "Upgrade to Starter for unlimited projects" ($5-9/month)

---

## Tier 4: **FREE** 🎁
### "No-Risk Sandbox"

**Target User:** New users, developers, testing, API fallback  
**Pricing:** $0/month (loss leader for user acquisition)  
**Positioning:** "Try before you buy - zero risk"

### Model Configuration:
- **Director Chat:** `xai/grok-4.1-fast` ($0/$0)
- **Structure/Outline:** `openai/gpt-oss-20b` ($0/$0)
- **Vision/Visual Bible:** `openai/gpt-4o-mini` ($0.15/$0.60, $0.217/K imgs)

### Key Features:
- **2M context for Director Chat** (Grok - largest free context available)
- **Best free agentic tool calling** (Grok 4.1 Fast - per xAI)
- **Open-source Structure API** (gpt-oss-20b, Apache 2.0 license)
- **Proven Vision baseline** (GPT-4o-mini - current baseline)
- **Zero subscription cost** (free tier, viral growth strategy)
- **Reasoning on/off toggle** (Grok - disable for faster responses)

### Cost Analysis (per 1M tokens + 1K images):
- Director Chat: $0.00 + $0.00 = **$0.00** (FREE!)
- Structure: $0.00 + $0.00 = **$0.00** (FREE!)
- Vision: $0.15 + $0.60 + $0.217 = **$0.967**
- **Total: $0.967 per 1M tokens + 1K images**

### Monthly Estimates (free tier limits):
- **Free user** (5M tokens, 500 images): ~$4.83/month in API costs
- **Company absorbs:** $5-10/month per free user (acceptable for growth)
- **Conversion goal:** 10-20% upgrade to Starter ($5-9/month) within 3 months

### Why Free Tier Works:
✅ "Zero barrier to entry" (viral user acquisition)  
✅ "Better than competitors' free tiers" (2M context vs 128K)  
✅ "Prove value before asking for money" (try-before-buy)  
✅ "API fallback for paid tiers" (resilience strategy)  
✅ "Loss leader ROI" ($5 cost → $60+ LTV from upgrades)

### Free Tier Limits:
- **3 projects max**
- **20 scenes total**
- **5M tokens/month**
- **500 images/month**
- **Watermark:** "Made with Bedroom Director Free"
- **Upsell CTA:** "Upgrade for unlimited projects + premium models"

---

## Tier Comparison Table

| Feature | FREE 🎁 | STARTER ⚡ | PROFESSIONAL 💼 | PREMIUM 🏆 |
|---------|--------|-----------|----------------|-----------|
| **Price/month** | $0 | $5-9 | $19-29 | $49-99 |
| **API Cost (1M+1K img)** | $0.97 | $7.34 | $38.61 | $50.26 |
| **Director Chat Model** | Grok 4.1 Fast | Gemini 2.5 Flash | GPT-5.1 | Claude Sonnet 4.5 |
| **Chat Context** | 2M | 1M | 400K | 1M |
| **Structure Model** | gpt-oss-20b | Gemini Flash Lite | Gemini 2.5 Pro | GPT-4.1 |
| **Vision Model** | GPT-4o-mini | Gemini 2.5 Flash | GPT-4o | Gemini 3 Pro |
| **Projects** | 3 max | Unlimited | Unlimited | Unlimited |
| **Scenes** | 20 max | Unlimited | Unlimited | Unlimited |
| **Monthly Tokens** | 5M | 50M+ | 100M+ | Unlimited |
| **Monthly Images** | 500 | 5K+ | 10K+ | Unlimited |
| **Tool Calling** | Good | Excellent | Excellent | State-of-art |
| **Reasoning** | Basic | Advanced | Adaptive | Extended |
| **Support** | Community | Email | Priority email | White-glove |
| **Watermark** | Yes | No | No | No |

---

## Recommended Rollout Strategy

### Phase 1: Launch with Starter Tier (MVP)
**Week 1-4:**
- Deploy **Gemini 2.5 Flash** across all three APIs
- Pricing: $5/month for unlimited use (early adopter special)
- Goal: 100 paying users, validate quality vs baseline
- Metrics: User satisfaction, API costs, upgrade intent

### Phase 2: Add Free Tier (Growth)
**Week 5-8:**
- Deploy **Grok + gpt-oss-20b + GPT-4o-mini** for free tier
- Limits: 3 projects, 20 scenes, 5M tokens, 500 images
- Goal: 1,000 free users, 10% conversion to Starter
- Metrics: Signup rate, feature usage, conversion funnel

### Phase 3: Launch Professional Tier (Revenue)
**Week 9-12:**
- Deploy **GPT-5.1 + Gemini 2.5 Pro + GPT-4o**
- Pricing: $19/month for serious creators
- Goal: 50 Pro users, $950/month MRR
- Metrics: Upgrade rate from Starter, churn, feature utilization

### Phase 4: Add Premium Tier (Flagship)
**Month 4+:**
- Deploy **Claude Sonnet 4.5 + GPT-4.1 + Gemini 3 Pro**
- Pricing: $49/month for professionals, $99/month for teams
- Goal: 10 Premium users, $500-1000/month MRR
- Metrics: Enterprise inquiries, retention, NPS score

---

## Unit Economics by Tier

### Assumptions:
- **Typical usage:** Light user = 10M tokens + 5K images/month
- **Conversion rates:** Free→Starter (10%), Starter→Pro (5%), Pro→Premium (2%)
- **LTV:** 12-month retention average

### Free Tier:
- **Cost:** $4.83/month (API) + $2/month (infra) = **$6.83/month loss**
- **Conversion to Starter:** 10% × $5/month × 12 months = **$6 LTV**
- **Net:** -$0.83/user (acceptable for growth)

### Starter Tier:
- **Revenue:** $5/month × 12 = **$60/year**
- **Cost:** $7.34/month (API) + $1/month (infra) = **$8.34/month**
- **Net:** -$3.34/month (subsidized by upsells)
- **Conversion to Pro:** 5% × $19/month × 12 = **$11.40 LTV**
- **Blended LTV:** $60 + $11.40 = **$71.40/year** (profitable with scale)

### Professional Tier:
- **Revenue:** $19/month × 12 = **$228/year**
- **Cost:** $38.61/month (API) + $2/month (infra) = **$40.61/month** = **$487/year**
- **Net:** -$259/year (loss leader, but...)
- **Reality check:** Heavy users subsidize light users
  - Light users (70%): 10M tokens = $38.61 < $228 revenue ✅ **Profitable**
  - Heavy users (30%): 50M tokens = $193 < $228 revenue ✅ **Profitable**
- **Blended profit:** ~$100-150/year per user

### Premium Tier:
- **Revenue:** $49/month × 12 = **$588/year**
- **Cost:** $50.26/month (API) + $3/month (infra) = **$53.26/month** = **$639/year**
- **Net:** -$51/year (break-even at 12M tokens)
- **Reality check:** Premium users value quality > cost
  - Target usage: 10-15M tokens (profitable range)
  - Overages: Charge $10 per additional 5M tokens
  - Enterprise: Custom pricing for 50M+ tokens

---

## Key Insights

### 1. **Starter Tier is the Money Maker**
- Low API costs ($7.34 per 1M)
- High perceived value (1M context, advanced reasoning)
- Volume play (target 1,000 users @ $5/month = $5K MRR)

### 2. **Professional Tier is Profitable with Mixed Usage**
- Light users = high margin
- Heavy users = break-even
- Blended = $10-15/month profit per user

### 3. **Premium Tier is Prestige + Enterprise**
- Consumer tier: Small profit or break-even
- Enterprise: Charge for support + overage ($99-199/month)
- Positioning: "If you have to ask, you can't afford it"

### 4. **Free Tier is Growth Engine**
- $7/month loss per free user
- 10% conversion = $6 LTV (covers cost)
- Viral growth > short-term profit

---

## Pricing Psychology

### Tier Names Matter:
- ❌ **Don't use:** "Basic, Plus, Pro, Enterprise" (boring)
- ✅ **Use:** "Free, Starter, Professional, Premium" (aspirational)

### Anchoring:
- Show Premium first ($49-99) to anchor high
- Starter ($5-9) looks like a steal in comparison
- Professional ($19-29) is the "smart middle choice"

### Feature Gating:
- **Free:** Project limits (create scarcity)
- **Starter:** Unlimited projects (remove pain)
- **Professional:** Premium models (quality upgrade)
- **Premium:** White-glove support (VIP treatment)

---

## Final Recommendation

**Launch with 3 tiers initially:**

1. **Free Tier** (loss leader, growth)
   - Grok 4.1 Fast + gpt-oss-20b + GPT-4o-mini
   - Limits: 3 projects, 20 scenes

2. **Starter Tier** ($5-9/month, revenue)
   - Gemini 2.5 Flash + Flash Lite
   - High margin, high volume

3. **Professional Tier** ($19-29/month, premium revenue)
   - GPT-5.1 + Gemini 2.5 Pro + GPT-4o
   - Flagship quality, profitable with mixed usage

**Add Premium later** once you have:
- Proven demand for higher quality
- Enterprise inquiries
- Budget for high API costs

This gives you:
- **Loss leader** (Free) → **Profit center** (Starter) → **Premium** (Professional) → **Prestige** (Premium later)

---

## 🎯 The "Goldilocks Configuration"
### Optimal Balance: Best Experience + Profitability

**If you had to choose ONE configuration that maximizes user experience AND profitability:**

### **The Winning Mix:**

**Director Chat:** `openai/gpt-5.1`  
- **Cost:** $1.25/M in, $10/M out  
- **Why:** Latest GPT with adaptive reasoning, natural conversational tone, excellent tool calling. Users *experience* this directly - worth the premium.

**Structure/Outline:** `google/gemini-2.5-flash-lite`  
- **Cost:** $0.10/M in, $0.40/M out  
- **Why:** **33% cheaper than baseline**, 1M context, background task users don't see. High frequency = cost matters most.

**Vision/Visual Bible:** `google/gemini-2.5-flash`  
- **Cost:** $0.30/M in, $2.50/M out, $1.24/K images  
- **Why:** Excellent visual reasoning, 8x cheaper than Gemini 3 Pro on images, great quality-to-cost ratio.

---

### 💰 **Unit Economics:**

**Cost per 1M tokens + 1K images:**
- Director Chat: $1.25 + $10 = **$11.25**
- Structure: $0.10 + $0.40 = **$0.50**
- Vision: $0.30 + $2.50 + $1.24 = **$4.04**
- **Total: $15.79**

**Typical user (20M tokens + 5K images/month):**
- API cost: ~$316/month
- **Charge: $19-29/month**
- **Unit economics:** Break-even at ~1.2M tokens, profitable beyond that

**Reality check:**
- **70% of users:** Light usage (10M tokens) = **profitable** (~$158 API cost vs $228 revenue = $70 profit/user)
- **20% of users:** Medium usage (25M tokens) = **break-even** (~$395 API cost vs $228 revenue + overages)
- **10% of users:** Heavy usage (50M+) = **charge overage fees** ($10 per 10M tokens)

---

### ✅ **Why This Combination Wins:**

1. **Premium chat experience** (GPT-5.1) - The part users interact with most gets best quality
2. **Cost savings on Structure** (Flash Lite is 33% cheaper than baseline!)
3. **Strong vision quality** (Flash is excellent, not overkill like Gemini 3 Pro)
4. **Profitable at $19-29/month** with typical usage patterns
5. **Two providers** (OpenAI + Google) for API resilience and fallback
6. **1M context** on Structure + Vision (8x more than 128K baseline)
7. **Mixed provider strategy** prevents vendor lock-in

---

### 🎯 **Recommended Pricing Strategy:**

**$19/month base tier:**
- **Includes:** 20M tokens + 5K images
- **Overage pricing:** $10 per additional 10M tokens, $5 per 2K images
- **Target margin:** 40-50% after API costs (most users under limits)

**Why this pricing works:**
- Most users (70%) stay under limits = **high margin** ($70 profit/user/month)
- Medium users (20%) hit limits occasionally = **small profit** with overages
- Power users (10%) pay overages = **revenue covers heavy usage**
- Premium experience justifies $19 vs hypothetical $5 budget tier

---

### 🚀 **Migration Path from Current Baseline:**

**Current state:** `openai/gpt-4o-mini` everywhere ($0.15/$0.60, $0.217/K imgs)

**4-week rollout:**

1. **Week 1:** Switch Structure API to `google/gemini-2.5-flash-lite`
   - **Impact:** Instant 33% cost savings on structure calls
   - **Risk:** Very low (cheaper + better)
   
2. **Week 2:** Test GPT-5.1 for Director Chat with 10% of users
   - **Impact:** Validate quality improvement
   - **Risk:** Low (can revert if users don't notice improvement)
   
3. **Week 3:** Switch Vision to `google/gemini-2.5-flash`
   - **Impact:** Better visual descriptions, 5.7x cost increase on images (acceptable)
   - **Risk:** Medium (monitor image upload volume)
   
4. **Week 4:** Roll out to 100% of users, monitor costs + feedback
   - **Impact:** Full deployment
   - **Adjust:** Add overage pricing if costs spike

**Total risk:** Low - immediate savings on Structure offsets Chat/Vision upgrades

---

### 📊 **Comparison to Other Configs:**

| Configuration | API Cost (1M+1K) | Charge/mo | Profit Margin | User Experience | Notes |
|---------------|------------------|-----------|---------------|-----------------|-------|
| **Baseline (4o-mini all)** | $2.47 | $5-9 | High (60-80%) | Good | Current state |
| **Goldilocks (GPT-5.1 + Gemini)** ⭐ | $15.79 | $19-29 | Medium (40-50%) | Excellent | **RECOMMENDED** |
| **Premium (Claude + GPT-4.1 + Gemini 3)** | $50.26 | $49-99 | Low (20-30%) | Best | Enterprise only |
| **Ultra-Cheap (Gemini Lite + Llama)** | $1.52 | $5 | Medium (50%) | Good | Budget option |

**Goldilocks wins because:**
- Better experience than baseline (GPT-5.1 chat, 1M context)
- Higher profit margin than Premium
- Lower risk than Ultra-Cheap (proven models)
- Goldilocks pricing ($19) = perceived value sweet spot

---

### 🏆 **Final Verdict:**

**The Goldilocks Configuration is the best bet for launching a profitable, high-quality AI filmmaking tool.**

**Models:**
- `openai/gpt-5.1` (Director Chat)
- `google/gemini-2.5-flash-lite` (Structure)
- `google/gemini-2.5-flash` (Vision)

**Pricing:** $19/month with 20M tokens + 5K images, overages at $10 per 10M tokens

**Result:** Premium user experience, 40-50% profit margin, proven technology stack
