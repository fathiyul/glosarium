---
title: "CommonJS"
summary: "Node's older require/module.exports module system."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["commonjs", "cjs", "require"]
prereqs: ["javascript", "webpack"]
related: ["javascript", "webpack", "npm-pnpm-yarn"]
---

**CommonJS** (CJS) is the `require()`/`module.exports` system Node.js grew up on: synchronous loading, dynamic (require anywhere, even conditionally), one module object per file. Two decades of npm packages speak it, so it persists in tooling and backends even as ESM becomes the standard.

```js
const fs = require('fs');           // synchronous, dynamic, cached
module.exports = { run };           // CJS export
import { run } from './a.js';       // ESM — static, async-capable
```

The differences that bite: CJS is synchronous (fine on servers, awkward for browsers — hence bundlers), ESM is static (tree-shakeable, top-level await); interop (requiring ESM from CJS and vice versa) is the minefield, with dual-package hazards and default-export mismatches.

The classic mistakes:

- require() in browsers. Synchronous file loading doesn't exist over HTTP — CJS needs bundling for the browser. Ship ESM or bundle; don't expect require to work natively.
- Mixing systems casually. `.js` meaning different things by nearest package.json `type`, `require(esm)` errors, `__dirname` undefined in ESM — pick one system per project and interop deliberately.
- Top-level await envy. CJS can't top-level await; restructuring async initialisation to fit sync require chains causes contortions. ESM for new code sidesteps it.
- Circular requires. CJS returns partial exports for cycles (silent half-initialised objects); ESM handles cycles via bindings but still confuses. Break cycles rather than reasoning through them.
- Named-export interop. `module.exports = function` vs named ESM exports interop through default-export heuristics that differ per tool. Be explicit at boundaries.
- Publishing dual packages. Shipping both without correct `exports` maps loads two instances (state splits, instanceof breaks). Configure dual publishing carefully or ship one format.
- Assuming require is free. Synchronous require chains at startup cost real milliseconds; lazy-require hot paths or defer to ESM's async nature.

**The direction:** ESM for new code, CJS maintained where the ecosystem demands it, interop handled at explicit boundaries. Know both — you'll read CJS for years.
