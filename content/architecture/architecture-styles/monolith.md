---
title: "Monolith"
summary: "One deployable application containing all the features."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["monolithic application", "monolithic architecture"]
prereqs: ["client-server"]
related: ["modular-monolith", "microservices", "monolith-vs-microservices", "load-balancer"]
---

A monolith is an application built and deployed as one unit. The web pages, the API, the background jobs and the business logic all live in one codebase and run as one program, usually against one database.

That's a sensible starting point for most products. There's one thing to build, test and deploy, function calls stay simple, and debugging is easier because a request usually stays inside one process. A small team can move quickly with that.

Monoliths get harder as they grow. The code can become tangled, so a change in one feature breaks another, and the whole application scales together even when only one part is busy. A [modular monolith](/t/modular-monolith) keeps everything in one deployment but enforces boundaries between modules, which addresses much of that without splitting services.

The classic mistake is treating "monolith" as a dirty word and splitting into [microservices](/t/microservices) too early. Each service adds network calls, deployments and failure modes. Many teams have only needed a well-organized monolith. Split a part out when you have a concrete reason, such as a team that needs to deploy independently or a component with very different load.
