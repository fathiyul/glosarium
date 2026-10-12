---
title: "Postel's Law"
summary: "Be conservative in what you send and liberal in what you accept."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["postel's law", "robustness principle", "be liberal in what you accept"]
prereqs: ["api-documentation", "serialization"]
related: ["contract-testing", "error-response-format", "breaking-change"]
---

**Postel's law** (the robustness principle) says: *be **conservative** in what you send, and **liberal** in what you accept.* Send well-formed, strictly valid data; accept a reasonable range of variations from others. The original motivation was resilient network software — tolerate the quirks of other implementations so interoperability survives.

```text
send:    exact, validated, canonical
accept:  tolerate extra fields, minor format variations, older clients
```

Used carefully, it makes a system forgiving: an older client sends a missing optional field and still works; a peer's slightly different date format is understood rather than rejected. That resilience is genuinely useful at integration boundaries you don't control.

The classic mistakes:

- **Being liberal about *meaning*.** Tolerating extra whitespace is fine; guessing what an ambiguous value meant is not. Over-liberal parsing hides real incompatibilities and lets bugs and security issues through (ambiguous inputs are a classic attack surface).
- Using it to excuse sloppy output. "Conservative in what you send" is half the law. Sending inconsistent or half-valid data because receivers "should cope" shifts the mess downstream.
- Silent acceptance of drift. If you accept anything, producers never learn they're wrong, and inconsistencies accumulate. Log what you tolerated so the sender can fix it.
- Applying it where strictness is the point. For security-sensitive parsing, money, or protocol validation, being *strict* and failing loudly is the safer choice. Modern guidance often flips the law: be strict, fail fast, don't guess.

The sensible modern posture is "conservative in what you send, *carefully* liberal in what you accept" — tolerate cosmetic variation, but reject genuinely invalid input and surface it. This sits alongside [contract testing](/t/contract-testing) (which pins down what "valid" means), clear [error responses](/t/error-response-format), and disciplined change management so evolution doesn't become breakage. See [API documentation](/t/api-documentation) and [serialization](/t/serialization).
