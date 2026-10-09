---
title: "ES Modules"
summary: "import and export: JavaScript's standard module system."
levels: { backend: junior, frontend: junior }
aliases: ["ES modules", "ESM", "import export", "ES6 modules", "JavaScript modules"]
prereqs: ["function", "scope"]
related: ["commonjs", "node-js", "typescript", "ecmascript", "deno-bun"]
core: [frontend]
---

**ES modules** are JavaScript's standard way to split code into files and share it between them, with
`export` and `import`.

```js
// math.js
export function add(a, b) { return a + b; }
export const PI = 3.14159;
export default function multiply(a, b) { return a * b; }   // one default per file
```

```js
// app.js
import multiply, { add, PI } from "./math.js";   // default, then named
import * as math from "./math.js";               // everything under a name
import { add as sum } from "./math.js";          // rename
```

## Named vs default exports

- **Named exports** (`export const x`): import them with the *same name* in braces. A file can have many.
- **Default export**: one per file. The importer picks any name. It's convenient, but easier to mistype or
  rename inconsistently, so many teams prefer named exports.

## Using them

In the browser:

```html
<script type="module" src="app.js"></script>
```

In Node, use the `.mjs` extension or set `"type": "module"` in `package.json`. Bundlers and tools like Vite
and TypeScript understand them too.

## Properties worth knowing

- Each module has its **own scope**. Top-level variables aren't global, unlike classic scripts.
- A module is **executed once**, however many files import it.
- Imports are **live and read-only**: you can't reassign an imported binding.
- Module scripts load **deferred**, after the HTML is parsed.
- You may need the **file extension** in relative paths (`./math.js`), depending on the environment.
- **Dynamic import** loads code on demand and returns a promise:
  `const mod = await import("./chart.js")`.
- Avoid **circular imports** (A imports B, B imports A). They can leave values undefined at
  load time.

## The older style

Node originally used `require()` and `module.exports` ([CommonJS](/t/commonjs)). You'll still see it in
older code, and the two don't mix automatically. If you get "Cannot use import statement outside a module", the
environment is treating the file as CommonJS.
