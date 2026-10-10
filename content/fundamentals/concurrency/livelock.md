---
title: "Livelock"
summary: "Tasks keep reacting to each other without making progress."
levels: { backend: senior, data-engineer: senior }
aliases: ["livelock", "live lock", "busy retry loop"]
prereqs: ["deadlock", "race-condition"]
related: ["starvation", "race-condition", "mutex", "circuit-breaker", "blocking-vs-non-blocking"]
---

A **livelock** looks a lot like a [deadlock](/t/deadlock) from the outside — the system is stuck — but the difference is that the tasks are *not* blocked. They're actively running, repeatedly changing state in response to each other, and yet making no real progress. It's the two people in a corridor each stepping aside in the same direction, forever.

```text
A: detects B waiting → releases its resource, backs off, retries
B: detects A waiting → releases its resource, backs off, retries
repeat forever — both are busy, neither finishes
```

Livelock most often comes from **retry and backoff logic that's too eager or too symmetric**. Two processes detect contention, both politely yield, then both grab again at the same instant, detect contention again, yield again. Or a system retries a failing operation with the same timing as its peer, creating a synchronized loop.

The classic mistakes:

- Diagnosing it as a deadlock. A deadlock shows blocked tasks and no CPU use; a livelock shows *busy* tasks burning CPU but no throughput. Checking whether the CPU is spinning or idle tells you which you have.
- Symmetric backoff. If every contender waits the same amount and retries at the same time, they collide forever. Add **randomised** backoff (jitter) so contenders desynchronise.
- Unbounded retries. Retrying a state that can't succeed just spins. Add a retry limit and then fail or degrade (see [circuit breaker](/t/circuit-breaker)).
- No progress check. It's easy to add "detect conflict, retry" and never notice the loop never exits. Instrument retries; a rising retry count with flat throughput is a livelock forming.

The fix is usually to break the symmetry and bound the loop: randomised delays, a retry cap, or an explicit tie-breaker that decides who goes first. Livelock is a cousin of [starvation](/t/starvation) — both are about tasks not getting to finish, but a livelock involves active, wasted work rather than a task being consistently passed over.
