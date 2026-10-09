---
title: "Component State"
summary: "Data a component owns that changes over time."
levels: { frontend: junior }
aliases: ["state", "React state", "useState", "local state"]
prereqs: ["component", "props"]
related: ["props", "lifting-state-up", "derived-state", "hooks", "re-render", "reactivity"]
core: [frontend]
---

**State** is data that a component owns and that changes over time, such as the text in an input, whether a menu is
open, or the items in a cart. When state changes, the framework re-renders the component so the screen
matches.

```tsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);        // [current value, setter]

  return <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>;
}
```

## State vs props

| | Props | State |
|---|---|---|
| Comes from | The parent | The component itself |
| Can the component change it? | No (read-only) | Yes, through the setter |
| Changing it | The parent passes new values | Calling `setCount(...)` |

## Rules that trip people up

**1. Never modify state directly; call the setter with a new value.** The framework only notices
changes made through the setter.

```tsx
items.push(newItem);               // wrong: mutates the old array, so no re-render
setItems([...items, newItem]);     // right: a new array
```

**2. Updates are batched and apply on the next render**, so the variable doesn't change immediately:

```tsx
setCount(count + 1);
console.log(count);                // still the old value

setCount(count + 1);
setCount(count + 1);               // together they add only 1
setCount((c) => c + 1);
setCount((c) => c + 1);            // the updater form adds 2
```

Use the updater form (`c => c + 1`) when the new value depends on the previous one.

**3. Don't store what you can calculate.** A total computed from items shouldn't be its own state
([derived state](/t/derived-state)).

**4. Keep state as local as possible**, and move it up only when others need it
([lifting state up](/t/lifting-state-up)).

State is also lost when the component is removed from the screen, and kept between renders while it
stays. Data that many parts of the app need may be better held elsewhere (see
[local vs global state](/t/local-vs-global-state)).
