---
title: "Asset Fingerprinting"
summary: "Content hashes in file names so caches update correctly."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["asset fingerprinting", "content hashing", "cache busting"]
prereqs: ["webpack", "cache-control"]
related: ["cache-control", "cdn-caching", "webpack"]
---

**Asset fingerprinting** embeds a content hash in filenames (`app.a3f9c1.js`): identical content keeps its name (cached forever), any change mints a new name (no stale cache, no invalidation needed). Paired with long `Cache-Control`, it makes static assets both permanently cacheable and instantly updatable.

```text
app.a3f9c1.js  ← hash of contents; edit code → app.77b2e4.js
index.html (short cache, references hashed names) → always points at current
```

The HTML entry (unhashed, short-lived) carries the current mapping; everything it references is immutable and eternal. Deployments become additive — old and new assets coexist, so in-flight pages never break mid-rollout.

The classic mistakes:

- Fingerprinting HTML. The entry point must stay Stable-named and fresh — it's the manifest pointing at hashed assets. Hash it and nothing can find the new name.
- Non-deterministic hashes. Timestamps or random salts in the hash rename unchanged files, nuking caches every deploy. Hash content only.
- Stale-HTML staleness. Long-cached HTML pointing at replaced (deleted) hashed assets breaks returning visitors. Keep entry TTLs short; retain old assets through a grace window.
- Query-string versioning. `app.js?v=123` busts some caches but not all (proxies ignore query strings). Filename hashing is the reliable mechanism.
- Forgetting non-JS assets. Images, fonts and CSS need fingerprints too — an unhashed logo caches stale while JS refreshes around it.
- Source maps mismatched. Maps referencing original sources must version alongside; stale maps mislead debugging exactly when it matters.
- CDN purge reliance. Purging instead of fingerprinting makes every deploy a propagation wait. Fingerprints make purges unnecessary for versioned assets.

**The pattern:** hash everything cacheable, keep entries fresh, coexist old and new through deploys. Immutable assets plus a fresh manifest is the whole caching strategy.
