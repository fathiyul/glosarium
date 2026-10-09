---
title: "Context"
summary: "Sharing values across a component tree without prop drilling."
levels: { frontend: mid-level }
aliases: ["React Context", "useContext", "createContext", "context provider", "React context API"]
prereqs: ["props", "hooks"]
related: ["prop-drilling", "lifting-state-up", "global-store", "hooks", "re-render", "unnecessary-rerenders"]
core: [frontend]
---

**Context** lets a component make a value available to **everything below it** in the tree, without passing it through every layer as props. It solves [prop drilling](/t/prop-drilling) for values that many components need: the current theme, the logged-in
user, the language.

```tsx
const ThemeContext = createContext<"light" | "dark">("light");     // default value

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  return (
    <ThemeContext.Provider value={theme}>
      <Page />                                   {/* any descendant can read it */}
    </ThemeContext.Provider>
  );
}

function Button() {
  const theme = useContext(ThemeContext);       // no props needed
  return <button className={`btn-${theme}`}>Save</button>;
}
```

## Good uses

- Theme, locale and formatting preferences.
- The current authenticated user.
- A router, a feature-flag client, an API client or other shared services.
- Values that change **rarely** and are needed in **many places**.

## What to be careful about

**Every consumer re-renders when the context value changes.** If you put fast-changing state in context (a mouse position, form input on every keystroke, a big object that's rebuilt each render), a huge part of the tree re-renders
([re-renders](/t/re-render), [unnecessary re-renders](/t/unnecessary-rerenders)).

Common mitigations:

- **Keep the value stable**: avoid creating a new object on every render of the provider (`value={{ user, logout }}` is a new object every time). Memoize it or split it ([memoization](/t/ui-memoization)).
- **Split contexts** by concern and change frequency (one for the user, one for the theme), so changes don't notify everyone.
- **Keep state close to where it's used**, and don't use context for everything.
- **Use a dedicated store library** for large, frequently changing client state ([global store](/t/global-store)).

## Not a state management system by itself

Context is a **transport**: it delivers a value down the tree. The state still lives in a `useState` or `useReducer` somewhere, and the provider passes it along.

Often, the simplest fix for prop drilling is not context at all. Restructure with composition (pass components as `children`) or [lift state](/t/lifting-state-up) only as high as needed. Reach for context when
many distant components truly need the same value. Vue (`provide`/`inject`), Svelte and other frameworks have equivalents.
