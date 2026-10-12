---
title: "Architecture Diagram"
summary: "A box-and-arrow picture of a system's components and data flow."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["system diagram", "component diagram"]
prereqs: ["system-design"]
related: ["class-diagram", "api-documentation", "load-balancer", "client-server"]
---

An architecture diagram shows the main parts of a system and how they connect: the services, databases, queues and external systems, and the direction data flows between them. It answers the question "what talks to what" at a level a new team member can take in quickly.

```
browser -> load balancer -> web app -> orders database
                              |-> message queue -> email worker
                              |-> payment provider (external)
```

Keep the boxes to things a reader would name in a conversation. Label each arrow with what it carries, such as "HTTP requests" or "order events", and mark what is external to your team.

The trade-off is detail. A diagram that shows every service and every call is accurate but unreadable, and one that shows only three boxes hides the parts that break. Pick one level for each diagram, and make a separate diagram for another level if you need one.

The classic mistake is drawing the intended architecture and never updating it, so the picture describes a system that no longer exists. Keep diagrams in version control next to the code, and update them in the same change that moves a component. A [class diagram](/t/class-diagram) covers the code inside one component.
