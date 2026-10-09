---
title: "Global Store"
summary: "A central container for shared app state, like Redux or Zustand."
levels: { frontend: mid-level }
aliases: ["Redux", "Zustand", "Pinia", "state store", "app state", "Redux Toolkit", "Jotai"]
prereqs: ["component-state", "context-api"]
related: ["flux-redux", "reducer", "single-source-of-truth", "local-vs-global-state", "server-state-vs-client-state", "state-management"]
core: [frontend]
---

A **global store** is a central place for state that many parts of the app share, outside any particular component. Components **read** from it, and **dispatch updates** to it. Examples: Redux (and Redux Toolkit), Zustand, Pinia (Vue), Jotai, MobX.

```ts
// Zustand
import { create } from "zustand";

const useCart = create<CartState>((set) => ({
  items: [],
  add: (item) => set((s) => ({ items: [...s.items, item] })),
  clear: () => set({ items: [] }),
}));

function CartBadge() {
  const count = useCart((s) => s.items.length);       // subscribes only to what it selects
  return <span>{count}</span>;
}
```

## Why have one

- **Many distant components need the same state** (cart, current user, UI preferences), without drilling props or lifting state to the top ([prop drilling](/t/prop-drilling)).
- **Predictable updates**: changes go through defined actions or setters, and are easy to log and debug (devtools can replay them).
- **A single source of truth** for shared data ([single source of truth](/t/single-source-of-truth)).
- **Selective subscription**: unlike a plain context, stores let components subscribe to just the slice they use, which avoids needless re-renders ([context](/t/context-api), [unnecessary re-renders](/t/unnecessary-rerenders)).

## What belongs in it, and what doesn't

| Put it in the store | Keep it elsewhere |
|---|---|
| App-wide UI state: sidebar open, theme, notifications | **Server data** (use a [data fetching library](/t/data-fetching-library)) |
| State shared by distant parts (cart, wizard progress) | State used by one component (`useState`) |
| State that must survive navigation | State that belongs in the URL ([URL as state](/t/url-as-state)) |
| | Form field values ([form state](/t/form-state)) |

Much of what teams used to put in Redux was really cached server data. Moving it to a data library often removes most of the store.

## Habits

- **Start without one.** Use local state, lift it, then use context, and add a store when the problem shows up ([local vs global state](/t/local-vs-global-state)).
- **Keep the state minimal and normalized**, and derive the rest ([derived state](/t/derived-state)).
- **Write small selectors**, and select only what you need.
- **Don't mutate state directly.** Return new values (some libraries, like Redux Toolkit, let you write "mutating" code that's converted safely).
- **Keep side effects out of reducers** ([reducers](/t/reducer)).
- Prefer a lightweight library unless you need the structure of a Flux-style system ([Flux and Redux](/t/flux-redux)).
