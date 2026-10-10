---
title: "Release Train"
summary: "Shipping on a fixed schedule with whatever is ready."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["release train", "scheduled release", "fixed release cadence"]
prereqs: ["continuous-delivery", "deployment-frequency"]
related: ["trunk-based-development", "feature-flags", "deployment-freeze", "continuous-delivery", "dora-metrics"]
---

A **release train** ships on a fixed schedule — every day, every two weeks — and leaves on time. Whatever is finished and ready gets on; anything incomplete waits for the next train. The schedule is the promise; the content flexes.

```text
train departs Friday 14:00
  ✓ feature A (ready)     → ships
  ✗ feature B (half done) → next train, not delayed for
```

The appeal is **predictability**. Downstream teams, support and customers can plan around a known cadence, and there's no debate about "when does it go out". It also puts a healthy pressure on finishing work rather than starting more, and it can coexist with feature flags — code ships on the train, and features are enabled separately (see [deploy vs release](/t/deploy-vs-release)).

The classic mistakes:

- Missing the train becoming normal. If features routinely miss, batch sizes grow and each release is riskier. A train should encourage small, finished work, not a last-minute rush.
- Deadline over quality. "It has to be on this train" pushes untested changes out the door. Missing a train should be cheap and normal; a broken release is not.
- Merge chaos before departure. If everyone lands work at the deadline, you get integration pain. [Trunk-based development](/t/trunk-based-development) and frequent merges smooth this out.
- Treating it as the only way to fix things. A train doesn't mean you can't [roll back](/t/rollback) or hotfix; it's a release cadence, not a straitjacket.

**When it's useful:** when coordination matters more than speed — many teams releasing together, or external dependencies that need a known date. It's the opposite trade-off from continuous delivery ([deployment frequency](/t/deployment-frequency)): fewer, scheduled releases instead of many small ones. Neither is wrong; they suit different organisations. A train with feature flags and good automation gets much of the safety of continuous delivery while keeping the fixed date.
