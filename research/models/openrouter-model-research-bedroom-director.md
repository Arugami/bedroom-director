# OpenRouter Model Research for Bedroom Director

> **Role:** Raw research notebook. This file captures detailed per-model notes (context, pricing, modalities) from OpenRouter.  
> **Source of truth for current model choices:** `docs/strategy/bedroom-director-model-recommendations.md`  
> **Pricing tiers & packaging:** `docs/strategy/bedroom-director-pricing-tiers.md`  
> **Long-term AI usage strategy:** `docs/strategy/ai-model-strategy-and-training-roadmap.md`

## Research Goal
Find optimal models for three Bedroom Director Scene Canvas APIs:
1. **Director Chat** - conversational assistant with tool calling
2. **Structure/Outline** - scene breakdown with reliable JSON
3. **Vision/Visual Bible** - multimodal image analysis with JSON

**Current Baseline:** openai/gpt-4o-mini for all three tasks

---

## Initial Findings from OpenRouter Models Page

### Key Models Spotted (577 total models available)

#### Top Priority Models to Research:

**xAI: Grok 4.1 Fast**
- 2M context window
- $0/M input tokens, $0/M output tokens (FREE!)
- "Best agentic tool calling model that shines in real-world use cases"
- Reasoning can be enabled/disabled via API parameter
- 659M tokens processed

**Google: Gemini 3 Pro Preview**
- 1.05M context window
- $2/M input tokens, $12/M output tokens
- $8.256/K input images
- Multimodal: text, image, video, audio, code
- "Flagship frontier model for high-precision multimodal reasoning"
- Strong tool-calling, long-horizon planning
- Excellent for agentic coding and multimodal analysis
- 41.6B tokens processed

---

## Next Steps:
1. Filter for GPT series models (gpt-4o-mini, gpt-4o, gpt-4.1, gpt-5.1, gpt-5-pro)
2. Filter for Claude series (claude-sonnet-4.5, haiku)
3. Filter for Gemini models
4. Filter for Moonshot Kimi-k2
5. Filter for Meta Llama 3.1 family
6. Extract detailed specs for each model
7. Compare capabilities vs gpt-4o-mini baseline


## GPT Series Models Found on OpenRouter

### OpenAI GPT-5 Series

**GPT-5.1** (Latest frontier-grade)
- Context: 400K
- Pricing: $1.25/M input, $10/M output
- Features: Adaptive reasoning, improved instruction adherence, natural conversational style
- Tool use: Yes (improved reliability)
- Multimodal: Text only
- Notes: Primary full-capability successor to GPT-5

**GPT-5.1 Chat** (Fast, lightweight)
- Context: 128K
- Pricing: $1.25/M input, $10/M output
- Features: Low-latency chat, adaptive reasoning, warmer conversational style
- Tool use: Yes
- Notes: Optimized for high-throughput interactive workloads

**GPT-5 Pro** (Most advanced)
- Context: 400K
- Pricing: $15/M input, $120/M output
- Features: Step-by-step reasoning, reduced hallucination, test-time routing
- Tool use: Yes
- Notes: Optimized for complex high-stakes tasks

**GPT-5** (Advanced flagship)
- Context: 400K
- Pricing: $1.25/M input, $10/M output
- Features: Major improvements in reasoning, code quality, instruction following
- Tool use: Yes
- Notes: 55.5B tokens processed

**GPT-5 Mini** (Compact version)
- Context: 400K
- Pricing: $0.25/M input, $2/M output
- Features: Lighter-weight reasoning, reduced latency and cost
- Tool use: Yes
- Notes: Successor to o4-mini

**GPT-5 Nano** (Smallest, fastest)
- Context: 400K
- Pricing: $0.05/M input, $0.40/M output
- Features: Ultra-low latency, limited reasoning depth
- Tool use: Yes
- Notes: Successor to GPT-4.1-nano, cost-sensitive applications

**GPT-5 Chat** (Enterprise multimodal)
- Context: 128K
- Pricing: $1.25/M input, $10/M output
- Features: Natural, multimodal, context-aware conversations
- Tool use: Yes

### OpenAI GPT-4o Series (NOT YET SEEN - NEED TO SCROLL MORE)

### OpenAI o-series (Reasoning models)

**o3 Pro**
- Context: 200K
- Pricing: $7/M input, $80/M output, $15.30/K input images
- Features: Reinforcement learning, complex reasoning
- Multimodal: Yes (images)
- Tool use: Yes

**o3**
- Context: 200K
- Pricing: $7/M input, $80/M output, $15.30/K input images
- Features: Think before answer, complex reasoning
- Multimodal: Yes
- Tool use: Yes

**Codex Mini**
- Context: 200K
- Pricing: $1/M input, $6/M output
- Features: Fine-tuned version of o4-mini for Codex CLI
- Tool use: Yes

### OpenAI Open-Weight Models

**gpt-oss-120b**
- Context: 131K
- Pricing: $0.04/M input, $0.40/M output
- Features: 117B-parameter MoE, high-reasoning, agentic, tool use
- Tool use: Yes (function calling, structured outputs)

**gpt-oss-20b (FREE)**
- Context: 131K
- Pricing: $0/M input, $0/M output (FREE!)
- Features: 21B parameter MoE, 3.6B active, function calling, tool use
- Tool use: Yes
- Notes: Apache 2.0 license, free to use

**gpt-oss-20b**
- Context: 131K
- Pricing: $0.03/M input, $0.14/M output
- Features: Same as free version but paid tier
- Tool use: Yes

---

## STILL NEED TO FIND:
- GPT-4o
- GPT-4o-mini (CURRENT BASELINE)
- GPT-4.1
- Claude models
- Gemini models
- Moonshot Kimi-k2
- Meta Llama 3.1


## GPT-4o and GPT-4o-mini Models (BASELINE FOUND!)

### **GPT-4o-mini** ⭐ (CURRENT BASELINE)
- Context: 128K
- Pricing: **$0.15/M input, $0.60/M output**
- Image pricing: **$0.217/K input images**
- Features: OpenAI's newest model after GPT-4 Omni, supporting both text and image inputs with text outputs
- Tool use: Yes
- Multimodal: Yes (text + image inputs)
- Structured outputs: Yes (JSON schema support)
- Notes: "Most advanced small model, many multiples more affordable than GPT-4"
- Usage: 79.4B tokens processed (very popular!)

### **GPT-4o-mini (2024-07-18)** (Dated version)
- Context: 128K
- Pricing: $0.15/M input, $0.60/M output, $7.225/K input images
- Same as above, specific dated version

### **GPT-4o** (Latest)
- Context: 128K
- Pricing: **$2.50/M input, $10/M output**
- Image pricing: **$3.613/K input images**
- Features: "Omni" model supporting text and image inputs with text outputs
- Tool use: Yes
- Multimodal: Yes (text + image inputs)
- Structured outputs: Yes (JSON schema support)
- Notes: Intelligence level of GPT-4 Turbo, twice as fast, 50% more cost-effective
- Usage: 11.1B tokens processed

### **GPT-4o (2024-11-20)** (Latest dated version)
- Context: 128K
- Pricing: $2.50/M input, $10/M output, $3.613/K input images
- Features: Leveled-up creative writing, more natural/engaging/tailored writing
- Better at working with uploaded files, deeper insights
- Improved non-English languages and visual capabilities

### **GPT-4o (2024-08-06)** (Earlier version)
- Context: 128K
- Pricing: $2.50/M input, $10/M output, $3.613/K input images
- Features: Improved performance in structured outputs with JSON schema support

### **ChatGPT-4o** (Research version)
- Context: 128K
- Pricing: $5/M input, $15/M output, $7.225/K input images
- Features: Continually updated to point to current ChatGPT version, has additional RLHF
- Notes: NOT for production use, may be removed or redirected

---

## COMPARISON VS BASELINE (GPT-4o-mini)

### GPT-4o vs GPT-4o-mini:
- **16.7x more expensive** on input ($2.50 vs $0.15)
- **16.7x more expensive** on output ($10 vs $0.60)
- **16.6x more expensive** on images ($3.613 vs $0.217 per K)
- Better: Creative writing, file analysis, visual capabilities
- Same context: 128K
- Same capabilities: Tools, multimodal, structured outputs

---

## STILL NEED TO RESEARCH:
- Claude models (Sonnet 4.5, Haiku)
- Gemini models (Gemini 3 Pro Preview found, need more)
- Moonshot Kimi-k2
- Meta Llama 3.1 family


## Claude Series Models (Anthropic)

### **Claude Sonnet 4.5** ⭐ (Most advanced Sonnet)
- Context: **1M** (1 million tokens!)
- Pricing: **$3/M input, $15/M output**
- Features: State-of-the-art coding (SWE-bench Verified), optimized for real-world agents
- Tool use: Yes (improved tool orchestration, speculative parallel execution)
- Multimodal: Yes (images)
- Structured outputs: Yes
- Notes: Extended autonomous operation, multi-context and long-running workflows
- Usage: 582B tokens processed (very popular!)
- Use cases: Software engineering, cybersecurity, financial analysis, research agents

### **Claude Haiku 4.5** (Fastest & most efficient)
- Context: 200K
- Pricing: **$1/M input, $5/M output**
- Features: Near-frontier intelligence at fraction of cost/latency
- Performance: Matches Claude Sonnet 4 across reasoning, coding, computer-use
- Tool use: Yes (extended thinking, controllable reasoning depth)
- Multimodal: Yes
- Structured outputs: Yes
- Notes: >73% on SWE-bench Verified, exceptional responsiveness
- Usage: 2.4B tokens processed
- Use cases: Real-time and high-volume applications, sub-agents, parallelized execution

### **Claude Opus 4.1** (Updated flagship)
- Context: 200K
- Pricing: **$15/M input, $75/M output**
- Image pricing: **$24/K input images**
- Features: 74.5% on SWE-bench Verified, improved coding/reasoning/agentic tasks
- Tool use: Yes (extended thinking up to 64K tokens)
- Multimodal: Yes (images)
- Structured outputs: Yes
- Notes: Multi-file code refactoring, debugging precision, detail-oriented reasoning
- Usage: 8.09B tokens processed

### **Claude Opus 4** (World's best coding model at release)
- Context: 200K
- Pricing: **$15/M input, $75/M output**
- Image pricing: **$24/K input images**
- Features: Extended agentic workflows, thousands of task steps continuously for hours
- Tool use: Yes
- Multimodal: Yes (images)
- Structured outputs: Yes
- Notes: Sustained performance without degradation
- Usage: 1.8B tokens processed

### **Claude Sonnet 4** (Previous Sonnet)
- Context: **1M**
- Pricing: **$3/M input, $15/M output**
- Image pricing: **$4.80/K input images**
- Features: 72.7% on SWE-bench, improved from Sonnet 3.7
- Tool use: Yes
- Multimodal: Yes (images)
- Structured outputs: Yes
- Notes: Autonomous codebase navigation, reduced error rates in agent workflows
- Usage: 116B tokens processed

---

## Claude vs GPT-4o-mini Baseline

### Claude Haiku 4.5 vs GPT-4o-mini:
- **6.7x more expensive** on input ($1 vs $0.15)
- **8.3x more expensive** on output ($5 vs $0.60)
- Better: Coding (>73% SWE-bench), reasoning, tool orchestration
- Larger context: 200K vs 128K
- Similar capabilities: Tools, multimodal, structured outputs

### Claude Sonnet 4.5 vs GPT-4o-mini:
- **20x more expensive** on input ($3 vs $0.15)
- **25x more expensive** on output ($15 vs $0.60)
- Better: State-of-the-art coding, agentic workflows, extended thinking
- Much larger context: **1M vs 128K** (7.8x more)
- Advanced: Tool orchestration, parallel execution, long-running workflows


## Gemini Series Models (Google)

### **Gemini 3 Pro Preview** ⭐ (Flagship frontier model)
- Context: **1.05M** (1.05 million tokens!)
- Pricing: **$2/M input, $12/M output**
- Image pricing: **$8.256/K input images**
- Features: High-precision multimodal reasoning (text, image, video, audio, code)
- Tool use: Yes (robust tool-calling, long-horizon planning stability)
- Multimodal: Yes (text, image, video, audio, code)
- Structured outputs: Yes
- Notes: State-of-the-art benchmarks (LMArena, GPQA Diamond, MathArena Apex, MMMU-Pro, Video-MMMU)
- Usage: 41.6B tokens processed
- Use cases: Autonomous agents, coding assistants, multimodal analytics, scientific reasoning

### **Gemini 2.5 Pro** (State-of-the-art reasoning)
- Context: **1.05M**
- Pricing: **$1.25/M input, $10/M output**
- Image pricing: **$5.16/K input images**
- Features: Advanced reasoning, coding, mathematics, scientific tasks, "thinking" capabilities
- Tool use: Yes
- Multimodal: Yes (text, image)
- Structured outputs: Yes
- Notes: First place on LMArena leaderboard, superior human-preference alignment
- Usage: 175B tokens processed

### **Gemini 2.5 Flash** (Workhorse model)
- Context: **1.05M**
- Pricing: **$0.30/M input, $2.50/M output**
- Image pricing: **$1.238/K input images**
- Features: Advanced reasoning, coding, mathematics, scientific tasks, built-in "thinking"
- Tool use: Yes (configurable "max tokens for reasoning")
- Multimodal: Yes (text, image)
- Structured outputs: Yes
- Notes: State-of-the-art workhorse, greater accuracy and nuanced context handling
- Usage: 378B tokens processed (VERY popular!)

### **Gemini 2.5 Flash Lite** (Ultra-low latency)
- Context: **1.05M**
- Pricing: **$0.10/M input, $0.40/M output**
- Features: Lightweight reasoning, ultra-low latency, cost efficiency
- Tool use: Yes (thinking disabled by default for speed, can enable via API)
- Multimodal: Yes
- Structured outputs: Yes
- Notes: Improved throughput, faster token generation vs earlier Flash models
- Usage: 134B tokens processed

### **Gemini 2.5 Flash Preview 09-2025** (Latest checkpoint)
- Context: **1.05M**
- Pricing: **$0.30/M input, $2.50/M output**
- Image pricing: **$1.238/K input images**
- Audio pricing: **$1/M audio tokens**
- Features: Advanced reasoning, coding, mathematics, built-in "thinking"
- Tool use: Yes
- Multimodal: Yes (text, image, audio)
- Structured outputs: Yes
- Usage: 66.6B tokens processed

---

## Gemini vs GPT-4o-mini Baseline

### Gemini 2.5 Flash Lite vs GPT-4o-mini:
- **0.67x cost** on input ($0.10 vs $0.15) - **CHEAPER!**
- **0.67x cost** on output ($0.40 vs $0.60) - **CHEAPER!**
- Better: Much larger context (1.05M vs 128K = 8.2x), reasoning capabilities
- Same capabilities: Tools, multimodal, structured outputs
- **BEST VALUE OPTION - cheaper than baseline with more features!**

### Gemini 2.5 Flash vs GPT-4o-mini:
- **2x more expensive** on input ($0.30 vs $0.15)
- **4.2x more expensive** on output ($2.50 vs $0.60)
- Better: Advanced reasoning, "thinking" capabilities, much larger context (1.05M vs 128K)
- Very popular: 378B tokens processed

### Gemini 3 Pro Preview vs GPT-4o-mini:
- **13.3x more expensive** on input ($2 vs $0.15)
- **20x more expensive** on output ($12 vs $0.60)
- **38x more expensive** on images ($8.256 vs $0.217 per K)
- Better: Flagship multimodal (video, audio), state-of-the-art benchmarks, agentic workflows
- Much larger context: 1.05M vs 128K

### Gemini 2.5 Pro vs GPT-4o-mini:
- **8.3x more expensive** on input ($1.25 vs $0.15)
- **16.7x more expensive** on output ($10 vs $0.60)
- Better: First place LMArena, advanced reasoning, "thinking" capabilities
- Much larger context: 1.05M vs 128K


## Moonshot AI Kimi Series

### **Kimi K2 Thinking** (Advanced open reasoning model)
- Context: **262K** (262,144 tokens)
- Pricing: **$0.45/M input, $2.35/M output** (via Chutes provider)
- Alternative pricing: $0.50-$0.60/M input, $2.50/M output (other providers)
- Features: Agentic long-horizon reasoning, trillion-parameter MoE, 32B active parameters
- Tool use: Yes (dynamic tool invocation, persistent step-by-step thought)
- Multimodal: Text only
- Structured outputs: Yes
- Notes: Optimized for complex reasoning workflows spanning hundreds of turns
- Benchmarks: New open-source records on HLE, BrowseComp, SWE-Multilingual, LiveCodeBench
- Stability: 200-300 tool calls without drift
- Use cases: Autonomous research, coding, writing with hundreds of sequential actions

### Kimi K2 Thinking vs GPT-4o-mini:
- **3x more expensive** on input ($0.45 vs $0.15)
- **3.9x more expensive** on output ($2.35 vs $0.60)
- Better: Advanced reasoning, agentic workflows, long-horizon tasks, tool orchestration
- Larger context: 262K vs 128K (2x)
- Unique: Open-source, persistent multi-turn reasoning

---

## Meta Llama 3.1 Series

### **Llama 3.1 8B Instruct** (Fast & efficient)
- Context: **131K** (131,072 tokens)
- Pricing: **$0.02/M input, $0.03/M output**
- Features: Fast and efficient, instruct-tuned, strong performance on human evaluations
- Tool use: Yes (function calling)
- Multimodal: Text only
- Structured outputs: Yes
- Notes: Latest Llama 3.1 class, variety of sizes & flavors
- Open-source: Yes (Meta Llama 3.1)

### **Llama 3.1 70B Instruct** (Larger, more capable)
- Context: **131K**
- Pricing: ~$0.20-0.40/M input, ~$0.40-0.80/M output (varies by provider)
- Features: 70 billion parameters, strong reasoning and coding
- Tool use: Yes
- Multimodal: Text only
- Structured outputs: Yes
- Notes: 16x context increase from Llama 3 models (128K)

### Llama 3.1 8B vs GPT-4o-mini:
- **7.5x CHEAPER** on input ($0.02 vs $0.15) - **BEST PRICE!**
- **20x CHEAPER** on output ($0.03 vs $0.60) - **BEST PRICE!**
- Similar context: 131K vs 128K
- Trade-offs: Less advanced than GPT-4o-mini in reasoning/quality, but excellent value
- Same capabilities: Tools, structured outputs
- **CHEAPEST OPTION - excellent for high-volume, cost-sensitive workloads!**

---

## FREE MODELS FOUND

### **Grok 4.1 Fast** (xAI)
- Context: 2M
- Pricing: **$0/M input, $0/M output (FREE!)**
- Features: Best agentic tool calling model, real-world use cases
- Tool use: Yes (excellent)
- Notes: 2M context window, reasoning can be enabled/disabled

### **gpt-oss-20b (free)** (OpenAI)
- Context: 131K
- Pricing: **$0/M input, $0/M output (FREE!)**
- Features: 21B parameter MoE, 3.6B active, Apache 2.0 license
- Tool use: Yes (function calling, structured outputs)
- Notes: Open-weight, free to use
