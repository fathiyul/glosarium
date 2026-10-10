---
title: "Security Misconfiguration"
summary: "Default passwords, verbose errors and exposed admin panels."
levels: { backend: mid-level, frontend: mid-level }
---

Security misconfiguration is an unsafe setting or deployment choice that leaves a system more exposed than intended. Examples include default credentials, public storage, verbose stack traces, unnecessary services, permissive cross-origin rules, and an administrative interface reachable from the public internet.

The risk often comes from drift: a development shortcut or provider default survives into production, or a new service is deployed without the security settings used elsewhere. Maintain a known baseline, remove unused features, restrict management surfaces, and make configuration review part of deployment. Errors shown to end users should not reveal secrets, internal paths, or detailed dependency information; keep diagnostic detail in access-controlled logs.

For example, a debug endpoint may be useful locally but disclose environment variables if enabled in production. A secure review asks which environment receives the setting, who can reach the service, and whether the setting can be checked automatically.

Backend and platform teams should inventory exposed services and verify effective configuration, not only source files. Frontend teams should avoid shipping debug bundles or public source maps if those expose sensitive data, while remembering that minification is not a security boundary. Configuration hardening can create operational friction, so document exceptions and revisit them rather than leaving blanket permissions in place. See [attack surface](/t/attack-surface) and [defense in depth](/t/defense-in-depth).

A useful verification habit is to test the boundary from an untrusted caller, not only through the intended interface. Send unexpected values directly to the endpoint, check the response and side effects, and confirm that a denied request does not still change state. Keep a regression test for the failure mode so a refactor or framework update does not quietly reopen it.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.
