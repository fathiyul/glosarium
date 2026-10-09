---
title: "Empty State"
summary: "What to show when there's no data yet."
levels: { frontend: junior }
prereqs: ["loading-error-states"]
related: ["loading-error-states", "skeleton-screen", "ux-basics", "error-message-ux"]
---

An empty state is what the user sees when a screen has no data to show. A new account with no orders, a search that matched nothing, or an inbox at zero are all empty states. Each one is a chance to explain what the place is for and suggest a next step.

A useful empty state says what's missing and offers a way forward:

```
Bad:    (a blank table)

Better: "No orders yet."
        [Browse products]
```

Distinguish the cases that look alike. A first-time user has no data yet. A search with strict filters has no results, and the fix is to loosen the filters. A failed request is an error, and the fix is to retry. Each needs different text.

The classic mistake is showing the same blank screen while data is loading, after an error, and when there's genuinely nothing. Users then assume the data is gone or that nothing went wrong. Show a [loading state](/t/loading-error-states) or a [skeleton screen](/t/skeleton-screen) first, then either the data, an empty state or an error message, depending on what actually happened.
