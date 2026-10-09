---
title: "Continuous Delivery / Deployment"
summary: "Keeping every change releasable, or releasing it automatically."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["CD", "continuous deployment", "CI/CD", "continuous delivery", "continuous deployment pipeline"]
prereqs: ["continuous-integration", "deployment"]
related: ["continuous-integration", "ci-pipeline", "deployment", "feature-flags", "deployment-frequency", "dora-metrics"]
core: [backend]
---

**Continuous delivery** means keeping your software **always in a releasable state**, so that any change that passes the pipeline *could* be deployed to production at the push of a button. **Continuous deployment** goes one step further: every change that passes is deployed to production **automatically**, with no manual
approval. Together with [continuous integration](/t/continuous-integration), they form "CI/CD".

```
commit ─► build ─► automated tests ─► package artifact ─► deploy to staging ─► checks
                                                                  │
                      Continuous delivery:   [ manual approval ] ─┤
                      Continuous deployment: [ automatic ] ───────┴──► production
```

| | Continuous delivery | Continuous deployment |
|---|---|---|
| Every passing change is deployable | Yes | Yes |
| Production release | A human decides to release | Automatic |
| Needs | Strong automated pipeline | The above, plus strong tests, monitoring and rollback |

## Why teams do it

- **Smaller, more frequent releases** have less risk per release, and problems are easier to find and fix ([deployment frequency](/t/deployment-frequency)).
- **Faster feedback** from real users.
- **Less ceremony and fewer late-night release events**: releasing becomes boring.
- **Quick fixes**: a bug fix can reach production in minutes.
- Research on software delivery performance links frequent, reliable delivery with better outcomes ([DORA metrics](/t/dora-metrics)).

## What it requires

- **A fully automated pipeline** from commit to production ([CI pipeline](/t/ci-pipeline)): build once, deploy the same artifact everywhere ([deployment](/t/deployment)).
- **Good automated tests** at several levels, and fast ones ([testing pyramid](/t/testing-pyramid)). Without trust in the tests, nobody dares to deploy.
- **Safe release techniques**: [feature flags](/t/feature-flags) to separate deploying from releasing, and gradual rollouts ([canary releases](/t/canary-release)).
- **Monitoring and fast rollback** ([rollback](/t/rollback)).
- **Backward-compatible database changes**, since old and new code coexist during deploys ([schema and code deploys](/t/schema-and-code-deploys)).
- **Small changes** and trunk-based habits, with short-lived branches.

## Common misconceptions

- **It doesn't mean releasing every change to users immediately.** With flags you can deploy code constantly while releasing features on your own schedule ([deploy vs release](/t/deploy-vs-release)).
- **It's not just tooling.** It needs engineering discipline, a culture of small changes, and the habit of fixing a broken pipeline right away.
- **Not every domain** can deploy continuously. Regulated environments, mobile app stores ([app store releases](/t/app-store-releases)) and firmware have constraints. Continuous *delivery* (always releasable) is still valuable.

Start by automating the build and tests, then deployment to a staging environment, then production. Each step pays off on its own.
