---
title: "Skeleton Screen"
summary: "Placeholder shapes shown while content loads."
levels: { frontend: junior }
aliases: ["skeleton loader", "skeleton UI"]
prereqs: ["web-performance"]
related: ["web-performance", "bundle-size", "optimistic-update", "loading-error-states"]
---

A skeleton screen shows grey placeholder shapes where the content will appear, such as blocks for a title, a few lines of text and an avatar. It tells the user the page is loading and roughly what layout to expect.

```jsx
function ProductCardSkeleton() {
  return (
    <div className="card" aria-hidden="true">
      <div className="skeleton skeleton-image" />
      <div className="skeleton skeleton-line" />
      <div className="skeleton skeleton-line short" />
    </div>
  );
}
```

The shapes should match the real layout, so the content doesn't jump when it arrives. A jump like that counts against [layout stability](/t/web-performance) and feels slower. Skeletons work better than a plain spinner for lists and cards, where the user can see the shape of what's coming.

The classic mistake is showing a skeleton that never goes away, for example when a request fails. Handle the error state too, as described in [loading and error states](/t/loading-error-states). Keep the animation subtle, and hide decorative placeholders from screen readers with `aria-hidden`.
