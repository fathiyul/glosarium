---
title: "Gatekeeper"
summary: "A dedicated host that validates requests before they reach trusted services."
levels: { backend: senior }
aliases: ["gatekeeper", "gatekeeper pattern", "protective proxy"]
prereqs: ["ambassador-pattern", "zero-trust"]
related: ["ambassador-pattern", "api-gateway", "zero-trust"]
---
The **gatekeeper** pattern interposes a protective proxy between untrusted callers and a sensitive service: validating, sanitising, authenticating and rate-limiting before requests reach the system of record. Legacy systems, fragile interfaces and compliance-bounded data gain modern protection without rewrites.

```text
untrusted → gatekeeper (validate, auth, throttle, audit) → legacy/sensitive core
```

Gatekeepers shine at boundaries of trust: public APIs fronting legacy backends, partner integrations with limited privileges, regulated data with audit mandates. Validation and policy live in one audited place instead of scattered across callers (or absent in the core).

The classic mistakes:

- Validation only at the gate. Defence in depth still applies — the core should distrust even gated input (gates get bypassed, misconfigured, version-skewed). Validate at both layers, differently.
- Gate as bottleneck. All traffic through one proxy cluster makes it the scaling and availability crux. Scale, multi-AZ, and shed like production — because it is.
- Over-permissive defaults. "Allow unless known-bad" admits novel attacks; sensitive gates default-deny with explicit allowlists.
- Audit gaps. Compliance gates must log decisions (allowed, denied, why) immutably; missing audit trails void the pattern's purpose. Log everything, retain per policy.
- Stale policy. Threat models and partner contracts evolve; gate rules fossilise. Review policies on cadence; version and test changes.
- Bypasses. Direct-to-core paths (VPNs, debug endpoints, legacy URLs) around the gate void it entirely. Inventory all paths; close or gate each.
- Gatekeeper sprawl. A gatekeeper per integration fragments policy into inconsistency. Centralise gates per trust boundary, not per caller.

**When to use it:** untrusted-to-sensitive boundaries — legacy hardening, partner access, regulated data. One audited checkpoint, default-deny, no bypasses.
