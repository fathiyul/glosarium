---
title: "Shared Responsibility Model"
summary: "Which security duties belong to the provider and which are yours."
levels: { backend: senior, data-engineer: senior }
aliases: ["shared responsibility", "shared responsibility model", "who secures what"]
prereqs: ["cloud-computing", "cloud-providers"]
related: ["iaas-paas-saas", "managed-database", "least-privilege", "iam", "encryption-at-rest"]
---

The **shared responsibility model** describes how security duty is split between a cloud **provider** and **you**, the customer. The provider secures the cloud itself; you secure what you put in it. The exact line moves with the service, but the principle is constant: using the cloud never means you're no longer responsible for security — it changes *what* you're responsible for.

The split depends on the service type:

- IaaS (raw servers, storage) — the provider secures the facilities, hardware and the hypervisor; you secure the operating system, patches, applications, users and data.
- PaaS (managed runtimes, databases) — the provider also manages the platform and patching; you still own your code, configuration, access and data.
- SaaS — the provider runs almost everything; you own your users, your configuration and the data you put in it.

```text
provider ────────────────▶  secures the cloud
you      ────────────────▶  secures what's IN the cloud
                 (line moves by service)
```

The classic mistakes:

- Assuming the provider secures everything. The most common cloud breach is not a provider failure but a customer misconfiguration — a public bucket, an over-permissive policy, an exposed key. Those are on your side of the line.
- Losing track of the boundary. With managed services it's easy to assume "they handle it" for things that are still yours: access rules, encryption settings, network exposure.
- Forgetting data and identity are always yours. Whatever the service, your data, your users and your access policies remain your responsibility. Leaky [IAM policies](/t/iam-policy) or poor [least privilege](/t/least-privilege) are your problem, not the provider's.
- Not configuring the controls that exist. Encryption at rest, private networking and logging are often available but off or mis-set by default. The provider gave you the tool; using it is your job.

The practical takeaway: for every service, ask "where does the provider's duty end and mine begin?" — and make sure the things on your side are actually done. It's the mental model behind [managed vs self-hosted](/t/managed-vs-self-hosted), and it applies from raw VMs ([IaaS](/t/iaas-paas-saas)) up to a managed [database](/t/managed-database).
