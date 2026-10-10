---
title: "Attack Surface"
summary: "Every point where an attacker could try to get in."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

An attack surface is the set of places where an attacker could interact with a system or influence its behavior. It includes public APIs, login flows, network ports, dependencies, administrative tools, user-uploaded files, and operational processes such as deployment and support access.

Reducing the attack surface means removing unnecessary entry points and limiting what each remaining one can do. An unused admin endpoint, forgotten test account, or broadly exposed service can matter even if the main product is well tested. Inventory services and data flows, identify owners, and review how the surface changes when a new feature or integration is added.

For example, a service that accepts webhooks, supports file uploads, and has an internal admin panel has distinct attack paths. Each needs authentication or verification, input handling, authorization, logging, and a plan for failure. Closing a port without checking operational dependencies can break a legitimate workflow, so pair reduction with service ownership and change review.

Backend and platform developers should understand both internet-facing and internal surfaces; frontend developers should consider third-party scripts, browser storage, and redirect flows. A surface map is not a threat model by itself: it shows where to ask what could go wrong. See [trust boundary](/t/trust-boundary) and [STRIDE](/t/stride).

Make the control operational: name an owner, decide how failures are escalated, and keep evidence that the check ran on the artifact or system that actually ships. A policy that exists only in a document is easy to bypass, while an automated gate with no exception path is likely to be disabled. Review the control when the system or threat changes.

For data engineers, apply the same controls to warehouse access, pipeline identities, exported datasets, and the copies that move downstream.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.
