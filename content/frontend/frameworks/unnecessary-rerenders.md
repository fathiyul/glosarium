---
title: "Unnecessary Re-renders"
summary: "Renders that change nothing, and how to avoid them."
levels: { frontend: mid-level }
aliases: ["unnecessary re-renders", "extra renders", "re-render performance", "wasted renders", "React re-rendering"]
prereqs: ["re-render", "component-state"]
related: ["ui-memoization", "re-render", "context-api", "lifting-state-up", "list-virtualization", "long-tasks"]
core: [frontend]
---

A component **re-renders** when its state changes, when its parent re-renders, or when a context it reads changes. A re-render is **unnecessary** when the result is identical to last time. Most are harmless: React is fast, and rendering is cheap. They matter when they happen
often, on big trees, or with expensive work, and the UI becomes sluggish.

## Common causes

- **State kept too high.** State in `App` changes on every keystroke, and re-renders the entire app.
- **A parent re-renders**, so all its children do too, even with the same props.
- **New object, array or function props** created inline every render, which defeats memoization ([memoization](/t/ui-memoization)).
- **A frequently changing context value** re-renders every consumer ([context](/t/context-api)).
- **Expensive computation during render**, repeated each time.
- **Rendering huge lists** in full ([list virtualization](/t/list-virtualization)).

## Finding them

- **React DevTools Profiler**: record an interaction and see which components rendered, why, and how long they took.
- **"Highlight updates when components render"** shows flashing borders around components as they re-render.
- Add a temporary `console.log` in a suspect component.
- Browser performance panels show long tasks ([long tasks](/t/long-tasks)).

Measure before changing anything, since you might be fixing something that isn't slow.

## Fixes, in order of preference

1. **Move state down** to the smallest component that uses it. The rest of the tree stops re-rendering.

```tsx
// Typing re-renders only SearchBox, not the whole page
function Page() { return <><SearchBox /><ExpensiveChart /></>; }
```

2. **Lift content up with composition**: pass heavy parts as `children`, so they aren't re-created when the wrapper's state changes.
3. **Memoize** the components, values and functions that are actually expensive ([`memo`, `useMemo`, `useCallback`](/t/ui-memoization)).
4. **Split contexts**, or use selectors in a store library, so components subscribe only to what they need.
5. **Virtualize long lists**, and paginate.
6. **Debounce** rapid inputs ([debounce](/t/debounce)).

## Remember

Don't optimize speculatively. Re-rendering isn't a bug in itself, and sprinkling `memo` everywhere can make code harder to read without making it faster. Look for the **slow interaction** first, then find which renders cause it.
