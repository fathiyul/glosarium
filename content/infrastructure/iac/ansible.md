---
title: "Configuration Management (Ansible)"
summary: "Automating the setup of servers."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["configuration management", "ansible playbook", "ansible"]
prereqs: ["server", "infrastructure-as-code"]
related: ["declarative-infrastructure", "idempotence", "configuration-drift", "pets-vs-cattle", "terraform"]
---

**Configuration management** is automating how machines are set up: which packages, files, users, services and settings they should have. You describe that state once, and a tool applies it to many servers instead of logging into each by hand. **Ansible** is a common example; Chef, Puppet and Salt are others.

Ansible is agentless: it connects over SSH and runs tasks, so there's nothing to install on the target. You write a playbook in YAML:

```yaml
- hosts: web
  tasks:
    - name: install nginx
      package: { name: nginx, state: present }
    - name: start and enable it
      service: { name: nginx, state: started, enabled: true }
```

The value is [idempotence](/t/idempotence): running the playbook again shouldn't change a system that already matches. You can apply it to fix drift, add a server, or rebuild a fleet.

The classic mistake is writing tasks that only work once — a shell command that appends a line every run, or a `curl | bash` that re-downloads. Non-idempotent tasks make re-runs dangerous and hide the real state. Use the tool's modules (which know how to check current state) rather than raw shell wherever you can.

A second mistake is expecting configuration management to *provision* infrastructure. Creating a VPC, a database or a load balancer is usually the job of [infrastructure as code](/t/infrastructure-as-code) like [Terraform](/t/terraform); configuration management then configures what's inside. The tools overlap and can call each other, so teams mix them.

**When not to use it:** if servers are [disposable and replaced rather than repaired](/t/pets-vs-cattle), you can often bake the setup into an image (see [immutable infrastructure](/t/immutable-infrastructure)) and skip per-host configuration entirely. Configuration management still fits long-lived machines, networks and anything that isn't a container.
