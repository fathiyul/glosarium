---
title: "Graceful Shutdown"
summary: "Finishing in-flight work before exiting on SIGTERM."
levels: { backend: mid-level, data-engineer: mid-level }
also: [backend-basics, kubernetes]
aliases: ["graceful shutdown", "graceful termination", "drain"]
prereqs: ["signal", "process"]
related: ["k8s-probes", "load-balancer", "container", "systemd"]
---

**Graceful shutdown** is what a well-behaved service does when it's asked to stop: instead of dying immediately, it stops accepting new work, finishes what's already in flight, releases resources, and exits. The trigger is usually [SIGTERM](/t/signal) — a polite "please stop", contrasted with SIGKILL, which kills instantly with no chance to clean up.

```text
receive SIGTERM → stop accepting new requests → finish in-flight work
                → close connections → exit(0)
```

Why it matters: during a deploy, restart or scale-down, a service that dies abruptly drops whatever requests it was handling — user-visible errors, half-written transactions, broken responses. Graceful shutdown turns those into clean completions. It's the last piece that makes zero-downtime deploys actually zero-downtime.

For a load-balanced service, the sequence is: mark yourself **not ready** so the balancer stops sending new requests ([readiness probes](/t/k8s-probes)), let in-flight requests drain, then exit. If the process is killed before draining, some requests fail even though the deploy was "successful".

The classic mistakes:

- Ignoring SIGTERM. If the process doesn't handle it, the default action terminates it immediately — no draining. Handle the signal and shut down deliberately.
- Exiting before draining. Handling the signal but exiting right away loses in-flight work. Stop intake first, then wait for the current work to finish (with a timeout).
- No timeout. A request that hangs forever would block shutdown forever. Wait for a bounded time, then force-quit.
- Double-counting SIGTERM in a shell. If a shell script is PID 1 (common in poor [container images](/t/entrypoint-cmd)), it may not forward SIGTERM to the real app, so the app never gets to shut down gracefully. Use the exec form.
- Confusing it with [graceful degradation](/t/graceful-degradation). Degradation is serving reduced functionality while still running; graceful shutdown is ending cleanly. Different concerns.

Graceful shutdown is expected in orchestrators and service managers: [systemd](/t/systemd) sends SIGTERM and waits before SIGKILL, and Kubernetes does the same with a termination grace period. It's a small amount of code that prevents a recurring class of deploy-time errors.
