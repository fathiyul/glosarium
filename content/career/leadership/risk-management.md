---
title: "Risk Management"
summary: "Identifying and mitigating what could derail a project."
levels: { backend: staff, frontend: staff, data-engineer: staff }
---

Risk management identifies uncertain events that could affect an outcome, assesses their likely impact, and chooses whether to reduce, transfer, accept, or avoid them. It is a way to make decisions visible, not a promise that every bad outcome can be predicted.

For a data migration, risks might include an unrecognized consumer, an incomplete backfill, or a rollback that cannot restore writes. Record the scenario, consequence, owner, mitigation, and trigger for action. Distinguish an existing issue from a future uncertainty, and avoid assigning false precision when evidence is limited.

A long risk register can become paperwork if nobody reviews it. Focus on risks that could change a decision or require preparation, and revisit them as the project changes. Some mitigations introduce their own cost: running two systems may reduce cutover risk but extend operational complexity.

Backend risks often involve rollout coupling and capacity. Frontend risks include interaction regressions and release timing. Data risks center on silent quality loss and incomplete lineage. For each material risk, name the early warning and the response owner. Review the list when scope or dependencies change, and close risks that no longer apply so attention stays on what could still alter the outcome. Keep the list short enough that owners read it.

Backend, frontend, and data engineers should identify risks in their layers and at their interfaces; leaders must make ownership and acceptance decisions clear. Escalate material risks early and pair each warning with options when possible. See [large migrations](/t/large-migrations), [technical due diligence](/t/technical-due-diligence), and [security review](/t/security-review).
