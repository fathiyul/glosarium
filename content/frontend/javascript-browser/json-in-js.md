---
title: "JSON.parse and JSON.stringify"
summary: "Converting between JSON text and JavaScript values."
levels: { backend: junior, frontend: junior }
aliases: ["JSON.parse", "JSON.stringify", "JSON in JavaScript"]
prereqs: ["json", "javascript"]
related: ["json", "serialization", "fetch-api", "runtime-validation", "browser-storage"]
---

JavaScript has two built-in functions for converting between JSON text and JavaScript values.

```js
const text = '{"name":"Ana","age":30,"tags":["admin"]}';

const user = JSON.parse(text);          // text -> object
user.name;                              // "Ana"

const out = JSON.stringify(user);       // object -> text
JSON.stringify(user, null, 2);          // pretty-printed with 2-space indent
```

You use them constantly: reading API responses, sending request bodies, saving data in storage ([JSON](/t/json), [serialization](/t/serialization)).

```js
const res = await fetch("/api/orders", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ item: 7, qty: 2 }),
});
const data = await res.json();           // fetch's helper does JSON.parse for you
```

## Things that surprise people

`JSON.stringify` quietly drops or changes some values:

| Value | Result |
|---|---|
| `undefined`, functions, symbols | omitted from objects (or `null` in arrays) |
| `Date` | turned into an ISO string; parsing gives back a string, not a `Date` |
| `NaN`, `Infinity` | become `null` |
| `Map`, `Set` | become `{}` |
| circular references | throws a `TypeError` |
| `BigInt` | throws |

```js
JSON.parse(JSON.stringify({ when: new Date() })).when;     // a string, not a Date
```

A quick deep copy with `JSON.parse(JSON.stringify(x))` therefore loses data. Prefer `structuredClone(x)`.

## Parse safely

`JSON.parse` throws a `SyntaxError` on invalid input (trailing commas, single quotes, comments):

```js
try {
  const data = JSON.parse(input);
} catch (err) {
  // handle bad JSON
}
```

- **Wrap parsing of untrusted or stored text in `try/catch`.**
- **Validate the shape** after parsing. JSON being valid doesn't mean it has the fields you expect ([runtime validation](/t/runtime-validation)).
- **Large integers** lose precision as JavaScript numbers.
- **`reviver` and `replacer`** arguments let you customize conversion (turn date strings back into `Date`s).
