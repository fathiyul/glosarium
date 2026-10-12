---
title: "Revenue per Visitor (RPV)"
summary: "Revenue divided by sessions — conversion and basket combined into one honest number."
levels: { data-analyst: junior, tech-entrepreneur: mvp }
aliases: ["RPV", "revenue per session", "EPC"]
prereqs: ["conversion-rate", "aov"]
related: ["conversion-rate", "aov", "roas", "landing-page-test"]
---

RPV = net revenue ÷ sessions. The product of [conversion rate](/t/conversion-rate) × [AOV](/t/aov), in one number — and that multiplication is exactly why it beats either factor alone as a ranking metric.

```text
campaign A: CR 3.0% × AOV Rp 90k   = Rp 2,700/visitor
campaign B: CR 1.4% × AOV Rp 320k  = Rp 4,480/visitor
"A wins on conversion" — B earns 65% more per click
```

The story RPV tells: **how valuable is one unit of your traffic**. That makes it the metric pages get judged on — the product page after a redesign, the landing page after a copy change, the checkout after friction removal — because it counts both buyers who convert and *how much* they bring, instead of letting a 10%-off surge look like conversion genius.

Founders at MVP stage: RPV pairs with CPC — you break even on a channel when RPV > cost per click. Rp 4,000 RPV against Rp 2,500 CPC is a business; Rp 4,000 against Rp 6,000 is a [ROAS](/t/roas) conversation about margin, not clicks. The RPV-vs-CPC break-even is one line your ads dashboard should never hide.

The traps analysts inherit: **traffic mix drives RPV more than the page does.** A newsletter link (already decided buyers) shows double the RPV of paid social touching the *same* page — segment before comparing pages. Seasonality: promo weeks lift CR and drop AOV; RPV blends them, sometimes hiding a bad trade (check the two factors separately when RPV moves oddly little). And attribution: RPV is session-scoped revenue, which discounts delayed conversion — consider a time-windowed variant for long-consideration categories.

When not to use it: cross-channel "best traffic" rankings without mix control, and any UX A/B test where you forgot to check CR and AOV separately underneath — RPV tells you *whether*; the factors tell you *why*.
