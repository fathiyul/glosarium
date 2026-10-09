---
title: "Generics"
summary: "Code that works over many types while keeping type safety."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["generic types", "type parameters", "generic functions", "templates", "parametric polymorphism"]
prereqs: ["type-system", "function"]
related: ["type-inference", "variance", "type-system", "utility-types", "intersection-type", "union-type"]
core: [frontend]
---

**Generics** let you write code that works with **many types** while keeping the type safety. Instead of fixing a type, you leave a placeholder
(a *type parameter*, usually `T`) that's filled in when the code is used.

Without generics you pick between a type too narrow or one too loose:

```ts
function firstNumber(items: number[]): number | undefined { return items[0]; }   // only numbers
function firstAny(items: any[]): any { return items[0]; }                        // loses type information
```

With a generic:

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}

const n = first([1, 2, 3]);          // n: number | undefined
const s = first(["a", "b"]);         // s: string | undefined
```

The type flows through: put in strings, get strings out. The compiler usually infers `T` itself ([type inference](/t/type-inference)).

## Where you see them

```ts
const ids: Array<number> = [];                 // Array<T>
const lookup: Map<string, User> = new Map();   // Map<K, V>
const p: Promise<Response> = fetch(url);       // Promise<T>

interface ApiResponse<T> { data: T; error?: string }
function get<T>(url: string): Promise<ApiResponse<T>> { ... }
```

```python
from typing import TypeVar
T = TypeVar("T")
def first(items: list[T]) -> T | None:
    return items[0] if items else None
```

Java, C#, Rust, Go (since version 1.18) and others have generics, with different details.

## Constraints

Sometimes the function needs the type to have certain abilities:

```ts
function byId<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}
```

`T extends { id: number }` means "any type that has a numeric `id`".

## Guidelines

- Use generics when the **same logic applies to different types** and the **relationship between input and output types matters**.
- **Don't over-engineer.** A generic with five type parameters and nested conditions is hard to read. If a plain type or a union works, use it.
- Name type parameters meaningfully when there are several (`TKey`, `TValue`, `TItem`).
- Variance (how generic types relate when their parameters are related) is a deeper topic ([variance](/t/variance)).
