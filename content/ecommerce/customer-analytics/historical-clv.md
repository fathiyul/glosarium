---
title: "Historical CLV"
summary: "What customers have actually been worth — measured margin, not modeled promises."
levels: { data-analyst: junior, tech-entrepreneur: mvp }
aliases: ["historical customer lifetime value", "realized CLV", "CLV"]
prereqs: ["contribution-margin"]
related: ["predictive-clv", "bg-nbd", "repeat-purchase-rate", "acquisition-quality"]
---

Historical CLV = the realized contribution margin a customer (or cohort) has produced so far. No model, no assumptions, no crystal ball — sum each order's margin minus attributed service costs, up to today. Its job is to be the *ground truth* that predictive models and CAC decisions eventually get judged against.

```text
customer A: 7 orders · Σ CM − vouchers − support = Rp 340k
customer B: 2 orders · 1 return · 4 support tickets = Rp −60k
both bought from the same campaign; only history knows
```

The uncomfortable finding this number usually delivers: the margin distribution is not the revenue distribution. The whale with twelve COD rejections and a permanent voucher code can be worth less than the quiet quarterly buyer — negative-CLV customers are *real* and they are invisible in every revenue-ranked report. Segment historical CLV by [acquisition channel](/t/acquisition-quality), by payment method, by promo reliance, and the acquisition budget argument rewrites itself.

Founders at MVP: before anyone debates [LTV:CAC ratios](/t/ltv-cac-ratio), there must be a cohort old enough to *have* history. Historical CLV of your first cohorts is the only defensible input; until then the ratio is fiction with a dashboard.

The traps: **attribution of shared costs** (delivery subsidy and customer-service load per customer need a stated allocation rule or CLV becomes an accounting opinion), **incomplete observation** (young cohorts' windows are shorter — compare cohorts at equal *age*, not equal *calendar*, or recent acquisitions look terrible), and **the survivor trap** — averaging only today's customers erases everyone who churned, which is exactly the input [predictive CLV](/t/predictive-clv) needs the most.

When not to spend more effort here: historical CLV will never predict anything (you can't run budget on "what happened"); it is the yardstick. When a quarter's model diverges sharply from realized history, the model — not the customer — is wrong.
