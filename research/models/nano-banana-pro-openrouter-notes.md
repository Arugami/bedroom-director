# Nano Banana Pro (Gemini 3 Pro Image Preview) — Pricing & Integration Notes

Source: OpenRouter model page (Nov 21, 2025 screenshot) plus Google pricing docs.

## TL;DR for Scene Canvas
- Use `google/gemini-3-pro-image-preview` for stacked frames and storyboard abilities.
- Cost per output image: ~\$0.13 (1K/2K) or ~\$0.24 (4K) on Standard; ~\$0.07 (1K/2K) or ~\$0.12 (4K) on Batch (~50% off).
- Inputs: ref images ~\$0.001 each; text tokens negligible for normal prompts.
- Provider choice: Google AI Studio is faster (avg 78 tok/s, ~11 s latency) than Google Vertex (54 tok/s, ~17 s latency) per OpenRouter metrics.
- Data policy: prompt training off; logging varies by provider (zero retention vs 55-day retention).

## Pricing (OpenRouter view)
- Header shows: \$2/M input tokens, \$12/M output tokens, \$120/M image tokens.
- Translate to per-image using Google’s token counts:
  - 1K–2K outputs consume ~1120 tokens → ~\$0.134 Standard; ~\$0.067 Batch.
  - 4K outputs consume ~2000 tokens → ~\$0.24 Standard; ~\$0.12 Batch.
- Keep Canvas defaults at 1K/2K + Batch for cheap drafts; offer 4K + Standard for finals.

## Providers surfaced
- Google AI Studio and Google Vertex listed.
- Both support: max context ~65.5K, max output ~32.8K tokens; parameters include max tokens, temperature, top_p, seed, response format, structured outputs.
- Data policy callouts:
  - AI Studio: prompt logging zero retention.
  - Vertex: prompt logging 55-day retention.
  - Prompt training: false; moderation responsibility sits with developer.

## Performance snapshots (OpenRouter metrics)
- Throughput: AI Studio avg 78 tok/s; Vertex avg 54 tok/s.
- Latency: AI Studio avg 11.05 s; Vertex avg 17.30 s.
- End-to-end latency: AI Studio avg 29.17 s; Vertex avg 37.87 s.
- Uptime shown per provider (recent days): AI Studio ~60%; Vertex ~80% in the screenshot, with routing/fallbacks available.

## Popular apps using the model (week-of snapshot)
- KoalaBear, Cline, SillyTavern, Lumi Website Generator, Open WebUI, Chatbox AI, ChatWise, Cherry Studio, Node3 Flux Prompt Generator, liteLLM, Trickle, OZ Chat Image Generator, Obsidian Copilot, Image Generation Tool, TaskWeaver-UI, LobeHub, n8n, benchable.ai, Synchropoiesis Loom, reddit-bot.
- Usage chart showed ~150M–600M tokens/day range around Nov 20–21.

## Integration quickstart (OpenRouter)
- Model ID: `google/gemini-3-pro-image-preview`.
- Request shape: send chat completion with `modalities: ["image", "text"]` to get base64 data URLs in assistant messages.
- Standard OpenRouter headers optional but recommended for leaderboard attribution.
- Use Batch API where possible for ~50% image cost reduction; expect slightly slower latency.

## How to apply in Scene Canvas
- Default “4-stack storyboard” Ability:
  - Resolution: 1K/2K (draft) with Batch; toggle to 4K (final) with Standard.
  - Show estimated cost live: frames × per-image price + minor ref image cost.
  - If estimate > user cap, prompt “Switch to Draft (Batch) or lower resolution.”
- Provider selection:
  - Prefer AI Studio for speed; fail over to Vertex for availability.
  - Surface logging note (zero retention vs 55-day) in advanced settings.

## Open questions to validate
- Confirm whether your OpenRouter key routes to both providers or is limited.
- Verify if 4K is materially needed for most outputs; keep draft defaults cheap if not.
- Decide daily/ability spend caps to prevent overages when stacking many frames.
