---
title: "Transforms"
summary: "Moving, scaling and rotating elements without affecting layout."
levels: { frontend: junior }
aliases: ["CSS transform", "translate", "scale", "rotate"]
prereqs: ["css", "box-model"]
related: ["css-transitions", "css-animations", "positioning", "css-animations"]
---

The `transform` property moves, scales, rotates or skews an element visually, without changing the layout around it. Other elements behave as if it hadn't moved.

```css
.card:hover { transform: translateY(-4px) scale(1.03); }
.icon       { transform: rotate(45deg); }
.modal      { transform: translate(-50%, -50%); }   /* centering trick with top/left: 50% */
```

## Functions

| Function | Effect |
|---|---|
| `translate(x, y)`, `translateX`, `translateY` | move |
| `scale(n)` | resize (1 is the original) |
| `rotate(45deg)` | rotate around the origin |
| `skew(10deg)` | slant |
| `translate3d`, `rotateX`, `perspective` | 3D effects |

You can combine several, and **order matters**: they apply right to left in terms of the element's coordinate system. `translate(100px) rotate(45deg)` and `rotate(45deg) translate(100px)` end up in different places.

## Transform origin

Rotation and scaling happen around a point, the center by default. Change it with `transform-origin: top left;`.

## Why use transforms

- **They don't trigger layout.** The browser can move the element on the GPU, so animation is smooth.
- **Animating `left` or `top`** forces layout recalculation each frame. Use `transform` instead (see [animations](/t/css-animations)).
- Pair with [transitions](/t/css-transitions) and animations for hover effects and motion.

## Things to know

- **Layout space stays the same.** A scaled-up element can overlap its neighbors.
- **A transform creates a new stacking context and containing block.** A fixed-position child of a transformed parent positions against the parent, which surprises people ([positioning](/t/positioning)).
- **Blurry text** can happen with fractional translations.
- **Hover transforms can flicker** if the element moves out from under the pointer.
- Respect users who prefer reduced motion (`prefers-reduced-motion`).
