---
title: "Working with QA"
summary: "Collaborating with testers to ship quality."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["QA", "quality assurance", "testers"]
related: ["edge-cases", "requirements", "writing-clearly", "acceptance-criteria"]
---

QA (quality assurance) people test software to find problems before users do. Working well with them means giving them what they need to test effectively, and taking their findings seriously.

Tell them what you changed and what the expected behaviour is. Acceptance criteria help a lot here, because they describe what "working" means. Share test data or a test environment where you can.

A good bug report has the steps to reproduce, the expected result, the actual result, and the environment:

```
Steps:    1. Add an item to the cart. 2. Open checkout in a new tab.
Expected: The cart shows one item.
Actual:   The cart is empty.
Env:      Chrome, staging, logged in as a test user.
```

The classic mistake is treating QA as the last step after development is finished. Bring them in while the feature is being built, so they can ask questions and catch unclear requirements early. Also, a bug report that says "checkout is broken" wastes time on both sides. Include the steps every time.
