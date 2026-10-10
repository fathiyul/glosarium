---
title: "IndexedDB"
summary: "An asynchronous database built into browsers."
levels: { frontend: mid-level }
aliases: ["indexeddb", "indexed database", "browser database"]
prereqs: ["local-storage", "service-worker"]
related: ["local-storage", "service-worker", "pwa"]
---

**IndexedDB** is the browser's built-in NoSQL store: asynchronous, transactional, holding structured data (objects, files, blobs) far beyond localStorage's 5MB string limit. Data lives in **object stores** (like tables) with indexes, inside versioned databases — and it survives reloads, working offline alongside service workers.

```text
open db (version) → transaction → object store → get/put/index query
```

It's genuinely a database: transactions with modes, cursors for iteration, indexes for queries, quotas in the hundreds of MB to GB. That power comes with the clunkiest grave-born API on the web platform — event-based requests wrapped by every sane project in a promise library.

The classic mistakes:

- Using localStorage for real data. Synchronous, tiny, string-only — localStorage blocks the main thread and fits tokens and prefs, not datasets. IndexedDB is the data store.
- Raw API without a wrapper. The event-based API multiplies code and bugs. Use a minimal promise wrapper; the raw API is a rite of passage nobody should repeat.
- Ignoring versions. Schema changes (new stores, indexes) happen in versioned upgrades only. Bumping versions and migrating is the whole schema story — plan it.
- One giant transaction. Long transactions across many stores block other tabs' access and risk aborts. Keep transactions scoped and short.
- No quota handling. Storage can be evicted under pressure (especially "best effort" origins). Handle `QuotaExceededError`, request persistence where it matters, and sync critical data server-side.
- Assuming sync across devices. IndexedDB is per-browser, per-origin. Multi-device sync is a server problem — the local DB is a cache and offline buffer, not the system of record.
- Blocking on it at startup. Reads are async but still cost; don't gate first paint on database opens that could lazy-load.

**When to use it:** offline-capable apps, large client datasets, caches and outbox queues. Small synchronous needs stay in localStorage; everything shaped like data belongs in IndexedDB.
