---
title: "Degraded Modes"
summary: "Serving reduced functionality when dependencies fail."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["degraded modes", "graceful degradation modes", "partial functionality"]
prereqs: ["graceful-degradation", "dependency-failure"]
related: ["graceful-degradation", "feature-flags", "load-shedding"]
---
**Degraded modes** are designed reduced-functionality states: recommendations off, images low-res, search simplified, personalization paused — the service works, just less richly. Unlike accidental breakage, degraded modes are *planned*: triggers defined, behaviour specified, recovery automatic, users informed honestly.

```text
normal → (dependency slow) → degraded (cached/defaults) → (recovered) → normal
```

Good degradation is tiered (shed in order of user value), automatic (no human flips switches at 3am — though manual overrides exist), and visible internally (dashboards show current mode) while calm externally (no alarming users over handled degradation).

The classic mistakes:

- All-or-nothing design. Full feature or total error, with nothing between, turns every dependency hiccup into user-facing failure. Design the middle states first.
- Degradation by accident. Untested fallback paths (stale caches, default content) failing exactly when needed. Exercise degraded modes regularly (game days, fault injection).
- Silent degradation. Users seeing wrong/stale content without indication lose trust when they discover it. Signal reduced freshness honestly where it matters.
- No recovery path. Entering degraded mode easily but requiring manual restoration leaves systems limping after incidents pass. Automate return-to-normal with verification.
- Priority inversion in shedding. Dropping checkout to save recommendations inverts user value. Order shedding by business impact, decided calmly in advance.
- Flag sprawl. Dozens of manual degradation toggles nobody remembers create unpredictable system states. Few, well-understood modes with clear ownership.
- Testing only normal. Load tests, chaos tests and game days run at full function; degraded paths — the ones incidents actually use — stay unverified. Test the modes users will see.

**How to design them:** tier features by value, define triggers and behaviours per tier, automate transitions both ways, exercise regularly. Degradation designed is resilience; degradation improvised is outage with extra steps.
