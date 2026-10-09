---
title: "Browser DevTools"
summary: "The browser's built-in tools for inspecting DOM, network, console and performance."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["DevTools", "developer tools", "Chrome DevTools", "browser developer tools", "inspector"]
prereqs: ["dom-manipulation"]
related: ["network-tab", "debugger", "breakpoint", "flame-graph", "profiler"]
core: [frontend]
---

Every major browser has built-in developer tools for looking inside a page while it runs.
Open them with **F12**, **Ctrl/Cmd + Shift + I**, or right-click → **Inspect**.

## The panels you'll use most

| Panel | What it does |
|---|---|
| **Elements** | Shows the live DOM and CSS. Click an element to see which rules apply, and edit them live to try changes |
| **Console** | Prints logs and errors; lets you run JavaScript on the page |
| **Sources** (Debugger) | View code, set [breakpoints](/t/breakpoint), step through execution |
| **Network** | Lists every request with timing, headers and response (see [network tab](/t/network-tab)) |
| **Application** (Storage) | Inspect cookies, localStorage and other stored data |
| **Performance** | Records where time goes while the page runs |

Names differ slightly between browsers, but the ideas are the same.

## Everyday uses

- **Why does this look wrong?** Inspect the element, then check which CSS rule wins, what
  the box size is and whether a rule is crossed out.
- **Why didn't my code run?** Check the Console for red errors first. They usually include a
  line number.
- **Did the request even happen?** The Network panel shows it, with its status and response.
- **Layout on phones.** Device mode simulates a small screen.

```js
console.log(user);        // inspect a value
console.table(items);     // arrays of objects as a table
debugger;                 // pauses here when DevTools is open
```

## Caution

Changes made in the Elements panel last until you reload; they don't change your source
files. Copy what worked back into your code. Never paste code from strangers into the Console,
since it runs with access to your logged-in session.
