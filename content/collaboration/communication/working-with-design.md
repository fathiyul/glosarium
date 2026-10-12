---
title: "Working with Designers"
summary: "Collaborating on how it should look and behave."
levels: { backend: mid-level, frontend: junior, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["designer handoff", "design collaboration"]
prereqs: ["ux-basics"]
related: ["ux-basics", "pixel-perfect", "empty-state", "user-story"]
---

Designers decide how a feature should look and behave. Developers decide how it's built and what it costs. Good collaboration means sharing each side's constraints early, rather than handing over finished screens and waiting for complaints.

Ask for the states, not just the main screen. A designed page often shows the happy path only, so check what happens while loading, when there's no data, and when something fails. Raise questions early, such as "what does this look like on a small phone?"

```
Design shows: a product list
Ask:          empty state? loading state? what if the name is 80 characters?
Note:         the API returns results in pages, so the list needs a way to load more
```

The classic mistake is building a screen exactly as shown and then discovering the design doesn't cover real data. The other is quietly changing the design during implementation. Agree on changes with the designer, so the product stays consistent. For details of matching a design, see [pixel perfect vs good enough](/t/pixel-perfect).
