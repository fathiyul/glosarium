---
title: "Continuous Integration"
summary: "Automatically building and testing every change."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["CI", "continuous integration", "CI build", "build and test", "automated builds"]
prereqs: ["git", "unit-test"]
related: ["ci-pipeline", "continuous-delivery", "github-actions", "build-caching", "ci-secrets", "flaky-test"]
core: [backend, frontend]
---

**Continuous integration** (CI) means every change pushed to the shared repository is **built and tested automatically**, within
minutes. The goal: find out quickly when a change breaks something, while it's still small and fresh in your mind.

```yaml
# .github/workflows/ci.yml (GitHub Actions)
name: CI
on:
  push:
  pull_request:
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint
      - run: npm test
```

Open a pull request, and the CI service runs these steps on a clean machine and reports a green check or a red cross. Common services:
GitHub Actions, GitLab CI, CircleCI, Jenkins ([GitHub Actions](/t/github-actions), [CI pipeline](/t/ci-pipeline)).

## What CI usually runs

- Install dependencies, from the [lockfile](/t/lockfile).
- Lint and format checks, and type checks.
- Unit and integration tests.
- A build, to prove it compiles and bundles.
- Sometimes security scans and coverage reports.

## The habits behind it

- **Integrate often.** Merge small changes to the main branch daily, not giant branches after weeks.
- **Keep the main branch green.** If a build breaks, fixing it is top priority.
- **Make it fast.** Slow CI (more than around 10 minutes) trains people to ignore or batch changes. Use caching
  ([build caching](/t/build-caching)) and run tests in parallel.
- **Require it**: protect the main branch so changes can't merge until CI passes.
- **Run it the same way locally**, through the same scripts ([npm scripts](/t/npm-scripts), Makefile), so you can reproduce
  failures.

## Pitfalls

- **[Flaky tests](/t/flaky-test)** that pass and fail randomly. People get used to rerunning the build, and real failures hide.
- **"Works locally, fails in CI"**: differences in versions, environment variables or missing files.
- **Secrets in CI** must use the platform's encrypted storage and never be printed ([CI secrets](/t/ci-secrets)).
- A CI pass is evidence, not proof. Tests only catch what they cover.

CI is the first half of CI/CD. The second half, delivering changes to users, is
[continuous delivery](/t/continuous-delivery).
