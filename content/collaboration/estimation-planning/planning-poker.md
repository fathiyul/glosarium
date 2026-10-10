---
title: "Planning Poker"
summary: "Estimating as a team by revealing guesses at the same time."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["poker estimation"]
prereqs: ["story-points"]
related: ["story-points", "estimation", "backlog-refinement"]
---

Planning poker is a way for a team to estimate a backlog item together. Each person chooses a card with their estimate, usually a number from a scale such as 1, 2, 3, 5, 8, and so on, and everyone reveals their card at the same time. Revealing at once stops people from copying the first answer they hear.

```
Story: "Let customers remove a saved card"

Ada:    3
Grace:  5
Linus:  8
```

When the numbers are far apart, the people with the highest and lowest estimates explain their reasoning. The team discusses what it's missing, then votes again. The goal is shared understanding, and the final number is the one the team agrees on, not an average.

Planning poker is usually done during [backlog refinement](/t/backlog-refinement), on items that are already reasonably clear. It produces [story points](/t/story-points), which measure relative size and not hours.

The classic mistake is treating the agreed number as a promise, or letting the most senior person's card settle the discussion. The number is a rough guess that gets better through talking. If a story keeps getting a large estimate, it's usually too big, so split it.
