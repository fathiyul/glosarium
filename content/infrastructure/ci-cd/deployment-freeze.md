---
title: "Deployment Freeze"
summary: "A period when deploys are paused, like around holidays."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["change freeze", "release freeze", "code freeze"]
prereqs: ["deployment", "continuous-delivery"]
related: ["deployment-frequency", "hotfix", "rollback", "dora-metrics", "incident-response"]
---

A **deployment freeze** (or change freeze) is a window when normal deploys are paused. Teams use them around holidays, major sales or events, or the end of a quarter, when traffic is high or on-call staff are thin and the appetite for risk is low.

```text
freeze from Dec 20 to Jan 2: no routine deploys
exceptions: security patches, critical fixes (with sign-off)
```

The reasoning is simple: if fewer changes ship while fewer people are watching, there are fewer ways to break things at a bad time.

The classic mistakes:

- **Freezing everything with no exception path.** A critical security patch or a data-loss bug still needs to ship. A freeze with no agreed exception process either gets ignored or blocks a fix it shouldn't.
- **Letting the backlog pile up.** Pausing for two weeks and releasing everything at once on day one recreates the exact risk the freeze was meant to avoid — a large, untested batch. Resume gradually.
- **Using freezes as a substitute for safety.** If deploys are so dangerous that pausing them is a relief, the underlying problem is release process, not the calendar. Investing in [feature flags](/t/feature-flags), [canaries](/t/canary-release) and quick [rollback](/t/rollback) makes deploys boring enough that freezes matter less.

The trade-off is real. Freezes lower risk during a short window but push against continuous delivery: fewer, larger releases, and a queue of pent-up change. Teams that deploy frequently with small changes (good [deployment frequency](/t/dora-metrics)) often need freezes less, because any individual deploy is low-stakes.

When not to use it: if you can release dark and turn features on later (see [deploy vs release](/t/deploy-vs-release)), you can keep deploying through the freeze and simply not expose anything. Keep a [hotfix](/t/hotfix) path open regardless.
