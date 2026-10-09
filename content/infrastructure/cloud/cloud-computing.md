---
title: "Cloud Computing"
summary: "Renting computing resources on demand."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["the cloud", "public cloud", "cloud"]
prereqs: ["server"]
related: ["cloud-providers", "iaas-paas-saas", "virtual-machine", "regions-azs", "shared-responsibility-model", "finops", "managed-vs-self-hosted"]
---

Cloud computing means renting computing resources (servers, storage, databases, networking) over the internet, on demand, and paying for what you use, instead of buying and running your own hardware.

Before the cloud, running a service meant ordering servers, waiting weeks, and paying for peak capacity all year. Now you can start a server in minutes, resize it, and delete it when you're done.

## What makes it "cloud"

- **On demand and self-service.** You create resources through a web console or an API, with no human in the loop.
- **Elastic.** Add capacity for a traffic spike, release it afterward.
- **Metered.** You pay per use (per hour, per GB, per request).
- **Shared infrastructure.** Many customers' workloads run on the provider's hardware, isolated from each other.

## Levels of service

How much the provider manages for you varies. A rented VM is yours to patch; a managed database or serverless function takes more off your plate. See [IaaS, PaaS and SaaS](/t/iaas-paas-saas).

## The classic mistakes

- Treating it as magic uptime. Individual machines and even whole zones fail. You get resilience by spreading across [availability zones](/t/regions-azs), not automatically.
- Surprise bills. Forgotten resources, large data transfers out ([egress costs](/t/egress-costs)) and unbounded autoscaling all cost money. Set budgets and alerts.
- Assuming security is the provider's job. Misconfigured storage buckets and over-broad permissions are customer-side errors. See [shared responsibility model](/t/shared-responsibility-model).
- Using the console for everything. Clicked-together setups can't be reproduced. Teams define infrastructure as code instead.

The main providers are covered in [AWS, GCP and Azure](/t/cloud-providers).
