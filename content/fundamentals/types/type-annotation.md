---
title: "Type Annotation"
summary: "Explicitly declaring the type of a variable or parameter."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["type hints", "type declaration", "type annotations"]
prereqs: ["data-type", "variable"]
related: ["type-inference", "static-vs-dynamic-typing", "typescript", "type-alias", "runtime-validation"]
---

A type annotation explicitly declares the type of a variable, parameter or return value.

```python
def total(prices: list[float], tax: float = 0.2) -> float:
    return sum(prices) * (1 + tax)

name: str = "Ana"
```

```ts
function total(prices: number[], tax = 0.2): number { ... }
const name: string = "Ana";
```

```java
int count = 0;
String greet(String name) { ... }
```

In Java and Go, annotations are required, and the compiler enforces them. In TypeScript and Python, they're optional, and **checked by tools**: the TypeScript compiler, or mypy and pyright for Python. Python itself ignores type hints at runtime.

## What they're for

- **Catching bugs early**: passing a string where a number is expected.
- **Documentation** that can't go stale as easily as a comment.
- **Editor support**: autocomplete, jump to definition, safe renames.
- **Clear boundaries**: function signatures become contracts.

## How much to write

You rarely need to annotate everything. [Type inference](/t/type-inference) works out local variables:

```ts
const count = 3;          // inferred as number, no annotation needed
```

A good rule: **annotate function parameters and return types** (the public surface), and let inference handle the inside.

## Limits

- **Annotations aren't validation.** Data from outside may not match them at runtime ([runtime validation](/t/runtime-validation)).
- **Wrong or vague annotations** (`any`, `object`) give a false sense of safety ([any vs unknown](/t/any-type)).
- Keep them accurate when code changes.
