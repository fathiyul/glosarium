---
title: "RFM Analysis"
summary: "Scoring customers on how recently, how often and how much they bought."
core: [data-scientist]
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["RFM", "RFM segmentation", "recency frequency monetary"]
prereqs: ["segmentation", "descriptive-analysis"]
related: ["segmentation", "cohort-analysis", "retention-analysis", "customer-data-platform"]
---

**RFM analysis** scores each customer on three behaviours: Recency (how recently they bought), Frequency (how often), and Monetary (how much they spend). Rank customers into bands on each — typically quintiles — and the combined score segments the base into champions, loyalists, at-risk, hibernating and lost, each with an obvious next action.

```text
customer:  R=5 (bought yesterday)  F=2 (rarely)  M=4 (big tickets)
segment:   "new big spender" → onboard well, second-purchase nudge
```

Its power is actionability: unlike abstract clusters, RFM segments read as instructions. High-recency low-frequency gets a second-purchase campaign; low-recency high-frequency gets a win-back offer; low everything gets suppressed from expensive channels.

The classic mistakes:

- Arbitrary quintiles treated as truth. Band edges are choices, not discoveries. Two customers either side of a cutoff are nearly identical — do not brief them as different species.
- Stale scores. RFM decays daily; a monthly refresh lets "at-risk" customers churn before anyone acts. Refresh on the cadence of the action it drives.
- Monetary without margin. Ranking by revenue promotes discount-chasers and unprofitable accounts. Score on margin or contribution where it matters.
- One RFM for unlike businesses. Subscriptions (tenure matters), marketplaces (both sides matter) and B2B (accounts, not users) all bend the frame. Adapt the letters to the business before segmenting.
- Segments nobody uses. Five beautiful segments with no channel, offer or owner attached are wall art. Each segment ships with its action.

**When to go further:** when behaviour needs more dimensions than three letters — then [segmentation](/t/segmentation) with clustering, or [cohort analysis](/t/cohort-analysis) for time-based behaviour. RFM is the fast, explainable first cut.
