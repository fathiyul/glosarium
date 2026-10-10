---
title: "Giving a Demo"
summary: "Showing your work clearly to an audience."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["demo presentation", "showing your work"]
prereqs: ["sprint-review"]
related: ["sprint-review", "writing-clearly", "receiving-feedback"]
---

A demo shows people what you built, so they can see it work. The audience usually includes teammates, product people or stakeholders who weren't close to the code. Your job is to make the change easy to understand in a few minutes.

Lead with the problem, then show the solution working on a real example. Something like this works well:

```
Before: a customer with two addresses could only pick one at checkout.
Now:    the checkout shows all saved addresses, and I'll pick the second one.
[show it]
Still missing: the address picker isn't keyboard-accessible yet.
```

Prepare the path in advance. Use realistic data, and log in and load the page before you start. Have a backup for the parts most likely to fail, such as a screenshot or a short recording.

The classic mistake is starting with the code, or with a long list of what changed. People don't need to know which files you edited. They need to see the behaviour, and to know what's still unfinished. Name the gaps yourself before someone asks. [Writing clearly](/t/writing-clearly) covers the same principle for written updates.
