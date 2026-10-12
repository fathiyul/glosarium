---
title: "Revenue at Risk"
summary: "Revenue from customers showing lapse signals, weighted by value — the retention budget's to-do list."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["at-risk revenue", "churn exposure"]
prereqs: ["churn-rate"]
related: ["reactivation-rate", "rfm-analysis", "predictive-clv", "net-revenue-retention"]
---

Revenue at risk = revenue (or [CLV](/t/predictive-clv)) from currently-active customers flagged as likely to churn, usually within a confidence band. It converts churn anxiety into a work queue: instead of "churn rate is 3%", you get "Rp 480M sits behind 340 accounts showing early warning; here are the top 50".

The standard recipe, deliberately unglamorous:

```text
signal:  recency slipping past the customer's own cadence
         (2× normal gap, not a calendar threshold)
         + engagement decay (opens, logins, basket shrinks)
         + support/contributing events (disputes, failed COD)
weight:  trailing revenue OR predicted margin — state which
score:   P(churn) from a [model](/t/churn-rate) or a rule
         stack; rank = P × value
```

Why the *value* weight matters: raw churn lists are dominated by small one-order accounts — chasing them spends retention budget on the [promo-dependent tail](/t/promo-dependence). Risk-weighted by margin, the list usually surfaces mid-size repeat buyers: the segment where one saved relationship funds ten small ones, and enterprise accounts whose concentration makes a single loss a board event ([logo vs revenue churn](/t/logo-churn-vs-revenue-churn)).

The traps that make the metric decorative if ignored: **signal latency** — recency-based signals fire *after* the customer has already mentally left; pairs well with early-warning categories (declining engagement, not declining purchase) but know you are managing the near-exit; **incentive leakage** — if saves require discounts, measured revenue-at-risk shrinks while [discount burn](/t/discount-burn) grows; report saved revenue *net of save cost*, or the team optimizes the spreadsheet; **self-fulfilling contact** — some customers churn *because* the "we miss you" email reminded them to leave; a periodic no-contact holdout keeps the estimate honest.

Founders: the number is also a [NRR](/t/net-revenue-retention) forecast in disguise — sum risk-weighted loss vs expansion pipeline before the quarter starts, and the retention-vs-acquisition budget debate becomes arithmetic instead of taste.
