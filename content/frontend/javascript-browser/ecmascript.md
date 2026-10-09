---
title: "ECMAScript"
summary: "The standard JavaScript implements, with a new version every year."
levels: { backend: mid-level, frontend: junior }
aliases: ["ES6", "ES2015", "ES2020", "ECMAScript standard", "TC39"]
prereqs: ["javascript"]
related: ["javascript", "transpiler", "javascript-engine", "polyfill", "browser-compatibility"]
---

ECMAScript is the standard that defines the JavaScript language. JavaScript is the implementation you use, and ECMAScript is the specification it follows, maintained by the TC39 committee (part of Ecma International).

Versions are named by edition or year:

- **ES5** (2009): the long-lived baseline.
- **ES6 / ES2015**: a huge update: `let` and `const`, arrow functions, classes, promises, modules, template literals, destructuring.
- **Since 2016, one release per year** (ES2016, ES2017...): smaller additions such as `async`/`await`, optional chaining `?.`, nullish coalescing `??`, `Array.prototype.at`.

```js
// ES2015+ features you probably use daily
const { name, age = 30 } = user;
const greet = (n) => `Hello, ${n}`;
const city = user?.address?.city ?? "unknown";
```

## How new features arrive

Features pass through stages (0 to 4) in TC39. At stage 4 they're finished and ship in the next yearly edition. Browsers and runtimes often implement them earlier. You can follow proposals on the TC39 GitHub.

## Why developers care

- **Knowing what's standard** vs what's browser-specific (the DOM, `fetch` and `setTimeout` are not part of ECMAScript. They're web platform APIs).
- **Support varies by environment.** Check which engines and versions support a feature ([browser compatibility](/t/browser-compatibility)).
- **Syntax can be transpiled and APIs polyfilled** to run new code on old targets ([transpiler](/t/transpiler), [polyfill](/t/polyfill)).
- **Reading code and docs**: "ES6" usually means modern JavaScript in general.

## Tips

- Target a recent baseline, and let your build tool handle older users if they matter.
- Node.js and browsers implement ECMAScript through engines like V8 ([JavaScript engine](/t/javascript-engine)).
- TypeScript is a superset of ECMAScript with types ([TypeScript](/t/typescript)).

See [JavaScript](/t/javascript).
