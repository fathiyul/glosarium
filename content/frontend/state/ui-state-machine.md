---
title: "State Machines for UI"
summary: "Modeling UI as explicit states and transitions, e.g. with XState."
levels: { frontend: senior }
aliases: ["state machines in UI", "XState", "finite state machine UI", "statecharts", "UI statecharts"]
prereqs: ["finite-state-machine", "component-state"]
related: ["finite-state-machine", "discriminated-union", "loading-error-states", "form-state", "reducer", "server-state-vs-client-state"]
core: [frontend]
---

A **state machine** models behavior as a **finite set of explicit states** and the **events that move between them**. Applied to UI, it replaces a tangle of booleans and conditionals with a clear picture of what the interface can be, and what's allowed to happen next.

The typical mess:

```tsx
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
// What does isLoading=true + isError=true mean? Nothing valid. But the code allows it.
```

With a state machine, the UI is in **exactly one state** at a time:

```
            SUBMIT                  SUCCESS
 idle ───────────────► submitting ───────────► success
   ▲                      │
   │        RETRY         │ FAILURE
   └──────────────── error ◄┘
```

```ts
type State =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; orderId: string }
  | { status: "error"; message: string };

function reducer(state: State, event: Event): State {
  switch (state.status) {
    case "idle":       return event.type === "SUBMIT" ? { status: "submitting" } : state;
    case "submitting":
      if (event.type === "SUCCESS") return { status: "success", orderId: event.orderId };
      if (event.type === "FAILURE") return { status: "error", message: event.message };
      return state;
    case "error":      return event.type === "RETRY" ? { status: "submitting" } : state;
    default:           return state;
  }
}
```

This uses a [discriminated union](/t/discriminated-union) so impossible combinations can't be represented.

## Why it helps

- **Impossible states are impossible**: no "loading and error at once".
- **All transitions are visible**: you can see (and draw) every way to move between states, which makes review and testing easy.
- **Events are ignored when not valid**: a second submit click during `submitting` does nothing, because that state has no `SUBMIT` transition ([double submits](/t/double-submit)).
- **Easier to reason about complex flows**: multi-step wizards, drag and drop, media players, authentication flows, form lifecycles.
- **Testable**: test transitions, independent of the UI.
- **Communication**: the diagram works as a shared language with designers and product people.

## Libraries and tools

A reducer ([reducers](/t/reducer)) with a `status` field is already a lightweight state machine. For larger or hierarchical flows, libraries such as **XState** add statecharts (nested and parallel states, guards, delayed transitions, actors) and visualization tools.

## When to use it

- Flows with **several steps or modes**, where the rules for what's allowed depend on the current mode.
- When you notice **boolean flags multiplying** (`isOpen`, `isEditing`, `isSaving`, `hasError`).
- Async flows where requests, retries and cancellations interact ([loading, error and empty states](/t/loading-error-states)).

## When not to

A simple toggle or a single piece of state doesn't need one. Don't add a library for two states. Use the pattern (a status union and a reducer) before the framework. See [finite state machines](/t/finite-state-machine).
