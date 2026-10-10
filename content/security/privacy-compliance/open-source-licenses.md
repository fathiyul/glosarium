---
title: "Open Source Licenses"
summary: "MIT, Apache, GPL, and what each one lets you do."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

An open-source license states what people may do with software source code and what conditions apply to use, modification, or redistribution. Permissive licenses such as MIT and Apache-2.0 generally allow broad reuse with conditions such as preserving notices; copyleft licenses impose additional obligations in some distribution scenarios.

Do not rely only on a repository badge or a dependency scanner's label. Verify the license for the exact version and check bundled assets, generated code, and transitive dependencies. A package may contain code under more than one license, and the repository's current license may differ from the version you ship.

For example, a library used in a proprietary product may be acceptable under one license but require additional review under another if the product is distributed. Whether a particular combination creates obligations can be legally complex; keep records and ask counsel rather than guessing from a short summary.

Backend, frontend, and data engineers should preserve required notices and make license review part of dependency intake. License policy can constrain implementation choices, but ignoring it creates avoidable release risk. This is general information, not legal advice. See [copyleft](/t/copyleft), [dependency scanning](/t/dependency-scanning), and [SBOM](/t/sbom).

Make the requirement traceable to data and owners. Record the purpose, systems in scope, retention or access decision, and how an exception is reviewed. Include copies held by vendors, logs, backups, and analytical pipelines rather than checking only the primary application database. Revisit the design when the product purpose or the jurisdictions it serves change.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
