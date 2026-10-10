---
title: "JavaScript Engine"
summary: "The component that runs JavaScript, like V8 or SpiderMonkey."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["javascript engine", "js engine", "jit"]
prereqs: ["event-loop", "garbage-collection"]
related: ["webassembly", "event-loop", "garbage-collection"]
---

A **JavaScript engine** (V8, SpiderMonkey, JavaScriptCore — names differ, architecture converges) executes your code in stages: parse to bytecode, interpret, then **JIT**-compile hot paths to optimised machine code — speculatively assuming types stay stable, deoptimising when they don't. Meanwhile a garbage collector reclaims unreachable objects and the event loop schedules tasks.

```text
source → parse → bytecode → interpret → hot? → optimised machine code
                                              (deoptimise if assumptions break)
```

You don't need engine internals daily, but the model explains the famous performance cliffs: megamorphic call sites that defeat optimisation, hidden-class transitions from shapeshifting objects, and GC pauses from allocation churn.

The classic mistakes:

- Shapeshifting objects. Adding properties in different orders (or deleting them) creates new hidden classes per shape, killing inline caches. Initialise all fields up front, in the same order.
- Megamorphic calls. A function called with wildly different argument shapes can't be optimised. Keep hot call sites monomorphic.
- Allocation churn in loops. Creating thousands of throwaway objects per frame pressures the GC into pauses. Reuse buffers and avoid per-frame allocation in hot paths.
- Deopt-unfriendly patterns. `arguments` misuse, `eval`, and `with` (among others) inhibit optimisation. Modern code rarely trips these, but libraries can.
- Blaming the engine for main-thread work. Most "JS is slow" is long tasks, layout thrash and network waterfalls — engine optimisation is the last 10%, scheduling and I/O the first 90%.
- Engine-specific tuning. Optimising for one engine's internals (rather than stable-shape, low-churn code) rots with every release. Write predictably; let the JIT do its job.

**What to take away:** stable object shapes, consistent call signatures, minimal hot-loop allocation — and measure before theorising. The engine rewards boringly predictable code.
