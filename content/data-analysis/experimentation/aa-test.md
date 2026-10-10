---
title: "The A/A Test"
summary: "Running a test where both groups are identical, to prove your experiment machinery is unbiased."
levels: { data-analyst: mid-level }
aliases: ["aa test", "a/a test", "null test"]
prereqs: ["ab-testing", "hypothesis-testing", "sample-size-calculation"]
related: ["ab-testing", "sample-ratio-mismatch", "hypothesis-testing", "data-quality-check", "metric-definitions"]
---

An A/A test splits traffic between two variants that are the same in every way. Both groups get the identical experience, so there is no effect to find: apart from ordinary sampling noise, the metrics should match. That makes an A/A test a **health check on the experiment machinery**, not a product test.

Run it exactly as you would run a real test — same assignment, same exposure logging, same metric pipeline, same duration — and read the output as diagnostics.

```text
assign → expose (same experience both sides) → compute metric → expect: no difference
```

## When it fires

Suppose the A/A shows a "significant" difference in checkout completion. There is no change to explain it, so the cause is in the plumbing, not the product:

- The groups are not comparable — bots, internal traffic or one browser concentrated in one arm. Check the arm sizes first ([sample ratio mismatch](/t/sample-ratio-mismatch)).
- The metric is computed differently per variant — a new event name, a filter that only applies to one side, a join that drops rows. Compare the metric definitions, not the metric values ([metric definitions](/t/metric-definitions)).
- Assignment is not actually random, or not sticky, so a user appears in both arms and is counted twice.
- Exposure is logged on one side only — the variant errors before its event fires.

## What it does not prove

An A/A result is **a prompt to investigate, not proof of a bug**. Even with perfect machinery, a test run at a nominal 5% false-positive rate will flag a difference about one time in twenty when nothing is happening ([statistical significance](/t/statistical-significance), [hypothesis testing](/t/hypothesis-testing)). Weigh the size, the direction, and whether it repeats when you run it again.

It also says nothing about whether the metric is worth moving, or whether your sample is big enough for the effect you care about. Those are metric-choice and [statistical power](/t/statistical-power) questions, and an A/A test cannot answer them.

## When to run one

Worth the traffic when the plumbing has changed: new assignment code, a new metric definition, a new pipeline, or the first experiment on a new platform. It is not worth rerunning continuously — it buys certainty about the machinery rather than about the product, and that certainty expires as soon as the code changes again.
