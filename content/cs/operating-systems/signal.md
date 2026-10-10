---
title: "Signals"
summary: "Messages like SIGTERM and SIGKILL sent to processes."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["signals", "unix signals", "SIGTERM SIGKILL"]
prereqs: ["process", "kernel-os"]
related: ["graceful-shutdown", "process-lifecycle", "interrupt", "daemon"]
---

A **signal** is a short notification the operating system delivers to a process to tell it something happened: someone asked it to stop, a child exited, a timer fired, the terminal hung up. It's a limited, asynchronous message — just a number, not data — and it's how the outside world interrupts a running program. Signals are Unix's process-level counterpart to hardware [interrupts](/t/interrupt).

A few matter constantly:

- SIGTERM — "please terminate". The polite shutdown request; a well-behaved program handles it and stops cleanly (see [graceful shutdown](/t/graceful-shutdown)).
- SIGKILL — "die now". Cannot be caught, blocked or ignored; the kernel ends the process immediately, with no chance to clean up.
- SIGINT — the Ctrl-C interrupt, typically stopping a foreground program.
- SIGHUP — historically "the terminal hung up"; often repurposed to mean "reload your configuration".
- SIGSTOP / SIGCONT — pause and resume.

```sh
kill -TERM 1234      # politely ask PID 1234 to stop
kill -KILL 1234      # force it
```

For each signal a process can have a **default action** (usually terminate, sometimes ignore or stop) or install its own **handler**. Handlers are how servers clean up on SIGTERM, or reload config on SIGHUP.

The classic mistakes:

- Using SIGKILL first. Killing with `-9` gives no chance to drain or clean up, so in-flight work is lost and resources may be left inconsistent. Send SIGTERM, wait, and only escalate if needed.
- Assuming SIGTERM always works. A process that ignores it, or is stuck in uninterruptible I/O, won't stop. That's when SIGKILL is necessary — but understand you're skipping cleanup.
- Signal handlers doing too much. Handlers run in a restricted context; heavy work there is unsafe. Set a flag and handle it in the main flow.
- Not handling SIGTERM in a service. The default action kills it abruptly, so deploys drop requests. Handle it and shut down gracefully.
- Confusing signals with [system calls](/t/system-call) or interrupts. A signal notifies a process; a system call is a program requesting kernel work; an interrupt is a CPU-level event. They interconnect but are distinct layers.

Signals are small and sharp: a handful of them drive shutdown, reload and control for every Unix program. Handling SIGTERM cleanly is the single most common signal task, and it's what makes restarts and deploys safe.
