---
title: "Premature Optimization"
summary: "Optimizing before you know where the real bottleneck is."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["premature optimisation", "optimize early"]
prereqs: ["big-o-notation"]
related: ["kiss", "yagni", "profiler", "query-optimization", "readability"]
---

Premature optimization is making code faster or more efficient before you know it needs to be, or where the real slowness is. The famous line, from Donald Knuth, is that premature optimization is the root of all evil (in the context of programming), more precisely that you should forget small efficiencies about 97% of the time.

```python
# Clever, harder to read, and saves microseconds in code that runs once a day
result = [x for x in (y << 1 for y in data) if x & 1 == 0]

# Clear
result = [x * 2 for x in data if x % 2 == 0]
```

## Why it's a trap

- **Most code isn't the bottleneck.** A few hot spots dominate runtime. Optimizing the rest is wasted effort.
- **You guess wrong.** Intuition about performance is unreliable. Measure.
- **It costs clarity.** Optimized code is often harder to read, change and debug.
- **It can add bugs** and complexity (caches that go stale, manual memory tricks).
- **Requirements change**, and the optimized part may be thrown away.

## What to do instead

1. **Make it correct and clear first.**
2. **Decide whether performance is a problem**: is anyone waiting? What's the target (a response under 200 ms)?
3. **Measure** with a [profiler](/t/profiler) to find the real hot spot.
4. **Fix the biggest cost first**, often an algorithm or a query, not a micro-detail ([Big O](/t/big-o-notation), [query optimization](/t/query-optimization)).
5. **Measure again** to confirm it helped.

## This isn't permission to be careless

Choosing a sensible data structure, avoiding a database query inside a loop ([N+1 queries](/t/n-plus-one-query)) and not loading a million rows into memory are ordinary good design, not premature optimization. The warning is against micro-tuning without evidence.

Related principles: keep it simple ([KISS](/t/kiss)) and don't build what you don't need ([YAGNI](/t/yagni)).
