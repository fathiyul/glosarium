---
title: "Client Cache Invalidation"
summary: "Knowing when cached server data is out of date."
levels: { frontend: mid-level }
aliases: ["client cache invalidation", "query invalidation", "cache busting client"]
prereqs: ["state-management", "stale-while-revalidate"]
related: ["stale-while-revalidate", "cache-invalidation", "state-management"]
---

Client data libraries cache server state by **query keys** (`['orders', id]`); **invalidation** marks keys stale after mutations so the UI refetches. A mutation's `onSuccess` invalidates affected queries — the list refreshes, the detail updates — without manual state surgery.

```js
useMutation(updateOrder, { onSuccess: () =>
  queryClient.invalidateQueries(['orders']) });
```

Strategies layer: precise invalidation (exact keys), optimistic updates (assume success, roll back on error), and targeted refetch (active queries only). The cache stays a function of the server, not a second source of truth.

The classic mistakes:

- No invalidation. Mutating without invalidating leaves the UI showing pre-mutation data — "I saved but nothing changed" — the top client-cache bug.
- Invalidating everything. Nuking the whole cache per mutation refetches the world; precise keys keep unrelated UI instant.
- Key design chaos. Inconsistent query keys (`['order', id]` vs `['orders', id]`) make precise invalidation impossible. Design key hierarchies deliberately.
- Optimistic updates without rollback. Assuming success and ignoring failure corrupts the cache on errors. Optimistic writes need error rollback paths.
- Stale closures in updaters. Manual cache updates referencing old data overwrite fresh fetches. Prefer invalidation over hand-editing cached data.
- Ignoring background refetch. Invalidated-but-unmounted queries refetch on next mount — stale flashes for returning users. Prefetch or accept the trade consciously.
- Server state in client state. Duplicating server data into local stores (Zustand/Redux) creates two truths to sync. Server state lives in the data cache; client state holds UI state.

**The discipline:** keyed queries, precise invalidation on mutation, optimistic only with rollback, server state in one cache. Freshness by design, not by reload.
