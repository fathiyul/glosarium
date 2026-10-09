---
title: "Derived State"
summary: "Computing values from state instead of storing duplicates."
levels: { frontend: junior }
aliases: ["derived data", "computed values", "computed state", "calculated state"]
prereqs: ["component-state"]
related: ["single-source-of-truth", "lifting-state-up", "ui-memoization", "use-effect", "reducer"]
core: [frontend]
---

**Derived state** is a value you can calculate from other state or props. The rule: **don't store it,
calculate it.** Storing a second copy creates a second place that can go out of sync.

```tsx
// Bug-prone: three pieces of state that must always agree
const [items, setItems] = useState<Item[]>([]);
const [total, setTotal] = useState(0);
const [count, setCount] = useState(0);
// every place that changes items must remember to update total and count too

// Better: one source of truth, the rest derived while rendering
const [items, setItems] = useState<Item[]>([]);
const total = items.reduce((sum, i) => sum + i.price, 0);
const count = items.length;
```

Now `total` and `count` can never be wrong, because they come directly from `items`.

## Other examples

- A filtered or sorted list: keep the full list and the filter text in state, and compute the visible list.
- `fullName` from `firstName` and `lastName`.
- A selected item: store the `selectedId` and look it up in the list, instead of copying the whole object
  (which goes stale when the list updates).
- "Is the form valid?" from the field values.

```tsx
const visible = todos.filter((t) => t.text.includes(query));
```

## Anti-patterns

**Copying props into state:**

```tsx
function Price({ amount }: { amount: number }) {
  const [value, setValue] = useState(amount);   // won't update when `amount` changes
}
```

**Using an effect to sync derived values** (`useEffect(() => setTotal(...), [items])`). It renders an extra time with a
stale `total` first. Calculate directly during render.

## Performance

Calculations during render are usually cheap. If one is genuinely slow, memoize it (`useMemo`, see
[memoization](/t/ui-memoization)), after you've measured.

In short: keep the minimum state needed, and derive everything else
([single source of truth](/t/single-source-of-truth)).
