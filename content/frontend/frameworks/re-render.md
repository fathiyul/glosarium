---
title: "Re-rendering"
summary: "A component running again because its state or props changed."
levels: { frontend: junior }
prereqs: ["component-state"]
related: ["reconciliation", "unnecessary-rerenders", "ui-memoization", "virtual-dom", "component-state"]
---

A re-render is when a component's function runs again to work out what the UI should look like now. In React, a component re-renders when its own [state](/t/component-state) changes, when its props change, or when its parent re-renders.

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  console.log("Counter ran"); // runs on the first render and on every click
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

Each click updates the state, so `Counter` runs again and logs again. That's expected. A re-render only means the function ran. The framework then compares the new output with the previous one (see [reconciliation](/t/reconciliation)) and changes only the parts of the DOM that differ.

The classic mistake is assuming every re-render is a performance bug and wrapping everything in memoization. Measure first. Slow screens usually come from expensive work done during render or from very large lists, not from a component running a few extra times. Also, a re-render isn't always a visible change: the component can run and the screen can stay the same.

When a component re-renders more often than you expect, look for the cause. Common ones are a parent that updates state on every render, or an object or function created inline and passed to a child that is wrapped in memoization. See [unnecessary re-renders](/t/unnecessary-rerenders) and [UI memoization](/t/ui-memoization).
