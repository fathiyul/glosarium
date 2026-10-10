---
title: "Process Priority (nice)"
summary: "Telling the scheduler which processes matter more."
levels: { backend: senior, data-engineer: senior }
aliases: ["nice", "renice", "process priority"]
prereqs: ["process", "cpu"]
related: ["load-average", "system-monitoring-tools", "managing-processes", "capacity-planning"]
---

Linux shares the [CPU](/t/cpu) between runnable [processes](/t/process) using a scheduler. **Process priority** lets you influence who gets the CPU first. The mechanism is the *nice* value: an integer from `-20` (highest priority, least "nice" to others) to `19` (lowest priority). Normal processes start at `0`. Lower nice means more CPU.

```sh
nice -n 10 ./backup.sh        # start a process at lower priority
renice -n 5 -p 1234           # change a running process
nice                           # show the current niceness
```

Use it to keep bulk work from competing with latency-sensitive services: run a backup, a batch job or a re-index at `nice 10` so interactive traffic wins when the machine is busy. Only root can lower the nice value (raise priority) below 0.

The classic mistakes:

- Thinking nice controls I/O. It only affects CPU scheduling. A backup is usually disk-heavy, not CPU-heavy, so `nice` barely helps. For disk bandwidth there's a separate mechanism (`ionice`), and even that is best-effort depending on the scheduler and storage.
- Trying to raise priority without privilege. Lowering nice below 0 requires root; a normal user can only *increase* niceness (reduce priority).
- Setting it and forgetting. Nice is a nudge, not a guarantee. A high-priority process still waits if the machine is saturated; it doesn't reserve capacity.
- Using it to fix a deeper problem. If a service needs priority, the real issue may be that too much unrelated work runs on the same box, or that it needs more [capacity](/t/capacity-planning).

**When not to bother:** on a lightly loaded system, nice has little visible effect. It matters when a machine is oversubscribed and you want to bias the scheduler. Watch the [load average](/t/load-average) and [per-process tools](/t/system-monitoring-tools) to see whether the pressure is CPU at all — if it's memory or disk, priority on the CPU won't help.
