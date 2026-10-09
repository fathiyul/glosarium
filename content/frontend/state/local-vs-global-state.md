---
title: "Local vs Global State"
summary: "Keeping state close to where it's used unless it's truly shared."
levels: { frontend: junior }
prereqs: ["component-state"]
related: ["global-store", "context-api", "lifting-state-up", "prop-drilling", "state-management"]
---

State is **local** when only one component, or a small group of neighbouring ones, needs it. It's **global** when many unrelated parts of the app need to read or change it, such as the logged-in user or a shopping cart.

Keep state local by default. A text field's current value, or whether a dropdown is open, matters only to the component that shows it:

```jsx
function Dropdown() {
  const [open, setOpen] = useState(false); // only this component needs it
  // ...
}
```

Putting that in a global store instead means every change goes through shared code, and anything reading the store has to know this value exists.

Move state up only when two or more distant parts of the UI need the same value. Start by [lifting it](/t/lifting-state-up) to the closest common parent. Reach for [context](/t/context-api) or a [global store](/t/global-store) when passing it down becomes awkward. See also [prop drilling](/t/prop-drilling), which is the usual sign that state has been placed too high or passed too far.

The classic mistake is making everything global "to be safe". This spreads dependencies across the codebase and makes components harder to reuse and test. For a wider view of the options, see [state management](/t/state-management).
