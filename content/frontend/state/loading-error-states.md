---
title: "Loading, Error and Empty States"
summary: "Designing every state of async UI, not just success."
levels: { frontend: junior }
aliases: ["empty state", "loading state", "error state", "async UI states", "UI states"]
prereqs: ["fetch-api", "component-state"]
related: ["skeleton-screen", "optimistic-update", "data-fetching-library", "perceived-performance", "ui-state-machine"]
core: [frontend]
---

Any screen that loads data over the network has **more than one state**. Designing only the happy path
leaves users staring at blank screens, spinners that never stop, or stack traces.

| State | What the user needs |
|---|---|
| **Loading** | Reassurance that something is happening |
| **Success** | The data |
| **Empty** | An explanation, and a next step ("No orders yet. Browse products") |
| **Error** | What went wrong, in plain words, and a way to retry |
| *(Partial / stale)* | Old data while refreshing, or some parts failed |

```tsx
function Orders() {
  const { data, error, isLoading, refetch } = useOrders();

  if (isLoading) return <OrdersSkeleton />;
  if (error) return <ErrorMessage message="Couldn't load your orders." onRetry={refetch} />;
  if (data.length === 0) return <EmptyState text="No orders yet." />;
  return <OrderList orders={data} />;
}
```

## Good practice

- **Handle all of them for every async call.** A common bug: reading `data.length` while `data` is still
  `undefined`.
- **Loading**: prefer a [skeleton screen](/t/skeleton-screen) shaped like the final content over a lone
  spinner. Avoid flashing a spinner for 100 ms fetches, and avoid layout jumps.
- **Errors**: say what happened and what to do ("Check your connection and try again"). Distinguish
  *can't reach the server*, *not allowed* and *not found*. Keep the user's input. Don't show raw error messages.
- **Empty**: don't treat "no results" as an error. Explain why it's empty and offer an action.
- **Refreshing**: keep showing the old data with a subtle indicator rather than clearing the screen.
- **Accessibility**: announce loading and errors to screen readers (for example with `aria-live`, or
  `role="alert"` for errors).
- **Test them**: throttle the network in [DevTools](/t/browser-devtools) and force failures.

Modelling this as an explicit state (`idle | loading | success | error`) rather than several booleans prevents
impossible combinations such as "loading and error" ([UI state machine](/t/ui-state-machine)). Data libraries
give you these flags ready-made.
