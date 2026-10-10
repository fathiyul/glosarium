---
title: "Load Balancer"
summary: "Distributing traffic across servers."
levels: { backend: junior, frontend: junior }
aliases: ["LB", "load balancing"]
prereqs: ["web-server"]
related: ["reverse-proxy", "health-check", "horizontal-scaling", "nginx-apache-caddy"]
also: [cloud]
---

A load balancer sits in front of several copies of an application and spreads incoming requests across them. Clients talk to one address, and the load balancer chooses which instance handles each request.

It usually does a few things:

- **Distributes requests** using a rule such as round robin (take turns) or least connections (send to the instance with the fewest open connections).
- **Runs health checks** by calling each instance's [health check](/t/health-check) endpoint, and stops sending traffic to instances that fail.
- **Terminates TLS** in many setups, so instances don't each handle encryption.

Load balancers are also a kind of [reverse proxy](/t/reverse-proxy), and many web servers can act as one.

The classic mistake is assuming every request from one user reaches the same instance. Requests can land on any instance, so anything stored in one instance's memory, such as a login session, disappears for the user when the next request goes elsewhere. Keep session state in shared storage, or use sticky sessions knowingly, and make sure your app is [stateless](/t/stateless-service) where it needs to be.
