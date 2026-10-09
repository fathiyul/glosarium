---
title: "Interaction to Next Paint (INP)"
summary: "How quickly the page responds to user input."
levels: { frontend: mid-level }
aliases: ["Interaction to Next Paint", "INP metric", "responsiveness metric", "input latency"]
prereqs: ["core-web-vitals", "event-loop"]
related: ["core-web-vitals", "long-tasks", "main-thread", "unnecessary-rerenders", "debounce", "lcp"]
core: [frontend]
---

**Interaction to Next Paint (INP)** measures how **responsive** a page feels: after the user clicks, taps or presses a key, how long does it take until the screen visibly updates? It replaced First Input Delay as a [Core Web Vital](/t/core-web-vitals) in 2024. **Good is 200 ms or less**
(poor is over 500 ms).

Unlike the old metric, INP looks at **all interactions during the whole visit**, and reports roughly the worst one (ignoring extreme outliers on pages with many interactions). One janky menu can set your score.

## What an interaction's time is made of

```
click ──► input delay ──► event handler processing ──► rendering and painting ──► next frame shown
          (main thread      (your JavaScript)            (layout, style, paint)
           was busy)
```

1. **Input delay**: the browser couldn't start handling the event, because the [main thread](/t/main-thread) was busy with something else ([long tasks](/t/long-tasks)).
2. **Processing time**: how long your handlers ran.
3. **Presentation delay**: time to compute the new layout and paint.

All of it happens on the main thread, which also runs your JavaScript and layout. Anything that hogs it hurts INP ([event loop](/t/event-loop)).

## Typical causes

- **Long tasks** (over about 50 ms) from heavy JavaScript, large bundles executing, expensive third-party scripts.
- **Heavy event handlers** doing a lot of synchronous work on click.
- **Big re-renders** after state changes ([unnecessary re-renders](/t/unnecessary-rerenders)).
- **Large DOM** that makes layout slow.
- **Forced synchronous layout** in loops (reading then writing layout properties).

## Improving it

- **Do less in handlers.** Update the UI first, and defer non-urgent work.
- **Break long tasks into chunks** and yield back to the browser between them (for example with `setTimeout`, `requestIdleCallback` or the scheduler APIs where available), so input can be handled.
- **Move heavy computation off the main thread** into a Web Worker ([web workers](/t/web-worker)).
- **Debounce or throttle** frequent events ([debounce](/t/debounce)).
- **Reduce JavaScript**: [code splitting](/t/code-splitting), removing unused libraries, delaying third-party scripts.
- **Keep the DOM small** and virtualize long lists ([list virtualization](/t/list-virtualization)).
- **Show immediate feedback** (a pressed state, a spinner) even if the work takes time.

## Measuring

Use the Performance panel to find slow interactions, and the `web-vitals` library or real-user monitoring for field data, since INP depends heavily on real devices ([real user monitoring](/t/real-user-monitoring)). Test on a slower device. Your fast laptop hides the problem.
