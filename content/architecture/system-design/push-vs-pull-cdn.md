---
title: "Push vs Pull CDN"
summary: "Uploading content to the CDN vs letting it fetch on demand."
levels: { backend: senior, frontend: senior }
aliases: ["push vs pull cdn", "cdn push pull", "origin pull"]
prereqs: ["cdn", "cache-control"]
related: ["cdn", "cdn-caching", "reverse-proxy"]
---
CDNs fill edge caches two ways: **pull** (origin-pull — the edge fetches from origin on first miss, then serves cached) and **push** (you upload content to the edge/storage upfront). Pull is lazy and automatic; push is eager and explicit. Most traffic uses pull; large files and live streams often push.

```text
pull:  user → edge miss → fetch origin → cache → serve (first pays, rest win)
push:  you upload to edge/storage → every request hits (predictable, upfront work)
```

Pull suits dynamic-ish catalogues (long tail, unpredictable heat); push suits big, known-hot objects (releases, videos, game assets) where first-miss latency or origin stampedes are unacceptable. Hybrids push the head and pull the tail.

The classic mistakes:

- Push for the long tail. Uploading millions of cold objects wastes storage and effort for content nobody requests. Push the predictable head; let pull serve the tail.
- Pull stampedes on hot misses. A viral miss fanning to origin as thousands of concurrent fetches needs request coalescing or pre-warming — pull alone amplifies.
- Stale push. Pushed content updated at origin but not re-pushed serves old bytes indefinitely. Version filenames or automate re-push on change.
- Ignoring purge asymmetry. Pull caches purge centrally; pushed copies need per-edge updates. Invalidation strategy must match the fill strategy.
- Origin unready for pull. First-miss storms and range-request slicing demand an origin built for burst egress — pull shifts load, doesn't remove it.
- Push without verification. Corrupted uploads replicate corruption globally and instantly. Checksum and verify before publishing to the edge.

**How to choose:** predictable-hot-and-big → push; everything else → pull with coalescing and sensible TTLs. Fill strategy is a caching decision wearing an operations costume.
