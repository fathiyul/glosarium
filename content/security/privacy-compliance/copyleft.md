---
title: "Copyleft"
summary: "Licenses that require derivative work to stay open source."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

Copyleft is a licensing approach that allows people to use, modify, and redistribute software while requiring certain redistributed versions or adaptations to remain under the same or a compatible open license. The exact obligations depend on the license text and how the software is used or distributed.

Copyleft is not a ban on commercial use. A business can often use copyleft software, but distributing a covered combined or modified work may trigger source and licensing obligations. Different licenses define scope and compatibility differently; do not assume that every GPL-family license has identical rules or that simply using a library over a network always has the same result.

For example, including a library in a distributed application may raise different questions from running an unmodified tool internally. Keep a dependency inventory, read the actual license, and involve legal counsel when the boundary is unclear. A package label or online summary can be wrong or incomplete.

Backend, frontend, and data engineers should notice license metadata when adding dependencies and preserve required notices. Choosing permissive software can reduce some distribution obligations but does not remove all license conditions. This is a compliance topic, not legal advice. See [open-source licenses](/t/open-source-licenses) and [SBOM](/t/sbom).

Make the requirement traceable to data and owners. Record the purpose, systems in scope, retention or access decision, and how an exception is reviewed. Include copies held by vendors, logs, backups, and analytical pipelines rather than checking only the primary application database. Revisit the design when the product purpose or the jurisdictions it serves change.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
