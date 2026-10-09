---
title: "Component"
summary: "A reusable, self-contained piece of UI."
levels: { frontend: junior }
aliases: ["UI component", "components", "React component", "Vue component", "web component"]
prereqs: ["html-element", "function"]
related: ["props", "component-state", "component-composition", "jsx", "component-library", "web-components"]
core: [frontend]
---

A **component** is a reusable, self-contained piece of user interface: a button, a product card, a whole
page. You build screens by assembling components, like building with blocks.

A component takes **input** (props) and returns **what should be shown**:

```tsx
type ProductCardProps = { name: string; price: number; onAdd: () => void };

function ProductCard({ name, price, onAdd }: ProductCardProps) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>${price.toFixed(2)}</p>
      <button onClick={onAdd}>Add to cart</button>
    </div>
  );
}

// reuse it with different data
<ProductCard name="Kettle" price={29.99} onAdd={addKettle} />
<ProductCard name="Toaster" price={24.5} onAdd={addToaster} />
```

React, Vue, Svelte, Angular and others all use components, with different syntax. The browser also has its own
standard, [web components](/t/web-components).

## Why this model

- **Reuse**: write it once, use it everywhere.
- **Isolation**: you can understand and test a piece without reading the whole app.
- **Consistency**: the same button looks and behaves the same everywhere.
- **Composition**: small components combine into bigger ones ([composition](/t/component-composition)).

## What a component can have

- **[Props](/t/props)**: inputs passed in from the parent. They shouldn't be modified inside.
- **[State](/t/component-state)**: data it owns that changes over time (an open/closed flag, input text).
- **Children**: content passed between its tags.
- **Events**: callbacks like `onAdd` that let it tell the parent something happened.

## Good habits

- **Keep them small and focused.** If a component does several jobs, split it.
- **Name them by what they are** (`ProductCard`), not how they look (`BlueBox`).
- **Keep data flowing downward** (props) and events flowing upward (callbacks).
- Don't copy-paste a component to change one thing; add a prop.
- Collections of shared components form a [component library](/t/component-library).
