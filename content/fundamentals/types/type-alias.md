---
title: "Type Alias"
summary: "A new name for an existing type."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["typedef", "type alias TypeScript"]
prereqs: ["type-annotation"]
related: ["union-type", "type-annotation", "utility-types", "type-system", "generics"]
---

A type alias gives a new name to an existing type. It doesn't create a new kind of value. It makes complex types shorter and more meaningful.

```ts
type UserId = string;
type Point = { x: number; y: number };
type Status = "pending" | "paid" | "shipped";
type Callback = (error: Error | null, result?: string) => void;

function distance(a: Point, b: Point): number { ... }
```

```python
UserId = str
Point = tuple[float, float]       # Python: assignment, or `type Point = ...` in 3.12+
Handler = Callable[[Request], Response]
```

```c
typedef unsigned long size_t;     // C's typedef
```

## Why use them

- **Readability**: `Point` says more than `{ x: number; y: number }`.
- **One place to change** when the underlying type changes.
- **Documenting intent**: `UserId` and `OrderId` tell readers what a string is for.
- **Shortening long types**, like function signatures or unions.

## What they don't do

An alias is **interchangeable** with the original. `UserId` and `OrderId` are both just `string`, so passing the wrong one isn't an error. If you need real distinction, use "branded" or "newtype" patterns, or a small class ([primitive obsession](/t/primitive-obsession)).

```ts
const u: UserId = "u1";
const o: string = u;           // fine: it's the same type
```

## Aliases or interfaces?

In TypeScript, `type` and `interface` overlap for object shapes. `interface` can be extended and merged, `type` can also name unions and other forms. Follow your team's convention.

Use aliases to name things, but don't hide a complicated type behind a vague name. See also [generics](/t/generics) and [union types](/t/union-type).
