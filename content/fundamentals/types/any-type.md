---
title: "any vs unknown"
summary: "TypeScript's escape hatches, and why unknown is the safe one."
levels: { frontend: junior }
aliases: ["any", "unknown", "any vs unknown TypeScript"]
prereqs: ["typescript", "type-narrowing"]
related: ["typescript", "type-narrowing", "type-guard", "runtime-validation", "type-system"]
---

TypeScript has two ways to say "I don't know the type of this value", and they behave very differently.

## `any`: turns the checks off

```ts
let x: any = "hello";
x.toFixed(2);          // compiles! crashes at runtime
x.foo.bar.baz();       // compiles, anything goes
```

`any` removes the type checker for that value, and **spreads**: anything you get from an `any` is `any` too. It's an escape hatch, used for convenience, and it silently throws away the safety you adopted TypeScript for.

## `unknown`: the safe version

```ts
let y: unknown = JSON.parse(text);

y.name;                               // error: can't use it yet
if (typeof y === "object" && y !== null && "name" in y) {
  console.log(y.name);                // fine after narrowing
}
```

`unknown` means "could be anything, so prove what it is before using it". You must check the type first ([type narrowing](/t/type-narrowing)), or validate it ([runtime validation](/t/runtime-validation)).

| | `any` | `unknown` |
|---|---|---|
| Assign anything to it | yes | yes |
| Use it without checking | yes (unsafe) | no, compiler stops you |
| Spreads to other values | yes | no |

## Guidance

- **Use `unknown` for data from outside** (JSON, `catch (e)`, event payloads), and narrow or validate it.
- **Avoid `any`.** Turn on strict mode and lint rules (`no-explicit-any`) to catch it.
- **If you must use `any`**, keep it local and small, with a comment on why.
- **Casts (`as Type`)** are also unchecked promises. A validation library is safer.
- Many packages give you `any` by accident, such as a missing type definition. Install types or write a small declaration.
