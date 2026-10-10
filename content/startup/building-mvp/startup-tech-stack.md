---
title: "Choosing a Startup Tech Stack"
summary: "Picking technology for speed and hiring, not for scale you don't have yet."
levels: { tech-entrepreneur: mvp }
aliases: ["startup tech stack", "choosing technology", "MVP stack"]
prereqs: ["technical-founder", "scope-cutting"]
related: ["boring-technology", "managed-vs-self-hosted", "monolith", "deliberate-technical-debt"]
core: [tech-entrepreneur]
---

A startup **tech stack** should optimize for shipping speed and hiring ease, not for problems at a scale you do not have. The boring choice your team already knows — one language, one database, one cloud, managed services for everything undifferentiated — beats the impressive architecture that takes six months to stand up.

```text
choose for:  team familiarity > hiring pool > managed options > boring maturity
not for:     imagined millions of users, résumé novelty, premature microservices
```

Concretely: a monolith first ([boring technology](/t/boring-technology)), managed database and auth instead of self-hosted, the cloud's native services over assembled infrastructure. Every "we'll need it later" component is scope that delays learning.

The classic mistakes:

- Resume-driven architecture. Kubernetes, microservices and exotic databases chosen for learning value, paid for in velocity. Your stack is a tool for learning speed, not a portfolio.
- Rewriting instead of shipping. The existing stack's warts are known; a rewrite's are not, and rewrites pause learning for quarters. Tolerate and isolate, don't restart.
- Ignoring hiring reality. A brilliant stack nobody local knows makes every hire slow and expensive. In Indonesia and Southeast Asia especially, weigh the local talent pool heavily.
- Building what to buy. Auth systems, billing engines, email delivery, analytics pipelines — commodities with managed options. Build only what differentiates ([managed vs self-hosted](/t/managed-vs-self-hosted)).

**Revisit at:** real scale pain (measured, not anticipated), a hiring wall, or security/compliance demands. Until then, boring and fast wins — and track the shortcuts as [deliberate debt](/t/deliberate-technical-debt).
