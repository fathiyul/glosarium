---
title: "Profiler"
summary: "A tool that measures where time or memory goes."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["CPU profiler", "memory profiler"]
prereqs: ["performance"]
related: ["latency", "memory-leak", "performance", "conditional-breakpoint"]
also: [performance]
---

A profiler measures where a program spends its time or its memory, so you can see the real bottleneck instead of guessing. A CPU profiler records how long each function takes, and a memory profiler records allocations. Most languages have one.

Python ships `cProfile`. Running it on a script prints the functions in order of cumulative time:

```sh
python3 -m cProfile -s cumtime loop.py
```

The output lists each function with its number of calls and the time spent in it, including time in functions it calls. On a tiny script it's short, but on a real service the top few rows usually point to where to look first.

The trade-off is overhead and interpretation. Profiling slows the program, and a tracing profiler, which records every call, can distort the very timings it reports. A sampling profiler, which checks the call stack at intervals, adds less overhead but gives approximate results. Measuring a short run can also be misleading, so profile a realistic workload.

The classic mistake is optimizing the function you assumed was slow instead of the one the profile shows. The second is trusting one run. Profile before and after a change, compare the same workload, and check that the improvement is larger than the run-to-run noise. For the time a single operation takes, see [latency](/t/latency). For memory that isn't freed, see [memory leaks](/t/memory-leak).
