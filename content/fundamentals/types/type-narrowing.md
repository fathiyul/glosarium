---
title: "Type Narrowing"
summary: "Refining a broad type to a specific one through checks."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["narrowing", "type guards in TypeScript", "control flow analysis", "refining types"]
prereqs: ["union-type", "typescript"]
related: ["type-guard", "discriminated-union", "nullable-type", "union-type", "runtime-validation", "any-type"]
core: [frontend]
---

**Type narrowing** is when the compiler refines a broad type into a more specific one based on checks in your code. A value that is `string | number` becomes
`string` inside an `if` that checks for a string.

```ts
function format(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();     // here: string
  }
  return value.toFixed(2);          // here: number
}
```

The compiler follows the flow of the code, and understands several kinds of check:

| Check | Narrows by |
|---|---|
| `typeof x === "string"` | primitive type |
| `x instanceof Date` | class |
| `"swim" in animal` | whether a property exists |
| `x === null`, `x !== undefined` | removing `null` and `undefined` ([nullable types](/t/nullable-type)) |
| `if (x)` | removing falsy values ([truthy and falsy](/t/truthy-falsy)) |
| `shape.kind === "circle"` | the tag of a [discriminated union](/t/discriminated-union) |
| `Array.isArray(x)` | arrays |

```ts
function area(user: User | null) {
  if (!user) return 0;
  return user.age;                  // `null` was ruled out above
}
```

## Custom checks: type guards

When the built-in checks aren't enough, write a function whose return type tells the compiler what a `true` result means:

```ts
function isUser(x: unknown): x is User {
  return typeof x === "object" && x !== null && "id" in x && "email" in x;
}

if (isUser(data)) {
  data.email;                       // narrowed to User
}
```

See [type guards](/t/type-guard). The compiler **trusts** the function, so a sloppy check is a lie that causes crashes later. For complex data, use a
[validation library](/t/runtime-validation).

## Things to know

- **Narrowing disappears** where the compiler can't be sure the value stays the same, such as inside a callback after the variable could have been reassigned.
  Copy it into a `const` first.
- **A type assertion (`x as User`) isn't narrowing.** It silences the compiler without checking anything.
- Avoid `any`, which turns narrowing off. Prefer `unknown`, which forces you to narrow before use ([any type](/t/any-type)).
