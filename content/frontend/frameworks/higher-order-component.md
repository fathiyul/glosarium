---
title: "Higher-Order Component"
summary: "A function that wraps a component to add behavior."
levels: { frontend: mid-level }
aliases: ["higher-order component", "hoc", "hoc pattern"]
prereqs: ["component-composition", "hooks"]
related: ["render-props", "hooks", "component-composition"]
---

A **higher-order component (HOC)** is a function taking a component and returning an enhanced one: `withAuth(Profile)`, `withTheme(Card)`. Before hooks, HOCs were *the* reuse mechanism for cross-cutting behaviour — data subscriptions, authorisation, theming, logging — wrapping any component with shared logic.

```jsx
const Enhanced = withAuth(withTheme(Profile));  // layers of wrapping
```

Hooks largely superseded them (custom hooks share logic without wrapper hell), but HOCs persist in older codebases and for cases hooks can't cover (intercepting lifecycle/rendering of wrapped trees, class components). Recognise the pattern on sight; reach for it only where hooks genuinely cannot go.

The classic mistakes:

- Wrapper hell. Stacked HOCs nest DevTools into `withA(withB(withC(Page)))` — undebuggable trees and prop indirection. Flatten with hooks where possible.
- Prop collisions. HOC-injected props (`data`, `theme`) collide with wrapped components' own props silently. Namespace injected props or hoist explicitly.
- Lost display names. Anonymous wrappers render as `<Unknown>` in DevTools. Set `displayName` on every HOC result.
- Ref swallowing. Refs don't pass through classic HOCs to the wrapped component. Forward refs deliberately.
- Static hoisting gaps. `defaultProps`, statics and custom statics don't copy automatically. Hoist non-React statics explicitly.
- Over-wrapping new code. Reaching for HOCs where a hook suffices adds indirection for nostalgia. Hooks for logic reuse; HOCs for render interception and legacy.
- Testing through wrappers. Testing the wrapped export couples tests to every layer. Export the bare component too, and test behaviour per layer.

**Its place:** legacy reuse and render interception — respected, understood, and mostly replaced by hooks for new logic sharing. Read HOCs fluently; write hooks first.
