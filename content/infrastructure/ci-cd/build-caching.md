---
title: "Build Caching"
summary: "Reusing previous build outputs to make CI fast."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["ci cache", "build cache", "dependency cache"]
prereqs: ["ci-pipeline", "build-artifact"]
related: ["image-layers", "artifact-repository", "build-tool", "container-registry"]
---

**Build caching** reuses work from a previous build instead of redoing it. Downloading dependencies, compiling code and bundling assets are often the slowest steps in [CI](/t/ci-pipeline), and most of that work changes only when the inputs do. If the inputs match, restore the previous output.

The key is the **cache key**: a value derived from the inputs you care about, usually a lockfile's hash.

```text
cache key = hash(package-lock.json)
if a stored cache matches the key: restore it
else: install from scratch, then store the result under that key
```

When the lockfile changes, the key changes, the cache misses, and dependencies are fetched again. When it doesn't, the cache hits and the install is near-instant. Most CI systems offer a cache step keyed this way, and the same idea powers Docker's layer cache (see [image layers](/t/image-layers)) and most build tools' incremental builds.

The classic mistakes:

- A key that's too broad. Keying on something that rarely changes means stale dependencies are reused after they *should* have updated.
- A key that's too narrow. Keying on the whole source tree means the cache misses on every code edit, even though dependencies didn't change.
- **Caching secrets.** Caches are often shared or restorable by other builds in the repository; tokens and keys can leak through them. Never put credentials in a cache.
- **Trusting a stale cache.** If the tool's output depends on something not in the key — an environment variable, a compiler version — a hit gives you a subtly wrong build.

When not to bother: if a build is already fast, caching adds moving parts that can fail in confusing ways. Measure first. When a cache is right, also publish built output to an [artifact repository](/t/artifact-repository) so deploy time never rebuilds from source.
