---
title: "== vs ==="
summary: "Loose equality with coercion vs strict equality."
levels: { backend: junior, frontend: junior }
aliases: ["== vs ===", "loose vs strict equality", "triple equals", "double equals", "strict equality"]
prereqs: ["type-coercion"]
related: ["type-coercion", "truthy-falsy", "null", "undefined", "equality-vs-identity"]
core: [frontend]
---

JavaScript has two equality operators:

- **`===` (strict):** equal only if the type **and** the value match. No conversions.
- **`==` (loose):** converts the types first if they differ, then compares.

```js
1 === 1        // true
1 === "1"      // false  (number vs string)
1 == "1"       // true   ("1" is converted to 1)
```

The conversion rules are surprising enough that loose equality gives some famously odd results:

```js
0 == ""            // true
0 == "0"           // true
"" == "0"          // false   (so == isn't even transitive!)
false == "0"       // true
null == undefined  // true
null == 0          // false
[] == false        // true
```

## The rule

**Use `===` and `!==` by default.** Then you never need to memorize the table above, and a comparison
means what it looks like. Most linters ([ESLint's `eqeqeq`](/t/linter)) can enforce it.

One common, deliberate exception: `x == null` is true for both `null` and `undefined`, a handy shorthand
when you want to check either ([null](/t/null) and [undefined](/t/undefined)).

## Other things to know

- **Objects and arrays are compared by reference**, even with `===`:

```js
[1, 2] === [1, 2]      // false: two different arrays
const a = [1, 2]; const b = a;
a === b                // true: same array
```

To compare contents, compare field by field or use a helper (see
[equality vs identity](/t/equality-vs-identity)).

- **`NaN` is not equal to anything, including itself**: `NaN === NaN` is false. Use
  `Number.isNaN(x)`.
- `Object.is(a, b)` is a stricter comparison that treats `NaN` as equal to itself, and tells `+0` from `-0`.
- Don't rely on [truthiness](/t/truthy-falsy) when you mean to compare to a specific value.
