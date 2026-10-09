---
title: "IaaS, PaaS, SaaS"
summary: "How much of the stack the provider manages for you."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["IaaS", "PaaS", "SaaS", "cloud service models"]
prereqs: ["cloud-computing"]
related: ["cloud-computing", "compute-instance", "paas-platforms", "shared-responsibility-model", "managed-vs-self-hosted", "faas"]
---

The three labels describe **how much of the technology stack the provider runs for you**. The more they manage, the less you control and the less you maintain.

| Layer | IaaS (Infrastructure) | PaaS (Platform) | SaaS (Software) |
|---|---|---|---|
| Your application and data | You | You | Provider |
| Runtime, libraries | You | Provider | Provider |
| Operating system | You | Provider | Provider |
| Virtualization, servers, network | Provider | Provider | Provider |

## Examples

- **IaaS**: you rent raw building blocks such as [virtual machines](/t/compute-instance), disks and networks. You install and patch everything above the hardware. Example: a plain EC2 instance.
- **PaaS**: you hand over your code, and the platform runs it, scales it and handles the OS. Examples: Heroku-style platforms, App Engine, Azure App Service. See [PaaS platforms](/t/paas-platforms).
- **SaaS**: you use finished software through a browser or API. Examples: Gmail, Slack, GitHub.

[Serverless functions](/t/faas) and [managed databases](/t/managed-database) sit around the PaaS end: you write the logic, the provider handles the machines.

## How to think about the trade

More managed means less operational work and faster start-up, but less control over the environment, sometimes higher prices at scale, and more [lock-in](/t/vendor-lock-in). More control means you also own the patching, scaling and 3 a.m. pages.

The boundaries are fuzzy and vendors use the labels loosely, so judge a service by one question: what exactly do I still have to maintain? See also the [shared responsibility model](/t/shared-responsibility-model).
