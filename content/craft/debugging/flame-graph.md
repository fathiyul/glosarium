---
title: "Flame Graph"
summary: "A visualization of where a program spends its time."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
also: [performance]
aliases: ["flame graph", "flamegraph", "profiling visualization"]
prereqs: ["profiler", "cpu"]
related: ["observability", "latency", "heap"]
---

A **flame graph** is a picture of a [profiler](/t/profiler)'s output. The profiler samples the program's call stacks many times a second; the flame graph stacks those samples so you can see, at a glance, where the time goes. It's the standard way to read a CPU profile.

How to read it:

- The **x-axis** is the call stack, and a frame's **width** is the share of samples in which that function was on the stack. Width = time.
- The y-axis is call depth: the function at the bottom called the one above it, and so on up to whatever was running.
- A **wide frame** is a hot spot — something taking a lot of time. A wide frame high up, with a narrow parent, is a function that's expensive in itself; a wide parent with many children means the time is spread below it.

```text
[                 main (whole program)                 ]
[  parse (40%)  ][  compute (55%)  ]
      [ lex ][ read ]   [ hotfn ][ gc ][ other ]
```

(An inverted or "icicle" graph flips it; the meaning is the same.)

The classic mistakes:

- Reading height as importance. Tall doesn't mean slow. A deeply nested but narrow stack is cheap; the wide frames are where the time is.
- Confusing sampled and instrumented profiles. Sampling profilers add little overhead and are safe to run under load; instrumenting every call changes timing and can mislead. Know which you have.
- Only looking at CPU. A program can be slow because it's *waiting* — on I/O, locks, or the network — which a CPU profile won't show. Off-CPU analysis (or traces/spans) is needed for that.
- Optimising the wrong frame. The widest leaf is not always the best fix; sometimes an inefficient caller producing huge inputs is the real cause. Read the parents, not just the hot leaf.
- Trusting it under unrealistic load. A profile of an idle process tells you nothing about production. Profile with representative work.

A flame graph turns "it feels slow" into "these two functions dominate". Combined with [observability](/t/observability) for the system view and [latency](/t/latency) percentiles for user impact, it points you at a specific function to optimise — which is exactly what makes profiling worth the effort.
