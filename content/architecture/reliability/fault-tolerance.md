---
title: "Fault Tolerance"
summary: "Continuing to work when components fail."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["fault tolerance", "fault-tolerant design", "tolerating faults"]
prereqs: ["redundancy", "reliability"]
related: ["availability", "chaos-engineering", "bulkhead"]
---
**Fault tolerance** keeps systems correct through component failures: replicating state, retrying operations, fencing the failed, degrading gracefully — correctness preserved while pieces break. It differs from availability (which counts serving) by insisting on *right* answers during failure, not just any answers.

```text
fault occurs → detect → contain (bulkhead) → mask (redundancy/retry) → recover
user sees: correct (perhaps slower) responses throughout
```

Techniques layer by failure type: replication and consensus for crashes, retries with idempotence for transients, checksums and validation for corruption, bulkheads and breakers for containment, degraded modes for the unmaskable. No single mechanism covers all faults — tolerance is a portfolio.

The classic mistakes:

- Tolerating the wrong faults. Crash-tested systems failing on Byzantine corruption, slow responses, or human error. Enumerate fault *types* (crash, omission, timing, corruption, human) and cover each deliberately.
- Retry as the whole strategy. Retries mask transients and amplify persistents into storms. Retry with budgets, backoff and breaker integration — one tool among many.
- Untested tolerance. Fault-handling code paths run rarely and rot surely; untested tolerance fails when invoked. Inject faults continuously (see [chaos engineering](/t/chaos-engineering)).
- Masking without alerting. Silently tolerated faults accumulate until redundancy exhausts, then fail catastrophically. Every masked fault pages (or at least logs) for repair.
- Tolerance theatre. Redundant components with shared fate, untested failover and unfenced primaries perform safety without providing it. Verify end-to-end under fault injection.
- Ignoring repair. Tolerated faults still need fixing — degraded redundancy is one more failure from outage. Track degraded states as incidents, not background.
- Human faults excluded. Operators mistyping, deploying wrong, deleting prod — tolerance includes guardrails (confirmations, canaries, undo) for human error too.

**How to build it:** fault-type enumeration, layered mechanisms, continuous injection testing, masked-but-alerted operation, tracked repair. Tolerance proven under fire, not asserted in design docs.
