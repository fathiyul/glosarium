---
title: "Custom Resource Definition"
summary: "Teaching Kubernetes new kinds of objects."
levels: { backend: staff, data-engineer: staff }
aliases: ["custom resource definition", "CRD", "custom resource"]
prereqs: ["kubernetes", "k8s-operator"]
related: ["control-plane", "kubectl", "configmap-secret", "k8s-deployment"]
---

A **CustomResourceDefinition (CRD)** teaches Kubernetes a new kind of object. Out of the box it knows about Pods, Services, Deployments and so on. A CRD registers a new kind — say `Database` or `Certificate` — so that instances of it (`CustomResource`s) can be created, stored and listed through the same API as built-in objects, using `kubectl` and the normal tooling.

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: databases.example.com
spec:
  group: example.com
  scope: Namespaced
  names:
    kind: Database
    plural: databases
    singular: database
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                size: { type: string }
```

Once registered, someone can declare a `Database`:

```yaml
apiVersion: example.com/v1
kind: Database
metadata: { name: orders }
spec: { size: small }
```

**But a CRD on its own does nothing.** It defines the shape and stores objects; something must watch those objects and act on them. That "something" is a controller — and a CRD plus a controller is the [operator pattern](/t/k8s-operator). Without it, a CustomResource is an inert record.

The classic mistakes:

- A CRD with no controller. Creating custom objects that nothing reconciles is just storing YAML. It looks meaningful and does nothing.
- A loose schema. `openAPIV3Schema` validates what users submit. Omitting it (or allowing anything) lets typos and wrong fields through and causes confusing failures inside the controller.
- Not thinking about versions. CRDs are versioned; changing the schema over time needs conversion or migration. Plan for how the kind will evolve.
- Using CRDs for configuration. Not every setting needs a new Kubernetes kind. If a [ConfigMap](/t/configmap-secret) or a plain field does the job, a CRD adds machinery for nothing.

**When to use them:** when you want to model a domain-specific resource — a managed database, a certificate, a tenant — as a first-class cluster object that a controller maintains. It's an advanced tool: reach for it when a [controller](/t/k8s-operator) genuinely needs to interpret the object, not just store it.
