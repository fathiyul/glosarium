---
title: "JavaScript"
summary: "The programming language of the web."
levels: { backend: junior, frontend: junior }
aliases: ["JS", "JavaScript", "ECMAScript language"]
prereqs: ["browser"]
related: ["ecmascript", "typescript", "dom", "node-js", "json-in-js"]
---

JavaScript is the programming language of the web. It runs in every browser, where it makes pages interactive, and with Node.js (and similar runtimes) it also runs on servers and in command-line tools.

```js
const prices = [10, 25, 8];
const total = prices.reduce((sum, p) => sum + p, 0);

document.querySelector("#total").textContent = `$${total}`;

document.querySelector("button").addEventListener("click", () => {
  alert("Clicked");
});
```

## What it does in the browser

- Reads and changes the page ([DOM](/t/dom)).
- Reacts to events: clicks, typing, scrolling ([event handling](/t/event-handling)).
- Talks to servers without reloading ([fetch](/t/fetch-api)).
- Stores data in the browser ([browser storage](/t/browser-storage)).

Outside the browser: web servers and APIs, build tools, scripts, desktop and mobile apps.

## Key features

- **Dynamically typed**: variables hold any type, and types are checked at runtime. [TypeScript](/t/typescript) adds static types.
- **First-class functions**: functions are values you can pass around.
- **Prototype-based objects**, with `class` syntax on top.
- **Single-threaded with an event loop**: asynchronous work uses callbacks, promises and `async`/`await` ([event loop](/t/event-loop), [promises](/t/promise)).
- **Standardized as [ECMAScript](/t/ecmascript)**, with new features every year.

## Quirks you'll meet

- `==` converts types, so use `===`.
- `0.1 + 0.2` isn't exactly `0.3` ([floating point](/t/floating-point)).
- `this` depends on how a function is called.
- `null` and `undefined` are both "nothing" in different ways.
- `typeof null` is `"object"`.

None of these are reasons to avoid it, but they explain why linters and TypeScript are popular.

## Not the same as Java

The name was marketing. They are unrelated languages.

It's a good first language for the web: you can run it in the browser console right now.
