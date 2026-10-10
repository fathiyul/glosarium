---
title: "Terraform / OpenTofu"
summary: "Declarative infrastructure provisioning across providers."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["terraform", "opentofu", "hcl"]
prereqs: ["infrastructure-as-code", "declarative-infrastructure"]
related: ["terraform-state", "configuration-drift", "cloud-providers", "pulumi-cdk", "gitops"]
---

**Terraform** is a declarative tool for provisioning infrastructure. You describe resources in its configuration language (HCL) — networks, servers, databases, DNS records — often spanning several [cloud providers](/t/cloud-providers), and it creates and updates them to match. OpenTofu is a community fork with the same model.

The workflow is three steps:

```sh
terraform init      # download the providers listed in the config
terraform plan      # show what would change
terraform apply     # make it so
```

`plan` is the important one: it compares your configuration to reality and prints what it intends to add, change or destroy. Review it before every `apply` — a plan that says "destroy 12 resources" should make you stop and look.

The classic mistakes:

- **Making changes by hand.** Editing a resource in the cloud console means Terraform no longer matches reality; the next plan wants to undo your change, or errors out. Treat the config as the only way to change infrastructure.
- **Losing or leaking state.** Terraform keeps a [state file](/t/terraform-state) mapping your config to real resources. If it's lost, it doesn't know what it manages; if it's committed, it can leak secrets. Store it remotely and lock it.
- **Applying without reading the plan.** `-auto-approve` in the wrong place turns a review into a gamble.

A second concept to know is [drift](/t/configuration-drift): reality changing outside Terraform. Regular `plan` runs surface it.

When not to use it: small, one-off resources, or platforms where native tools are simpler, may not justify a state file and a provider to maintain. Alternatives include Pulumi and CDK ([Pulumi/CDK](/t/pulumi-cdk)), which use general-purpose languages. In practice, Terraform pairs with [GitOps](/t/gitops) so changes flow through review and version control.
