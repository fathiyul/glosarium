---
title: "Missing Data Mechanisms"
summary: "Whether missingness is random decides what you may do."
levels: { data-analyst: senior , data-scientist: mid-level }
aliases: ["MCAR MAR MNAR", "missingness mechanisms", "missingness"]
prereqs: ["sampling-methods", "descriptive-statistics"]
related: ["imputation", "data-cleaning", "survivorship-bias", "sampling-bias"]
---

Missing data comes in three mechanisms, and the mechanism decides what you may do. **MCAR (missing completely at random)** means the gaps are coin flips, unrelated to anything — a logging outage that drops 2% of rows. **MAR (missing at random)** means the gaps are explained by columns you do have — junior staff skip the optional survey question, and you know who is junior. **MNAR (missing not at random)** means the gaps depend on the missing value itself — high earners skip the salary question because their salary is high.

The classic mistake is one blanket policy: always drop incomplete rows, or always fill with the mean. Dropping rows under MAR or MNAR silently redefines your population (compare with [survivorship bias](/t/survivorship-bias)); mean-filling understates uncertainty and manufactures confidence. Instead, profile missingness first: what share is missing, and does it vary by segment? If non-response on income runs 5% for analysts but 40% for executives, you are not in MCAR territory.

Roughly: MCAR plus a tiny missing share — complete-case analysis is honest. MAR — model it with the observed columns ([imputation](/t/imputation) done properly, ideally multiple). MNAR — no generic fix exists; you must model the missingness itself and show how the answer moves under different assumptions.

## When simple approaches are fine

As a data analyst, dropping or singly filling is acceptable when the missing share is small (often a few percent) and flat across every segment you report on — say so in a footnote and move on. As a data scientist, never ship a single fill without a sensitivity check: re-run the analysis under a harsher assumption about the gaps and report whether the conclusion survives. And beware assuming MAR by default — it is untestable from the data alone, since the evidence you would need is the part that is missing. For the mechanics of filling see [data cleaning](/t/data-cleaning); for who-you-observe problems generally see [sampling bias](/t/sampling-bias).
