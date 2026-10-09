---
title: "Server State vs Client State"
summary: "Cached copies of server data vs purely UI state."
levels: { frontend: mid-level }
aliases: ["server state", "client state", "remote state vs local state", "UI state vs server cache"]
prereqs: ["component-state", "fetch-api"]
related: ["data-fetching-library", "global-store", "url-as-state", "form-state", "stale-while-revalidate", "single-source-of-truth"]
core: [frontend]
---

Frontend state comes in two quite different kinds, and confusing them is the root of a lot of messy code.

| | **Server state** | **Client state** |
|---|---|---|
| What it is | A **copy of data that lives on the server** | State that exists **only in the browser** |
| Examples | Orders, user profile, product list | Is the modal open? Which tab is selected? Draft text, sidebar collapsed |
| Who owns it | **The server** (the browser has a cache) | The client |
| Can it become out of date? | **Yes**: someone else may change it | No, you're the only writer |
| Asynchronous? | Yes: loading, errors, retries | Usually synchronous |
| Shared across components? | Often | Sometimes |

## Why the distinction matters

Server state has problems that client state doesn't: **staleness**, **loading and error states**, **caching**, **deduplicating requests**, **invalidation** after changes, and **synchronization** with other users' changes.
If you store it in `useState` or a general [global store](/t/global-store), you end up hand-writing all of that:

```tsx
// Typical hand-rolled version of server state
const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
useEffect(() => { /* fetch, set... handle races, no cache, no refetch */ }, []);
```

## A good division of labor

- **Server state → a [data fetching library](/t/data-fetching-library)** (TanStack Query, SWR), which provides caching and sync.
- **Client state → local `useState`**, [context](/t/context-api) or a small store ([global store](/t/global-store)).
- **Navigation-related state → the URL** ([URL as state](/t/url-as-state)).
- **Form state → a form tool** ([form state](/t/form-state)).

Once server data lives in a cache, what's left for client state is usually small.

## Rules of thumb

- **Don't copy server data into local state.** Read it from the cache. Two copies drift apart ([single source of truth](/t/single-source-of-truth)).
- **Derive what you can** instead of storing it ([derived state](/t/derived-state)).
- Decide for each piece of state: **who owns it?** If the server owns it, you're managing a cache. If you own it, manage it locally.
