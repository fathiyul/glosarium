---
title: "Dependency Array"
summary: "The list that decides when an effect or memo reruns."
levels: { frontend: junior }
aliases: ["useEffect dependencies", "deps array", "exhaustive-deps"]
prereqs: ["hooks", "lifecycle-methods"]
related: ["lifecycle-methods", "hooks", "ui-memoization", "closure"]
---

The dependency array is the second argument to hooks like `useEffect`, `useMemo` and `useCallback`. It lists the values the hook depends on. React re-runs the hook only when one of them has changed since the last render.

```tsx
useEffect(() => {
  fetchUser(userId).then(setUser);
}, [userId]);                // runs on mount and whenever userId changes
```

| Array | Effect runs |
|---|---|
| omitted | after **every** render |
| `[]` | once, after mount |
| `[a, b]` | on mount and whenever `a` or `b` changes |

Changes are compared with `Object.is` (reference equality for objects and arrays).

## The rule

**List every reactive value used inside** (props, state, variables from the component). If the effect reads `userId`, it must be in the array, or it uses a stale value from an old render (a stale closure).

```tsx
useEffect(() => {
  const id = setInterval(() => setCount(count + 1), 1000);   // `count` is frozen at its first value
  return () => clearInterval(id);
}, []);                                                       // bug: should depend on count, or use:

setCount((c) => c + 1);       // the functional update needs no dependency
```

The ESLint rule `react-hooks/exhaustive-deps` catches missing ones. Don't silence it. Restructure instead.

## Infinite loops

```tsx
useEffect(() => { setItems([...]); }, [items]);       // sets items, which changes, which re-runs...
```

Objects, arrays and functions created in the component body are **new on every render**, so putting them in the array re-runs the effect each time:

```tsx
const options = { page };                     // new object every render
useEffect(() => { load(options); }, [options]);   // runs every time
```

Fixes: depend on primitives (`[page]`), move the object outside the component, or use `useMemo` or `useCallback`.

## Tips

- Keep effects small, with few dependencies.
- If the dependency list is awkward, the effect may be doing too much, or not needed at all ([lifecycle](/t/lifecycle-methods)).
- Remember cleanup when dependencies change: the old effect's cleanup runs first.
