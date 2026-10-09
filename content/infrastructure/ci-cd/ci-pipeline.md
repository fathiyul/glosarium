---
title: "CI Pipeline"
summary: "The sequence of automated build, test and deploy steps."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["CI/CD pipeline", "build pipeline", "pipeline"]
prereqs: ["continuous-integration"]
related: ["continuous-integration", "continuous-delivery", "github-actions", "build-artifact", "deployment", "rollback", "ci-secrets"]
---

A CI pipeline is the automated sequence of steps that runs whenever code changes: check it out, install dependencies, build, test, and often package and deploy. If any step fails, the pipeline stops and tells you. It is the practical form of [continuous integration](/t/continuous-integration).

A typical flow:

```
push / pull request
   │
   ▼
checkout ─▶ install ─▶ lint ─▶ test ─▶ build artifact ─▶ (merge) ─▶ deploy to staging ─▶ deploy to production
```

Fast, cheap checks come first, so feedback arrives sooner and slower steps run only when earlier ones pass.

## What it gives you

- Every change is tested the same way, on a clean machine, not just "on my laptop".
- Broken code is caught before it is merged.
- The build and deploy steps are written down and repeatable.
- The [artifact](/t/build-artifact) that passes is the one deployed.

## Practical advice

- **Keep it fast.** Over about ten minutes people start ignoring or bypassing it. Cache dependencies, run tests in parallel, and move slow checks to later stages. See [build caching](/t/build-caching).
- **Fix a red pipeline first.** A pipeline that is often broken or flaky stops being trusted.
- **Treat pipeline definitions as code**, stored in the repo and reviewed like any other change.
- **Handle secrets carefully.** Use the platform's secret store, never commit them. See [CI secrets](/t/ci-secrets).
- Don't skip the pipeline "just this once" for hotfixes.

Pipelines are defined in tools such as [GitHub Actions](/t/github-actions), GitLab CI or Jenkins. The pipeline ends at a deploy when you practise [continuous delivery](/t/continuous-delivery).
