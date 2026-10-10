---
title: "Software Development Lifecycle"
summary: "The stages from idea to production to maintenance."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["SDLC", "software lifecycle"]
prereqs: ["agile"]
related: ["agile", "scrum", "ci-pipeline", "backlog"]
---

The software development lifecycle (SDLC) describes the stages software goes through: gathering requirements, designing, implementing, testing, deploying and maintaining it. Those stages happen in every project, though teams group and order them differently.

```
requirements -> design -> implementation -> testing -> deployment -> maintenance
```

Older models, such as the waterfall model, run these stages in a strict sequence. Agile approaches repeat them in short cycles, so each increment goes through a small version of every stage. Many teams use a mix.

The classic mistake is treating the stages as strictly sequential and forgetting maintenance. In practice, maintenance is often where most of the time goes: bug fixes, dependency updates, and changes that users request after launch. Plan for it from the start, including monitoring and the [CI pipeline](/t/ci-pipeline) that keeps releases repeatable.
