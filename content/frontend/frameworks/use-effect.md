---
title: "useEffect and Side Effects"
summary: "Running code after render, and the bugs that come from misusing it."
levels: { frontend: junior }
aliases: ["useEffect", "React effects", "side effects in React", "effect hook"]
prereqs: ["hooks", "component-state"]
related: ["dependency-array", "hooks", "custom-hook", "data-fetching-library", "unnecessary-rerenders", "lifecycle-methods"]
core: [frontend]
---

`useEffect` runs code **after** React has rendered, for things that must happen outside rendering:
fetching data, subscribing to events, setting timers, or syncing with something that isn't React (a
chart library, the document title).

```tsx
useEffect(() => {
  document.title = `${count} new messages`;
}, [count]);
```

## The three parts

```tsx
useEffect(() => {
  const id = setInterval(tick, 1000);      // 1. the effect: runs after render
  return () => clearInterval(id);          // 2. cleanup: runs before the next effect and on unmount
}, [delay]);                               // 3. dependencies: when to run again
```

| Dependency array | The effect runs |
|---|---|
| `[a, b]` | After the first render, and whenever `a` or `b` changed |
| `[]` | Once, after the first render |
| Omitted | After **every** render |

Every reactive value your effect uses (props, state, things derived from them) belongs in the array
([dependency array](/t/dependency-array)). The lint rule `react-hooks/exhaustive-deps` helps.

## Common bugs

**Infinite loop.** Setting state inside an effect with no dependency array (or with a dependency the effect itself changes) re-renders,
which re-runs the effect, and so on.

**Stale values.** Leaving a variable out of the dependencies means the effect keeps using an old
one (see [closures](/t/closure)).

**Missing cleanup.** Listeners, timers and subscriptions pile up if you never remove them.

**Race conditions in fetches.** If `userId` changes quickly, an older request can finish after a newer one
and overwrite it. Ignore stale results in the cleanup:

```tsx
useEffect(() => {
  let ignore = false;
  fetchUser(userId).then((u) => { if (!ignore) setUser(u); });
  return () => { ignore = true; };
}, [userId]);
```

**Running twice in development.** In Strict Mode, React mounts, unmounts and remounts components on
purpose to reveal missing cleanups.

## You might not need an effect

Effects are for synchronizing with the outside world. Don't use them to **compute values from props or
state** (do it during render, see [derived state](/t/derived-state)), or to respond to a **click** (do it
in the event handler). Many effects can be avoided, and a data-fetching library handles loading and
caching better than a hand-written effect ([data fetching libraries](/t/data-fetching-library)).
