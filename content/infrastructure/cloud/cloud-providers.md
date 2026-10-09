---
title: "AWS, GCP and Azure"
summary: "The three biggest cloud providers."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["AWS", "GCP", "Azure", "hyperscalers"]
prereqs: ["cloud-computing"]
related: ["cloud-computing", "iaas-paas-saas", "regions-azs", "vendor-lock-in", "multi-cloud", "iam"]
---

Three companies dominate public cloud: **Amazon Web Services (AWS)**, **Google Cloud Platform (GCP)** and **Microsoft Azure**. All three rent the same basic building blocks: virtual machines, storage, managed databases, networking, and many higher-level services on top. Smaller providers and specialist platforms exist too.

| Building block | AWS | GCP | Azure |
|---|---|---|---|
| Virtual machines | EC2 | Compute Engine | Virtual Machines |
| Object storage | S3 | Cloud Storage | Blob Storage |
| Serverless functions | Lambda | Cloud Functions | Functions |
| Managed Kubernetes | EKS | GKE | AKS |
| Identity and access | IAM | Cloud IAM | Microsoft Entra ID plus Azure RBAC |

(Product names and lineups change over time, so check the provider's documentation.)

## What carries over between them

The concepts transfer even though the names differ: [regions and availability zones](/t/regions-azs), [IAM](/t/iam) roles and policies, [virtual networks](/t/vpc), [object storage](/t/s3), [managed databases](/t/managed-database). Learn the ideas on one provider, and the second takes a fraction of the time.

## How to choose, as an engineer

Most of the time you don't: your company already picked one, often for reasons like existing contracts, a Microsoft-heavy environment, or a specific service. For a new project, familiarity and the team's existing skills usually matter more than small feature differences.

## Mistakes to avoid

- **Leaving things running.** Cloud is pay-as-you-go. Forgotten test instances and databases keep billing. See [FinOps](/t/finops).
- Overusing provider-specific services without noticing the cost of switching later. See [vendor lock-in](/t/vendor-lock-in).
- Assuming the provider secures everything. It secures the platform; you secure your configuration and data. See [shared responsibility model](/t/shared-responsibility-model).
