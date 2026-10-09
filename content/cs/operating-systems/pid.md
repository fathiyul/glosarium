---
title: "Process ID (PID)"
summary: "A number identifying a running process."
levels: { backend: junior, data-engineer: junior }
aliases: ["process ID", "process id", "PID"]
prereqs: ["operating-system"]
related: ["process-lifecycle", "signal", "managing-processes", "process-fork", "exit-code"]
---

A process ID (PID) is the number the operating system assigns to each running process. It's how you refer to one specific process when you want to inspect, signal or stop it.

```sh
echo $$              # the PID of the current shell
ps aux | grep nginx  # list processes and their PIDs
pgrep -f myapp       # find PIDs by name
pidof nginx

kill 4321            # ask process 4321 to terminate (SIGTERM)
kill -9 4321         # force it (SIGKILL): last resort
```

```python
import os
os.getpid()          # this process's PID
os.getppid()         # its parent's PID
```

## Details

- **Every process has a parent**, whose PID is the PPID. A process starts as a child of the one that launched it ([process fork](/t/process-fork)).
- **PID 1** is the first process the system starts. It adopts orphaned processes, and on Linux is `init` or `systemd`.
- **PIDs are reused** after a process ends, once the numbers wrap around. Don't store a PID and assume it still refers to the same program later.
- **Inside a container**, the main process is PID 1 in its own PID namespace. It must handle signals and reap child processes properly, or `docker stop` hangs ([namespaces](/t/namespaces-linux), [graceful shutdown](/t/graceful-shutdown)).

## Common uses

- **Stopping a runaway or stuck program** with `kill` ([signals](/t/signal)).
- **PID files**: some services write their PID to a file such as `/var/run/app.pid` so scripts can signal them.
- **Finding what's using a port**: `lsof -i :8080` prints the PID.
- **Debugging**: attach tools (`strace -p PID`, a debugger) to a running process ([strace](/t/strace)).

Prefer a gentle `kill` (SIGTERM) first, so the program can clean up. Use `kill -9` only when it ignores that. See [managing processes](/t/managing-processes).
