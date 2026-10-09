---
title: "Staging Environment"
summary: "A production-like environment for final testing."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["staging", "pre-production", "pre-prod", "UAT environment"]
prereqs: ["environments"]
related: ["environments", "deployment", "preview-environment", "ci-pipeline", "rollback", "canary-release"]
---

A staging environment is a copy of production used for final testing before a release. It should look as much like production as is practical: the same code artifact, the same type of database, the same configuration shape, the same kind of infrastructure. Only then does "it works in staging" tell you something about production.

```
developer machine ─▶ CI tests ─▶ staging ─▶ production
```

Typical uses: running the full test suite end to end, trying a database migration, checking that a release deploys properly, and letting QA or stakeholders try a feature.

## Why it matters, and where it falls short

It catches problems that unit tests can't: a missing environment variable, a migration that fails on real-looking data, a service that can't reach another. But staging is never exactly production. It usually has less traffic, less data, a smaller budget, and different third-party integrations. So a passing staging run lowers risk; it doesn't remove it. This is why teams also use gradual rollouts and [rollback](/t/rollback) plans. See [canary release](/t/canary-release).

## Common problems

- **Drift.** Staging slowly stops matching production (different versions, settings, sizes) and becomes misleading. Define both with the same code where possible.
- **Real data in staging.** Copying production data brings personal information into a less-protected place. Use masked or synthetic data.
- **A shared bottleneck.** One staging environment for a whole team means queues of "who's testing on staging?". Per-pull-request [preview environments](/t/preview-environment) help.
- **Third-party calls.** Point it at sandbox accounts, not the live payment or email provider.
- Neglect. If staging is often broken, people stop using it and ship around it.

Not every team has one; smaller teams may rely on previews, tests and feature flags instead.
