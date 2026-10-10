---
title: "Churn Rate"
summary: "The share of customers or revenue lost in a period."
levels: { tech-entrepreneur: pmf }
aliases: ["churn rate", "churn", "customer churn", "logo churn"]
prereqs: ["retention-curve", "mrr-arr"]
related: ["retention-curve", "logo-churn-vs-revenue-churn", "net-revenue-retention", "customer-success"]
core: [tech-entrepreneur]
---

**Churn rate** is the share of customers (logo churn) or revenue (revenue churn) lost per period. It is the tax on all growth: 5% monthly logo churn means replacing over 45% of customers yearly just to stand still. Growth with high churn is a treadmill set to sprint — exhausting, expensive, and eventually unwinnable.

```text
start 1,000 → lose 50 (5%) → add 80 → end 1,030 (growth hides the leak; fix the leak first)
```

Measure both churns separately ([logo vs revenue](/t/logo-churn-vs-revenue-churn)): losing many tiny accounts while keeping revenue differs totally from losing two whales. And always cohort it — blended churn mixes dying old cohorts with fresh ones, hiding both stories.

The classic mistakes:

- Celebrating gross adds. New logos masking churn in headlines and all-hands. Report net *and* churned absolute numbers side by side, every time.
- Involuntary churn ignored. Failed payments, expired cards, billing bugs — often a fifth or more of total churn, fixable with dunning flows and retries rather than product work. Split voluntary vs involuntary before strategizing.
- Averaging across segments. Enterprise 1% and SMB 12% blend into a meaningless middle. Churn is diagnosed per segment, fixed per cause.
- Win-back blindness. Churned customers re-acquire cheaper than cold prospects (they know the product). Systematic win-back beats pure acquisition on CAC every time — run it.
- Chasing zero churn. Some churn is healthy (bad-fit customers leaving improves focus and margins). Target the churn you can profitably prevent: onboarding failures, missing features with demand, support-caused exits.

**The hierarchy:** measure both churns by cohort, fix involuntary first (cheapest), then onboarding-driven, then value-driven — with [customer success](/t/customer-success) owning the motion and product owning the causes.
