---
title: "Scheduler Agent Supervisor"
summary: "Coordinating a multi-step job and recovering steps that fail."
levels: { backend: senior }
aliases: ["scheduler agent supervisor", "scheduler-agent-supervisor", "distributed task pattern"]
prereqs: ["job-queue", "leader-election"]
related: ["job-queue", "competing-consumers", "cron"]
---
**Scheduler-agent-supervisor** coordinates distributed work in three roles: the scheduler (orders tasks — when, in what sequence), agents (execute tasks on workers), and the supervisor (monitors progress, retries failures, reassigns stuck work). Cron-at-scale formalised: reliable distributed execution with visibility and recovery built in.

```text
scheduler: run A, then B+C parallel, then D (workflow definition)
agents: execute on fleet (report heartbeats + results)
supervisor: stuck? failed? → retry/reassign/escalate
```

It suits scheduled pipelines, multi-step workflows and fleet operations (rollouts, scans, migrations) — anywhere fire-and-forget jobs need ordering, monitoring and guaranteed completion. Workflow engines productise the pattern; hand-rolled versions serve narrower needs.

The classic mistakes:

- Scheduler as SPOF. One scheduler instance dying halts all coordination. Elect/replicate schedulers; agents tolerate scheduler gaps gracefully.
- Agents without heartbeats. Silent agent death strands tasks as "running" forever. Heartbeat every task; supervisor times out and reassigns.
- Non-idempotent tasks. Retried tasks double-applying (duplicate emails, double charges) corrupt under the exact failures supervision exists for. Idempotence prerequisite, not optional.
- Supervisor split-brain. Two supervisors both reassigning duplicate everything. Single supervisor (elected) or partitioned supervision with fencing.
- Opaque progress. Tasks as black boxes ("running" for hours, no detail) defeat monitoring and debugging. Structured progress reporting per task.
- Retry storms. Blanket aggressive retries on systemic failure amplify precisely when systems strain. Bounded retries with backoff, dead-lettering, escalation.
- Schedule drift. Clock skew and scheduler gaps shifting cron semantics (missed or doubled runs). Idempotent windows and catch-up policies defined explicitly.

**When to use it:** ordered, monitored, recoverable distributed work — pipelines, rollouts, fleet ops. Scheduler decides, agents do, supervisor guarantees: reliability through separated concerns.
