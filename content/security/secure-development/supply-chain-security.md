---
title: "Software Supply Chain Security"
summary: "Protecting against compromised dependencies and build pipelines."
levels: { backend: senior, frontend: senior, data-engineer: senior }
---

Software supply-chain security protects the code, dependencies, build systems, artifacts, and update channels that contribute to software you run. An attacker may target a maintainer account, publish a malicious package, compromise a build runner, or replace an artifact between build and deployment.

Controls include verifying dependency sources, reviewing changes, using lockfiles, limiting build credentials, isolating build jobs, protecting release signing keys, and recording artifact provenance. No single control proves a build is safe. A lockfile improves repeatability but can faithfully pin a malicious version; a signature proves an artifact came from a key, not that the build process was uncompromised.

For example, a CI job with broad production credentials can turn a compromised dependency into a deployment compromise. Give build steps only the permissions they need, avoid exposing secrets to untrusted pull requests, and preserve enough evidence to trace which source and dependencies produced a release.

Backend, frontend, and data engineers should include build plugins, container images, model or data tooling where relevant, and deployment automation in the inventory. Stronger controls add complexity; prioritize components with release privilege or broad downstream use. See [SBOM](/t/sbom), [typosquatting](/t/typosquatting), and [dependency scanning](/t/dependency-scanning).

Make the control operational: name an owner, decide how failures are escalated, and keep evidence that the check ran on the artifact or system that actually ships. A policy that exists only in a document is easy to bypass, while an automated gate with no exception path is likely to be disabled. Review the control when the system or threat changes.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
