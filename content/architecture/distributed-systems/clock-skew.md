---
title: "Clock Skew"
summary: "Machines' clocks disagreeing, which breaks time-based ordering."
levels: { backend: senior, data-engineer: senior }
aliases: ["clock skew", "clock drift", "unsynchronised clocks"]
prereqs: ["cap-theorem", "distributed-lock"]
related: ["logical-clocks", "last-write-wins", "fencing-token"]
---
**Clock skew** is the difference between machines' clocks: NTP syncs within milliseconds normally, but virtualization pauses, network asymmetry and failures open gaps of seconds or more. Any design assuming "timestamps order events" or "leases expire simultaneously" breaks by exactly the skew.

```text
A's clock: 10:00:05   B's clock: 10:00:00 (5s skew)
"later" by timestamp is not necessarily later in reality
```

Skew poisons leader leases (two leaders at once), last-write-wins resolution (wrong winner), cache expiry coordination, and distributed tracing order. Google-grade systems deploy atomic/GPS clocks (TrueTime) with *uncertainty windows*; mortals bound dependence instead.

The classic mistakes:

- Ordering by wall clock. Cross-machine timestamp comparison assumes synchrony that doesn't exist. Order by sequence, version or logical clock — never bare timestamps.
- Lease safety margins smaller than skew. A 5s lease with 10s skew hands two holders the same lock. Margins must exceed worst-case skew (see [fencing](/t/fencing-token)).
- Assuming NTP always works. NTP fails (firewalled, asymmetric routes, VM stalls) silently. Monitor offset; alert past thresholds; design for NTP-down operation.
- Mixing client and server time. Phone clocks wander minutes; server timestamps anchor truth. Never trust client time for ordering, expiry or security.
- Trace ordering by timestamp. Spans from skewed hosts misorder; tracing systems correct with causal edges, not raw times. Don't hand-sort spans by timestamp.
- Spanner-envy. TrueTime-style uncertainty handling is specialised infrastructure; approximate it with bounded assumptions, not imitation.

**How to survive it:** never order or arbitrate by wall clock across machines; use logical clocks, sequences and fencing; monitor NTP offset; margin leases beyond worst skew. Time is the least trustworthy distributed input — treat it accordingly.
