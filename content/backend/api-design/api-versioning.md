---
title: "API Versioning"
summary: "Evolving an API without breaking existing clients."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["versioning APIs", "API version", "/v1", "versioning strategy", "API compatibility versions"]
prereqs: ["api-design"]
related: ["backward-compatibility", "breaking-change", "deprecation", "api-lifecycle", "schema-evolution", "api-contract"]
core: [backend]
---

**API versioning** is how you change an API without breaking clients that already use it. The best versioning strategy is to **avoid needing new versions**, and when you do, to make the transition clear and gradual.

## What needs a new version?

Most changes don't. The rule: **additive changes are compatible, and breaking changes aren't.**

| Usually safe (no new version) | Breaking (needs a new version or a migration path) |
|---|---|
| Adding a new endpoint | Removing or renaming a field or endpoint |
| Adding an optional field to a response | Changing a field's type or meaning |
| Adding an optional request parameter | Making an optional parameter required |
| Adding a new enum value (if clients tolerate unknown ones) | Changing error formats or status codes clients rely on |
| | Changing authentication or pagination behavior |

This only holds if clients are written to **ignore unknown fields**. Tell your consumers to ([schema evolution](/t/schema-evolution), [breaking changes](/t/breaking-change)).

## Common versioning schemes

| Scheme | Example | Notes |
|---|---|---|
| **URL path** | `/v1/orders`, `/v2/orders` | Most common and visible; easy to route and test in a browser |
| **Header** | `Accept: application/vnd.example.v2+json` or `API-Version: 2` | Keeps URLs clean, but harder to explore |
| **Query parameter** | `/orders?version=2` | Simple, a bit messy for caching |
| **Date-based** | `API-Version: 2024-06-01` | Pin each client to the API as it was on a date, and upgrade deliberately |

Choose one, and stay consistent.

## Managing the lifecycle

1. **Announce** the new version, and what changed. Provide a **migration guide**.
2. **Run old and new in parallel** for a defined support window.
3. **Deprecate** the old one: say so in the docs and in responses (for example `Deprecation` and `Sunset` headers carrying the retirement date), and contact the heavy users directly ([deprecation](/t/deprecation)).
4. **Monitor usage** to see who still calls the old version.
5. **Retire** it on the announced date, ideally with a brownout (a brief planned shutdown) beforehand as a warning.

## Cautions

- **Every extra version is a maintenance burden**: more code paths, tests and bug fixes. Keep few.
- **Don't version too eagerly**, and don't copy the whole API for one change. Version at the granularity you can support.
- **Internal APIs** can often be changed in lockstep with their consumers, but external or mobile clients (which update slowly) need long windows.
- **Mobile apps** stay in the wild for years. Plan accordingly.
- Prefer designing for compatibility: tolerant readers, additive changes, and feature flags ([backward compatibility](/t/backward-compatibility), [API lifecycle](/t/api-lifecycle)).
