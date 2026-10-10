---
title: "Headless Components"
summary: "Components that provide behavior and accessibility without styles."
levels: { frontend: mid-level }
aliases: ["headless components", "headless ui", "unstyled components"]
prereqs: ["component-composition", "accessibility"]
related: ["component-composition", "design-system", "accessibility"]
---

**Headless components** provide behaviour — state, keyboard handling, ARIA attributes, focus management — with no styling, exposing render props or slots for your markup. A headless Listbox handles arrow keys, selection and announcements; you supply the classes. Logic once, any design system on top.

```jsx
<Listbox>{({open, value}) => <button className={myBtn}>…</button>}</Listbox>
```

They split the hard part (accessible interaction logic, genuinely difficult) from the variable part (visual design, which differs per product). Design systems increasingly ship headless cores with themed skins.

The classic mistakes:

- Restyling breaking behaviour. Custom markup that drops required ARIA roles or keyboard handlers keeps the look while breaking accessibility. Headless gives the logic; you must wire all of it.
- Headless for trivial cases. A styled button doesn't need a headless primitive — abstraction overhead exceeds benefit. Reserve headless for complex interactions (combobox, dialog, menu, tabs).
- Ignoring the documented contract. Render-prop APIs have required props and structure; partial adoption (skipping `aria-activedescendant`, say) silently degrades. Follow the contract fully.
- Two sources of state. Mixing headless internal state with external copies desynchronises. Control or uncontrol explicitly, not both.
- Styling API gaps. Render props exposing no class hooks or part selectors force wrapper divs and specificity hacks. Evaluate the styling seams before adopting.
- Versioned behaviour drift. Headless updates change interaction details; visual regression tests miss behavioural changes. Test interaction, not just pixels.
- Assuming unstyled means unopinionated. DOM structure choices (wrappers, portals) constrain styling more than "headless" suggests. Read the rendered output before committing.

**When to use them:** complex interactive primitives where accessibility correctness matters and visual design varies — the behaviour expert's code under your skin. For simple elements, styled components are cheaper.
