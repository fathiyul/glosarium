---
title: "Typosquatting"
summary: "Malicious packages named like popular ones."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

Typosquatting is registering or publishing a name that resembles a legitimate package, domain, or account so users make a mistake and install or trust the wrong thing. In software, a malicious package may differ by one character, punctuation, or a familiar namespace pattern.

Before adding a dependency, verify its exact name, publisher, repository, and purpose using trusted project documentation. Be cautious of suggestions in issue comments or build logs that tell you to install a lookalike package. Lockfiles help make future installs repeatable, but they do not prove that the original choice was trustworthy.

For example, a developer searching for a popular library may select a similarly named package with a small download count and install scripts. Review package metadata and source before adoption, particularly for dependencies that run during installation or build. Internal package registries and namespace controls can reduce confusion for private packages.

Backend, frontend, and data engineers should check names at the point of dependency introduction and include build-time tools in supply-chain reviews. Strictly allowlisting every package can slow experimentation, so define a lightweight review path rather than relying on memory. See [software supply chain security](/t/supply-chain-security), [dependency scanning](/t/dependency-scanning), and [SBOM](/t/sbom).

Make the control operational: name an owner, decide how failures are escalated, and keep evidence that the check ran on the artifact or system that actually ships. A policy that exists only in a document is easy to bypass, while an automated gate with no exception path is likely to be disabled. Review the control when the system or threat changes.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
