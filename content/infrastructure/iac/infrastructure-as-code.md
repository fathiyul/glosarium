---
title: "Infrastructure as Code"
summary: "Defining infrastructure in versioned files instead of clicking in consoles."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["IaC", "infrastructure as code", "Terraform", "CloudFormation", "Pulumi", "declarative infrastructure"]
prereqs: ["environments", "git"]
related: ["terraform", "terraform-state", "declarative-infrastructure", "configuration-drift", "gitops", "immutable-infrastructure"]
core: [backend]
---

**Infrastructure as Code (IaC)** means defining servers, networks, databases and permissions in **versioned text files**, instead of clicking through a cloud console. You review, test and apply them like application code.

```hcl
# Terraform (HCL)
resource "aws_s3_bucket" "exports" {
  bucket = "shop-order-exports"
}

resource "aws_db_instance" "main" {
  engine         = "postgres"
  instance_class = "db.t3.medium"
  allocated_storage = 50
}
```

```sh
terraform plan     # show what would change
terraform apply    # make reality match the files
```

Tools: Terraform (and OpenTofu), Pulumi and the AWS CDK (real programming languages), CloudFormation, Ansible (configuration) ([Terraform](/t/terraform), [Pulumi and CDK](/t/pulumi-cdk), [Ansible](/t/ansible)).

## Why it beats clicking

- **Reproducible**: create the same environment again, and stand up staging that matches production.
- **Reviewable**: infrastructure changes go through pull requests, with diffs and approvals.
- **Versioned history**: who changed what, and when, and you can roll back.
- **Documented by definition**: the files *are* the description of what exists.
- **Faster and less error-prone** than manual steps, and consistent across environments ([environments](/t/environments)).
- **Disaster recovery**: rebuild from code.

## Declarative vs imperative

Most IaC is **declarative**: you describe the end state ("there should be a bucket and a database"), and the tool works out the steps ([declarative infrastructure](/t/declarative-infrastructure)). That makes applying it repeatedly safe: it only changes what differs.

## Concepts to know

- **State**: the tool records what it created so it can compute changes. Protect and share it properly (remote, locked) ([Terraform state](/t/terraform-state)).
- **Drift**: reality diverging from the code because someone changed something manually ([configuration drift](/t/configuration-drift)). Detect it, and fix the cause: don't allow manual edits.
- **Modules**: reusable building blocks.
- **Plan before apply**: always read the plan. Look out for resources being **destroyed and recreated** (a database!).
- **GitOps**: Git as the source of truth, with automation applying changes ([GitOps](/t/gitops)).

## Cautions

- **Secrets in state files and code** are a risk: keep them in a secrets manager ([secrets management](/t/secrets-management)).
- **Blast radius**: split state into smaller units, so one mistake can't affect everything.
- **Test and review**: a typo can delete a production database. Use protections (prevent-destroy, approvals).
- **Don't mix manual and code-managed changes** for the same resource.
- It has its own learning curve, and its own bugs. Start small.
