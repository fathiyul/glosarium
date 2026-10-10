---
title: "Let It Crash"
summary: "Restarting a failed component cleanly instead of handling every error inside it."
levels: { backend: senior }
aliases: ["let it crash", "crash-only software", "supervision"]
prereqs: ["worker-process-model", "process-lifecycle"]
related: ["graceful-degradation", "health-check", "daemon", "idempotence"]
---

**Let it crash** is a design philosophy, most associated with Erlang/Elixir, that says: don't write defensive code for every possible failure. Instead, let a failing component crash, and have a **supervisor** restart it in a known-good state. The failure is contained to one unit, and recovery is automatic, so the operator's job is to make crashes safe rather than to prevent every one.

```text
worker crashes → supervisor notices → restarts a fresh worker
the rest of the system keeps running; no half-broken state lingers
```

The reasoning: defensive code that tries to handle every error path accumulates and is often wrong. A fresh restart returns the component to a clean state, avoiding subtle corruption from partial failures. This is powerful when you can isolate work into independent units with a supervisor above them.

The classic mistakes:

- Crashing with no supervisor. "Let it crash" without automatic restart just means "let it be down". The supervision/restart is the other half.
- Crashing while holding shared state. If a component owns in-flight work or writes, a crash can lose it. Make restarts safe: [idempotent](/t/idempotence) operations and externalised state.
- Crashing in the middle of a user request. A crash that drops an in-flight request must be visible and handled — a clean error or retry — not a silent loss.
- Using it to avoid understanding bugs. Repeated crashes of the same component signal a real defect, not a feature of the philosophy. Supervisors keep you up; logs and fixes address the cause.
- Assuming it fits everything. It suits independent, restartable workers. A component with complex shared state or long transactions may need more careful handling.
- Forgetting backoff. A component that crashes instantly and restarts forever is a restart storm. Add backoff and crash-loop detection.

**When it applies:** to worker pools, background processors and independent services where failure can be isolated and recovery is a restart. Combined with [health checks](/t/health-check) and [graceful degradation](/t/graceful-degradation), it's a robust stance: expect failures, contain them, and recover quickly rather than pretending you can prevent them all.
