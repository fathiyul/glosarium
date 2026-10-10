---
title: "Memento"
summary: "Capturing state so it can be restored later, as in undo."
levels: { backend: senior, frontend: senior }
aliases: ["memento", "memento pattern", "snapshot pattern"]
prereqs: ["design-pattern", "state-pattern"]
related: ["command-pattern", "prototype-pattern", "immutability", "gang-of-four"]
---

**Memento** captures an object's internal state so it can be restored later, without exposing that state to the outside. The object (**originator**) produces a **memento** — an opaque snapshot of its state — and a **caretaker** stores mementos in a stack. To undo, you hand the memento back and the originator restores itself.

```text
originator.setState("b")  → memento { state: "b" } → caretaker stack
undo:  originator.restore(memento)  → back to "b"
```

The pattern's value is encapsulation: the caretaker holds snapshots but can't read or alter their contents, so the originator's internals stay private. That's what separates a proper memento from "just expose all the fields and copy them yourself".

The classic mistakes:

- Exposing the state to make snapshots. If the caretaker reads and writes the originator's fields directly, you've lost encapsulation and the pattern's point.
- Snapshots that are shallow when they need to be deep. A memento that shares mutable substructures with the live object will change when the object changes. Copy what must be preserved (see [shallow vs deep copy](/t/shallow-vs-deep-copy)).
- Unbounded snapshot stacks. Undo history that grows forever is a [memory leak](/t/memory-leak). Cap it, or store deltas instead of full snapshots.
- Confusing it with serialization. A memento is an in-memory restore point; you don't need to persist it to bytes unless you want undo across sessions.
- Using full snapshots for large objects. Copying an entire large graph on every action is expensive. Deltas or immutable-sharing structures (as in [persistent data structures](/t/persistent-data-structure)) are better for big state.

It often appears with [command](/t/command-pattern): each command can produce a memento so it can be undone, which is how editors implement multi-level undo/redo. [Immutability](/t/immutability) is a natural fit — if states are immutable, "snapshot" is just holding a reference to the old value. When to use it: whenever you need to roll back state (undo, transactional edits, checkpoints) while keeping the object's internals encapsulated.
