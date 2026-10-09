---
title: "Transitions"
summary: "Smoothly animating between property values."
levels: { frontend: junior }
aliases: ["CSS transition", "transition-duration", "easing"]
prereqs: ["css", "pseudo-class"]
related: ["css-transforms", "css-animations", "css-animations", "pseudo-class"]
---

A transition smoothly animates a property from one value to another when it changes, instead of snapping instantly. You declare which properties, how long and with what easing.

```css
.button {
  background: royalblue;
  transform: translateY(0);
  transition: background 200ms ease, transform 200ms ease;
}
.button:hover {
  background: navy;
  transform: translateY(-2px);
}
```

The change can come from a [pseudo-class](/t/pseudo-class) like `:hover`, from adding or removing a class with JavaScript, or from any style change.

## The parts

| Property | Meaning |
|---|---|
| `transition-property` | what to animate (`background`, `transform`, or `all`) |
| `transition-duration` | how long (`200ms`) |
| `transition-timing-function` | the easing: `ease`, `linear`, `ease-in-out`, `cubic-bezier(...)` |
| `transition-delay` | wait before starting |

Shorthand: `transition: property duration easing delay;`.

## Good habits

- **Keep them short**: about 100-300 ms for UI feedback. Longer feels sluggish.
- **List properties explicitly** instead of `transition: all`, which animates things you didn't intend and costs performance.
- **Prefer cheap properties**: `transform` and `opacity` animate smoothly. Animating `width`, `height`, `top` or `margin` triggers layout ([transforms](/t/css-transforms), [rendering performance](/t/css-animations)).
- **Put the transition on the base state**, so it works both when entering and leaving the new state.
- **Respect reduced motion**:

```css
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; }
}
```

## Limits

- Only properties with in-between values animate: colors, lengths, numbers. `display: none` to `block` doesn't, nor does `auto` height.
- Transitions run between two states. For multi-step or looping motion, use [CSS animations](/t/css-animations) with `@keyframes`.
