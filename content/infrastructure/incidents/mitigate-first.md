---
title: "Mitigate First, Fix Later"
summary: "Stopping the bleeding before hunting for the root cause."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["mitigate first", "stop the bleeding", "restore service first"]
prereqs: ["incident-response", "rollback"]
related: ["failover", "feature-flags", "load-shedding", "runbook", "root-cause-analysis"]
---

**Mitigate first, fix later** is the rule that during an incident you restore service *before* you find the root cause. The two are different jobs, and they want different mindsets: mitigation is about the fastest safe way to reduce user impact; the root cause can wait until people aren't hurting.

Common mitigations:

- [Roll back](/t/rollback) the deploy that started it.
- [Fail over](/t/failover) to a healthy node, region or replica.
- Turn off the broken feature with a [feature flag](/t/feature-flags).
- Restart or scale up the affected service.
- Shed load with [rate limiting](/t/rate-limiting) or [load shedding](/t/load-shedding) so the system survives.

```text
users broken  →  mitigate: roll back  →  users recovered
              →  then: investigate why, fix properly, add a test
```

The classic mistake is debugging while users suffer. Engineers naturally want to understand the problem, so they dig into logs and traces mid-incident while the outage continues — sometimes for the entire duration. The fix is to treat "restore service" as the first goal and accept an imperfect, temporary action (a rollback, a restart) to get there.

Two more traps:

- **No mitigation ready to hand.** If the only way back is a slow fix, recovery takes longer. Keep a [runbook](/t/runbook) of known mitigations per service, and make rollback and flags fast by default.
- **Forgetting to revisit.** A mitigation that holds the symptom but leaves the cause is a landmine. Log it and follow through: [root-cause analysis](/t/root-cause-analysis) and a [postmortem](/t/blameless-postmortem) after service is restored.

This isn't only a backend concern. A bad frontend release can be mitigated by serving the previous build or disabling a flag; a broken data pipeline by pausing it and reprocessing later. In all cases, the sequence is the same: stop the bleeding, then treat the wound.
