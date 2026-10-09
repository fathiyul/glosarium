---
title: "Polyfill"
summary: "Code that adds a missing feature to older browsers."
levels: { frontend: junior }
aliases: ["polyfills", "shim"]
prereqs: ["browser-compatibility"]
related: ["browser-compatibility", "transpiler", "feature-detection", "babel-swc", "bundle-size"]
---

A polyfill is code that adds a feature to environments that lack it, by implementing it in JavaScript (or CSS), so newer APIs can be used on older browsers.

```js
// A tiny polyfill: add Array.prototype.at where it's missing
if (!Array.prototype.at) {
  Array.prototype.at = function (index) {
    const i = index < 0 ? this.length + index : index;
    return this[i];
  };
}
[1, 2, 3].at(-1);    // 3, now also in older browsers
```

Typical polyfills cover things like `Promise`, `fetch`, `Array.prototype.includes`, `IntersectionObserver`, `URLSearchParams`.

## Polyfill vs transpiling

- **[Transpilers](/t/transpiler)** (Babel, SWC) convert new **syntax** (arrow functions, optional chaining) into older syntax.
- **Polyfills** supply missing **APIs** (functions and objects). Syntax can't be polyfilled, because an older browser can't even parse it.

You usually need both for broad support.

## How to use them well

- **Check the browsers you must support** first. Don't polyfill what everyone already has ([browser compatibility](/t/browser-compatibility)).
- **Load only what's needed**: build tools can include polyfills based on your target browsers ([browserslist](/t/browserslist)), or a service can send only those a given browser lacks.
- **Use feature detection** so a polyfill never overrides a working native version ([feature detection](/t/feature-detection)).
- **Prefer well-maintained libraries** over hand-written ones: the details of standards are subtle.
- **Mind the size**: polyfills add to bundle weight and parse time ([bundle size](/t/bundle-size)).
- **Don't pollute globals carelessly.** Library code should avoid modifying built-in objects. A "ponyfill" provides the function without touching the global.
- **Retire them** when support data says they're no longer needed.

Some features can't be polyfilled in full (anything needing new browser internals), and fall back to a simpler experience.
