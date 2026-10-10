---
title: "Coordination Service"
summary: "Systems like ZooKeeper and etcd for configuration, locks and leader election."
levels: { backend: senior }
aliases: ["coordination service", "distributed coordination", "zookeeper etcd"]
prereqs: ["consensus", "distributed-lock"]
related: ["consensus", "service-discovery", "distributed-lock"]
---
A **coordination service** gives distributed processes shared truth: leader election, locks, configuration, group membership, barriers — small, strongly-consistent state every node can trust. ZooKeeper, etcd and Consul play the role: a handful of nodes running consensus, exposing simple primitives (key-value with watches, sequential nodes, leases) that whole fleets build on.

```text
fleet → coordination service: "who is leader?" "hold this lock" "watch /config"
```

The pattern centralises the hard part (consensus) so services stay simple: instead of every pair negotiating, all consult the same strongly-consistent source. The service itself must be rock-solid and fast — it's a dependency of everything, so its failure modes (partitions, slowness) become everyone's.

The classic mistakes:

- Storing data in it. Coordination services hold kilobytes of metadata well and megabytes badly. Configuration, membership, locks — yes; application data, queues, caches — never.
- Chatty watches. Thousands of clients watching volatile keys storms the service on every flap. Watch stable keys; debounce reactions; cache locally.
- No session handling. Locks and leadership tied to sessions evaporate on expiry — holders must verify ownership before acting (see [fencing tokens](/t/fencing-token)).
- Single coordination cluster for everything. One cluster's outage halts all coordination. Isolate critical coordination paths or run dedicated clusters.
- Assuming speed. Strong consistency means cross-quorum latency on writes; coordination reads can be local, writes cannot. Keep write rates low.
- Reimplementing consensus. Hand-rolled leader election over a database races and splits. Use the coordination service — that's what it's for.
- Forgetting the operator. The coordination cluster needs its own backup, monitoring and quorum planning. The foundation needs foundations.

**When to use it:** leader election, distributed locks, service discovery, config distribution — any shared-truth problem. Centralise consensus once, correctly, and let services coordinate through it rather than among themselves.
