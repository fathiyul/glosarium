---
title: "Dark Launch"
summary: "Running new code in production without users seeing it."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["dark launch", "dark launching", "shadow traffic"]
prereqs: ["deploy-vs-release", "feature-flags"]
related: ["canary-release", "blue-green-deployment", "progressive-delivery", "deploy-vs-release", "release-train"]
---

A **dark launch** runs new code in production while users can't see or depend on it. The code is deployed and executing, but its results are hidden or ignored — the new search index is built, the new service is called, but the old response is what users get. It's "launched" in the dark.

The most common form is **shadow traffic**: real requests are copied to the new version, which processes them alongside the old one. You compare the two outputs, catch differences and performance problems, and only then switch users over.

```text
user request ──▶ old service ──▶ response to user
        └──────▶ new service (shadow) ──▶ compare, log, discard
```

Why it helps: you exercise new code against real production traffic and real data volumes before it affects anyone. Performance surprises, mismatched outputs and rare edge cases surface with no user impact. It's a form of [progressive delivery](/t/progressive-delivery) and a way to decouple [deployment from release](/t/deploy-vs-release).

The classic mistakes:

- Side effects run twice. If the shadow path writes to a database, sends email or charges a card, you've done it twice. Shadow the *reads* and compare; keep the new path's side effects disabled or isolated.
- Assuming it's free. You're running both versions, so you pay double compute for the duration. Budget for it (see [cloud cost management](/t/finops)).
- No comparison. Running the new path but never diffing the results wastes the effort. Define what you're comparing and watch it.
- Treating it as a substitute for testing. Dark launch verifies behaviour under real load; it doesn't replace unit and integration tests that catch logic errors cheaply.

**When to use it:** for risky rewrites — a new matching algorithm, a reimplemented service, a migration — where you want evidence from production before exposure. For simple, well-tested changes a [canary release](/t/canary-release) is lighter. Once you trust the shadow results, move to a gradual rollout with [feature flags](/t/feature-flags) or [blue-green](/t/blue-green-deployment).
