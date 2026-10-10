---
title: "CSS-in-JS"
summary: "Writing styles in JavaScript alongside components."
levels: { frontend: mid-level }
aliases: ["css-in-js", "styled components", "emotion"]
prereqs: ["css", "javascript"]
related: ["css-modules", "critical-css", "main-thread"]
---

**CSS-in-JS** authors styles inside JavaScript — template literals or objects that generate scoped class names, with full access to props, themes and logic. Styles colocate with components, dead-code-eliminate with them, and adapt dynamically without class-string juggling.

```js
const Button = styled.button`
  background: ${p => p.primary ? 'navy' : 'white'};
`;
```

The price is runtime: styles compute in the browser (parse, inject, recalc), shifting work from build to load — measurable on large apps. Zero-runtime variants (compile-time extraction) keep the authoring while shipping plain CSS.

The classic mistakes:

- Ignoring the runtime tax. Full-runtime CSS-in-JS on a huge tree adds parse/inject costs to startup and re-renders. Measure; consider zero-runtime extraction for performance-critical apps.
- SSR mismatch. Server-rendered styles must match the client's first render exactly, or hydration flashes and warns. Configure SSR collection properly (see [hydration](/t/hydration)).
- Dynamic styles per render. Interpolating fresh values every render regenerates classes constantly. Hoist static parts; memoise dynamic ones.
- Theming without constraints. Unbounded theme access fragments design — every component inventing values. Tokens and variants channel creativity.
- Debugging soup. Hashed class names obscure DevTools; enable readable labels in development.
- Lock-in by default. Component styles married to one library complicate migration. Isolate the styling layer choice from component logic where feasible.
- Forgetting the cascade still exists. Scoped generation doesn't repeal specificity, inheritance or custom properties. CSS knowledge still applies — it's generated CSS, not magic.

**How to choose:** colocation and dynamism argue for it; startup performance argues for extraction or modules. Decide by measurement on your app, not by preference — and keep the styling system one team-wide choice.
