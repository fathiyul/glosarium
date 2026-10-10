---
title: "Signals"
summary: "Fine-grained reactive values that update only what depends on them."
levels: { frontend: mid-level }
aliases: ["signals", "signal", "signals reactivity"]
prereqs: ["reactivity", "state-management"]
related: ["reactivity", "proxy-reflect-js", "state-management"]
---

**Signals** are minimal reactive cells — `count = signal(0)`, read with `count()`, write with `count.set(1)` — with computed derivations and effects subscribing automatically. Unlike store-level reactivity (any change re-renders subscribers), signals update *exactly* the dependents: a text node bound to one signal refreshes without touching neighbouring DOM.

```js
const count = signal(0);
const doubled = computed(() => count() * 2);  // recalculates only on count change
effect(() => render(doubled()));               // runs only when doubled changes
```

The model (Solid, Preact Signals, Angular signals, and cousins) trades component re-rendering for surgical updates: no virtual-DOM diff for signal-driven changes, no selector memoisation ceremonies — dependency tracking at the binding level.

The classic mistakes:

- Reading outside tracking. Accessing `.value` (or calling) outside a computed/effect tracks nothing — updates silently don't propagate. Reads that matter happen inside reactive contexts.
- Writing during computation. Setting signals inside computeds creates cycles and glitches. Computeds derive; events and effects mutate.
- Untracked side channels. Deriving from non-signal sources (plain variables, external stores) breaks the graph — the computed never refreshes. Lift all sources into signals.
- Effect overuse. Business logic in effects (instead of explicit event handlers and derivations) scatters causation. Effects synchronise with the outside; handlers decide.
- Memory-leaking effects. Effects subscribe until disposed; dynamic lists creating effects per row need disposal on removal. Tie lifetimes to components.
- Mixing paradigms. Signals plus store re-renders plus manual DOM updates in one view produce untraceable update paths. One reactivity model per surface.
- Assuming they're "just useState." Component-state mental models (re-render everything) mislead; signals reward thinking in dataflow graphs. Learn the graph semantics.

**When to use them:** fine-grained, high-frequency updates and framework-native signal APIs. They're the precision instrument of reactivity — exact updates, explicit graphs, minimal waste.
