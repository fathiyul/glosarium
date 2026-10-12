---
title: "Discriminated Union"
summary: "A union whose members are told apart by a tag field."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["tagged union", "sum type", "union with tag", "discriminant", "algebraic data type", "tagged unions"]
prereqs: ["union-type", "type-narrowing"]
related: ["type-narrowing", "algebraic-data-types", "finite-state-machine", "ui-state-machine", "loading-error-states", "type-guard"]
core: [frontend]
---

A **discriminated union** is a union of object types, where each member has a field with a **unique literal value** (the "tag" or "discriminant") that tells them apart. The
type system can then work out which variant you have just by checking that field.

```ts
type Request =
  | { status: "loading" }
  | { status: "success"; data: User[] }
  | { status: "error"; message: string };

function render(req: Request) {
  switch (req.status) {
    case "loading": return "Loading…";
    case "success": return `${req.data.length} users`;     // `data` exists only here
    case "error":   return `Failed: ${req.message}`;        // `message` exists only here
  }
}
```

Inside each `case`, TypeScript **narrows** the type ([type narrowing](/t/type-narrowing)), so `req.data` is only available when `status` is
`"success"`.

## Why it's so useful

Compare with one loose object:

```ts
type Loose = { loading: boolean; data?: User[]; error?: string };
```

That allows impossible states (`loading: true` with an error, or `data` missing on success) and forces `?` checks everywhere. The discriminated union
makes **impossible states unrepresentable**: you can't build a "success" without `data`, or an "error" without `message`.

It's ideal for:

- loading, success and error UI states ([loading and error states](/t/loading-error-states)),
- API results (`{ ok: true, value } | { ok: false, error }`),
- events and actions in reducers (`{ type: "added", item } | { type: "removed", id }`),
- finite state machines ([UI state machines](/t/ui-state-machine)).

## Exhaustiveness checking

Make the compiler tell you when you forget a case, by assigning the leftover value to `never`:

```ts
default: {
  const unreachable: never = req;     // compile error if a new status isn't handled
  throw new Error(`Unhandled: ${unreachable}`);
}
```

## Other languages

The same idea exists as **sum types** or [algebraic data types](/t/algebraic-data-types): Rust and Swift `enum`s with data, Kotlin sealed classes, Haskell data types. Python can approximate it
with dataclasses and `Literal` types plus a type checker. The core principle: model the possibilities explicitly, instead of with a pile of optional fields.
