---
title: "Mob Programming"
summary: "A whole team working on one problem together."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["mob programming", "ensemble programming"]
prereqs: ["pull-request"]
related: ["pull-request", "review-turnaround", "onboarding-yourself", "code-review"]
---

Mob programming is a practice where a group of people, often the whole team, works on one problem at the same time at one computer. One person types, the driver, while the others, the navigators, discuss the approach and catch mistakes. Roles rotate regularly, often every few minutes or at a set interval.

The practice helps most with hard problems that need several views, with knowledge sharing across the team, and with onboarding someone new to a codebase. Everyone understands the change when it's finished, so the usual review round trip is shorter.

```
Driver:     types the code the group agrees on
Navigators: question the approach, spot edge cases, suggest tests
Rotation:   driver changes on a timer or when the work reaches a natural break
```

The trade-off is cost. Several people spend time on one task, so the total person-hours are higher than with individual work. Sessions are tiring if they run long, and quieter people can end up as passive observers unless the rotation draws them in.

The classic mistake is making mobbing the default for every task, or letting one senior engineer drive while everyone else watches. Use it for the problems where shared understanding is worth the extra time, and keep the session short enough that people stay engaged. For reviewing changes after the fact, see [code review](/t/code-review).
