---
title: "Mediator"
summary: "Centralizing communication between objects."
levels: { backend: senior, frontend: senior }
aliases: ["mediator", "mediator pattern", "hub"]
prereqs: ["design-pattern", "coupling"]
related: ["observer-pattern", "facade-pattern", "event-bus", "pub-sub-pattern", "gang-of-four"]
---

**Mediator** centralises communication between a set of objects so they don't reference each other directly. Instead of every object knowing about every other, each talks only to the mediator, which coordinates. It turns a tangled many-to-many web of references into a star: many objects, one hub.

```text
without mediator:  A ⟷ B ⟷ C ⟷ D   (everyone knows everyone)
with mediator:     A B C D ─▶ Mediator   (each knows only the hub)
```

The classic example is a dialog box: text fields, buttons and checkboxes that need to enable or disable each other. Wiring every control to every other is a mess; a mediator owns the interaction rules, and each control just notifies it of changes.

The distinction from [observer](/t/observer-pattern): observer is a *broadcast* — a subject notifies unknown subscribers, and it doesn't know what they do. Mediator is *coordination* — the mediator knows the participants and encodes the interaction logic between them. A mediator might use observer internally, but its role is decision-making, not just notification. An [event bus](/t/event-bus) or pub/sub is closer to observer: decoupled, no central logic.

The classic mistakes:

- A mediator that grows into a god object. All the interaction logic in one place can accumulate until the mediator knows everything and everyone depends on it. If it starts branching on every participant, the coordination may belong elsewhere.
- Using it to avoid all coupling. Some direct references are fine. Adding a mediator between two objects that simply call each other is needless indirection.
- Confusing it with facade. A [facade](/t/facade-pattern) simplifies an interface for callers and doesn't add behaviour between the things behind it; a mediator actively coordinates two-way interaction.
- Hiding the real model. If the mediator becomes a dumping ground for business rules, the domain logic is now in a coordinator instead of the domain. Keep it to interaction.
- Skipping it when broadcast suffices. If participants only *react* to events and don't need coordination, observer or pub/sub is simpler.

**When to use it:** when a group of objects have complex, interdependent interactions and you want to decouple them from each other and centralise the logic of how they interact. It's a behavioural [Gang of Four](/t/gang-of-four) pattern, and it underlies many UI frameworks' event coordination.
