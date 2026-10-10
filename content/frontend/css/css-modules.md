---
title: "CSS Modules"
summary: "Locally scoped class names generated at build time."
levels: { frontend: mid-level }
aliases: ["css modules", "css module", "scoped css"]
prereqs: ["css", "webpack"]
related: ["css-in-js", "webpack", "css-nesting"]
---

**CSS Modules** scope class names to the component that imports them: you write `.title` in `Card.module.css`, the build rewrites it to `Card_title_abc123`, and the component references it via the imported mapping. Same authoring as plain CSS, zero global collisions by construction.

```css
/* Card.module.css */ .title { font-size: 1.2rem; }
```
```js
import s from './Card.module.css';  // s.title === "Card_title_abc123"
```

It solves the global-namespace problem without runtime cost — plain CSS in, unique classes out — composing with `:global()` escapes for the genuinely shared (resets, utilities) and `composes` for sharing declarations.

The classic mistakes:

- Everything global anyway. Slapping `:global` on most rules reintroduces collisions through the escape hatch. Default local; justify each global.
- Dynamic class soup. Building class strings by concatenation (`s['btn-'+type]`) defeats static analysis and typo detection. Map variants explicitly.
- Forgetting the mapping is build-time. Class names only exist via the import object — referencing literal rewritten names (or expecting stable hashes across builds) breaks.
- Specificity surprises. Composed and nested module classes still cascade normally; locality prevents *collisions*, not *specificity* bugs. Keep selectors flat.
- Theming without variables. Hard-coded values per module fragment theming. Expose design tokens as custom properties; modules consume them.
- Mixing with CSS-in-JS casually. Two scoping systems in one codebase confuse ownership — styles live in modules *or* in JS, per a team rule, not per file mood.
- Untyped imports. Without type declarations for `*.module.css`, editors and compilers can't check the mapping. Generate or declare types.

**When to use it:** component-scoped styling with zero runtime and plain-CSS authoring. It's the boring, fast answer to scoping — reach for heavier systems only when you need their dynamism.
