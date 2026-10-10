---
title: "Cutting MVP Scope"
summary: "Removing everything that isn't needed to test whether people want the core product."
levels: { tech-entrepreneur: mvp }
aliases: ["MVP scope", "cutting scope", "minimum viable product scope"]
prereqs: ["problem-solution-fit", "riskiest-assumption"]
related: ["no-code-prototype", "iteration-speed", "deliberate-technical-debt", "product-launch"]
core: [tech-entrepreneur]
---

**Cutting MVP scope** is deciding what the first version does *not* do. Every feature beyond the core hypothesis being tested delays learning and adds code to maintain. The MVP answers one question — will people use (or pay for) this core value? — and everything not serving that question is cut, postponed, or faked.

```text
v1 dream:  auth + teams + billing + admin + API + mobile + 12 integrations
MVP scope: auth + the ONE workflow + manual billing (test the core bet first)
```

Cut by asking of each feature: "if we ship without this, does the test still answer the question?" If yes, cut it. Admin panels become database queries, integrations become CSV uploads, mobile apps become responsive pages — until usage proves otherwise.

The classic mistakes:

- Building the platform first. Multi-tenancy, roles, APIs and scale "for later" consume the runway meant for learning. Build for ten users, not ten thousand.
- Scope by democracy. Every stakeholder's must-have included means nothing ships. One owner cuts; advice is welcome, votes are not.
- Cutting the differentiating core. Scope-cutting removes everything *except* the bet. If the unique value needs three complex pieces, those three stay — cut around them, not through them.
- No definition of "enough to learn". Without a launch criterion, scope creeps daily. Write the test the MVP must run, and ship when it can run it — not when it feels complete.

**The test:** can a stranger get the core value within minutes of arriving? Everything between arrival and that moment is scope to cut. See [iteration speed](/t/iteration-speed) for what happens after launch.
