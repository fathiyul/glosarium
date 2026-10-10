---
title: "CVE"
summary: "A public identifier for a known vulnerability."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

A CVE (Common Vulnerabilities and Exposures) identifier is a public reference for a known cybersecurity vulnerability. It gives vendors, researchers, and security tools a shared name for discussing a specific issue; it is not itself a severity rating or a complete description of your exposure.

When a CVE appears in a dependency scanner, determine whether the affected package and version are actually present and reachable in your product. A vulnerable library may be unused, or the vulnerable code path may not be enabled; conversely, a severe issue can matter even if a scanner reports little detail. Read the vendor advisory and identify fixed versions or mitigations before planning the change.

Prioritize using impact, exploitability, exposure, and business context rather than the identifier alone. Track ownership and remediation through to deployment; updating a lockfile does not help if the vulnerable artifact still runs in production. If no fix exists, consider isolation or disabling the affected feature and monitor for updates.

Backend, frontend, and data engineers should understand dependency trees, including transitive packages and base images. Avoid assuming every CVE requires an emergency release, but document decisions and deadlines. CVE records can be incomplete or updated over time. See [dependency scanning](/t/dependency-scanning), [CVSS](/t/cvss), and [zero-day](/t/zero-day).

Make the control operational: name an owner, decide how failures are escalated, and keep evidence that the check ran on the artifact or system that actually ships. A policy that exists only in a document is easy to bypass, while an automated gate with no exception path is likely to be disabled. Review the control when the system or threat changes.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
