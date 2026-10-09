---
title: "Threat Modeling"
summary: "Systematically asking what could go wrong and how to prevent it."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["threat model", "threat modelling", "STRIDE analysis", "security design review", "attack modeling"]
prereqs: ["attack-surface", "trust-boundary"]
related: ["stride", "attack-surface", "trust-boundary", "defense-in-depth", "security-review", "owasp-top-10", "least-privilege"]
core: [backend, frontend]
---

**Threat modeling** is a structured way to ask, **during design**, *"what could go wrong with this system from a security point of view, and what will we do about it?"* It finds design flaws while they're still cheap to fix, before the code exists. A bug can be patched later. A design that never considered who might abuse it is much harder to fix.

A widely used framing (from Adam Shostack's work) is four questions:

1. **What are we working on?** Describe the system.
2. **What can go wrong?** Identify threats.
3. **What are we going to do about it?** Decide mitigations.
4. **Did we do a good enough job?** Review and validate.

## A practical process

**1. Model the system.** Draw a simple **data flow diagram**: external actors (users, partners), processes (services), data stores, and the flows between them. Mark **[trust boundaries](/t/trust-boundary)**: lines where data crosses between different levels of trust (internet to your backend, backend to a third party, one tenant to another). Most threats cluster at those crossings.

```
[Browser] ──HTTPS──► [API gateway] ──► [Orders service] ──► [(Orders DB)]
 (untrusted)         ─── trust boundary ───                       │
                                                              [Payments API: third party]
```

**2. Identify assets**: what's worth protecting? Customer data, credentials, money, availability, reputation.

**3. Find threats**, systematically, for each element and flow. A common checklist is **[STRIDE](/t/stride)**:

| | Threat | Example |
|---|---|---|
| **S** | Spoofing identity | Using a stolen token |
| **T** | Tampering with data | Modifying a request or a stored record |
| **R** | Repudiation | Denying an action, because there's no audit log |
| **I** | Information disclosure | A leaky API response, an exposed bucket |
| **D** | Denial of service | Flooding an endpoint |
| **E** | Elevation of privilege | A normal user reaching admin functions |

**4. Decide on mitigations** for each meaningful threat: **mitigate** (add controls: authentication, validation, encryption, rate limits, logging), **eliminate** (remove the feature or data), **transfer** (insurance, a provider), or **accept** (consciously, with the reason).

**5. Record and track**: turn mitigations into tickets and tests, and note accepted risks.

**6. Revisit** when the design changes.

## Doing it well

- **Do it early, and keep it lightweight.** An hour with a whiteboard and the right people (developers, security, ops, product) beats a 50-page report nobody reads.
- **Think like an attacker**: What's the easiest way in? What would I steal? What's the weakest link? Consider insiders and compromised dependencies too.
- **Prioritize by risk**: likelihood and impact. You can't fix everything.
- **Use known patterns and lists** ([OWASP Top 10](/t/owasp-top-10), STRIDE, abuse cases), and learn from past incidents.
- **Apply defense in depth**: several layers, so one failure isn't fatal ([defense in depth](/t/defense-in-depth)).
- **Include business logic abuse**, not only technical exploits (using a discount code 1,000 times) ([business logic flaws](/t/business-logic-flaws)).

It complements, and doesn't replace, [security reviews](/t/security-review), testing and scanning ([SAST](/t/sast), [penetration testing](/t/penetration-testing)).
