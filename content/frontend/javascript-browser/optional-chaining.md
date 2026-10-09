---
title: "Optional Chaining and Nullish Coalescing"
summary: "?. and ?? for handling missing values safely."
levels: { backend: junior, frontend: junior }
aliases: ["?.", "??", "nullish coalescing", "optional chaining operator"]
prereqs: ["javascript", "var-let-const"]
related: ["equality-js", "template-literals", "javascript", "ecmascript"]
---

Two operators for handling missing values without long chains of checks.

## Optional chaining `?.`

Stops and returns `undefined` if the value before it is `null` or `undefined`, instead of throwing.

```js
const city = user?.address?.city;          // undefined if user or address is missing
const first = items?.[0];                  // optional index
const result = callback?.(data);           // call only if callback exists
```

Without it:

```js
const city = user && user.address && user.address.city;
// and user.address.city alone throws "Cannot read properties of undefined"
```

## Nullish coalescing `??`

Gives a default only when the left side is `null` or `undefined`.

```js
const port = config.port ?? 3000;
```

## Why not `||`?

`||` replaces **any falsy** value: `0`, `""` and `false` too.

```js
const qty = input.qty || 1;     // qty 0 becomes 1: a bug
const qty = input.qty ?? 1;     // qty 0 stays 0; only missing becomes 1
```

## Together

```js
const name = response?.data?.user?.name ?? "Guest";
```

## Cautions

- **Don't use `?.` everywhere.** It can hide real bugs: if `user` should always exist, a missing one should fail loudly, not quietly give `undefined`.
- **It only checks `null` and `undefined`.** Empty strings and `0` pass through.
- **You can't assign through it** (`a?.b = 1` is a syntax error).
- The `??=` operator assigns only if missing: `options.retries ??= 3`.
- Supported in all current browsers and Node. Older targets are handled by a [transpiler](/t/transpiler).
