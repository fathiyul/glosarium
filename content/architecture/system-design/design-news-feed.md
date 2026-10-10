---
title: "Designing a News Feed"
summary: "Fan-out on write vs on read, a classic design problem."
levels: { backend: senior }
aliases: ["news feed design", "feed ranking", "social feed"]
prereqs: ["fan-out", "cache-hit-miss"]
related: ["fan-out", "relevance-scoring", "hot-partition"]
---
**Designing a news feed** assembles each user's personalised stream from followed sources: fan-out on write (push posts into followers' feeds) versus fan-in on read (pull and merge at request time), plus ranking, pagination and freshness. The choice hinges on the follow graph's shape — and celebrities break naive designs.

```text
push:  post → write to every follower's feed (fast reads, heavy writes)
pull:  request → gather followees' posts → merge+rank (slow reads, cheap writes)
hybrid: push to normal followers, pull celebrities at read time
```

Ranking (recency × affinity × quality) usually runs over candidate generation (recent posts from follows) with pagination by cursor. Freshness, dedup (edits/deletes propagate), and abuse (spam ranking) complete the picture.

The classic mistakes:

- Pure push with celebrities. A 100M-follower post means 100M writes per post — infeasible. Hybrid fan-out (push the many, pull the few huge) is the standard answer.
- Pure pull at scale. Following thousands means thousands of lookups per refresh; latency collapses. Precompute for the common case.
- Offset pagination. Page 500 of a shifting feed duplicates and skips; cursor-based pagination stays stable as new posts arrive.
- Ranking as an afterthought. Chronological is a valid choice, but "we'll add ranking later" ignores that ranking shapes storage (features, precomputation). Decide the feed's intelligence early.
- Ignoring deletes/edits. Removed posts lingering in precomputed feeds need invalidation or tombstones; plan the propagation path.
- No abuse story. Spam, reshares and engagement bait dominate unguarded feeds. Ranking must include integrity signals from day one.
- Cold start emptiness. New users with no follows see nothing; onboarding (suggested follows, global highlights) is part of the design.

**Why it teaches:** fan-out asymmetry, push-vs-pull, ranking pipelines and celebrity hotspots — the feed is distributed systems wearing a social mask. Hybridise around the graph's skew.
