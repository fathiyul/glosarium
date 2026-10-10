---
title: "Keyframe Animations"
summary: "Multi-step animations defined with @keyframes."
levels: { frontend: mid-level }
aliases: ["keyframe animations", "css animations", "@keyframes"]
prereqs: ["css", "paint-composite"]
related: ["reduced-motion", "paint-composite", "microinteractions"]
---

CSS **keyframe animations** declare multi-step motion: `@keyframes` defines waypoints, the `animation` shorthand sets duration, easing, iteration and fill — and the browser runs it on the compositor when the properties allow, no JavaScript required.

```css
@keyframes rise { from { opacity: 0; transform: translateY(8px); }
                  to   { opacity: 1; transform: none; } }
.toast { animation: rise .25s ease-out both; }
```

They're ideal for entrance, attention and state-change motion: cheap, interruptible, and off the main thread when animating transform/opacity. JavaScript takes over only where choreography, physics or scrubbing is needed.

The classic mistakes:

- Animating layout properties. `width`/`top`/`margin` keyframes re-run layout per frame. Animate `transform` and `opacity`; reserve the rest for instant state changes.
- Infinite everything. Perpetual motion distracts, drains battery and triggers vestibular issues. Loop only with purpose — and honour `prefers-reduced-motion`.
- No reduced-motion handling. Some users experience motion as nausea or worse. Wrap non-essential animation in a reduced-motion media query that disables or simplifies.
- Fill-mode amnesia. Without `both`/`forwards`, elements snap back post-animation; with it, lingering fill overrides later styles unexpectedly. Set fill deliberately.
- Duration indifference. 50ms feels broken, 2s feels sluggish — entrances around 150–300ms, exits faster. Time deliberately, ease asymmetrically (out slower than in feels natural).
- Animating `display`. Keyframes can't transition to/from `display: none` (until discrete-property transitions land broadly) — orchestrate visibility with opacity/visibility steps instead.
- Stacking with transitions. Animations and transitions fighting over the same property produce unpredictable results. One mechanism per property per element.

**How to use them:** transform/opacity keyframes for UI motion, timed deliberately, gated on reduced-motion preference. Declarative motion done well feels instant and alive; done carelessly it janks and sickens.
