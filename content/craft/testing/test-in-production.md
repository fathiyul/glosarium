---
title: "Testing in Production"
summary: "Validating safely with real traffic using flags, canaries and monitoring."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["testing in production", "TiP", "test in prod"]
prereqs: ["feature-flags", "observability"]
related: ["canary-release", "dark-launch", "progressive-delivery", "monitoring", "alerting"]
---

**Testing in production** means validating a change against **real traffic** and real data, in the live environment — not because you skipped testing, but because some things only appear there: real data shapes, real traffic patterns, real dependency latencies, real user behaviour. The point is to do it *safely*, with the ability to limit and reverse exposure.

The safe techniques:

- Feature flags — ship code dark and expose it to a small slice, then off instantly if needed (see [feature flags](/t/feature-flags)).
- Canary releases — send a small percentage of traffic to the new version and watch metrics before widening (see [canary release](/t/canary-release)).
- Dark launches — run the new path on shadow traffic without affecting responses (see [dark launch](/t/dark-launch)).
- Synthetic checks — scripted probes that exercise critical paths continuously.
- Strong observability — the prerequisite. If you can't see error rates and latency, "testing in production" is just hoping.

```text
1% of traffic → watch errors/latency → widen or roll back
```

The classic mistakes:

- Using it as an excuse to skip tests. "We test in production" often hides a lack of unit and integration tests. Catching a typo at 1% of production is far worse than catching it in CI. Test locally first; use production for what only production shows.
- No kill switch. If exposure can't be turned off in seconds — without a deploy — you've removed the safety that makes it acceptable. Flags and canaries exist for this.
- No monitoring to judge it. Without error rates, latency and business metrics, you can't tell success from failure. Define what "healthy" means before you start.
- Irreversible changes. Testing that mutates data or triggers side effects with no way back is not safe testing. Keep the experiment reversible.
- Blind exposure. Rolling to 100% and "watching" is not a canary. Ramp deliberately (see [progressive delivery](/t/progressive-delivery)).

Test-in-production is a legitimate, powerful practice when paired with flags, canaries, monitoring and a fast rollback. It's the last mile of confidence, not the first line of defence. Use it to validate under reality, never to replace the cheap, fast feedback of tests that run before anything ships.
