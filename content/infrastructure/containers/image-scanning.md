---
title: "Image Scanning"
summary: "Checking container images for known vulnerabilities."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["vulnerability scanning", "container scanning", "image scanning tools"]
prereqs: ["docker-image", "cve"]
related: ["sbom", "dependency-scanning", "container-registry", "ci-pipeline", "minimal-base-images", "secrets-management"]
---

An image bundles your app **and** an operating system's worth of packages. Image scanning inspects both for known vulnerabilities — the [CVEs](/t/cve) published against those packages and libraries — and reports what it found.

Scanners read the image's package manifests and compare versions against vulnerability databases. Examples include Trivy, Grype and Docker Scout, and many registries scan on push. Point one at an image:

```sh
trivy image myapp:1.2.3     # one scanner; flags differ between tools
```

The classic mistake is scanning only your application dependencies and forgetting the **base image**. A stock `python` or `node` base can carry dozens of OS packages with known CVEs that never appear in your lockfile. Keep the base minimal (see [minimal base images](/t/minimal-base-images)) and rebuild regularly, because new CVEs are published against packages you already shipped. A scan run once at release is out of date almost immediately.

Two more traps:

- **Noise.** A raw list of hundreds of findings is useless. Prioritize by severity, whether the vulnerable code is reachable, and whether a fix exists.
- **False confidence.** A clean scan means "no *known* issues", not "secure". It complements, but doesn't replace, not shipping secrets (see [secrets management](/t/secrets-management)) and reviewing dependencies.

Wire scanning into [CI](/t/ci-pipeline) so every build is checked and a policy can fail the pipeline on serious findings. Export an [SBOM](/t/sbom) to record exactly what's inside, and use [dependency scanning](/t/dependency-scanning) to catch libraries at the source level. Store images in a [registry](/t/container-registry) that scans on push.
