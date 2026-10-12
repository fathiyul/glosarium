---
title: "Customer Effort Score"
summary: "How hard was it to get this fixed? — the metric that predicts the quiet churn satisfaction misses."
levels: { data-analyst: mid-level }
aliases: ["CES", "effort score"]
prereqs: []
related: ["csat", "resolution-time", "first-contact-resolution", "churn-rate"]
---

CES asks one question after a service interaction — *"how much effort did you personally have to put in?"* — typically a 1–7 scale, reported as the mean or the share answering "low effort." Its thesis, born in customer-service research and validated broadly: *effort* predicts loyalty better than satisfaction does, because satisfied-but-exhausted customers defect to the store that is easier.

```text
same resolution, different effort:
  3 chats + 2 transfers + a week  → CSAT 4.5 · CES "high effort"
  1 chat · resolved in-thread     → CSAT 4.5 · CES "easy"
the CSAT lines are flat; the churn forecast is not
```

That divergence is why CES earns a line next to [CSAT](/t/csat): satisfaction is a *feeling about the outcome*, effort is a *memory of the cost*, and the cost memory decides who shops around next time. The operational drivers of high-effort-equals-high-Churn: repeat explanations after transfers (no context carry-over), [resolutions](/t/resolution-time) that require customer actions (visit this page, re-send photos, wait for finance), and reopened issues — [FCR](/t/first-contact-resolution) failures are effort failures wearing a different hat.

Measurement notes: ask about *this* interaction (CES is transactional; a relationship-questionnaire answer measures brand affection), instrument *channel-specific* effort (a refund that took two logins, one chat and one email is 1 interaction and 3 channels — the effort is the switching), and beware self-selection: who answers "effort?" surveys is, again, the delighted/furious tail — pair CES scores with behavioral effort proxies: *touches per resolution, reopens, and time spent* per issue type give you the census version the survey estimates.

The strategic use is budgetary: effort reduction pays in avoided service cost AND retained [repeat purchases](/t/repeat-purchase-rate) simultaneously — pre-emptive refund status (the customer never has to ask) moves both lines at once and is usually the highest-ROI single change the number surfaces.

When not to build it: pre-sale channels (effort is the wrong frame for "is this product for me"), and small volumes where the reopen-rate behavior data tells the same story with zero surveys.
