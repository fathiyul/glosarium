---
title: "Error Boundary"
summary: "A UI component that catches rendering errors in its children."
levels: { frontend: mid-level , data-scientist: junior }
aliases: ["ErrorBoundary", "React error boundary"]
prereqs: ["component"]
related: ["defensive-programming", "checked-vs-unchecked-exception", "loading-error-states"]
---

An error boundary is a UI component that catches errors thrown while its child components render, and shows a fallback instead of letting the whole page crash. In React, a class component becomes an error boundary by defining `getDerivedStateFromError` and/or `componentDidCatch`:

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logError(error, info);   // send the details somewhere useful
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong. Please refresh the page.</p>;
    }
    return this.props.children;
  }
}

<ErrorBoundary>
  <ProductList />
</ErrorBoundary>
```

Where you place the boundary is the main decision. A boundary around a single widget keeps the rest of the page working. One around the whole app shows one fallback for everything.

The trade-offs are about what gets caught. React error boundaries catch errors during rendering, in lifecycle methods and in constructors of their children. They don't catch errors in event handlers, asynchronous code such as a fetch callback, or errors thrown by the boundary itself. Those need their own handling, such as try/catch around the async call. Error boundaries also currently require class components in React, so they're often written once and reused.

The classic mistake is assuming a boundary catches everything. A click handler that throws will not trigger it. Handle those errors where they happen, and use boundaries as a safety net for rendering. See [loading and error states](/t/loading-error-states) for the user-facing side.
