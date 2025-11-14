# Pricing & Feature Accuracy Audit — Nov 4 2025

Scope: top production video/image generators called out in MASTER_TODO (emphasis on VIDEO_GEN). Each row below cross-checks the `Pricing` and related feature fields in `ai_video_image_models.csv` against primary sources.

| Model | CSV Pricing Snapshot | Audit Status | Primary Sources | Notes |
| --- | --- | --- | --- | --- |
| Sora 2 Pro | Included with ChatGPT Pro ($20/mo); token metering forthcoming | ✅ Matches | [OpenAI – “Sora 2 is here”](https://openai.com/index/sora-2/); [eesel.ai pricing guide](https://www.eesel.ai/blog/sora-2-pricing) | OpenAI confirms Pro access is bundled with ChatGPT Pro accounts; pricing field already accurate. |
| Sora 2 (Standard) | Free invite-only app with generous limits | ✅ Matches | same as above; [Mashable invite flow](https://mashable.com/article/sora-2-invite) | No monetisation yet; description reflects preview limitations. |
| Sora (Azure AI Foundry) | Azure consumption-based billing | ✅ Matches | [Microsoft Learn](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/video-generation) | Azure charges per generated minute; CSV correctly references consumption model. |
| Veo 3 Audio / Silent / Fast tiers | $0.20–0.40/s standard; $0.25/s fast; silent versions cheaper | ✅ Matches | [fal.ai Veo 3](https://fal.ai/models/fal-ai/veo3); [fal.ai Veo 3 fast](https://fal.ai/models/fal-ai/veo3/fast) | All per-second rates confirmed on fal.ai product pages. |
| Veo 3.1 Audio / Fast Audio | $0.20–0.40/s (audio) and $0.10–0.15/s (fast) | ✅ Matches | [fal.ai Veo 3.1](https://fal.ai/models/fal-ai/veo3.1); [fal.ai Veo 3.1 Fast](https://fal.ai/models/fal-ai/veo3.1/fast); [Google blog](https://developers.googleblog.com/en/introducing-veo-3-1-and-new-creative-capabilities-in-the-gemini-api/) | Pricing numbers and preview status already noted correctly. |
| Veo 2 (Gemini API) | $0.50/s | ✅ Matches | [TechCrunch](https://techcrunch.com/2025/02/23/googles-new-ai-video-model-veo-2-will-cost-50-cents-per-second/) | CSV already states $0.50/s (~$30/min). |
| Runway Gen-4 / Gen-4 Turbo | Free 125 credits; Standard $12, Pro $28, Unlimited $76 | ✅ Matches | [Runway pricing](https://runwayml.com/pricing) | No change needed. |
| Luma Dream Machine | Free 8 drafts; Lite $7.99; Plus $23.99; Unlimited $75.99 | ✅ Matches | [Luma AI pricing](https://lumalabs.ai/pricing) | Credits/plan details already aligned. |
| Kling 2.5 / 2.1 variants | Credit-based via Kling/Scenario/Higgsfield | ⚠️ Informational | [Scenario Kling guide](https://help.scenario.com/en/articles/kling-video-models-the-essentials/); [Higgsfield](https://higgsfield.ai/create-video) | No unified public pricing; CSV correctly notes partner credit systems. |
| Wan 2.5 | 38 credits (5 s 480p) and $0.05–$0.15/s via API partners | ✅ Matches | [wan.video](https://wan.video/); [Toolplay Wan 2.5](https://toolplay.ai/tools/wan-2.5-ai-video-generator/) | Pricing note kept granular; no change. |
| Wan 2.2 / 2.1 | Open-source (Apache 2.0); run locally / Alibaba Cloud API | ✅ Matches | [Wan 2.2 repo](https://github.com/Wan-Video/Wan2.2); [Alibaba blog](https://alibabacloud.com/blog/alibaba-cloud-open-sources-its-ai-models-for-video-generation_602025) | Fields already describe open distribution. |
| Seedance v1 Pro / Lite | Credit bundles via CapCut, Scenario, BytePlus | ✅ Matches | [Seedance essentials](https://help.scenario.com/en/articles/seedance-models-the-essentials/); [BytePlus docs](https://docs.byteplus.com/en/docs/ModelArk/1631633) | No consistent public pricing; CSV correctly flags partner gating. |
| Dream Machine (Luma) | Plans & credits as noted | ✅ Matches | [Luma AI pricing](https://lumalabs.ai/pricing) | Verified while auditing. |
| Hailuo 02 Standard / Pro / Fast | 57–150 credits depending on mode | ✅ Matches | [Toolplay Hailuo 02](https://toolplay.ai/tools/minimax-hailuo-02-ai-image-to-video/); [Kie.ai Hailuo API](https://kie.ai/hailuo-api) | CSV entries reflect latest credit schedule. |
| Hailuo 2.3 / 2.3 Fast | Same pricing as Hailuo 02; Fast 50% cheaper batches | ✅ Matches | [MiniMax announcement](https://www.minimax.io/news/minimax-hailuo-23) | Description consistent with official blog. |
| Pika v2.2 | **Updated** → Free (80 credits), Standard $8/mo billed annually, etc. | ✅ Updated | [pika.art/pricing](https://pika.art/pricing) | CSV pricing updated during audit to match current tier amounts. |
| Midjourney Video v1 | Included in Midjourney subscriptions; GPU minutes apply | ✅ Matches | [Midjourney release](https://updates.midjourney.com/introducing-our-v1-video-model/); [TechCrunch](https://techcrunch.com/2025/06/18/midjourney-launches-its-first-ai-video-generation-model-v1/) | Pricing reflects Midjourney plan structure. |

## Summary
- **No major mismatches** found in existing pricing fields for top-tier models besides the Pika update (CSV corrected). 
- Feature descriptions (duration, controls, distinctive edges) already aligned with current documentation for Sora, Veo, Runway, Luma, Wan, Hailuo, and Midjourney families.
- Models with partner / credit-based pricing (Kling, Seedance) lack public rate cards; CSV accurately notes "credit bundles" rather than speculative amounts.

## Follow-up Notes
- Keep monitoring Google’s Gemini API pricing page: any change to per-second rates should be reflected across Veo 3.x entries.
- If Kling or Seedance publish standardised USD pricing, update the respective rows and cite the official source.
- Next audit cycle recommended after the next major model releases (e.g., Runway Gen-5, Wan 2.6) or pricing structure changes.
