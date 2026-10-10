---
title: "Peer-to-Peer"
summary: "Nodes that act as both client and server."
levels: { backend: senior, frontend: senior }
aliases: ["peer-to-peer", "p2p", "decentralised architecture"]
prereqs: ["cap-theorem", "gossip-protocol"]
related: ["gossip-protocol", "leaderless-replication", "byzantine-fault"]
---
**Peer-to-peer (P2P)** architectures distribute work across equivalent nodes with no centre: every peer routes, stores and serves — BitTorrent swarms, blockchains, mesh networks, decentralised messaging. There's no server to scale, fail or censor; there's also no server to query, secure or upgrade coherently.

```text
client-server: all through the centre (simple, bottlenecked, censorable)
P2P:           peers exchange directly (resilient, complex, ungoverned)
```

Coordination goes fully distributed: DHTs for lookup, gossip for dissemination, consensus or incentives for agreement, NAT traversal for connectivity. Each centralised convenience (search, identity, moderation, updates) becomes a protocol design problem.

The classic mistakes:

- Free-riding assumed away. Peers consume without contributing (BitTorrent's classic 70/30) unless incentives (tit-for-tat, tokens, reciprocity) enforce contribution. Design incentives, not just protocols.
- Global queries. "Search everything" without an index needs flooding or DHT discipline; naive broadcast collapses past small swarms. Structure lookup (DHTs) or accept locality.
- Churn blindness. Peers joining/leaving constantly (mobile, residential) churn routing tables and lose replicas. Over-replicate, repair continuously, design for median session times.
- NAT traversal afterthought. Most peers sit behind NATs/firewalls; connectivity needs hole-punching, relays or both — often the hardest engineering in the system.
- Security by decentralisation. No centre doesn't mean no attack: Sybil (infinite fake peers), eclipse (isolating victims), pollution (poisoned data) all target P2P specifically. Identity, reputation and verification designed in.
- Upgrade incoherence. No central deploy means version skew forever; protocols must negotiate versions and tolerate ancient peers indefinitely.
- Governance vacuum. Abuse, illegal content and disputes with no authority to appeal to become existential crises. Design governance (or explicit non-governance) before launch.

**When to choose it:** censorship resistance, infrastructure independence or edge locality outweighing coherence costs. Otherwise centralised coordination remains simpler, faster and governable.
