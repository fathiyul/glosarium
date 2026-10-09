---
title: "Data Fetching Libraries"
summary: "Tools like TanStack Query and SWR that cache and sync server data."
levels: { frontend: mid-level }
aliases: ["TanStack Query", "React Query", "SWR", "RTK Query", "Apollo Client", "server state library"]
prereqs: ["fetch-api", "use-effect"]
related: ["server-state-vs-client-state", "stale-while-revalidate", "optimistic-update", "client-cache-invalidation", "loading-error-states", "global-store"]
core: [frontend]
---

Fetching data inside `useEffect` by hand looks simple, then grows into a mess: loading and error flags, race conditions, duplicate requests, no caching, refetch on focus, retries. **Data fetching libraries**
(TanStack Query, SWR, RTK Query, Apollo Client for GraphQL) handle all of that, and treat data from the server as a **cache you synchronize with**.

```tsx
import { useQuery } from "@tanstack/react-query";

function Orders() {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["orders", { status: "paid" }],        // identifies this data in the cache
    queryFn: () => fetch("/api/orders?status=paid").then(r => r.json()),
    staleTime: 30_000,                                // treat as fresh for 30 seconds
  });

  if (isPending) return <Skeleton />;
  if (error) return <ErrorMessage onRetry={refetch} />;
  return <OrderList orders={data} />;
}
```

## What you get for free

- **Caching and deduplication**: ten components asking for the same data trigger one request.
- **Loading and error states**, ready-made ([loading, error and empty states](/t/loading-error-states)).
- **Stale-while-revalidate**: show cached data immediately, and refresh it in the background ([stale-while-revalidate](/t/stale-while-revalidate)).
- **Background refetching** on window focus, reconnect or an interval.
- **Retries with backoff**, request cancellation and race-condition safety.
- **Pagination and infinite scroll** helpers.
- **Mutations with invalidation**: after changing data, mark related queries as stale so they refetch ([cache invalidation](/t/client-cache-invalidation)), or apply [optimistic updates](/t/optimistic-update).
- **Devtools** to inspect the cache.

```tsx
const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: (order) => fetch("/api/orders", { method: "POST", body: JSON.stringify(order) }),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),    // refetch the list
});
```

## Why it's a different category from a state store

Data from a server is **owned elsewhere**, can become stale, is asynchronous and shared. That's different from UI state like "is this menu open?"
([server state vs client state](/t/server-state-vs-client-state)). Putting server data into a general-purpose [global store](/t/global-store) means rebuilding all those features by hand.

## Tips

- **Design query keys carefully.** They're the cache identity. Include every parameter that changes the result.
- **Tune `staleTime`.** The defaults refetch often. Match it to how quickly the data actually changes.
- **Don't copy fetched data into component state.** Use it directly from the library, so there's one source of truth.
- **Handle errors in the UI** every time.
- For frameworks with built-in data loading (meta-frameworks), use that for the first render, and a library for client-side updates ([meta-frameworks](/t/meta-framework)).
