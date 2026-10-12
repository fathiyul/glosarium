---
title: "Truthy and Falsy"
summary: "Non-boolean values that act as true or false in conditions."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["falsy", "truthiness", "truthy"]
prereqs: ["boolean"]
related: ["type-coercion", "null", "undefined", "equality-js", "short-circuit-evaluation"]
core: [frontend]
---

In many languages an `if` doesn't need an actual [boolean](/t/boolean). Any value can be
used as a condition, and the language treats it as **truthy** (counts as true) or **falsy**
(counts as false).

```js
const name = "";
if (name) { /* skipped: "" is falsy */ }
```

## The falsy values in JavaScript

There are only a few, so memorize them: `false`, `0` (and `-0`), `0n` (a BigInt zero),
`""` (empty string), `null`, `undefined` and `NaN`. **Everything else is truthy**, including
some surprises:

| Value | JavaScript | Python |
|---|---|---|
| `[]` (empty array/list) | truthy | falsy |
| `{}` (empty object/dict) | truthy | falsy |
| `"0"` | truthy | truthy |
| `"false"` | truthy | truthy |
| `0` | falsy | falsy |

Python's rule is different: empty collections are falsy, which is handy (`if not items:`).
Don't carry one language's rules into another.

## The classic bug

Using truthiness to check "does this exist?" when `0` or `""` are valid values:

```js
function showCount(count) {
  if (!count) return "No data";   // bug: a count of 0 is real data
  return `${count} items`;
}
showCount(0); // "No data"
```

Check what you actually mean:

```js
if (count === undefined || count === null) return "No data";
// or, shorter: count == null  (matches both null and undefined)
```

The nullish operator `??` is the safe version of `||` for defaults:
`count ?? 0` keeps a real `0`, while `count || 10` replaces it.

Rule of thumb: truthiness is fine for "is this string/array/object present?" when empty
means "nothing". It's wrong when zero or an empty string is a legitimate value.
