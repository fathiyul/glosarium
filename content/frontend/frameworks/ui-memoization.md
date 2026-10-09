---
title: "memo, useMemo and useCallback"
summary: "Skipping work when inputs haven't changed."
levels: { frontend: mid-level }
aliases: ["React.memo", "useMemo", "useCallback", "memoization in React", "React memo"]
prereqs: ["hooks", "re-render"]
related: ["unnecessary-rerenders", "re-render", "memoization", "hooks", "context-api", "dependency-array"]
core: [frontend]
---

In React, a component **re-renders when its parent re-renders**, even when its own props haven't changed. **Memoization** tells React to **skip work when the inputs are the same**. There are three tools:

| Tool | Caches | Skips |
|---|---|---|
| `React.memo(Component)` | The rendered output of a component | Re-rendering when props are shallowly equal |
| `useMemo(() => compute(a, b), [a, b])` | A computed **value** | Recomputing it on every render |
| `useCallback(fn, [deps])` | A **function** identity | Creating a new function each render |

```tsx
const ProductList = React.memo(function ProductList({ products, onSelect }) { ... });

function Page({ products }) {
  const [query, setQuery] = useState("");
  const onSelect = useCallback((id) => navigate(`/p/${id}`), []);          // stable reference
  const visible = useMemo(() => products.filter(p => p.name.includes(query)), [products, query]);

  return <ProductList products={visible} onSelect={onSelect} />;
}
```

## Why `useCallback` and `useMemo` matter for `memo`

`React.memo` compares props with `===` (shallowly). An object, array or function created inline is a **new reference** on every render, so memoization sees "changed" every time and does nothing:

```tsx
<ProductList onSelect={(id) => navigate(id)} />      // new function each render: memo is defeated
```

Stabilizing references with `useCallback` and `useMemo` lets `memo` work.

## Don't do it by reflex

- Memoization has a cost: comparing dependencies, holding cached values and extra code to read. For small components it can be **slower** than just re-rendering.
- **Measure first** with the React DevTools Profiler ([unnecessary re-renders](/t/unnecessary-rerenders)). Optimize components that are actually slow.
- **Fix the structure first**: move state down to the component that needs it, or pass `children`, which often removes the problem without any memoization.
- **Wrong or missing dependencies** are bugs: a `useMemo` that doesn't list a value it uses will return stale results ([dependency array](/t/dependency-array)).
- It's a performance hint, not a guarantee. Your program must be correct even if React discards the cache.
- Newer React tooling (the React Compiler) can add much of this memoization automatically. Check what your project uses before adding it by hand.

For caching expensive computations outside React, see [memoization](/t/memoization).
