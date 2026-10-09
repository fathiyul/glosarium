---
title: "Keys in Lists"
summary: "Stable identifiers so the framework can track list items."
levels: { frontend: junior }
aliases: ["React keys", "key prop", "list keys", "key attribute"]
prereqs: ["component", "props"]
related: ["reconciliation", "virtual-dom", "re-render", "component-state", "list-virtualization"]
core: [frontend]
---

When you render a list of components from an array, each item needs a **`key`**: a stable, unique
identifier that lets the framework tell which item is which between renders.

```tsx
<ul>
  {todos.map((todo) => (
    <li key={todo.id}>{todo.text}</li>
  ))}
</ul>
```

Without keys, you'll see this warning in the console: *"Each child in a list should have a unique key"*.

## What keys are for

When the list changes (items added, removed or reordered), the framework compares old and new and decides what to
keep, move or recreate ([reconciliation](/t/reconciliation)). Keys are how it recognizes "this is the same item
as before". Each item with the same key keeps its **state and DOM**: typed text, focus, scroll position,
animations.

## Choosing a key

- **Use a stable ID from your data**: a database id, a UUID.
- **Don't use the array index** if items can be inserted, deleted or reordered. The key then
  describes *position*, not identity.
- **Don't generate keys during render** (`key={Math.random()}`). Each render gives new keys, so every
  item is destroyed and re-created every time, and inputs lose their text and focus.

```tsx
// Bug with index keys: delete the first item, and the second item's typed text moves into the
// first row, because "item at index 0" is now a different todo.
{todos.map((t, i) => <TodoRow key={i} todo={t} />)}
```

Index keys are acceptable only for static lists that never reorder or change.

## Details

- Keys must be unique **among siblings**, not across the whole app.
- The `key` isn't passed down as a prop; pass the id separately if the child needs it.
- Changing a `key` on purpose is a way to **reset** a component's state (React unmounts the old one and mounts a
  new one).

Vue (`:key`) and other frameworks have the same idea.
