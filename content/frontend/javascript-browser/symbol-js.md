---
title: "Symbol"
summary: "A unique, non-string property key."
levels: { frontend: senior }
aliases: ["symbol", "javascript symbol", "well-known symbols"]
prereqs: ["javascript", "proxy-reflect-js"]
related: ["javascript", "proxy-reflect-js", "reactivity"]
---

**Symbol** creates unique identifiers usable as property keys — guaranteed never to collide with strings or other symbols. Beyond private-ish keys, **well-known symbols** are the language's protocol hooks: `Symbol.iterator`, `Symbol.asyncIterator`, `Symbol.toPrimitive`, `Symbol.dispose` let objects plug into `for...of`, spreading, coercion and cleanup.

```js
const id = Symbol('id');            // unique key, invisible to JSON/for-in
obj[Symbol.iterator] = function* () { … };  // now iterable with for...of
```

Libraries use symbols for metadata that must not clash with user keys; the language uses well-known symbols to make protocols extensible without new syntax.

The classic mistakes:

- Symbols for privacy. They're non-enumerable, not private — `Object.getOwnPropertySymbols` and Reflect expose them. Real privacy is `#fields` or closures.
- Global registry confusion. `Symbol.for('x')` shares across realms (intentional); `Symbol('x')` is unique per call. Mixing them up shares what should be private or splits what should be shared.
- JSON invisibility. Symbol-keyed properties vanish in `JSON.stringify` and spread of expectations — fine for metadata, fatal for data. Keep data in string keys.
- Overriding well-known symbols carelessly. A broken `Symbol.iterator` or `toPrimitive` corrupts coercion, spreading and logging in baffling ways. Implement protocols exactly.
- Debugging obscurity. Symbol keys print opaquely; overuse makes state inspection painful. Reserve symbols for framework/metadata roles, not everyday fields.
- Assuming cross-realm identity. Symbols (non-registry) differ across iframes/realms — protocol checks spanning realms need the registry or string fallbacks.
- Polyfill gaps. Well-known symbol behaviour in older engines needs careful polyfilling; protocol support is engine-deep, not syntax sugar.

**How to use them:** symbols for non-colliding metadata and protocol implementation; strings for data; registry for deliberate cross-realm sharing. Small primitive, load-bearing in framework and library design.
