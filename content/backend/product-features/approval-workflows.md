---
title: "Approval Workflows"
summary: "Multi-step approvals modeled as explicit states and transitions."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["approval workflows", "approval workflow", "approvals"]
prereqs: ["workflow-engine", "rbac"]
related: ["workflow-engine", "rbac", "audit-columns", "organizations-teams"]
---

**Approval workflows** are business processes where something (an expense, a deploy, a large refund, a new account) can't proceed until one or more people approve it. Instead of a single yes/no, they model a **state machine**: pending → approved/rejected, possibly with several stages ("manager approves, then finance") and conditions ("over $1,000 needs the CFO").

```text
request submitted → pending manager → pending finance → approved → action runs
                                      └─ rejected → stops
```

They add human judgement and accountability to a system. The workflow tracks who submitted it, current state, who can act next, the history of decisions, and — crucially — runs the actual effect only once approved.

The classic mistakes:

- Implementing it as a single boolean. "Approved" isn't enough for multi-stage or conditional flows; a proper state machine (with allowed transitions) models it correctly.
- Not enforcing who may approve. Without rules, anyone can approve anything; tie approval rights to roles/permissions (see [RBAC](/t/rbac)) and to the request's context (a manager can approve their reports' expenses).
- No audit trail. Approvals are about accountability; record who approved/rejected, when and why (see [audit columns](/t/audit-columns)).
- Running the side effect before approval, or more than once. The action must fire exactly once, after the final approval, and be idempotent — retries and re-approvals shouldn't double-apply (see [idempotence](/t/idempotence)).
- Stuck requests. If an approver leaves or is unavailable, requests can hang. Add escalation, reassignment, or timeouts.
- Editing after submission. Allowing the request to change after approval invalidates the approval; lock it, or require re-approval.
- Ignoring concurrency. Two approvers acting at once, or a request changing while being approved, needs careful state handling (see [transactions](/t/transaction)).

**When to build it:** whenever a business rule requires human sign-off before an action — expenses, access grants, large refunds, deploys, content publishing. Model it as a durable state machine, often using a [workflow engine](/t/workflow-engine), enforce approval rights, fire the effect once, and keep the audit trail. It's where process meets product, and getting the state and permissions right is the core of it.
