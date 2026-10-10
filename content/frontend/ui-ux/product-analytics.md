---
title: "Product Analytics"
summary: "Tracking how people use features to inform decisions."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , tech-entrepreneur: mvp }
also: [data-serving]
aliases: ["product analytics", "event tracking", "user analytics"]
prereqs: ["ab-testing", "gdpr"]
related: ["ab-testing", "feature-flags", "gdpr"]
core: [tech-entrepreneur]
---

**Product analytics** instruments user behaviour — events (signed up, searched, purchased), funnels (signup → activation → retention), cohorts and properties — so product decisions rest on evidence rather than anecdote. Well-designed tracking answers "where do users struggle, and did our change help?" directly.

```text
events: signup_completed {plan, source} → funnel: visit→signup→activate→retain
decision: ship, iterate, or revert — by the numbers
```

Value concentrates in a small, well-defined event taxonomy (consistent names, documented properties, versioned changes) wired to decisions — not in indiscriminate capture. Privacy constrains everything: consent, minimisation, retention limits and regional rules shape what's collectable.

The classic mistakes:

- Tracking everything. Indiscriminate events bloat costs, slow pages, and create noise nobody analyses — while expanding privacy exposure. Instrument decisions, not curiosity.
- Inconsistent taxonomy. `signup`, `sign_up`, `user-signed-up` across teams makes analysis join-proof. One naming convention, documented, linted.
- No consent handling. Collecting behavioural data without consent basis violates law in major jurisdictions and destroys trust. Consent-first instrumentation with graceful degradation.
- Vanity metrics. Signups without activation, pageviews without outcomes — metrics that always look good and decide nothing. Tie events to decisions and outcomes.
- Breaking changes unannounced. Renaming events silently breaks dashboards and experiments. Version the taxonomy; migrate consumers deliberately.
- Sampling blindness. Aggressive sampling hides small-but-important segments (new features, rare errors). Sample rates must preserve decision-relevant slices.
- Analysis without experiments. Observational data confounds relentlessly; causal claims need randomised tests (see [A/B testing](/t/ab-testing)). Analytics finds candidates; experiments decide.

**The practice:** minimal decision-driven taxonomy, consistent naming, consent-respecting collection, funnels tied to outcomes, experiments for causality. Evidence infrastructure, maintained like production code.
