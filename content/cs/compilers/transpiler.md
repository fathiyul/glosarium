---
title: "Transpiler"
summary: "A compiler from one high-level language to another, like TypeScript to JavaScript."
levels: { backend: mid-level, frontend: junior }
aliases: ["source-to-source compiler", "transpile", "Babel", "TypeScript compiler"]
prereqs: ["compiled-vs-interpreted", "typescript"]
related: ["typescript", "bundler", "babel-swc", "compiled-vs-interpreted", "polyfill"]
---

A transpiler (source-to-source compiler) converts code from one high-level language, or version of a language, into another at a similar level. A regular compiler goes from a high-level language down to machine code or bytecode.

```ts
// TypeScript in
const greet = (name: string): string => `Hello, ${name}`;
```

```js
// JavaScript out (the types are gone)
const greet = (name) => `Hello, ${name}`;
```

Common examples:

- **TypeScript → JavaScript** (the `tsc` compiler, or tools that just strip types) ([TypeScript](/t/typescript)).
- **Modern JavaScript → older JavaScript**, so new syntax runs in older browsers (Babel, SWC) ([Babel and SWC](/t/babel-swc)).
- **JSX → JavaScript function calls** (React).
- **Sass or Less → CSS.**
- **Other languages compiled to JavaScript or WebAssembly.**

## Why use one

- **Use newer or better languages** while targeting platforms that only understand the older or simpler one (browsers run JavaScript).
- **Add features** like types and JSX without waiting for browsers.
- **Support older environments** from one modern codebase.

## Practical points

- **It's part of your [build](/t/build-tool).** Bundlers and frameworks usually run it for you ([bundlers](/t/bundler)).
- **Debugging**: you run the output, not your source. [Source maps](/t/source-map) connect them.
- **New syntax can be transpiled, but new APIs can't.** A missing function (like a newer array method) needs a runtime [polyfill](/t/polyfill).
- **Target settings** decide how much to transform. Targeting only modern browsers keeps the output smaller and faster.
- **Types are erased.** TypeScript doesn't check data at runtime ([runtime validation](/t/runtime-validation)).
- Today the line between "transpiler" and "compiler" is blurry, and many people just say compile.
