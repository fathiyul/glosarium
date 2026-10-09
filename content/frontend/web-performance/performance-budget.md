---
title: "Performance Budget"
summary: "Agreed limits on size and timing that builds must meet."
levels: { frontend: senior }
aliases: ["performance budgets", "web performance budget", "bundle size budget", "page weight budget", "performance guardrails"]
prereqs: ["web-performance", "core-web-vitals"]
related: ["bundle-size", "core-web-vitals", "lighthouse", "real-user-monitoring", "continuous-integration", "synthetic-monitoring"]
core: [frontend]
---

A **performance budget** is an **agreed limit** on things that affect speed: JavaScript size, total page weight, image sizes, number of requests, or timing metrics such as LCP. Builds and changes must **stay within it**, or they get flagged or fail. It turns "let's keep the site fast" into something measurable and enforceable.

```
Budget for the product page:
  JavaScript (compressed):   ≤ 170 KB
  Total page weight:         ≤ 1.5 MB
  LCP (75th percentile):     ≤ 2.5 s
  INP:                       ≤ 200 ms
  Third-party scripts:       ≤ 3
```

(The numbers above are illustrative. Set yours from your audience and measurements.)

## Why it's needed

Performance rarely degrades from one big mistake. It erodes through hundreds of small ones: a new library here, an unoptimized image there, another tracking script. Without a limit, nobody feels responsible for any single addition, and the site gets steadily slower ([bundle size](/t/bundle-size)).

A budget makes the cost of each addition visible, and forces a conversation: *"This library adds 80 KB. Is it worth it, or can we drop something else, or load it lazily?"*

## Kinds of budgets

- **Quantity-based**: bytes of JavaScript, CSS, images, fonts. Number of requests. Easy to measure at build time.
- **Timing-based**: [Core Web Vitals](/t/core-web-vitals) and other metrics such as time to interactive. Closer to what users feel, but they vary with environment.
- **Rule-based**: Lighthouse scores or specific audits passing.

## How to set one

1. **Measure where you are**, with lab and real-user data ([real user monitoring](/t/real-user-monitoring), [Lighthouse](/t/lighthouse)).
2. **Decide the targets** from your users' devices and networks, your competitors, and your business goals. Budgets should reflect your slowest important audience, not your developers' laptops.
3. **Start achievable.** A budget you already exceed by 3× will just be ignored. Tighten over time.
4. **Set it per page type or route** where needs differ.

## Enforcing it

- **In CI**: fail or warn pull requests that exceed the budget ([continuous integration](/t/continuous-integration)). Bundle analyzers, size-limit tools and Lighthouse CI can check these.
- **Show the change in the PR**: "main bundle +14 KB".
- **Monitor production** continuously, and alert on regressions ([synthetic monitoring](/t/synthetic-monitoring)).
- **Make exceptions deliberate**: allow a budget increase only with a recorded reason.

## Habits

- **Assign ownership.** Someone must care when it's exceeded.
- **Review budgets regularly**, since devices, networks and the product change.
- **Pair it with fixes**: code splitting, lazy loading, image optimization and removing unused code ([code splitting](/t/code-splitting), [image optimization](/t/image-optimization)).
- **Don't let the budget become the goal.** It's a proxy for user experience.
