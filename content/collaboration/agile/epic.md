---
title: "Epic"
summary: "A large body of work split into smaller stories."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["epics", "initiative"]
prereqs: ["backlog"]
related: ["backlog", "backlog-refinement", "sprint", "user-story"]
---

An epic is a large piece of work that is too big to finish in one sprint. It's broken into smaller items, usually called stories or tasks, that can each be completed and delivered. Epics often describe a goal from the user's point of view, such as "customers can pay with a saved card".

```
Epic: Customers can pay with a saved card
  - Story: Store a card securely after checkout
  - Story: Show saved cards on the payment page
  - Story: Let a customer remove a saved card
  - Story: Send a receipt that shows the card's last four digits
```

Tracking the epic shows how far along a goal is, even when its stories are spread across several sprints.

The classic mistake is an epic with no clear finish line. "Improve the checkout" can never be done, so it never shows progress. Write the epic's goal and what counts as finished before splitting it up. Break it down during [backlog refinement](/t/backlog-refinement), not all at once.
