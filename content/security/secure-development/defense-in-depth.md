---
title: "Defense in Depth"
summary: "Several layers of security, so one failure isn't fatal."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

Defense in depth uses multiple independent safeguards so one failure does not expose the whole system. A web service might combine authentication, per-resource authorization, input validation, network boundaries, least-privilege database credentials, monitoring, and recovery plans.

Layers should address different failure modes rather than repeat the same weak check in several places. For example, frontend validation helps users correct input, but server-side validation is still required because callers can bypass the browser. A WAF may block some exploit patterns, but secure query construction remains the durable fix for SQL injection.

The approach is not permission to add controls without understanding them. Each layer can add latency, operational work, and false positives. Document which threat a control addresses, who owns it, and how you know it is working. If the same credential grants access to all layers, their apparent independence may be misleading.

Backend and frontend developers should apply controls at the boundary they own and avoid relying on downstream components to repair unsafe assumptions. Data engineers should consider storage, movement, and analytical access—not just the ingestion service. Defense in depth limits impact; it does not make a fundamentally unsafe workflow safe. Pair it with threat modeling and [least privilege](/t/least-privilege).

Make the control operational: name an owner, decide how failures are escalated, and keep evidence that the check ran on the artifact or system that actually ships. A policy that exists only in a document is easy to bypass, while an automated gate with no exception path is likely to be disabled. Review the control when the system or threat changes.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.
