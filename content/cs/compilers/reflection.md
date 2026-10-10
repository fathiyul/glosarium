---
title: "Reflection"
summary: "A program inspecting its own structure at runtime."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["reflection", "introspection", "runtime reflection"]
prereqs: ["type-system", "metaprogramming"]
related: ["decorator-syntax", "dependency-injection", "serialization"]
---

**Reflection** is a program's ability to inspect and use its own structure **at runtime**: to ask "what type is this object?", "what fields and methods does this class have?", "what arguments does this function take?", and to act on the answers — call a method by name, read or set a field, construct an instance dynamically.

```java
Class<?> c = obj.getClass();
for (var m : c.getMethods()) { ... }        // enumerate methods
Object v = c.getMethod("name").invoke(obj); // call by name
```

It's the machinery behind a lot of "it just works" features: serialization libraries walk your object's fields to convert them to JSON; dependency-injection frameworks read annotations to wire things up; ORMs map fields to columns; editors and debuggers inspect live objects.

The classic mistakes:

- Assuming reflection is cheap. Looking up methods and fields at runtime costs more than a direct call and often defeats inlining and optimisation. Don't put it in a hot loop.
- Losing compile-time safety. A method invoked by name is checked at runtime — a typo becomes a crash, not a build error. That's the price of flexibility.
- Breaking encapsulation casually. Reflection can reach private members; libraries do it, application code usually shouldn't.
- Ignoring ahead-of-time and native constraints. In AOT-compiled or native environments, code that's only referenced reflectively can be stripped or unavailable unless declared; reflection may be restricted.
- Treating it as free magic in frameworks. It's a real dependency: a change to a class's shape can silently break code that reflects over it.

Reflection is powerful for generic infrastructure — serialization, DI, testing, mapping — but it should sit at the edges, not inside business logic. It's the runtime face of [metaprogramming](/t/metaprogramming): where [decorators](/t/decorator-syntax) and annotations add metadata, *reflection* is what reads and acts on it. Used deliberately, it removes boilerplate; overused, it hides control flow and trades build-time errors for runtime ones.
