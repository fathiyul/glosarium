---
title: "Component Composition"
summary: "Building UIs from children and slots instead of configuration flags."
levels: { frontend: mid-level }
aliases: ["component composition", "composition over inheritance", "composing components"]
prereqs: ["hooks", "design-system"]
related: ["render-props", "higher-order-component", "headless-ui"]
---

**Component composition** builds interfaces by combining small components — children, slots, render props — instead of extending base classes. A `Card` doesn't subclass `BorderedBox`; it renders `<Border><Title/><Body/></Border>`. Behaviour composes through containment and props, keeping each piece small and reusable.

```jsx
<Card><Card.Title>Hi</Card.Title><Card.Body>…</Card.Body></Card>
```

Composition beats inheritance for UI because interfaces vary along many axes at once (layout × theme × behaviour) — inheritance hierarchies explode combinatorially, while composed pieces mix freely. Specialisation happens through props and children, not subclasses.

The classic mistakes:

- Inheritance hierarchies. `PrimaryButton extends Button extends Base` couples every variant to the chain; one change ripples unpredictably. Compose: `<Button variant="primary">`.
- Prop drilling. Threading props through five layers of intermediaries bloats every middle component. Compose at the usage site (children/slots) or use context for genuinely ambient data.
- God components. A 600-line component doing layout, data, and behaviour isn't "composed" because it's in one file. Split by responsibility; compose the pieces.
- Premature abstraction. Extracting shared components before three uses exist produces wrong boundaries. Duplicate twice, abstract on the third.
- Leaky compound components. Compound patterns (`Card.Title`) need shared implicit state — implement via context, and document which children are valid where.
- Over-splitting. Atoms for every div creates navigation hell with no reuse benefit. Split at reuse or responsibility boundaries, not syntactically.
- Ignoring the design system. Ad-hoc composition without shared primitives fragments the UI. Compose *from* the system (see [design system](/t/design-system)).

**The habit:** small components, combined at use, specialised by props and children. Composition is the mechanism; the design system supplies the vocabulary.
