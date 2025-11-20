# Bedroom Director Model Recommendations

> **Role:** Canonical model selection doc for Bedroom Director. Use this file as the source of truth for which models we use for Director Chat, Structure/Outline, and Vision/Visual Bible in each tier.  
> **Raw per-model research:** `research/models/openrouter-model-research-bedroom-director.md`  
> **Pricing tiers & subscriptions:** `docs/strategy/bedroom-director-pricing-tiers.md`  
> **AI usage & training strategy:** `docs/strategy/ai-model-strategy-and-training-roadmap.md`

**Research Date:** November 19, 2025  
**Source:** OpenRouter.ai model specifications  
**Baseline:** openai/gpt-4o-mini ($0.15/M in, $0.60/M out, 128K context)

---

## Executive Summary

### Recommended Model Configurations

#### **Premium Configuration** (Max Quality)
- **Director Chat:** Claude Sonnet 4.5 ($3/$15) or GPT-5.1 ($1.25/$10)
- **Structure/Outline:** GPT-4.1 ($2/$8) or Gemini 2.5 Pro ($1.25/$10)
- **Vision/Visual Bible:** Gemini 3 Pro Preview ($2/$12, $8.26/K imgs)

**Why:** State-of-the-art reasoning, best tool reliability, superior multimodal analysis. Claude Sonnet 4.5 has 1M context for long project bibles. Gemini 3 Pro excels at multimodal vision tasks.

**Cost vs baseline:** 13-20x more expensive, but delivers frontier-level quality for professional use.

---

#### **Value Configuration** (Best Bang-for-Buck)
- **Director Chat:** Gemini 2.5 Flash ($0.30/$2.50) or GPT-5 Mini ($0.25/$2)
- **Structure/Outline:** Gemini 2.5 Flash Lite ($0.10/$0.40) or Llama 3.1 8B ($0.02/$0.03)
- **Vision/Visual Bible:** Gemini 2.5 Flash ($0.30/$2.50, $1.24/K imgs)

**Why:** Gemini 2.5 Flash Lite is CHEAPER than your baseline with 1M context. Llama 3.1 8B is 7.5-20x cheaper than baseline. Gemini 2.5 Flash handles all three tasks well with advanced reasoning.

**Cost vs baseline:** 0.13x to 4x cost (some cheaper!), excellent quality-to-price ratio.

---

#### **Free/Backup Configuration** (Zero Cost)
- **Director Chat:** Grok 4.1 Fast (FREE, 2M context)
- **Structure/Outline:** gpt-oss-20b (FREE, 131K context)
- **Vision/Visual Bible:** GPT-4o-mini (keep baseline)

**Why:** Grok 4.1 Fast is free with excellent tool calling. gpt-oss-20b is free with structured outputs. Use for development, testing, or API fallbacks.

---

## A) Director Chat Recommendations

**Needs:** Excellent instruction following, long-form reasoning, cinematic tone, reliable tool calls (update_bible), stable JSON.

### **Max Quality Options (2-3 models)**

**1. Claude Sonnet 4.5** ⭐ TOP PICK
- **Price:** $3/M in, $15/M out (20x baseline input, 25x baseline output)
- **Context:** 1M tokens (7.8x baseline)
- **Why better than 4o-mini:**
  - State-of-the-art coding & reasoning (SWE-bench leader)
  - Extended autonomous operation for long conversations
  - 1M context = entire project bible + chat history
  - Superior tool orchestration & parallel execution
  - Maintains task continuity across sessions
- **Trade-offs:** 20-25x more expensive, but worth it for professional director assistant
- **Use when:** Premium quality matters, long project conversations, complex tool workflows

**2. GPT-5.1** 
- **Price:** $1.25/M in, $10/M out (8.3x baseline input, 16.7x baseline output)
- **Context:** 400K tokens (3.1x baseline)
- **Why better than 4o-mini:**
  - Latest frontier-grade GPT, improved instruction adherence
  - Adaptive reasoning (allocates compute dynamically)
  - More natural conversational style ("cinematic director voice")
  - Improved tool-use reliability
  - Clearer, more grounded explanations
- **Trade-offs:** 8-17x more expensive, but excellent reasoning quality
- **Use when:** Need GPT ecosystem, strong instruction following, natural tone

**3. Gemini 2.5 Pro**
- **Price:** $1.25/M in, $10/M out (8.3x baseline input, 16.7x baseline output)
- **Context:** 1.05M tokens (8.2x baseline)
- **Why better than 4o-mini:**
  - First place on LMArena leaderboard
  - Advanced "thinking" capabilities for complex planning
  - 1M+ context for entire project state
  - Superior human-preference alignment
- **Trade-offs:** 8-17x more expensive
- **Use when:** Need massive context, advanced reasoning, top leaderboard performance

---

### **Best Value Options (2-3 models)**

**1. Gemini 2.5 Flash** ⭐ BEST VALUE
- **Price:** $0.30/M in, $2.50/M out (2x baseline input, 4.2x baseline output)
- **Context:** 1.05M tokens (8.2x baseline)
- **Why better than 4o-mini:**
  - Built-in "thinking" capabilities for reasoning
  - 8x larger context window
  - State-of-the-art workhorse model
  - Configurable reasoning depth
  - Very popular (378B tokens processed)
- **Trade-offs:** 2-4x more expensive, but massive context + reasoning
- **Use when:** Need balance of cost, quality, and huge context

**2. GPT-5 Mini**
- **Price:** $0.25/M in, $2/M out (1.7x baseline input, 3.3x baseline output)
- **Context:** 400K tokens (3.1x baseline)
- **Why better than 4o-mini:**
  - Compact GPT-5 with same instruction-following benefits
  - Reduced latency vs full GPT-5
  - 3x larger context
  - Successor to o4-mini (reasoning lineage)
- **Trade-offs:** 1.7-3.3x more expensive
- **Use when:** Want GPT-5 quality at lower cost, good context

**3. Gemini 2.5 Flash Lite** 💰 CHEAPER THAN BASELINE!
- **Price:** $0.10/M in, $0.40/M out (0.67x baseline input, 0.67x baseline output)
- **Context:** 1.05M tokens (8.2x baseline)
- **Why better than 4o-mini:**
  - **33% CHEAPER** than baseline!
  - 8x larger context window
  - Lightweight reasoning (thinking disabled by default for speed)
  - Can enable reasoning via API when needed
  - Ultra-low latency
- **Trade-offs:** Less reasoning depth than Flash, but can enable when needed
- **Use when:** High-volume chat, cost-sensitive, still want huge context

---

### **Backup Models (1-2 models)**

**1. Grok 4.1 Fast** 🆓 FREE
- **Price:** $0/M in, $0/M out (FREE!)
- **Context:** 2M tokens (15.6x baseline)
- **Why use:**
  - Best agentic tool calling model (per xAI)
  - Completely free
  - Massive 2M context
  - Reasoning can be enabled/disabled
- **Trade-offs:** Preview/unstable, may have rate limits
- **Use when:** API down, development/testing, cost = $0

**2. GPT-4.1 Mini**
- **Price:** $0.40/M in, $1.60/M out (2.7x baseline input, 2.7x baseline output)
- **Context:** 1.05M tokens (8.2x baseline)
- **Why use:**
  - Performance competitive with GPT-4o
  - 8x larger context
  - Strong coding & instruction compliance
- **Trade-offs:** 2.7x more expensive
- **Use when:** Need GPT-4 level quality, massive context, lower cost than GPT-5

---

## B) Structure / Outline Recommendations

**Needs:** Very reliable JSON (response_format: json_object), strong structural reasoning (scene lists, beats), cost efficiency (frequent background calls).

### **High-End Models (1-2 models)**

**1. GPT-4.1** ⭐ TOP PICK FOR STRUCTURE
- **Price:** $2/M in, $8/M out (13.3x baseline input, 13.3x baseline output)
- **Context:** 1.05M tokens (8.2x baseline)
- **Why better than 4o-mini:**
  - Optimized for advanced instruction following & long-context reasoning
  - Outperforms GPT-4o on coding (54.6% SWE-bench)
  - 87.4% IFEval (instruction compliance)
  - Tuned for precise structured outputs
  - Ideal for agents & structured data extraction
- **Trade-offs:** 13x more expensive
- **Use when:** Need highest JSON reliability, complex scene structures, professional quality

**2. Gemini 2.5 Pro**
- **Price:** $1.25/M in, $10/M out (8.3x baseline input, 16.7x baseline output)
- **Context:** 1.05M tokens (8.2x baseline)
- **Why better than 4o-mini:**
  - Advanced reasoning for scene structure
  - "Thinking" capabilities for complex outlines
  - First place LMArena
  - Excellent structured output reliability
- **Trade-offs:** 8-17x more expensive
- **Use when:** Need advanced reasoning for complex project structures

---

### **Cheaper Workhorse Models (2-3 models)**

**1. Gemini 2.5 Flash Lite** ⭐ BEST VALUE FOR STRUCTURE
- **Price:** $0.10/M in, $0.40/M out (0.67x baseline - **CHEAPER!**)
- **Context:** 1.05M tokens (8.2x baseline)
- **Why better than 4o-mini:**
  - **33% cheaper** than baseline!
  - 8x larger context for full project analysis
  - Lightweight reasoning optimized for speed
  - Reliable structured outputs
  - Ultra-low latency for background calls
- **Trade-offs:** Less reasoning depth, but perfect for frequent JSON generation
- **Use when:** Frequent background calls, cost matters, need speed

**2. Llama 3.1 8B Instruct** 💰 ULTRA-CHEAP
- **Price:** $0.02/M in, $0.03/M out (0.13x baseline input, 0.05x baseline output)
- **Context:** 131K tokens (similar to baseline)
- **Why use:**
  - **7.5x cheaper input, 20x cheaper output!**
  - Supports function calling & structured outputs
  - Fast and efficient
  - Open-source (Meta Llama 3.1)
- **Trade-offs:** Less advanced reasoning than GPT/Claude/Gemini
- **Use when:** High-volume background calls, cost is critical, simple scene structures

**3. Gemini 2.5 Flash**
- **Price:** $0.30/M in, $2.50/M out (2x baseline input, 4.2x baseline output)
- **Context:** 1.05M tokens (8.2x baseline)
- **Why better than 4o-mini:**
  - Built-in "thinking" for complex structures
  - 8x larger context
  - State-of-the-art workhorse
  - Reliable JSON generation
- **Trade-offs:** 2-4x more expensive
- **Use when:** Need reasoning + reliability + huge context, moderate cost

---

### **Free Backup**

**gpt-oss-20b (free)** 🆓
- **Price:** $0/M in, $0/M out (FREE!)
- **Context:** 131K tokens
- **Features:** Function calling, structured outputs, Apache 2.0 license
- **Use when:** Development, testing, API fallback, zero budget

---

## C) Vision / Visual Bible Recommendations

**Needs:** Multimodal (image input + text), good at describing visuals/styles/moods/palettes, JSON output (description, tags, palette, mood).

### **Top-Tier Vision Models (1-2 models)**

**1. Gemini 3 Pro Preview** ⭐ TOP PICK FOR VISION
- **Price:** $2/M in, $12/M out, **$8.256/K input images**
- **Context:** 1.05M tokens (8.2x baseline)
- **Why better than 4o-mini:**
  - **Flagship multimodal model** (text, image, video, audio, code)
  - State-of-the-art benchmarks: MMMU-Pro, Video-MMMU
  - Designed for multimodal reasoning & analysis
  - Strong zero-shot generation for complex visual tasks
  - Robust tool-calling for structured JSON output
  - Excellent at visual description, style, mood, palette extraction
- **Image pricing vs baseline:** $8.256 vs $0.217 per K = **38x more expensive**
- **Trade-offs:** 38x more expensive on images, but best-in-class vision
- **Use when:** Professional visual analysis, complex reference images, need best quality

**2. GPT-4o (2024-11-20)**
- **Price:** $2.50/M in, $10/M out, **$3.613/K input images**
- **Context:** 128K tokens (same as baseline)
- **Why better than 4o-mini:**
  - Leveled-up creative writing (better style descriptions)
  - Better at working with uploaded files
  - Improved visual capabilities vs 4o-mini
  - More natural, engaging descriptions
- **Image pricing vs baseline:** $3.613 vs $0.217 per K = **16.6x more expensive**
- **Trade-offs:** 16.6x more expensive on images
- **Use when:** Need GPT ecosystem, creative visual descriptions, file analysis

---

### **Cheaper Multimodal Models (1-2 models)**

**1. Gemini 2.5 Flash** ⭐ BEST VALUE FOR VISION
- **Price:** $0.30/M in, $2.50/M out, **$1.238/K input images**
- **Context:** 1.05M tokens (8.2x baseline)
- **Why better than 4o-mini:**
  - Advanced reasoning for visual analysis
  - Built-in "thinking" for complex image understanding
  - 8x larger context
  - State-of-the-art workhorse
  - Much cheaper than Gemini 3 Pro
- **Image pricing vs baseline:** $1.238 vs $0.217 per K = **5.7x more expensive**
- **Trade-offs:** 5.7x more expensive on images, but excellent quality
- **Use when:** Need balance of vision quality + cost, frequent image analysis

**2. GPT-4o-mini** (Keep Baseline)
- **Price:** $0.15/M in, $0.60/M out, **$0.217/K input images**
- **Context:** 128K tokens
- **Why use:**
  - Current baseline - known quality
  - Cheapest multimodal option
  - Supports image input + JSON output
  - "Most advanced small model"
- **Trade-offs:** Less advanced vision than Gemini 3 Pro or GPT-4o
- **Use when:** Cost-sensitive, high-volume image analysis, baseline quality sufficient

---

## Comparison Tables

### Director Chat Comparison

| Model | Context | Input $/M | Output $/M | vs 4o-mini Input | vs 4o-mini Output | Notes |
|-------|---------|-----------|------------|------------------|-------------------|-------|
| **GPT-4o-mini** (baseline) | 128K | $0.15 | $0.60 | 1x | 1x | Current baseline |
| **Claude Sonnet 4.5** ⭐ | 1M | $3.00 | $15.00 | 20x | 25x | Best agentic, 1M context |
| **GPT-5.1** | 400K | $1.25 | $10.00 | 8.3x | 16.7x | Latest GPT, adaptive reasoning |
| **Gemini 2.5 Pro** | 1.05M | $1.25 | $10.00 | 8.3x | 16.7x | #1 LMArena, thinking |
| **Gemini 2.5 Flash** ⭐ | 1.05M | $0.30 | $2.50 | 2x | 4.2x | Best value, 1M context |
| **GPT-5 Mini** | 400K | $0.25 | $2.00 | 1.7x | 3.3x | Compact GPT-5 |
| **Gemini 2.5 Flash Lite** 💰 | 1.05M | $0.10 | $0.40 | 0.67x | 0.67x | CHEAPER! 1M context |
| **Grok 4.1 Fast** 🆓 | 2M | $0.00 | $0.00 | FREE | FREE | Free backup, 2M context |

---

### Structure/Outline Comparison

| Model | Context | Input $/M | Output $/M | vs 4o-mini Input | vs 4o-mini Output | Notes |
|-------|---------|-----------|------------|------------------|-------------------|-------|
| **GPT-4o-mini** (baseline) | 128K | $0.15 | $0.60 | 1x | 1x | Current baseline |
| **GPT-4.1** ⭐ | 1.05M | $2.00 | $8.00 | 13.3x | 13.3x | Best JSON reliability |
| **Gemini 2.5 Pro** | 1.05M | $1.25 | $10.00 | 8.3x | 16.7x | Advanced reasoning |
| **Gemini 2.5 Flash Lite** ⭐💰 | 1.05M | $0.10 | $0.40 | 0.67x | 0.67x | CHEAPER! Fast JSON |
| **Llama 3.1 8B** 💰 | 131K | $0.02 | $0.03 | 0.13x | 0.05x | Ultra-cheap, 20x cheaper output |
| **Gemini 2.5 Flash** | 1.05M | $0.30 | $2.50 | 2x | 4.2x | Thinking + reliability |
| **gpt-oss-20b** 🆓 | 131K | $0.00 | $0.00 | FREE | FREE | Free backup |

---

### Vision/Visual Bible Comparison

| Model | Context | Input $/M | Output $/M | Images $/K | vs 4o-mini Images | Notes |
|-------|---------|-----------|------------|------------|-------------------|-------|
| **GPT-4o-mini** (baseline) | 128K | $0.15 | $0.60 | $0.217 | 1x | Current baseline |
| **Gemini 3 Pro Preview** ⭐ | 1.05M | $2.00 | $12.00 | $8.256 | 38x | Best multimodal |
| **GPT-4o (2024-11-20)** | 128K | $2.50 | $10.00 | $3.613 | 16.6x | Creative descriptions |
| **Gemini 2.5 Flash** ⭐ | 1.05M | $0.30 | $2.50 | $1.238 | 5.7x | Best value vision |
| **GPT-4o-mini** (keep) | 128K | $0.15 | $0.60 | $0.217 | 1x | Cheapest multimodal |

---

## Key Insights & Recommendations

### 1. **Gemini 2.5 Flash Lite is CHEAPER than your baseline**
- At $0.10/$0.40 vs $0.15/$0.60, it's 33% cheaper
- Gives you 1M context (8x more) for less money
- Perfect for Structure API (frequent background calls)
- Can enable reasoning when needed via API

### 2. **Llama 3.1 8B is dramatically cheaper for high-volume**
- 7.5x cheaper input, 20x cheaper output vs baseline
- Great for Structure API if you have high call volume
- Trade-off: Less sophisticated reasoning

### 3. **Claude Sonnet 4.5 is worth it for Director Chat**
- 1M context = entire project bible + full chat history
- State-of-the-art tool orchestration
- Extended autonomous operation
- Best for professional "director assistant" experience

### 4. **Gemini 3 Pro Preview is the vision champion**
- Built specifically for multimodal reasoning
- Best benchmarks for visual understanding
- Worth 38x cost for professional visual analysis

### 5. **Free models are viable backups**
- Grok 4.1 Fast: Free, 2M context, excellent tool calling
- gpt-oss-20b: Free, structured outputs, open-source
- Use for development, testing, or API fallbacks

### 6. **Split responsibilities for cost optimization**
- Don't use the same model for everything
- Use premium models where quality matters (Director Chat, Vision)
- Use cheap/free models for frequent calls (Structure)
- Example: Claude Sonnet 4.5 for chat + Gemini Flash Lite for structure = best of both worlds

---

## Recommended Implementation Strategy

### Phase 1: Test Value Configuration (Low Risk)
1. **Replace all three APIs** with Gemini 2.5 Flash ($0.30/$2.50)
   - Cheaper than 4o-mini for Director Chat (2-4x)
   - Cheaper than 4o-mini for Structure (2-4x)
   - Slightly more for Vision (5.7x on images, but better quality)
   - **Benefit:** One model, 1M context everywhere, advanced reasoning
   - **Risk:** Low - similar cost, better features

### Phase 2: Optimize Structure API (Cost Savings)
2. **Switch Structure API** to Gemini 2.5 Flash Lite ($0.10/$0.40)
   - **Save 33% vs baseline** on frequent background calls
   - Still get 1M context
   - **Benefit:** Immediate cost savings, faster responses
   - **Risk:** Very low - can enable reasoning if needed

### Phase 3: Upgrade Director Chat (Quality Boost)
3. **Upgrade Director Chat** to Claude Sonnet 4.5 ($3/$15) or GPT-5.1 ($1.25/$10)
   - **Benefit:** Professional-grade director assistant, 1M context, best tool reliability
   - **Cost:** 8-25x more, but only for interactive chat (lower volume)
   - **Risk:** Medium - higher cost, but delivers premium experience

### Phase 4: Upgrade Vision (Quality Boost)
4. **Upgrade Vision API** to Gemini 3 Pro Preview ($2/$12, $8.26/K imgs)
   - **Benefit:** Best-in-class visual analysis, multimodal reasoning
   - **Cost:** 38x more on images, but only for reference analysis (lower volume)
   - **Risk:** Medium - higher cost, but best quality

### Phase 5: Add Free Backups (Resilience)
5. **Add fallback logic** to use Grok 4.1 Fast or gpt-oss-20b when primary APIs are down
   - **Benefit:** Zero cost, high availability, 2M context (Grok)
   - **Risk:** Very low - only used as backup

---

## Cost Modeling Examples

### Scenario: 1M tokens input, 1M tokens output, 1K images per month

#### Current Baseline (all 4o-mini):
- Director Chat: $0.15 + $0.60 = **$0.75**
- Structure: $0.15 + $0.60 = **$0.75**
- Vision: $0.15 + $0.60 + $0.217 = **$0.967**
- **Total: $2.467 per million tokens + 1K images**

#### Value Configuration:
- Director Chat (Gemini 2.5 Flash): $0.30 + $2.50 = **$2.80**
- Structure (Gemini Flash Lite): $0.10 + $0.40 = **$0.50**
- Vision (Gemini 2.5 Flash): $0.30 + $2.50 + $1.238 = **$4.038**
- **Total: $7.338 per million tokens + 1K images** (3x baseline, but 8x context + reasoning)

#### Premium Configuration:
- Director Chat (Claude Sonnet 4.5): $3.00 + $15.00 = **$18.00**
- Structure (GPT-4.1): $2.00 + $8.00 = **$10.00**
- Vision (Gemini 3 Pro): $2.00 + $12.00 + $8.256 = **$22.256**
- **Total: $50.256 per million tokens + 1K images** (20x baseline, but frontier quality)

#### Ultra-Cheap Configuration:
- Director Chat (Gemini Flash Lite): $0.10 + $0.40 = **$0.50**
- Structure (Llama 3.1 8B): $0.02 + $0.03 = **$0.05**
- Vision (GPT-4o-mini): $0.15 + $0.60 + $0.217 = **$0.967**
- **Total: $1.517 per million tokens + 1K images** (0.6x baseline - **40% cheaper!**)

---

## Final Recommendations

### For Bedroom Director v2 Launch:

**Start with Value Configuration:**
- Director Chat: **Gemini 2.5 Flash** ($0.30/$2.50)
- Structure: **Gemini 2.5 Flash Lite** ($0.10/$0.40) 
- Vision: **Gemini 2.5 Flash** ($0.30/$2.50, $1.24/K imgs)

**Why this combo:**
1. **Structure is cheaper than baseline** (33% savings on frequent calls)
2. All three get **1M context** (8x more than current)
3. All three get **advanced reasoning** ("thinking" capabilities)
4. **Single provider** (Google) = simpler integration
5. **Total cost: ~3x baseline** for 8x context + reasoning = excellent value
6. **Low risk:** Similar cost to current, better features

**Then upgrade selectively:**
- If Director Chat quality matters → **Claude Sonnet 4.5** (best agentic, 1M context)
- If Vision quality matters → **Gemini 3 Pro Preview** (best multimodal)
- If cost matters → **Llama 3.1 8B** for Structure (20x cheaper output)

**Add free backups:**
- **Grok 4.1 Fast** for Director Chat fallback (free, 2M context)
- **gpt-oss-20b** for Structure fallback (free, structured outputs)

This gives you a clear upgrade path from baseline → value → premium, with cost optimization at every step.
