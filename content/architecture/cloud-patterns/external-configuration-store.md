---
title: "External Configuration Store"
summary: "Keeping configuration in a central service instead of in deploy packages."
levels: { backend: mid-level }
aliases: ["external configuration store", "config server", "centralised configuration"]
prereqs: ["twelve-factor-app", "feature-flags"]
related: ["feature-flags", "secrets-management", "deployment-stamps"]
---
An **external configuration store** holds settings outside code and binaries: feature flags, timeouts, endpoints, limits — fetched at startup (and refreshed live) from a versioned, audited service. Code ships rarely; configuration changes constantly, safely, and without redeploys.

```text
code (rare deploys) + config from store (frequent, audited changes)
→ behaviour changes without releases
```

It separates change velocities (config moves faster than code), centralises audit (who changed what, when, with rollback), and enables progressive delivery (flags and percentages as configuration). Secrets ride alongside with encryption and access control — config and secrets share machinery, not values.

The classic mistakes:

- Config in code. Constants requiring redeploys for tuning turn every threshold tweak into a release with full regression risk. Externalise what operators tune.
- Unversioned changes. Click-ops config edits without history make incidents unreproducible and rollbacks guesswork. Version everything; review changes like code.
- No validation. Invalid values (negative timeouts, malformed URLs) accepted blindly crash fleets on save. Schema-validate at write; fail closed on invalid.
- Thundering refresh. Thousands of instances polling config simultaneously storm the store; stagger, cache, push-or-long-poll with jitter.
- Secrets in plaintext config. Credentials beside timeouts leak through logs, dashboards and broad read access. Encrypt secrets; separate access paths.
- Startup dependence. Services that can't boot when the config store blips convert a config outage into a fleet outage. Cache last-good locally; boot degraded.
- Flag sprawl. Hundreds of stale flags (dead experiments, shipped features) turn config into archaeology. Expire flags; delete the dead on cadence.

**How to run it:** versioned, validated, audited store; secrets encrypted separately; clients resilient with cached last-good; flags lifecycle-managed. Configuration is code that changes constantly — treat it with code's discipline.
