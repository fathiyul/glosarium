---
title: "Pulumi and CDK"
summary: "Infrastructure defined in general-purpose programming languages."
levels: { backend: senior, data-engineer: senior }
aliases: ["Pulumi", "CDK", "infrastructure in code"]
prereqs: ["infrastructure-as-code"]
related: ["terraform", "terraform-state", "declarative-infrastructure", "cloud-providers", "gitops"]
---

**Pulumi** and **CDK** are infrastructure-as-code tools that let you define infrastructure in a general-purpose language — TypeScript, Python, Go, C#, Java — instead of a dedicated configuration language. You get real variables, loops, functions, classes and tests, and the tool turns that program into provider API calls.

```typescript
// illustrative: create a bucket and a server, using normal code
const bucket = new Bucket("reports");
const server = new Server("api", { size: "small" });
server.dependsOn(bucket);
```

The appeal is abstraction. If your organisation already writes TypeScript or Python, infrastructure can use the same testing, package management and review tools as application code. You can build a reusable "standard service" component once and instantiate it many times, instead of copy-pasting configuration.

The classic mistakes:

- Over-abstraction. Building a framework before you have a second use case. The flexibility to write any code cuts both ways; you can invent complexity no configuration language would allow.
- Forgetting it's still declarative underneath. The tool tracks expected state and computes a diff, usually via a [state file](/t/terraform-state) just like [Terraform](/t/terraform). Abrupt imperative side effects inside your program can surprise the plan.
- Skipping the plan. Because it looks like normal code, people run it like normal code — straight to apply. Read the preview diff first; it's your safety check.
- Ignoring language-version and dependency concerns. Pin your toolchain as you would for any application, so a build is reproducible.

**When to use it:** when a team wants to reuse existing language skills and tooling, or when the infrastructure has enough shared patterns that real programming constructs pay off. [Declarative](/t/declarative-infrastructure) configuration languages remain simpler for straightforward resources and are easier for non-programmers to read. They track state and reconcile the same way; the difference is the surface you write in.
