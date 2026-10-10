---
title: "Claim Check"
summary: "Putting a large payload in storage and sending only a reference through the queue."
levels: { backend: senior }
also: [messaging]
aliases: ["claim check", "claim-check pattern", "reference passing"]
prereqs: ["message-queue", "object-storage"]
related: ["message-queue", "object-storage", "payload-size"]
---
The **claim check** pattern passes large payloads by reference: store the data once (object storage, database, cache), send only its key ("claim ticket") through queues and events, and let consumers fetch when ready. Messages stay small and fast; bulk data moves out-of-band exactly once.

```text
producer → store blob → emit {claimCheck: "s3://…/uuid"} (tiny)
consumer → fetch blob → process → optionally delete
```

It suits large documents, images, batch files and ML payloads flowing through size-limited transports (message brokers cap messages in KB–MB; databases dislike blobs in hot rows). Small control plane, big data plane — each optimised separately.

The classic mistakes:

- Blobs in messages. Stuffing megabytes into queues breaks size limits, slows brokers, and duplicates storage per subscriber. Reference, don't embed.
- Orphaned blobs. Produced payloads whose messages never arrive (or consumers crash pre-cleanup) accumulate forever. TTLs plus reaper jobs bound the orphans.
- No integrity check. Fetching corrupted or partial blobs processes garbage authoritatively. Checksum at store; verify at fetch.
- Premature deletion. Producers cleaning up before slow consumers fetch loses data silently. Delete after acknowledgement (or TTL), never on publish.
- Security by obscurity. Unguessable URLs treated as authorisation leak to anyone obtaining them (logs, forwards). Presign narrowly, expire quickly, authorise fetches.
- Hot-spot fetches. Thousands of consumers fetching one blob simultaneously stampede storage; CDN/cache the hot payloads.
- Version skew. Blob overwritten while consumers fetch mixes generations. Immutable blobs (new key per version), never mutate-in-place.

**When to use it:** payloads exceeding comfortable message sizes, or consumed selectively (not every subscriber needs the bytes). Small messages, referenced bulk — each transport doing what it does best.
