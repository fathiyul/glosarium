---
title: "Chat Response Rate"
summary: "The marketplace-scored metric: did you answer buyer chats, and how fast — SLA with a platform enforcement arm."
levels: { data-analyst: junior, tech-entrepreneur: mvp }
aliases: ["chat reply rate", "store chat performance"]
prereqs: []
related: ["first-response-time", "seller-performance-score", "product-conversion-rate", "otd-rate"]
---

Chat response rate = chat messages answered (within the platform's SLA) ÷ inbound chats, per scoring window — Shopee and Tokopedia publish their own definitions (chat replies within 12h, sometimes a daily minimum) and fold the result into the seller's store score, which gates visibility, campaign eligibility and sometimes badge status. This is the rare e-commerce metric where the platform, not your analytics stack, is the grader — which is exactly why small sellers feel it and analysts sometimes don't measure it.

```text
chat → pre-sale conversion is 3–5× no-chat sessions
chat response rate 80% → 96%   = a storefront visibility lift
                            ...and a Sunday-night problem
```

The economics: Indonesian marketplace chats are overwhelmingly *pre-sale* ("ready?", "muat nggak untuk RX King?", "boleh COD?"), and answered pre-sale chats convert at multiples of the same listing cold. The response-rate metric is therefore not a support number at all — it is a [conversion](/t/product-conversion-rate) lever the platform scores directly, priced in lost orders during the hours you didn't answer (night, weekends, campaign days when inbound multiplies).

Operational reality for analysts: platform dashboards show the rate; your value is joining *chat text* to outcomes — which questions precede conversion (COD-eligibility and size answers close sales; delivery-time answers on remote zones kill them — the answer *is* the [coverage](/t/otd-rate) story), and which unanswered chats became lost carts. The metric also decomposes by time-of-day; a 90% rate that hides "midnight to 7am is 20%" is a staffing plan, and canned fast-replies that don't advance the question will hit response-rate but not [CSAT](/t/csat) or conversion — both lines must move together.

When the platform grader is insufficient: multi-store operators managing dozens of shops — the per-store response rate masks the operator's queue failure; consolidate per-agent and per-hour loads across stores and let the platform score be an output, not the input.
