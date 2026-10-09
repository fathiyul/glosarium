---
title: "Component Lifecycle"
summary: "Mounting, updating and unmounting."
levels: { frontend: junior }
aliases: ["component lifecycle", "mount unmount", "componentDidMount", "useEffect cleanup"]
prereqs: ["component", "hooks"]
related: ["dependency-array", "hooks", "component", "props"]
---

A component's lifecycle is the sequence of stages it goes through: it is created and added to the page (**mounting**), re-rendered when its data changes (**updating**), and removed (**unmounting**). Frameworks let you run code at these points.

| Stage | Typical work |
|---|---|
| Mount | fetch data, set up subscriptions and timers, focus an input |
| Update | react to changed props or state |
| Unmount | clean up: cancel timers and subscriptions, abort requests |

## In React with hooks

Hooks replaced the older class methods (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`):

```tsx
useEffect(() => {
  const id = setInterval(tick, 1000);       // runs after mount (and when deps change)
  return () => clearInterval(id);           // cleanup: runs before the next effect and on unmount
}, []);                                      // [] = only on mount
```

What re-runs the effect is controlled by its [dependency array](/t/dependency-array).

## Other frameworks

Vue has `onMounted` and `onUnmounted`. Svelte has `onMount` and the function it returns. Angular has `ngOnInit` and `ngOnDestroy`. The names differ and the idea is the same.

## Common mistakes

- **Forgetting cleanup**: leaving timers, event listeners or subscriptions running after the component is gone causes memory leaks and "update on unmounted component" bugs.
- **Fetching without handling cancellation**: a slow earlier response arriving after a newer one overwrites fresh data (a race). Use `AbortController` or a flag in the cleanup.
- **Effects that should be calculations.** Derive values during rendering instead of syncing state with effects.
- **Assuming it only mounts once.** In React's Strict Mode development builds, effects intentionally run twice to expose missing cleanup.
- **Using lifecycle code for everything.** Event handlers handle user actions. Effects are for synchronizing with outside systems.
- Libraries like TanStack Query handle data-fetching lifecycles for you.
