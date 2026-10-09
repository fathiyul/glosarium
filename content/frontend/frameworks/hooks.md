---
title: "Hooks"
summary: "React functions like useState and useEffect for state and side effects."
levels: { frontend: junior }
aliases: ["React Hooks", "useState", "custom hooks", "rules of hooks"]
prereqs: ["component", "component-state"]
related: ["use-effect", "custom-hook", "dependency-array", "refs", "context-api", "ui-memoization"]
core: [frontend]
---

**Hooks** are special functions in React (their names start with `use`) that let a function component
use state and other features. They replaced most class components.

```tsx
function Profile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);     // state

  useEffect(() => {                                        // side effect
    fetchUser(userId).then(setUser);
  }, [userId]);

  return user ? <h1>{user.name}</h1> : <p>Loading…</p>;
}
```

## The built-in hooks you'll use first

| Hook | Use |
|---|---|
| `useState` | Remember a value between renders ([state](/t/component-state)) |
| `useEffect` | Run code after render: fetch, subscribe, sync with something outside React ([useEffect](/t/use-effect)) |
| `useRef` | Hold a value that persists without re-rendering, or point at a DOM element ([refs](/t/refs)) |
| `useContext` | Read a value from a [context](/t/context-api) |
| `useMemo` / `useCallback` | Cache a computed value or a function ([memoization](/t/ui-memoization)) |
| `useReducer` | State with more complex update logic |

## The two rules of hooks

1. **Only call hooks at the top level** of a component or another hook. Not inside `if`,
   loops or nested functions.
2. **Only call hooks from React function components or custom hooks.**

Why: React identifies each hook by the **order** it's called in during every render. If a call is
skipped on one render, everything after it lines up with the wrong state. A linter rule
(`eslint-plugin-react-hooks`) catches these mistakes.

```tsx
if (loggedIn) {
  const [theme, setTheme] = useState("light");   // wrong: conditional hook
}
```

## Custom hooks

When logic repeats, extract it into your own function that uses hooks, such as `useDebounce` or
`useLocalStorage` ([custom hooks](/t/custom-hook)). It's the standard way to share stateful logic
between components.

Other frameworks have similar ideas under other names (Vue's composables, Svelte's runes and stores),
but the "rules of hooks" are specific to React.
