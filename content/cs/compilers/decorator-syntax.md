---
title: "Decorators / Annotations"
summary: "Syntax for attaching behavior or metadata to functions and classes."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["decorators", "annotations", "decorator syntax"]
prereqs: ["metaprogramming", "reflection"]
related: ["dependency-injection", "macro", "framework-independence", "type-system"]
---

**Decorators** (or annotations) are syntax for attaching extra behaviour or **metadata** to a function, method or class without changing its body. You write a marker above the definition, and the language or framework does something with it: wrap the function, register it in a router, mark a field for injection, add validation.

```python
@retry(times=3)
def fetch():
    ...
# equivalent to: fetch = retry(times=3)(fetch)
```

A Python decorator literally wraps the function — it's a function that takes a function and returns a new one, which is why decorators compose. Other languages use *annotations* differently: they attach metadata that a framework reads via [reflection](/t/reflection) at runtime (Java's `@Autowired`, TypeScript's class decorators).

Common uses: HTTP routing (`@app.get("/")`), dependency injection, testing (`@test`), validation, caching, transactions, and cross-cutting concerns like logging or retries.

The classic mistakes:

- Humouring the decorator, ignoring the consequence. A marker that silently wraps, caches, or validates can change behaviour in ways that are invisible at the call site. Know what each one does.
- Wrapping everything at the framework level. Business logic tucked into decorators is hard to test without the framework, and couples the code to it. Keep the core plain (see [framework code at the edges](/t/framework-independence)).
- Order and composition confusion. Stacked decorators apply in a specific order; getting it wrong changes results. Read top-to-bottom carefully.
- Assuming annotations do something by themselves. In some languages they're just metadata — inert until a framework inspects them. A missing processor means a silently dead annotation.
- Overusing them for magic. Heavy decorator use can make control flow hard to follow; sometimes an explicit call is clearer.

Decorators are a form of [metaprogramming](/t/metaprogramming): code that modifies code. They're convenient and expressive, but they trade transparency for brevity, so use them where the behaviour is well-known, and prefer explicit code where the logic is the important part.
