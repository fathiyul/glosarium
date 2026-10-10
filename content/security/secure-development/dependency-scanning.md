---
title: "Dependency Scanning"
summary: "Finding known vulnerabilities in your dependencies."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

Dependency scanning checks direct and transitive software dependencies against vulnerability data and sometimes against license or policy rules. It can run during development, in continuous integration, and against deployed images or applications.

A finding is a prompt to investigate, not a complete risk decision. Confirm which package and version are used, whether the vulnerable code path is reachable, and whether a fixed release or mitigation exists. Scanners can miss vulnerabilities, report false positives, or lag behind advisories. Keep manifests and lockfiles current so results describe what will actually be built.

For example, a scanner may find a vulnerable package several levels below a framework. Updating only the top-level dependency may not change the resolved version; inspect the dependency tree and test the resulting build. Prioritize exposed, exploitable issues while tracking lower-risk findings rather than ignoring a large backlog.

Backend, frontend, and data teams should assign ownership for remediation and avoid disabling scans just to make a pipeline green. Pinning every dependency forever is not a fix; updates need tests and a review process. Include container base images and build tools in the inventory. See [CVE](/t/cve), [SBOM](/t/sbom), and [supply chain security](/t/supply-chain-security).

Make the control operational: name an owner, decide how failures are escalated, and keep evidence that the check ran on the artifact or system that actually ships. A policy that exists only in a document is easy to bypass, while an automated gate with no exception path is likely to be disabled. Review the control when the system or threat changes.

For data engineers, apply the same controls to warehouse access, pipeline identities, exported datasets, and the copies that move downstream.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
