---
title: "Type Object"
summary: "Defining \"kinds\" of things as data instead of subclasses."
levels: { backend: senior, frontend: senior }
aliases: ["type object", "type object pattern", "kinds as data"]
prereqs: ["design-pattern", "prototype-pattern"]
related: ["gang-of-four", "reflection", "domain-driven-design"]
---

**Type object** models the *kind* of a thing as an object (or data) rather than as a subclass. Instead of writing a class per kind — `Goblin`, `Dragon`, `Slime` — you have one `Monster` class that holds a reference to a `MonsterType` describing the shared traits (health, speed, sprite). New kinds are added as data, not code.

```text
subclasses:  class Goblin(Monster), class Dragon(Monster), ...   # new kind = new class
type object: Monster(type=DATA["dragon"])                        # new kind = new data
```

Why it helps: when the set of kinds changes often, or is data-driven (loaded from config, a database, a level editor), subclassing forces a code change and a rebuild for every new kind. A type object lets designers add kinds at runtime, and keeps one piece of behaviour for all of them.

The classic mistakes:

- Using it when behaviour differs, not just data. Type object works when kinds share behaviour and differ in data. If each kind needs genuinely different logic, subclasses (or composition of behaviours) are clearer.
- Duplicating the type's data per instance. The whole point is that the type is *shared* — thousands of monsters reference one `MonsterType`, not a copy each. Store the type, not a copy of it (see [flyweight](/t/flyweight-pattern)).
- Losing type safety. Moving kinds from classes to data trades compile-time checks for flexibility. Validate the data, or you get "unknown kind" crashes at runtime.
- Reinventing an enum. A single field with a fixed set of values is just an enum. Type object earns its keep when the kinds carry substantial shared configuration and behaviour.
- Confusing it with reflection. Reflection is a language mechanism to inspect types; type object is a modelling choice to represent kinds as values. They sometimes meet, but they're different ideas.

**When to use it:** when the categories of your domain are numerous, data-driven and share behaviour — game entities, product types, event kinds, configurable rules. It complements [prototype](/t/prototype-pattern) (clone a configured type to make an instance) and keeps the "what kind of thing is this" question in data, where non-programmers can edit it. It's related to how [Domain-Driven Design](/t/domain-driven-design) treats concepts that vary by configuration rather than by code.
