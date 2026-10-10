---
title: "Maintenance Window"
summary: "A scheduled, announced time for risky changes."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["maintenance window", "scheduled maintenance", "planned downtime"]
prereqs: ["deployment-freeze", "status-page"]
related: ["incident-communication", "sla", "backups", "failover", "continuous-delivery"]
---

A **maintenance window** is a scheduled period for work that's too risky or disruptive to do silently: a major database upgrade, a storage migration, a network change that may interrupt traffic. Announcing it in advance sets expectations, and choosing the time lets you do the work when the least harm is possible — often off-peak.

A well-run window has a few parts:

- Announce it. Post on the [status page](/t/status-page), email affected customers, and tell support and on-call. People handle planned downtime far better than surprises.
- Scope it. What changes, what will be unavailable, and how long it should take.
- Have a rollback or stop point. Know how to back out, and set a "go/no-go" moment if it's running long (see [backups](/t/backups)).
- Communicate during it. Post when it starts, when it's done, and if it's extended.
- Verify afterwards. Confirm the service is healthy, not just "the change ran".

```text
announce (days ahead) → start notice → do the work → all-clear → follow-up
```

The classic mistakes:

- **No communication.** Customers discover the outage at the worst moment. Always announce.
- Overrunning without an update. A window that silently runs long makes people assume the worst. Update as soon as you know.
- **No rollback.** Even planned work fails. Have a way back before you start.
- **Using windows for routine changes.** If deploys are safe (see [continuous delivery](/t/continuous-delivery)), you don't need downtime for them. Windows are for genuinely disruptive work.
- Choosing a bad time. Scheduling over a peak or a known event turns a controlled window into an incident.

The trade-off is availability: a window deliberately accepts some downtime in exchange for doing risky work safely rather than in the dark. Where possible, prefer designs that let you migrate with no downtime at all — [failover](/t/failover) to a replica, rolling changes behind a load balancer — and keep windows for the cases that truly need them. The commitment you're temporarily stepping on is your [SLA](/t/sla).
