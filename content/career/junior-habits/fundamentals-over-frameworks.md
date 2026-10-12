---
title: "Fundamentals over Frameworks"
summary: "Frameworks change; the concepts underneath them don't."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
prereqs: ["variable"]
related: ["learning-how-to-learn", "tutorial-hell", "http-request", "dom"]
---

Frameworks come and go. The concepts underneath them, such as HTTP requests, data types, state, caching and how a database uses an index, change far more slowly. Learning those lets you pick up the next framework quickly, because you recognize what it's doing.

Take a web framework. Its routing, middleware and template rendering all sit on top of [HTTP](/t/http-request). A developer who understands what a request and a response are can read any framework's docs and see where the request goes. A developer who only memorized one framework's syntax has to start over each time.

The same goes on the frontend. Components and hooks are implementations of ideas such as [state](/t/state-management) and the [DOM](/t/dom). Knowing those ideas makes the framework's rules feel logical instead of arbitrary.

The classic mistake is treating the framework as the thing to learn, and skipping the underlying concepts because they seem slow and abstract. You can build a lot with a framework and still be stuck when it misbehaves. When something breaks, the fundamentals are what let you work out why. Spend some time on the concepts behind the tools you use every day.
