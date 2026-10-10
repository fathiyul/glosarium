---
title: "Connect Timeout vs Read Timeout"
summary: "Waiting to establish a connection vs waiting for data on it."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["connect timeout", "read timeout", "connection timeout"]
prereqs: ["tcp", "timeouts"]
related: ["round-trip-time", "load-balancer", "tcp"]
---

A network call can stall in two different places, so it needs two different limits. The **connect timeout** is how long you'll wait to *establish* a connection — the TCP handshake (and TLS handshake) completing. The **read timeout** is how long you'll wait, once connected, for the *next bytes* of the response to arrive.

```text
connect timeout:  SYN → SYN-ACK → ACK (+ TLS)     "can I reach you?"
read timeout:     request sent → waiting → bytes   "are you answering?"
```

Why separate them: a server that's down or unreachable fails at connect, and you want to know fast and try elsewhere. A server that's alive but slow (a heavy query, a stuck upstream) connects fine and then goes quiet — the read timeout bounds that wait. One combined timeout can't express "give up quickly on dead hosts, but allow slow-but-working ones more time."

The classic mistakes:

- One timeout for everything. A single generous timeout makes dead-host detection slow; a single short one kills legitimate slow responses. Set each for its phase.
- Connect timeout too long. Waiting 30 seconds to discover a host is down holds a worker and delays failover. Connects are usually fast; a few seconds is plenty.
- Read timeout too short for the operation. A report endpoint that legitimately takes 20 seconds will always fail with a 5-second read timeout. Match it to the operation, or better, make long work asynchronous.
- No timeout at all. The default in many clients is "wait forever," which turns one slow dependency into exhausted workers. Always set both.
- Retrying without thinking. A timed-out request may still have executed server-side; retrying a non-idempotent operation can duplicate it. Retry read timeouts only where safe (see [idempotence](/t/idempotence)).
- Confusing timeout with deadline. Per-phase timeouts bound each step; an overall deadline bounds the whole call including retries. Use both for calls that fan out.

**How to set them:** connect timeout short (seconds), read timeout matched to the operation's realistic duration plus margin, and an overall deadline capping retries. Distinct phases, distinct limits — and the [round-trip time](/t/round-trip-time) of the path tells you what's reasonable.
