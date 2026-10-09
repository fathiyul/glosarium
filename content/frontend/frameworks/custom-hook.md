---
title: "Custom Hook"
summary: "Extracting reusable stateful logic into a hook."
levels: { frontend: mid-level }
aliases: ["custom hooks", "React custom hook", "writing hooks", "reusable hooks", "useSomething"]
prereqs: ["hooks", "use-effect"]
related: ["hooks", "use-effect", "component-state", "dependency-array", "context-api", "refs"]
core: [frontend]
---

A **custom hook** is a function whose name starts with `use` and that calls other hooks inside it. It's how you **extract and reuse stateful logic** between components, without changing the component tree.

```tsx
function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

function Settings() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  // used exactly like useState, but persisted
}
```

Other typical ones: `useDebounce(value, 300)`, `useOnlineStatus()`, `useWindowSize()`, `useFetch(url)`, `useToggle()`.

## Key points

- **The `use` prefix isn't just style.** It signals "this follows the rules of hooks" (called at the top level, in components or other hooks), and linters rely on it ([hooks](/t/hooks)).
- **They share logic, not state.** Each component that calls `useLocalStorage` gets its **own** independent state. To share one piece of state across components, lift it up or use [context](/t/context-api) or a store.
- **They can return anything**: a value, a tuple, an object, or nothing.
- **They compose**: hooks can call other custom hooks.
- **They should do one thing**, and have a clear name and a small API.

## Good practice

- **Extract when you repeat**, or when a component's logic hides what it renders. A component mixing five `useEffect`s and three `useState`s often wants a hook (or two) with clear names.
- **Mind dependencies** inside them ([dependency array](/t/dependency-array)). Stale values and infinite loops are the usual bugs.
- **Clean up** subscriptions and timers inside effects.
- **Don't wrap everything.** A custom hook for a single `useState` call adds a name without adding value.
- **Test them** directly with a hook-testing helper, or through a small component.
- Consider an existing library before writing your own for common cases (data fetching, forms), since those have many edge cases ([data fetching libraries](/t/data-fetching-library)).

Vue's composables and similar patterns in other frameworks serve the same purpose.
