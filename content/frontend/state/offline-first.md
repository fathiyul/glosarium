---
title: "Offline-First"
summary: "Apps that work without a network and sync later."
levels: { frontend: senior }
aliases: ["offline first", "offline-first apps", "offline support", "local-first", "PWA offline"]
prereqs: ["local-storage", "optimistic-update"]
related: ["service-worker", "indexeddb", "optimistic-update", "eventual-consistency", "browser-storage", "server-state-vs-client-state"]
core: [frontend]
---

**Offline-first** is a design approach where an app **works without a network connection** and **syncs with the server when it's back**. The local device is treated as the primary place the user interacts with data, and the network as an optimization, not a requirement.

It matters more than people expect: phones lose signal in elevators and trains, Wi-Fi is flaky, field workers have no coverage, and "offline" often really means "slow and unreliable".

## The building blocks (on the web)

- **A [service worker](/t/service-worker)** caches the app shell (HTML, JS, CSS) and responses, intercepts requests, and serves from the cache when the network fails.
- **Local data storage**: [IndexedDB](/t/indexeddb) for structured data (not `localStorage`, which is small and synchronous) ([browser storage](/t/browser-storage)).
- **A write queue**: user changes are saved locally and queued, then sent when connectivity returns.
- **Sync logic**: reconciling local and server data.
- **UI for connectivity**: showing offline status and pending changes.

```
user action ─► update local store immediately ─► UI updates (optimistic) ─► queue sync
                                                                              │ when online
                                                                              ▼
                                                                  send to server, reconcile, mark synced
```

## The hard part: sync and conflicts

If two devices edit the same thing while offline, or someone edits on the server meanwhile, you have to merge:

- **Last-write-wins**: simple, and can silently lose edits.
- **Field-level merges**: combine non-conflicting changes.
- **Operational transforms or CRDTs**: data structures designed to merge concurrent edits automatically (used for collaborative editing).
- **Ask the user** to resolve conflicts, for important data.

This is the [eventual consistency](/t/eventual-consistency) problem on the client. Idempotent operations and unique client-generated IDs make retries safe ([idempotency keys](/t/idempotency-key)).

## Practical guidance

- **Decide which features truly need offline.** Reading cached content is easy. Offline creation and editing with sync is much harder.
- **Design for the network failing at any moment**, including mid-request.
- **Version your local schema** and handle migrations of stored data.
- **Handle storage limits** and eviction. The browser can clear stored data.
- **Show state honestly**: "saved locally, will sync", with errors if sync eventually fails ([optimistic updates](/t/optimistic-update)).
- **Secure local data.** Devices get lost, and offline data is accessible on them.
- **Test with the network off and throttled**, and during flaky transitions.
- **Plan cache invalidation** for the app shell, or users get stuck on old versions ([HTTP caching](/t/http-caching)).

It's a significant architectural commitment. Start by making the app resilient (good loading and error states, retries), and add full offline capability only where the use case demands it.
