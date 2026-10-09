---
title: "Single Source of Truth"
summary: "Each piece of data has exactly one authoritative owner."
levels: { backend: junior, frontend: junior }
aliases: ["SSOT"]
prereqs: ["component-state"]
related: ["derived-state", "server-state-vs-client-state", "global-store", "prop-drilling", "local-vs-global-state"]
---

A single source of truth means each piece of data has one authoritative place where it lives. Everything else either derives from that place or refers back to it, rather than keeping its own copy.

Take a shopping cart. The list of items is the data. The total can be calculated from it:

```jsx
const [items, setItems] = useState([]);
const total = items.reduce((sum, item) => sum + item.price, 0); // derived, not stored
```

The classic mistake is storing the total as its own state:

```jsx
// Bad: two copies that can drift apart
const [items, setItems] = useState([]);
const [total, setTotal] = useState(0);
```

Now every place that adds or removes an item has to update both values. Sooner or later one update gets forgotten and the total no longer matches the list.

Derive what you can. Use [derived state](/t/derived-state) for values computed from other values. When the same data comes from a server, keep one cache of it rather than copying it into several components. See [server state vs client state](/t/server-state-vs-client-state). Copying a prop into local state is the same mistake, because the prop and the copy can disagree.
