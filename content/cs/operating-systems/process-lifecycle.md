---
title: "Process Lifecycle"
summary: "How processes are created, run, wait and exit."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["process lifecycle", "process states", "zombie process"]
prereqs: ["process", "process-fork"]
related: ["signal", "exit-code", "daemon", "scheduler", "context-switch"]
---

A **process** passes through a predictable set of states between creation and its disappearance. Understanding the lifecycle explains a lot of confusing behaviour: why a "dead" process is still listed, why `kill` sometimes does nothing, why a service doesn't consume any CPU.

Roughly, a process is:

- Created — usually by [fork and exec](/t/process-fork): one process is copied, then the copy loads a new program.
- Running or **runnable** — the [scheduler](/t/scheduler) gives it CPU time.
- Waiting (blocked) — sleeping until something happens: I/O completes, a lock is released, a child exits. It uses no CPU here.
- Stopped — paused by a [signal](/t/signal) (e.g. Ctrl-Z), waiting to be resumed.
- Terminated — it calls `exit` (or is killed), and its exit code becomes available.

The last stage has a wrinkle: a terminated process isn't fully gone until its **parent** reads its exit status (via `wait`). Until then it lingers as a **zombie** — a small entry in the process table holding just the exit code. Once the parent reaps it, it disappears. If the parent dies first, the process is reparented (traditionally to init/systemd), which reaps it.

```text
fork → running ⇄ waiting/blocked → terminated → (parent waits) → gone
                                      └──────── zombie until reaped
```

The classic mistakes:

- Seeing zombies and panicking. A few zombies are harmless — a sign a parent hasn't reaped yet. A growing pile means a bug: the parent isn't waiting for its children.
- Thinking `kill` always works. `kill` sends a signal (see [signals](/t/signal)); it doesn't guarantee termination. A process may ignore SIGTERM, or be stuck in uninterruptible I/O. Escalate to SIGKILL if you must.
- Confusing blocked with stuck. A process using no CPU is often just waiting on I/O — normal, not hung.
- Forgetting exit codes. A process's exit status is meaningful: `0` usually means success, non-zero a failure. Ignoring it hides errors from scripts and services.
- Assuming a process is gone once it "ends". Until reaped, it still occupies a slot (and a PID). That's why a leaking parent can exhaust the process table.

The lifecycle ties together [fork/exec](/t/process-fork), [signals](/t/signal), and the [scheduler](/t/scheduler). Watching it with tools like `ps` (states `R`, `S`, `D`, `Z`) tells you whether a process is working, waiting, or already dead-but-unreaped.
