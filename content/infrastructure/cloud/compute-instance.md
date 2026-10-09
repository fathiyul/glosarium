---
title: "Compute Instance (EC2)"
summary: "A virtual server in the cloud."
levels: { backend: junior, data-engineer: junior }
aliases: ["EC2", "virtual server", "cloud VM", "VM instance"]
prereqs: ["virtual-machine"]
related: ["virtual-machine", "cloud-computing", "security-group", "regions-azs", "iam", "server"]
---

A compute instance is a virtual server you rent from a cloud provider. Amazon calls its version EC2; Google's is Compute Engine; Azure calls them Virtual Machines. You pick an operating system image and a size, and a few minutes later you have a machine you can log into. It is a [virtual machine](/t/virtual-machine) running on the provider's hardware.

You choose:

- **Instance type**: how many CPUs and how much memory (and sometimes a GPU or fast local disk).
- **Image**: the operating system and any preinstalled software.
- **Storage**: a network disk attached to it.
- **Region and zone**: where it physically runs. See [regions and AZs](/t/regions-azs).
- Network rules: which ports are open. See [security groups](/t/security-group).

```sh
# e.g. with the AWS CLI (IDs and names are placeholders)
aws ec2 run-instances --image-id ami-0abc... --instance-type t3.small --key-name my-key
```

## What you are responsible for

An instance is like a server in your own data centre: you patch the OS, secure access, install and update software, and back up the data. For less work, there are managed alternatives. See [IaaS, PaaS and SaaS](/t/iaas-paas-saas).

## Common mistakes

- Leaving it running. Instances bill by time while they run, even when idle. Stop or delete what you don't use.
- Opening SSH (port 22) to the whole internet in the firewall rules. Restrict it to your own IP or use a bastion or the provider's session tooling.
- Storing important data only on the instance. Some instance types have temporary local disks that are lost when the instance stops. Use attached persistent volumes or a managed service.
- Hand-configuring one special server that nobody can rebuild.
- Wrong size. Too small makes the app slow, too large wastes money; measure and resize.
