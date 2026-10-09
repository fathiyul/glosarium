---
title: "Tree Shaking"
summary: "Removing unused code from bundles."
levels: { frontend: mid-level }
aliases: ["dead code elimination", "unused code removal", "tree shake", "sideEffects"]
prereqs: ["js-modules", "bundler"]
related: ["bundle-size", "code-splitting", "minification", "bundler", "package-json", "dead-code"]
core: [frontend]
---

**Tree shaking** is when a bundler **drops code that's never used** from the final bundle. Picture shaking a tree so the dead leaves fall off. It reduces the amount of JavaScript users download.

```js
// utils.js
export function formatDate(d) { ... }
export function formatCurrency(n) { ... }
export function parseCsv(text) { ... }       // big, rarely used

// app.js
import { formatDate } from "./utils.js";     // only this one is used
```

The bundler sees that `formatCurrency` and `parseCsv` are never imported, and leaves them out.

## What makes it work

- **[ES modules](/t/js-modules)** (`import`/`export`) have a static structure, so the bundler can tell exactly what's used without running the code. CommonJS (`require`) is dynamic, so it's hard to shake.
- **Named imports** from a library whose code is structured for it.
- **Side-effect-free modules.** If a module does something just by being imported (changes a global, registers a plugin), the bundler can't safely drop it. Libraries mark this in `package.json`:

```json
{ "sideEffects": false }
```

or list the files that do have side effects (such as CSS files). Getting this wrong either bloats the bundle or removes code that was needed.

## Practical consequences

- **Import only what you need:**

```js
import { debounce } from "lodash-es";     // an ES-module build can be shaken
import debounce from "lodash/debounce";   // or import the single function
// import _ from "lodash";                // the whole CommonJS library ends up in the bundle
```

- **Beware of barrel files** (`index.js` re-exporting everything), which can pull in more than expected if the bundler can't prove the rest is unused.
- **Classes and objects with many methods** are harder to shake than separate functions, since the bundler can't remove an unused method from an object.
- **It happens in production builds.** Development builds typically skip it.
- **Check the result** with a bundle analyzer. Don't assume. If a big library is in your bundle after you only used one function, find out why ([bundle size](/t/bundle-size)).
- Minification then shortens what's left ([minification](/t/minification)).

Tree shaking works at the level of what's **statically known to be unused**. It's complemented by [code splitting](/t/code-splitting), which defers code that *is* used, but not right away, and by removing [dead code](/t/dead-code) yourself.
