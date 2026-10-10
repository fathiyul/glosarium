---
title: "Prototype"
summary: "Creating objects by cloning an existing one."
levels: { backend: senior, frontend: senior }
aliases: ["prototype", "prototype pattern", "clone"]
prereqs: ["design-pattern", "factory-method"]
related: ["gang-of-four", "shallow-vs-deep-copy", "memento-pattern", "type-object"]
---

**Prototype** creates new objects by **cloning** an existing instance instead of calling a constructor. You keep one configured example — the prototype — and produce new objects by copying it. That's useful when building an object is expensive, when its configuration is complex, or when you want to create something like an existing thing with a few tweaks.

```text
prototype = new Report(template: monthly, columns: [...], branding: ...)
copy1 = prototype.clone();  copy1.title = "January"
copy2 = prototype.clone();  copy2.title = "February"
```

It also lets you create objects whose concrete class you don't know at compile time: a system can clone whatever prototypes are registered, without naming their types. Some languages build this into the language (JavaScript's prototype chain, which is a different but related idea).

The classic mistakes:

- Shallow clones when you need deep ones. A shallow copy shares the nested objects with the original, so changing a nested field in one object changes it in the other. Use a deep copy where the object graph must be independent (see [shallow vs deep copy](/t/shallow-vs-deep-copy)).
- Cloning without a clear copy contract. What gets copied — just data, or also IDs, caches, listeners? An ambiguous clone produces subtle bugs. Define it.
- Forgetting expensive or external resources. Cloning an object that holds a database connection or a file handle copies the reference to the *same* resource, which is usually wrong.
- Using it when a constructor is fine. If construction is cheap and simple, a copy constructor or factory is clearer. Prototype earns its place when copying is genuinely preferable.
- Cyclic object graphs. A naive deep clone recurses forever on a cycle; handle cycles or use a library.

**When to use it:** when you need many similar objects, when construction is costly or highly parameterised, or when the concrete type is only known at runtime. It's a creational [Gang of Four](/t/gang-of-four) pattern, and it shows up in editors (clone a shape), document templates, and game sprites (clone a configured enemy — see [type object](/t/type-object)). [Memento](/t/memento-pattern) also copies state, but for restore, not creation.
