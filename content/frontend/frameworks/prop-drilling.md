---
title: "Prop Drilling"
summary: "Passing props through many layers that don't use them."
levels: { frontend: junior }
prereqs: ["props"]
related: ["props", "context-api", "lifting-state-up", "local-vs-global-state", "component-composition"]
---

Prop drilling is passing data down a component tree one layer at a time. The components in the middle don't use the data. They only forward it to a child that does.

```jsx
function App() {
  const user = { name: "Ada" };
  return <Page user={user} />;
}

function Page({ user }) {
  return <Sidebar user={user} />; // Page never reads user, it only passes it on
}

function Sidebar({ user }) {
  return <Greeting user={user} />; // Sidebar doesn't use it either
}

function Greeting({ user }) {
  return <h1>Hello, {user.name}</h1>;
}
```

Passing a prop through one or two levels is normal and easy to follow. It becomes a problem when the chain is long, or when you change a prop's shape and have to edit every component along the path, including ones that never touch it.

## Common fixes

- **Move the state closer to where it's used.** If only a few neighbouring components need it, [lift state up](/t/lifting-state-up) only as far as they share a parent.
- **Use [context](/t/context-api)** to provide a value to a whole subtree, so the middle components don't have to forward it.
- **Pass the finished component instead of the data.** Build `<Sidebar>` with the `Greeting` already inside it, using [component composition](/t/component-composition).

Don't add a state library just because a prop chain is long. Explicit props are easy to trace. A deep chain is a hint to rethink where data lives, and [local vs global state](/t/local-vs-global-state) covers how to decide.
