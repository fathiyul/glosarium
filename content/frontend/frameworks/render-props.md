---
title: "Render Props / Slots"
summary: "Passing render functions or content into components."
levels: { frontend: mid-level }
aliases: ["render props", "slots", "render prop pattern"]
prereqs: ["component-composition", "hooks"]
related: ["component-composition", "higher-order-component", "headless-ui"]
---

**Render props** (and framework **slots**) invert control: instead of a component hard-coding its output, the parent supplies a function (or slot content) receiving state and rendering whatever it wants. `<Data>{data => <List/>}</Data>` — fetching logic reused, presentation fully owned by the caller.

```jsx
<Mouse>{({x, y}) => <Dot x={x} y={y}/>}</Mouse>  // behaviour shared, UI caller's
```

Slots are the template-syntax sibling (named outlets filled by parents). Both solve "same logic, different UI" without wrapper components or prop drilling — and both read naturally once the inversion clicks.

The classic mistakes:

- Inline closures recreating children. A new function identity every render can force child remounts or defeat memoisation. Hoist stable render functions or memoise where hot.
- Render props for everything. Simple conditional UI doesn't need inversion — plain props and children compose fine. Reserve the pattern for genuinely shared behaviour.
- Unclear contracts. What arguments does the function receive? What slots exist, named how? Undocumented outlets get misused. Document the interface like an API.
- Deep nesting of providers. Render-prop pyramids (`<A>{a => <B>{b => …`}) read worse than hooks for sequential logic. Hooks compose logic; render props compose UI.
- Slot fallback gaps. Named slots with no default content render holes when parents omit them. Design fallbacks per slot.
- Breaking encapsulation. Exposing raw internals (whole state objects) through render props couples callers to implementation. Pass narrow, versioned arguments.
- Testing the wrapper, not the UI. Behavioural tests should exercise rendered outcomes through the prop function, not the wrapper's internals.

**When to use it:** shared behaviour with variable presentation — data providers, mouse/keyboard trackers, headless primitives. For pure logic reuse, hooks are usually simpler; render props shine where the *output shape* varies.
