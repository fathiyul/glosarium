---
title: "Deploy vs Release"
summary: "Shipping code vs exposing it to users."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["deploy vs release", "release vs deploy", "ship vs release"]
prereqs: ["deployment", "feature-flags"]
related: ["dark-launch", "canary-release", "blue-green-deployment", "progressive-delivery", "continuous-delivery"]
---

**Deploy** means putting new code on the servers where it runs. **Release** means users actually see it. They sound like the same event, and in simple setups they are — but separating them is one of the most useful moves in modern delivery.

With [feature flags](/t/feature-flags), you can deploy code that's switched off, ship it to production, and release the feature later by turning the flag on. The code is deployed, not released.

```text
deploy:   new version is running in production, feature hidden
release:  flag flipped on → users get the feature
```

Why it helps:

- **Decoupling risk from timing.** You deploy during a quiet window and release when the business wants, without a deploy then.
- **Instant rollback.** Turning a flag off "reverts" a feature in seconds, without redeploying — see [roll forward vs rollback](/t/roll-forward).
- Gradual exposure. Release to a percentage of users first (a [canary release](/t/canary-release)) or to specific accounts, like a [dark launch](/t/dark-launch).

The classic mistake is treating them as one: a big-bang release where code ships *and* becomes visible simultaneously, so any problem is immediately user-facing and the only recovery is another deploy. Another is forgetting to clean up flags, leaving a tangle of old switches nobody dares touch.

One caveat: data changes can't always be hidden behind a flag. A schema migration happens at deploy time regardless of the release. Keep migrations backward-compatible, and coordinate the two (see [schema and code deploys](/t/schema-and-code-deploys)).

This split is what [continuous delivery](/t/continuous-delivery) leans on: deploy often and safely, then choose when each change reaches users. [Progressive delivery](/t/progressive-delivery) builds on the same separation.
