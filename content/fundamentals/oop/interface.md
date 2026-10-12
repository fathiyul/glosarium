---
title: "Interface"
summary: "A contract of methods a type promises to implement."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["protocol"]
prereqs: ["abstract-class"]
related: ["abstract-class", "mixin", "dependency-injection", "polymorphism"]
---

An interface is a set of method signatures that a type promises to provide. It describes what an object can do, not how it does it. Code that depends on an interface can work with any type that satisfies it, which is how you swap implementations without changing the callers.

Java and TypeScript declare interfaces directly. In TypeScript:

```typescript
interface KeyValueStore {
  save(key: string, value: string): void;
  load(key: string): string | undefined;
}

function cacheUser(store: KeyValueStore, id: string, json: string) {
  store.save(`user:${id}`, json);   // works with any object that has save and load
}
```

Python has `typing.Protocol`, which does the same job through structural typing: any class with matching methods satisfies it, without declaring it. Type checkers enforce this, but Python itself doesn't check it at runtime.

The trade-off is that an interface carries no implementation, so it doesn't share code. It also adds a layer of indirection, which is worth it when you have, or expect, more than one implementation, or when tests need a fake. An interface with only one implementation and no test that needs a substitute usually just adds reading time.

The classic mistake is writing a large interface with many methods that callers only partly use. Clients end up depending on methods they never call, and every implementation has to provide all of them. Keep interfaces small and shaped by what the caller needs. [Dependency injection](/t/dependency-injection) relies on this shape, and [abstract classes](/t/abstract-class) are the closer alternative when you also want shared code.
