---
title: "Concurrent Rendering"
summary: "Interruptible rendering that keeps the UI responsive."
levels: { frontend: senior }
aliases: ["concurrent rendering", "concurrent mode", "interruptible rendering"]
prereqs: ["virtual-dom", "reconciliation"]
related: ["suspense", "reconciliation", "main-thread"]
---

**Concurrent rendering** lets the framework prepare UI updates interruptibly: start rendering, pause for urgent input, finish (or discard) in the background — keeping typing and animation responsive during heavy updates. Urgent updates (keystrokes) preempt transition updates (filtering a huge list), which proceed without blocking interaction.

```text
type in search box (urgent, immediate) + filter 10k rows (transition, background)
→ input stays fluid; results stream in when ready
```

It requires renders without side effects (the same render may run, pause, restart) and explicit urgency labels (`startTransition`, deferred values) — the framework schedules, the developer prioritises.

The classic mistakes:

- Side effects in render. Effects, subscriptions and mutations during render double-fire or leak under concurrent restarts. Renders compute; effects commit.
- Everything urgent. Marking all updates urgent forfeits scheduling — the app behaves synchronously with extra overhead. Label background work as transitions deliberately.
- Tearing from external stores. Mutating shared mutable sources outside the framework tears (different components seeing different versions mid-render). Use framework-managed state or tearing-safe subscriptions.
- Assuming it fixes slow renders. Concurrency keeps input alive during slow work; the work is still slow. Virtualise, memoise and slim alongside.
- Suspense unhandled. Transitions pair with Suspense boundaries for pending states; without boundaries, users stare at partial UI with no feedback.
- Testing only fast paths. Concurrent scheduling surfaces under load and slow devices — exactly where tests rarely look. Test transitions with throttled CPUs.
- Old patterns fighting it. Manual debouncing, imperative spinners and sync-setState-everywhere duplicate or defeat scheduling. Adopt the framework's primitives.

**How to use it:** pure renders, urgency labels on updates, Suspense boundaries for pending, external stores integrated safely. Responsiveness by scheduling — input first, heavy work interruptibly after.
