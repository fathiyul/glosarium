---
title: "Launch Checklist"
summary: "Monitoring, rollback, docs and support readiness before something goes live."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["launch checklist", "go-live checklist", "release readiness"]
prereqs: ["production-readiness-review", "monitoring"]
related: ["rollback", "feature-flags", "runbook", "alerting", "observability"]
---

A **launch checklist** is the list of things that should be true before a feature or service goes live. It's not bureaucracy; it's a way to catch the gaps that are easy to forget under release pressure — the ones that turn a launch into an incident.

A useful list covers:

- Observability. Can you see it working? Dashboards, [monitoring](/t/monitoring), [alerting](/t/alerting) and [health checks](/t/health-check) are in place, and you know what "healthy" looks like (see [observability](/t/observability)).
- Rollback and kill switch. There's a way back: a [rollback](/t/rollback) plan, and a [feature flag](/t/feature-flags) to turn the feature off without a deploy.
- Data. Migrations are applied and reversible, backfills are done, and the data the feature needs is actually there.
- Docs and runbook. The [runbook](/t/runbook) explains what to do when it breaks, and docs are updated.
- Support and on-call. Whoever answers customers knows it's launching and what to say; on-call knows to expect it.
- Capacity and access. Enough capacity for expected load, and the permissions needed to operate it.
- Communication. If it's user-visible, the [status page](/t/status-page) and support are ready.

```text
before:  monitoring? rollback? runbook? on-call told? data ready?
launch:  ship behind a flag → ramp up slowly → watch
```

The classic mistakes:

- **Launching with no monitoring and no way back.** You can't tell it's broken and can't stop it. Those two items are non-negotiable.
- Treating it as a checkbox. Ticking boxes without understanding them gives false confidence. The question is whether each item is genuinely true.
- **No owner.** A checklist nobody owns drifts out of date. One person drives it to completion.
- **Skipping it for "small" changes.** Small changes cause outages too; scale the checklist to the risk rather than dropping it.

A launch checklist is the practical, per-release form of a [production readiness review](/t/production-readiness-review). Frontend, backend and data launches all use one — the specifics differ, the intent doesn't.
