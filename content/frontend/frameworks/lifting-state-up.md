---
title: "Lifting State Up"
summary: "Moving state to a common parent so siblings can share it."
levels: { frontend: junior }
aliases: ["lift state up", "sharing state between components", "state hoisting"]
prereqs: ["component-state", "props"]
related: ["prop-drilling", "context-api", "local-vs-global-state", "single-source-of-truth", "derived-state"]
core: [frontend]
---

When two components need the same piece of state, **move it to their closest common parent**, and pass it
down as props. This is called lifting state up.

Say a temperature input and a chart both need the current value, but each has its own copy. They can disagree.
Instead, keep one copy in the parent:

```tsx
function Dashboard() {
  const [celsius, setCelsius] = useState(20);          // the single owner

  return (
    <>
      <TemperatureInput value={celsius} onChange={setCelsius} />
      <TemperatureChart value={celsius} />
    </>
  );
}

function TemperatureInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} />;
}
```

Data flows **down** (props), and changes flow **up** (callback props like `onChange`). Both children are
always in sync, because there's only one source of truth ([single source of truth](/t/single-source-of-truth)).

## How to decide where state lives

1. Identify every component that uses the state.
2. Find their **closest common parent**.
3. Put the state there.

If only one component uses it, keep it **local**. Don't lift it earlier than you need to.

## When it gets painful

If the state has to pass through many layers that don't use it, you get
[prop drilling](/t/prop-drilling). Options include restructuring with composition (passing components as
children), using [context](/t/context-api), or moving to a store ([global store](/t/global-store)). Don't
reach for those at the first sign of a second consumer; lifting one level is usually enough.

Also avoid copying lifted state into a child's own state. Then it stops following the parent, which is the
bug lifting was meant to remove (see [derived state](/t/derived-state)).
