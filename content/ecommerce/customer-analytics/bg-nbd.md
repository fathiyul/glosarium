---
title: "BG/NBD Model"
summary: "The classic probabilistic model of repeat buying — frequency and dropout from dates alone."
levels: { data-scientist: mid-level, data-analyst: senior }
aliases: ["Pareto/NBD family", "Fader-Hardie model"]
prereqs: ["purchase-frequency"]
related: ["predictive-clv", "purchase-frequency", "second-purchase-rate", "rfm-analysis"]
core: [data-scientist]
---

BG/NBD answers a deceptively simple question from nothing but purchase dates: how likely is a customer who bought 4 times, last one 30 days ago, still active? It models each customer as having an unobserved personal purchase *rate* (Gamma-distributed across the population) and a per-transaction dropout *probability* (Beta-distributed — hence "Beta-Geometric / Negative Binomial Distribution"). The population prior + observed dates → posterior probability the customer is alive and expected future transactions. Pair it with **Gamma-Gamma** (a second model over monetary values per purchase) and you have the classic two-piece [predictive CLV](/t/predictive-clv) without a single ML framework.

Why it survives every newer method: it needs *only* recency, frequency and observation window — the three cheapest columns in any store database — it fits on hundreds of customers, not hundreds of thousands, and its outputs (alive-probability, expected purchases) are directly readable by a marketing team. RFM scoring is, in effect, the folklore version of this model.

Assumptions to respect — they are the failure modes:

- **Poisson-ish arrivals.** Purchases arrive at roughly a personal rate; *bursty* promo-period buying violates this hard. Indonesian stores with double-date cycles should either model event-driven and organic behavior separately or expect systematically optimistic "alive" probabilities right after campaigns.
- **No covariates.** The base model ignores category, channel and voucher behavior — attractive extensions exist (covariate BG/NBD), and they inherit all the usual overfitting duties.
- **Non-contractual churn is silent death.** No cancellation event means dropout can only be *inferred*; a customer who switched to a competitor last week is "probably alive" for weeks.

Practitioner notes: implementations are stable in mature statistical libraries (lifetimes-style packages implement exactly this formulation); check the monetary-model assumption before trusting "expected value per purchase", and sanity-check alive-probability against a holdout [retention curve](/t/retention-analysis) the way any forecast deserves.
