---
title: "Props"
summary: "Inputs passed from a parent component to a child."
levels: { frontend: junior }
aliases: ["properties", "component props", "React props", "component inputs"]
prereqs: ["component"]
related: ["component-state", "lifting-state-up", "prop-drilling", "component-composition", "jsx"]
core: [frontend]
---

**Props** (properties) are the inputs a parent passes to a child component. They work like function
arguments, and they let one component produce different output.

```tsx
type AvatarProps = { name: string; size?: number; onClick?: () => void };

function Avatar({ name, size = 40, onClick }: AvatarProps) {
  return (
    <img
      src={`/avatars/${name}.png`}
      alt={name}
      width={size}
      height={size}
      onClick={onClick}
    />
  );
}

<Avatar name="ana" />                       // uses the default size
<Avatar name="bo" size={64} onClick={openProfile} />
```

## The rules

- **Props are read-only.** A component must never change its own props. If something needs to change,
  it belongs in [state](/t/component-state), owned by whoever owns the data.
- **Data flows one way: down.** Parent to child. To send information *up*, the parent passes a callback prop
  (`onClick`, `onChange`) and the child calls it.
- **Any value can be a prop**: strings, numbers, objects, functions and even other components.
- **`children`** is a special prop containing whatever is nested between the tags:

```tsx
function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}
<Card><h2>Title</h2><p>Body</p></Card>
```

This is the basis of [composition](/t/component-composition).

## Tips

- **Type your props** (TypeScript or prop types), so wrong usage is caught early.
- **Give defaults** for optional props.
- **Keep the list short.** Ten props are a sign the component does too much, or should take
  an object or children.
- **Name callbacks `onSomething`** (`onSave`) and the handlers `handleSomething`.
- **Don't copy a prop into state** unless you want a snapshot of its initial value.
- A new object or function created inline on every render is a *new* prop each time, which can cause
  extra [re-renders](/t/re-render) in memoized children.

Passing props through many layers is called [prop drilling](/t/prop-drilling).
