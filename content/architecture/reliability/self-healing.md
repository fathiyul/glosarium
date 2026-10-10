---
title: "Self-Healing Systems"
summary: "Automatically restarting and replacing failed parts."
levels: { backend: senior, data-engineer: senior }
aliases: ["self-healing systems", "self healing", "autonomic systems"]
prereqs: ["failover", "health-check"]
related: ["failover", "chaos-engineering", "autoscaling"]
---
**Self-healing systems** detect and repair failures without humans: unhealthy instances replaced, traffic shifted, capacity added, corrupted state rebuilt — control loops watching desired-vs-actual state and converging them automatically. Container orchestrators restarting crashed pods are the everyday form; auto-remediation runbooks and operator patterns extend it.

```text
watch (health, SLOs) → decide (replace? shift? scale?) → act → verify → repeat
```

Healing spans levels: process (restart), instance (replace), traffic (shift away), capacity (scale out), data (rebuild from replicas), and configuration (roll back bad pushes). Each loop needs bounds — healing actions that worsen things (restart storms, flapping failovers) need circuit breakers of their own.

The classic mistakes:

- Healing the symptom endlessly. Restarting a pod crash-looping on bad config burns resources forever without fixing anything. Escalate repeated failures to humans after bounded attempts.
- Flapping automation. Failover triggering on blips oscillates traffic destructively. Hysteresis, hold-downs and progressive confidence calm the loops.
- Unbounded remediation. Automated actions without blast-radius limits (restart all! fail over everything!) amplify partial faults. Scope actions; require escalation past bounds.
- Healing masking bugs. Auto-restarts hiding a memory leak or data corruption delay the fix while normalising the failure. Healed incidents still need root-cause tracking.
- Conflicting loops. Autoscaler adding capacity while deploy rollback removes it (or two controllers fighting over one resource) oscillates destructively. One owner per control target; loops aware of each other.
- No manual override. Automation without a big red pause button traps operators during novel failures. Humans can always halt the loops.
- Untested healing. Healing paths exercised only in real incidents fail Correlatively. Chaos testing validates the loops, not just the components.

**How to build it:** bounded control loops per failure class, escalation past bounds, human override, chaos-validated paths. Self-healing handles the known failures fast; humans handle the novel ones — design the handoff, not just the automation.
