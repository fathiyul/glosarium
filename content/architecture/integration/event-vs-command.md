---
title: "Event vs Command"
summary: "\"This happened\" vs \"please do this\"."
levels: { backend: senior, data-engineer: senior }
aliases: ["event vs command", "events vs commands", "command message"]
prereqs: ["event-driven-architecture", "cqrs"]
related: ["event", "cqrs", "message-queue"]
---
**Events vs commands** separates "something happened" from "do something": events (past tense, broadcast, multiple consumers — `OrderPlaced`) notify; commands (imperative, addressed, single handler — `ChargeCard`) request action. Confusing them couples systems through disguised RPC or strands actions nobody handles.

```text
event:   OrderPlaced → anyone interested reacts (0..n consumers)
command: ChargeCard {order} → exactly one handler acts (1 consumer, reply expected)
```

The handling differs accordingly: events need versioning, retention and idempotent consumers; commands need routing, validation, authorisation and responses (success/failure). Event-carried state transfer and command gateways are the respective patterns; mixing them (commands broadcast, events "commanding") inherits both complexities with neither clarity.

The classic mistakes:

- Commands broadcast as events. "Do X" fanned to all subscribers executes N times (or zero, if nobody feels addressed). Address commands; broadcast events.
- Events expecting replies. Designing consumers' responses back into flows recreates RPC over topics — latent, unordered, untyped. Events don't return; follow-ups are new events.
- No command validation. Accepting addressed commands without validation/authorisation turns the handler into everyone's confused deputy. Validate and authorise at receipt.
- Eventual commands. Fire-and-forget actions with no acknowledgement lose work silently. Commands need outcomes (sync reply or tracked async completion).
- Sourcing commands. Storing imperative requests as history replays intentions instead of facts; replays re-execute stale decisions. Source events; log commands separately.
- Both unnamed. Payloads that read as either ("UpdateOrder" — fact or instruction?) force every consumer to guess. Name past-tense for events, imperative for commands.
- Reply-to chaos. Ad-hoc reply channels per command reinvent queues badly. Standardise command-reply topology (dedicated reply queues, correlation ids).

**The naming rule:** past tense broadcast, imperative addressed — and infrastructure matching each. Clarity here prevents the two hardest integration bugs: duplicated actions and orphaned intentions.
