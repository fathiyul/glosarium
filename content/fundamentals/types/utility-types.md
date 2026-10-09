---
title: "Utility Types"
summary: "Built-in TypeScript type transformers like Partial, Pick and Record."
levels: { frontend: mid-level }
aliases: ["TypeScript utility types", "Partial", "Pick", "Omit", "Record", "Readonly", "mapped types"]
prereqs: ["typescript", "generics"]
related: ["generics", "type-alias", "intersection-type", "union-type", "type-inference", "type-narrowing"]
core: [frontend]
---

TypeScript ships with **utility types**: built-in generic types that transform other types, so you don't repeat yourself or hand-write near-copies.

Start from one type:

```ts
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "member";
}
```

| Utility | Result | Example |
|---|---|---|
| `Partial<T>` | All properties optional | `Partial<User>`: for an update payload |
| `Required<T>` | All properties required | |
| `Readonly<T>` | All properties read-only | `Readonly<User>` |
| `Pick<T, K>` | Only the listed properties | `Pick<User, "id" \| "name">` |
| `Omit<T, K>` | Everything except the listed ones | `Omit<User, "id">`: a "new user" before it gets an id |
| `Record<K, V>` | An object type with keys K and values V | `Record<string, number>` |
| `NonNullable<T>` | Removes `null` and `undefined` | |
| `ReturnType<F>` | The return type of a function type | `ReturnType<typeof getUser>` |
| `Parameters<F>` | A tuple of a function's parameter types | |
| `Awaited<T>` | What a promise resolves to | `Awaited<Promise<User>>` is `User` |

```ts
function updateUser(id: number, changes: Partial<Omit<User, "id">>) { ... }

updateUser(7, { name: "Ana" });           // ok: any subset of fields except id

const permissions: Record<User["role"], string[]> = {
  admin: ["read", "write", "delete"],
  member: ["read"],
};                                       // error if a role is missing: exhaustive by construction
```

## Why they're useful

- **One source of truth.** Derive related types from the main one, so when `User` changes, the others follow.
- **Fewer bugs**: `Record` over a union of keys forces you to handle every case.
- **They compose**: combine them as shown.

## Cautions

- Don't build a tower of nested utility types that's unreadable. Name intermediate types with an alias ([type aliases](/t/type-alias)).
- `Partial` allows `{}`, which is sometimes not what you mean.
- These are compile-time only, and don't validate data at runtime ([runtime validation](/t/runtime-validation)).
- You can write your own using mapped and conditional types when the built-ins fall short.
