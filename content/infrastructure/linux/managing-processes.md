---
title: "Managing Processes (ps, top, kill)"
summary: "Seeing and controlling running programs."
levels: { backend: junior, data-engineer: junior }
aliases: ["ps", "top", "kill", "htop"]
prereqs: ["process"]
related: ["pid", "signal", "process-lifecycle", "process-priority", "systemd", "system-monitoring-tools", "exit-code"]
---

A running program is a [process](/t/process) with a [PID](/t/pid). These tools show them and stop them.

```sh
ps aux                      # snapshot of all processes
ps aux | grep nginx         # find one by name
pgrep -f myapp              # just the PIDs matching a pattern

top                         # live view, sorted by CPU (q to quit)
htop                        # friendlier alternative, if installed
```

In `top`, watch the `%CPU` and `%MEM` columns to find what is hogging the machine. See also [load average](/t/load-average).

## Stopping a process: use signals

`kill` doesn't just kill; it sends a [signal](/t/signal) to a PID.

```sh
kill 4242         # SIGTERM (15): "please shut down", lets the program clean up
kill -9 4242      # SIGKILL: stopped by the kernel immediately, no cleanup
pkill -f myapp    # signal by name pattern
```

## The classic mistake: reaching for kill -9

SIGKILL can't be caught, so the program can't flush buffers, close connections or remove lock files. That can leave corrupted files or half-finished work. Try plain `kill` first, give it a few seconds, and use `-9` only when it ignores you.

## Other points

- **Check before you kill.** `ps` and `grep` can match more than you expect; read the PID and command first.
- **A process managed by [systemd](/t/systemd)** will be restarted if it dies. Stop it with `systemctl stop name` instead.
- **You can only signal your own processes** unless you use [sudo](/t/sudo-root).
- A process that exits reports an [exit code](/t/exit-code).
