---
title: "Public vs Internal APIs"
summary: "Why public APIs need much more care about stability."
levels: { backend: senior, frontend: senior }
aliases: ["public api", "internal api", "public vs internal"]
prereqs: ["api-contract", "api-gateway"]
related: ["backward-compatibility", "deprecation", "rate-limiting", "api-lifecycle"]
---

A **public API** is consumed by parties you don't control — customers, partners, third-party apps. An **internal API** is consumed by your own services and clients, which you can deploy and coordinate. The distinction isn't technical (both may be REST); it's about *who you can change alongside*.

That single difference drives everything:

- Public APIs must be stable and versioned. You can't update callers, so breaking changes need a new version and careful [deprecation](/t/deprecation). Compatibility is a hard constraint (see [backward compatibility](/t/backward-compatibility)).
- Public APIs need real docs, support and terms. Authentication, [rate limits](/t/rate-limiting), SLAs, and clear error handling are promises to strangers.
- Internal APIs can move faster. You can change them with the callers in the same release, so compatibility is a coordination problem rather than a hard limit.

```text
public:  freeze the interface, version it, document, support it
internal: change with the callers (but keep a sane contract anyway)
```

The classic mistakes:

- Accidentally making an internal API public. Exposing an internal endpoint to the internet quietly promotes it to a public API with all its constraints. Be deliberate about what's exposed.
- Treating a public API as easily changeable. Teams used to internal speed ship breaking changes and fracture their integrations. Public means slow, careful evolution.
- No boundary between the two. If internal services call each other through the same public gateway, internal changes are constrained by public rules, and public exposure grows by accident.
- Skipping discipline on internal APIs. "It's internal" becomes an excuse for an incoherent interface that's painful to use and test. Keep a clear contract even internally.
- Ignoring who's really calling it. Some internal APIs have surprising consumers (scripts, dashboards). Discover them before changing.

**How to think about it:** design internal APIs for your own speed, and public APIs for external stability — and keep the boundary explicit so internal interfaces don't leak outward. The [API gateway](/t/api-gateway) is often where you enforce that separation. See [API lifecycle](/t/api-lifecycle) for running both over time.
