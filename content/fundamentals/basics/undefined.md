---
title: "undefined"
summary: "JavaScript's value for a variable or property that was never assigned."
levels: { frontend: junior }
aliases: ["undefined value", "typeof undefined"]
prereqs: ["variable"]
related: ["null", "truthy-falsy", "optional-chaining", "default-parameter", "equality-js"]
core: [frontend]
---

`undefined` is what JavaScript gives you when there's no value because nothing was ever
put there. You rarely write it yourself; you mostly *meet* it:

```js
let x;                        // declared, never assigned → undefined
const user = { name: "Ana" };
user.email;                   // property doesn't exist → undefined
const items = [1, 2, 3];
items[10];                    // out of range → undefined
function greet() {}           // no return statement
greet();                      // → undefined
function hello(name) { return name; }
hello();                      // missing argument → undefined
```

## undefined vs null

Both mean "no value", but by convention:

- `undefined`: the language says "nothing was set here".
- [`null`](/t/null): *you* say "this is intentionally empty".

```js
null == undefined;    // true  (loose equality treats them alike)
null === undefined;   // false (they are different values)
typeof undefined;     // "undefined"
```

JSON has no `undefined`: `JSON.stringify({ a: undefined })` gives `"{}"`, so the key
disappears, while `null` survives.

## Where it bites

The famous crash, "Cannot read properties of undefined", happens when you go one level too
deep:

```js
const user = {};
user.address.city;       // TypeError: user.address is undefined
user.address?.city;      // undefined, no crash
```

[Optional chaining](/t/optional-chaining) (`?.`) avoids the crash, but ask why the value was
missing before hiding it. Often the real cause is data that hasn't loaded yet, or a typo
in a property name.

[Default parameters](/t/default-parameter) apply for `undefined` only, not for `null`:
`function f(x = 5)` gives `5` for `f()` and `f(undefined)`, but `null` for `f(null)`.

Rule of thumb: don't assign `undefined` on purpose. Use `null` when you need to say "empty",
and check with `=== undefined` or `== null` depending on whether you want to match one or both.
