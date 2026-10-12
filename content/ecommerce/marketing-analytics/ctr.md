---
title: "Click-Through Rate (CTR)"
summary: "Clicks divided by impressions — the interest signal between reach and traffic."
levels: { data-analyst: junior }
aliases: ["CTR", "click rate"]
prereqs: []
related: ["cpa-cpc-cpm", "roas", "conversion-rate", "landing-page-test"]
---

CTR = clicks ÷ impressions. It sits exactly one step before [conversion rate](/t/conversion-rate): conversion rate tells you whether the promise was *kept*, CTR tells you whether it was *tempting* enough to follow.

The number's whole meaning is context:

```text
search ads     usually beats display (intent vs interruption)
email links    behave nothing like feed ads
organic results CTR drops steeply with ranking position
```

A "bad" 0.4% on a reach campaign can outbuy a "great" 3% on a tiny audience — CTR alone never ranks campaigns; it ranks **messages to audiences**. Two uses where it earns its keep: creative testing (same audience, different asset — the higher-CTR variant usually costs less per click at a given CPM, see [CPA/CPC/CPM](/t/cpa-cpc-cpm)), and anomaly detection (CTR collapsing on a steady campaign = fatigue or a delivery change).

The traps juniors inherit:

- **Accidental and bait clicks.** Mobile feeds misclick; shock thumbnails earn clicks that don't survive the first second on the landing page. Pair CTR with what happens after — high CTR plus terrible conversion means the ad made a promise the page broke, not that the audience is wrong.
- **Comparing across placements.** A/b testing two ads on one placement is honest; comparing an ad-set's CTR across search, feed and story formats is mostly comparing inventory types.
- **Optimizing the numerator's floor.** Platforms charge more per click where CTR is high; deliberately click-baiting creative can raise CTR and *raise* your cost per acquisition at once.

Landing-page note: test CTR claims against [landing page](/t/landing-page-test) reality — the metric pair that should always be reviewed together, since the gap between the ad and the page is where paid traffic budgets go to die.
