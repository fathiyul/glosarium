---
title: "Container Security"
summary: "Minimal images, non-root users and image scanning."
levels: { backend: senior, data-engineer: senior }
---

Container security covers risks in container images, runtime configuration, orchestration, and the host environment. A container packages an application and dependencies, but it is not automatically a security boundary or a replacement for patching the host and controlling privileges.

Use maintained, minimal base images where appropriate, remove build tools and unnecessary packages from runtime images, and scan images for known vulnerabilities. Run as a non-root user when the application permits, use a read-only filesystem or restricted capabilities where practical, and avoid mounting sensitive host paths. Exact controls depend on the runtime and orchestrator; verify real configuration rather than assuming a Dockerfile alone enforces them.

A common mistake is focusing on image scanning while deploying a container with broad credentials or privileged access. Protect secrets, restrict network access, set resource limits, and keep the underlying runtime updated. Rebuild and redeploy to apply patched base layers; changing source code alone may leave an old vulnerable image in production.

Backend and data engineers should include build pipelines, registries, and runtime identities in the threat model. Hardening can break applications that depend on writable paths or elevated permissions, so test restrictions deliberately. See [supply chain security](/t/supply-chain-security), [SBOM](/t/sbom), and [least privilege](/t/least-privilege).

Make the control operational: name an owner, decide how failures are escalated, and keep evidence that the check ran on the artifact or system that actually ships. A policy that exists only in a document is easy to bypass, while an automated gate with no exception path is likely to be disabled. Review the control when the system or threat changes.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.
