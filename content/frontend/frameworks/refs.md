---
title: "Refs"
summary: "Direct references to DOM nodes or values that persist across renders."
levels: { frontend: junior }
aliases: ["useRef", "React ref"]
prereqs: ["component-state"]
related: ["dom", "component-state", "hooks", "re-render"]
---

A ref is a container that holds a value across renders. Changing it does not re-render the component. In React you create one with `useRef`, and the value lives in its `current` property. The idea is general, but the examples below use React.

The most common use is getting hold of a DOM element so you can call methods on it:

```jsx
function SearchBox() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus(); // direct access to the <input> element
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}
```

A ref can also hold a value you need between renders but don't want on screen, such as a timer ID:

```jsx
const timerRef = useRef(null);

function startSaveTimer() {
  clearTimeout(timerRef.current);
  timerRef.current = setTimeout(save, 1000);
}
```

The classic mistake is storing something the UI displays in a ref. Writing to `ref.current` doesn't re-render, so the screen won't update. Use [state](/t/component-state) for values that drive what's shown, and use a ref for values that only work behind the scenes, such as the [DOM](/t/dom) node or a timer.
