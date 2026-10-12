---
title: "Organic Search CTR"
summary: "Clicks from search results over impressions — the title-and-snippet scoreboard before the click even happens."
levels: { data-analyst: junior }
aliases: ["organic CTR", "search CTR", "SERP CTR"]
prereqs: []
related: ["ctr", "seo", "rpv", "landing-page-conversion-rate"]
---

Organic CTR = clicks from search ÷ search impressions, per page or query, straight from Search Console. It measures a decision made *before* your page loads: of everyone who saw your result, who bothered to click. It is the one funnel step owned by title tags and snippets — and it is read together with position, never alone.

```text
position 1 CTR      ~ high single digits → ~20s (informative queries)
position 3          steeply lower; position 10 is a rounding error
same page, CTR 1.5% → the ranking is fine, the *pitch* is broken
```

The classic misread: CTR rising while ranking *falls*. Position 5 → 3 cuts impressions but the CTR% improves — total clicks, the number that matters, fell. Always decompose: clicks = impressions × CTR; judge SEO by clicks (or revenue), let CTR tell you *which* of the two levers moved.

What CTR is genuinely good for:

- **Title/snippet testing** — reword a page's title (Google rewrites sometimes; still, the intent-matching experiment), watch CTR on unchanged ranking.
- **Intent mismatch detection** — high impressions + low CTR on a query cluster means your listing is *visible but not what they clicked for*: the product page for "harga" queries may need prices in the title, not poetry.
- **Rich-result effect** — schema-earned stars, price snippets and breadcrumbs lift CTR at equal position; the lift is your ROI proof for the engineering work.

Data hygiene: query-level data is sampled and anonymized in "other", position is an *average* over many SERPs (the mean hides the #1-vs-#20 bimodal mess), and seasonality — double-date brand searches spike with platform-level intent. Compare like windows.

When not to bother: pages with few impressions (noise) and brand queries where you rank #1 with the logo — CTR is structurally capped by the search box's geometry, not by you.
