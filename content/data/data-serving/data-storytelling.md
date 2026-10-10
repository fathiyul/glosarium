---
title: "Data Storytelling"
summary: "Turning analysis into a narrative that drives action."
levels: { data-analyst: mid-level , tech-entrepreneur: pmf }
core: [data-analyst]
aliases: ["storytelling with data", "data narrative", "presenting findings"]
prereqs: ["data-visualization", "chart-annotation"]
related: ["chart-annotation", "dashboard-design", "executive-communication", "metric-discrepancy", "drill-down"]
---

Data storytelling is turning an analysis into a narrative that leads somewhere: what we saw, why it matters, what we should do. **The analysis is the evidence; the story is the argument built on it.**

## Why it matters

An analyst who sends a chart with no claim attached has done half the job. **The reader either works out the claim themselves — and often gets it wrong — or files the message.** The story is what converts findings into decisions, and without one your careful work has no route out of your notebook.

## The shape that works

Whatever the medium:

1. Lead with the point. One sentence: checkout conversion fell over the last two weeks, and it is concentrated in one platform (figures illustrative). Not "I analysed the funnel data".
2. Then the evidence, in the order the reader needs it. Two or three charts, each making one claim.
3. Then the cause you can support, kept separate from the cause you suspect.
4. Then the recommendation, with what it costs and what it risks.
5. Then an appendix for anyone who wants to check your work.

## Practical rules

- One claim per chart. If a chart needs three sentences of explanation, it is usually two charts.
- Annotate the events — [chart annotation](/t/chart-annotation) — so the reader is not inventing causes for a shape you already understand.
- Say what would change your mind. A finding with no falsification condition is an opinion with a spreadsheet attached.
- Separate correlation from causation explicitly, and mark the parts that are estimates — see [correlation versus causation](/t/correlation-vs-causation) and [confidence interval](/t/confidence-interval).
- Match the length to the audience. [Executive communication](/t/executive-communication) wants the point and the ask; a working session wants the detail and the caveat.
- Keep the numbers consistent with everywhere else the company reports them. A second version of revenue is a [metric discrepancy](/t/metric-discrepancy) you have just created, and it will outlive the story.

## The trade-off

A story is a compression, and every compression loses something. The answer is not to stop compressing — a reader will not read eight pages — but to keep the underlying numbers one click away ([drill-down](/t/drill-down)) and to say where the uncertainty sits. A story that hides its soft spots gets found out later, and then the next one is read with suspicion.

The evidence underneath still has to be sound, which is the whole of [exploratory data analysis](/t/exploratory-data-analysis); the version that appears on a recurring page rather than in a message is [dashboard design](/t/dashboard-design).
