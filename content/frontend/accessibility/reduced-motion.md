---
title: "Reduced Motion"
summary: "Respecting users who ask for less animation."
levels: { frontend: mid-level }
aliases: ["reduced motion", "prefers-reduced-motion", "motion sensitivity"]
prereqs: ["accessibility", "css-animations"]
related: ["css-animations", "microinteractions", "accessibility-testing"]
---

**Reduced motion** honours the OS-level `prefers-reduced-motion` preference: users experiencing vestibular disorders, migraines or seizures ask sites to minimise animation — parallax, autoplay, looping effects, smooth-scroll glides. The baseline rule: non-essential motion off (or instant) when the preference is set.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important; }
}
```

Essential motion (loading indicators conveying progress, sprawling state changes needing continuity) gets simplified rather than removed; everything decorative goes still. JS-driven animation must check the same preference (`matchMedia`), not just CSS.

The classic mistakes:

- Ignoring the preference entirely. Autoplaying carousels and parallax for users who asked for stillness isn't decoration — it's harm. Honour it everywhere motion exists.
- CSS-only handling. JS animations, canvas loops and library-driven motion bypass media queries. Gate all motion paths on the same check.
- Removing feedback, not motion. Killing transitions that signal state (toggles, accordions) disorients. Replace motion with instant state change, not with nothing.
- All-or-nothing thinking. Some motion aids comprehension (spatial transitions showing where content went). Simplify and shorten rather than binary on/off where continuity matters.
- Testing never. Developers without the preference set never see the reduced experience. Enable it in the test matrix; verify still-usable, still-beautiful.
- Smooth scroll traps. `scroll-behavior: smooth` gliding past content sickens; disable smooth scrolling under the preference.
- Assuming rareness. A meaningful share of users sets reduced motion (and many more benefit). It's a standard rendering mode, not an edge case.

**The practice:** gate every motion path (CSS and JS) on the preference, keep essential feedback instant, test in reduced mode. Stillness as a first-class experience.
