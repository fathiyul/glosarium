---
title: "Guardrail Metrics"
summary: "The numbers that must not get worse while you chase a win somewhere else."
levels: { data-analyst: mid-level }
aliases: ["guardrail metrics", "guardrails", "counter metrics", "health metrics"]
prereqs: ["ab-testing", "metric-definitions", "kpi-design"]
related: ["ab-testing", "decision-rule", "metric-definitions", "kpi-design", "retention-analysis"]
---

Guardrail metrics are the numbers you require to stay flat while a test chases a win on something else. The primary metric says whether the change worked. The guardrails say whether it broke something to get there.

They are usually costs a stakeholder would care about: error rate, p95 latency, refund rate, support contacts, unsubscribes, cancellations, ad load on a page that now shows more ads. Pick them from "what would we be embarrassed to have got worse", not from "what is easy to query".

## The classic mistake: one success metric

A test with a single success metric can pass while quietly damaging something nobody was watching, and the damage surfaces a month later in a number nobody connected to the change. A checkout change that lifts completion and doubles refund requests is **not a win**. Guardrails exist so the result reads as "conversion up, refunds up, support contacts up", which is a different decision from "conversion up".

## Making them useful

- Define them as precisely as the primary metric. A guardrail computed differently in the two arms is worse than no guardrail ([metric definitions](/t/metric-definitions)).
- Set the breach in advance. What magnitude and in which direction counts as "worse" belongs in the [decision rule](/t/decision-rule), not in a judgement made when the report lands.
- Watch the direction that matters. Error rate must not rise; time on page may move either way.
- Know what your test can see. Guardrails are rarely the powered metric, so a flat guardrail usually means **no detected harm, not no harm**. Read the interval: if the data is also compatible with a degradation you would care about, the test cannot rule it out ([statistical power](/t/statistical-power), [confidence interval](/t/confidence-interval)).
- Watch the slow ones. Churn, retention and refunds move on a longer horizon than a test runs. Measuring them needs a longer test ([test duration](/t/test-duration)) or a [holdback group](/t/holdback-group).

The trade-off is attention. Ten guardrails dilute the analysis and turn every test into a multi-metric debate. Two or three that cover real risks are more useful than a long list nobody reads.
