---
title: "Declarative vs Imperative"
summary: "Describing what you want vs spelling out how to do it."
levels: { backend: mid-level, frontend: junior, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["imperative programming", "declarative programming"]
prereqs: ["function", "loop"]
related: ["functional-programming", "map-filter-reduce", "sql", "higher-order-function"]
---

Imperative code spells out how to do something, step by step. Declarative code describes what you want, and leaves the how to the system.

```python
# Imperative: how
result = []
for user in users:
    if user.active:
        result.append(user.name.upper())

# Declarative: what
result = [u.name.upper() for u in users if u.active]
```

```sql
SELECT name FROM users WHERE active = true;      -- say what you want; the database decides how
```

## Where you meet each

| Declarative | Imperative |
|---|---|
| SQL, HTML, CSS | loops and assignments in most languages |
| React-style UI (describe the UI for this state) | manually editing the DOM step by step |
| Terraform and Kubernetes manifests (the desired state) | shell scripts that run commands in order |
| `map` / `filter` ([map, filter, reduce](/t/map-filter-reduce)) | hand-written index loops |

```jsx
// declarative UI
{items.length ? <List items={items} /> : <Empty />}
```

## Trade-offs

- **Declarative** is usually shorter and easier to read, because it states intent. The system can optimize, and you avoid whole classes of bugs (forgot to update the screen).
- **Imperative** gives control over exact steps and performance, and is easier to debug step by step.

It's a spectrum, not a switch. Real programs mix them. A good habit is to write at the most declarative level that stays clear, and drop to imperative when you need control. See [functional programming](/t/functional-programming) for a style that leans declarative.
