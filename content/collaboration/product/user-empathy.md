---
title: "User Empathy"
summary: "Remembering a real person uses what you build."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["user focus", "customer empathy"]
prereqs: ["requirements"]
related: ["user-story", "requirements", "edge-cases", "pixel-perfect"]
---

User empathy means keeping a real person in mind while you build. The people who use your software have different devices, time pressure, language, and levels of experience. Code and screens that make sense to the person who wrote them can still confuse everyone else.

A simple habit is to watch someone use the feature without helping them. Notice where they hesitate, where they reread something, and what they try first. Their first guess often shows what the interface suggests, which can be different from what you intended.

```
Watched: a user tried to cancel an order by clicking the order number.
Reason:  The cancel button was at the bottom of the page, below the fold.
```

Empathy also covers people who use the product differently from you, such as keyboard-only users, people with slow connections, and people on older phones.

The classic mistake is designing for yourself, or for an imagined "typical" user. Your own use of the product is the least typical one. Get feedback from real users where you can, and treat their confusion as information about the product, not about them. The [user story](/t/user-story) format is one way to keep the user in view.
