---
title: "Deployment"
summary: "Putting a new version into an environment."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["deploy", "deploying", "software deployment", "release to production", "shipping code"]
prereqs: ["environments", "continuous-integration"]
related: ["rollback", "blue-green-deployment", "canary-release", "rolling-deployment", "deploy-vs-release", "schema-and-code-deploys"]
core: [backend, frontend]
---

**Deployment** is putting a new version of your software into an environment, so that it's actually running there: copying the build,
starting the new processes, switching traffic to them.

A typical flow:

1. A change merges, and [CI](/t/continuous-integration) builds and tests it, producing a [build artifact](/t/build-artifact)
   (a container image, a bundle).
2. The same artifact is deployed to staging, and checked.
3. The artifact is deployed to production. Traffic moves to the new version.
4. You watch error rates and health checks, and roll back if something's wrong.

```sh
# Simplified: the artifact is built once, then the same one is promoted
docker push registry.example.com/shop:3f9c2a1
deploy --env production --image registry.example.com/shop:3f9c2a1
```

## Strategies

| Strategy | How | Notes |
|---|---|---|
| **Recreate** | Stop the old version, start the new one | Simple, with downtime |
| **[Rolling](/t/rolling-deployment)** | Replace instances a few at a time | No downtime, but old and new versions run together |
| **[Blue-green](/t/blue-green-deployment)** | Run the new version beside the old, then switch traffic | Instant switch and rollback, needs double capacity |
| **[Canary](/t/canary-release)** | Send a small share of traffic to the new version first | Limits the damage of a bad release |

## Rules of thumb

- **Build once, deploy the same artifact everywhere**, and change only configuration between environments. Don't rebuild for
  production.
- **Automate it.** Manual deploys are slow and error-prone, and they happen less often, making each one riskier.
- **Make rollback easy and practiced** ([rollback](/t/rollback)).
- **Plan for mixed versions.** During a rolling deploy, old and new code run side by side, so database changes must work with
  both ([schema and code deploys](/t/schema-and-code-deploys)).
- **Deploy small and often.** Small changes are easier to understand and undo.
- **Check health after deploying**: error rate, latency, key business metrics.
- Separating deployment from *release* (turning the feature on) with feature flags lowers the risk
  ([deploy vs release](/t/deploy-vs-release)).

Deploying on Friday evening is a classic meme for a reason: deploy when you can watch and fix what you ship.
