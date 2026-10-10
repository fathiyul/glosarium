---
title: "Flux / Redux Pattern"
summary: "One-way data flow with actions, reducers and a single store."
levels: { frontend: mid-level }
aliases: ["flux", "redux", "unidirectional data flow"]
prereqs: ["state-management", "reducer"]
related: ["reducer", "state-management", "reactivity"]
---

**Flux** (and Redux, its popular realisation) routes all state changes through **unidirectional data flow**: views dispatch *actions* (plain objects describing intent), a dispatcher/store runs *reducers* producing new state, and views re-render from that state. Data flows one way; every change is an explicit, inspectable event.

```text
view → dispatch({type: 'ADD', item}) → reducer(state, action) → new state → view
```

The payoff is predictability: state transitions are pure functions of (state, action), time-travel debugging replays actions, and the whole update path is traceable — at the cost of ceremony (actions, types, boilerplate) that modern Redux Toolkit and lighter stores reduce.

The classic mistakes:

- Everything in the global store. Server cache, form drafts and ephemeral UI in Redux bloats the store and its update traffic. Global store for shared client state; data libraries for server state; local state for local UI.
- Bloated actions. Actions carrying derived data or whole objects invite inconsistency. Actions describe *intent minimally*; reducers compute.
- Impure reducers. Side effects, randomness or mutation inside reducers break replay, tests and time-travel. Reducers stay pure; effects live in middleware/thunks.
- Over-normalisation or none. Deeply nested state complicates updates; flat normalised entities (by id) update surgically. Normalise shared entities, nest the truly owned.
- Boilerplate nostalgia. Hand-writing action constants and switch reducers in 2026 ignores Toolkit slices. Use the modern idioms.
- Ignoring selectors. Components reading whole stores re-render on any change. Memoised selectors subscribe narrowly.
- Async in reducers. Reducers are synchronous and pure; async belongs in thunks/sagas/effects with explicit pending/success/failure actions.

**When it fits:** complex shared client state with traceable transitions. For server state prefer data caches; for local UI prefer local state. Unidirectional flow where predictability pays.
