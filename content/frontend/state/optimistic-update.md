---
title: "Optimistic Update"
summary: "Updating the UI before the server confirms, and rolling back on failure."
levels: { frontend: mid-level }
aliases: ["optimistic UI", "optimistic updates", "optimistic mutation", "optimistic rendering"]
prereqs: ["data-fetching-library", "loading-error-states"]
related: ["data-fetching-library", "loading-error-states", "double-submit", "server-state-vs-client-state", "offline-first", "client-cache-invalidation"]
core: [frontend]
---

An **optimistic update** changes the UI **immediately**, assuming the server request will succeed, instead of waiting for the response. If it fails, you **roll back** and tell the user. It makes interactions feel instant, such as liking a post, ticking a to-do or reordering a list.

```tsx
// TanStack Query style
const mutation = useMutation({
  mutationFn: (todo) => api.toggleTodo(todo.id),

  onMutate: async (todo) => {
    await queryClient.cancelQueries({ queryKey: ["todos"] });
    const previous = queryClient.getQueryData(["todos"]);          // snapshot for rollback
    queryClient.setQueryData(["todos"], (old) =>
      old.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t))      // show the change now
    );
    return { previous };
  },
  onError: (err, todo, context) => {
    queryClient.setQueryData(["todos"], context.previous);          // roll back
    showToast("Couldn't update the task. Please try again.");
  },
  onSettled: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),   // reconcile with the server
});
```

The three parts: **apply** the change locally, **roll back** on failure, then **reconcile** with the server's real data.

## When it fits

- The action **usually succeeds** (failure is rare).
- It's **easy to undo**, with low consequences if it briefly shows the wrong thing.
- Latency would otherwise make the UI feel sluggish.

## When to avoid it

- **Money, orders, destructive or irreversible actions.** Don't show "payment successful" until it is. Show a pending state instead.
- When the server may **reject** it for reasons the client can't predict (permissions, business rules, conflicts).
- When the result depends on server-computed values you can't fake.

## Pitfalls

- **Rollback UX**: a silent revert confuses people. Tell them what happened, and offer retry.
- **Overlapping requests**: several quick optimistic updates can race. Cancel in-flight refetches (as above) and apply updates in order.
- **Conflicts** with changes made by others: the final reconcile may differ from what the user saw.
- **Temporary IDs** for newly created items need replacing with the real ones.
- **Duplicates** from retries: make the endpoint [idempotent](/t/double-submit).
- Keep a **pending** indicator for slower operations, even when you show the change early.

It's closely related to [offline-first](/t/offline-first) designs, where the UI works from local data and syncs later.
