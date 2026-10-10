---
title: "Reducer"
summary: "A pure function from (state, action) to the new state."
levels: { frontend: mid-level }
aliases: ["reducer", "reducers", "useReducer"]
prereqs: ["flux-redux", "state-management"]
related: ["flux-redux", "state-management", "reactivity"]
---

A **reducer** computes the next state from the current state plus an action: `(state, action) => newState` — a **pure function** with no side effects, no mutation, same inputs always giving same outputs. `useReducer` brings the pattern to components; stores scale it to apps.

```js
function reducer(state, action) {
  switch (action.type) {
    case 'increment': return {...state, count: state.count + 1};
    default: return state;
  }
}
```

Purity buys testability (transitions unit-test without rendering), traceability (every change names its action), and tooling (time-travel, action logs). Complex state machines collapse into readable transition tables.

The classic mistakes:

- Mutation inside reducers. `state.items.push(x)` mutates the previous state — breaking change detection, memoisation and time-travel. Return new objects (or use Immer-style drafting that produces them).
- Actions as setters. `{type: 'SET_X', value}` for every field recreates useState with ceremony. Actions should express *intent and transitions* (`'CHECKOUT'`, `'RETRY'`), grouping related updates atomically.
- Business logic in components instead. Scattered `setState` chains across handlers duplicate transition logic and race. Centralise multi-step transitions in the reducer.
- Over-sized reducers. One reducer for the whole app becomes an unreviewable switch. Split by domain; combine.
- Async in reducers. Reducers are synchronous by contract. Side effects go in effects/middleware that *dispatch* actions.
- Default-case drops. Swallowing unknown actions silently hides dispatched-but-unhandled intents. Return state, but log unexpected types in development.
- useState vs useReducer indecision. Related fields updating together → reducer; independent primitives → useState. The rule of thumb that ends debates.

**How to use it:** actions as intent, reducers as pure transitions, side effects outside. State changes become reviewable, testable, replayable — the calm centre of complex UI logic.
