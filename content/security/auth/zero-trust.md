---
title: "Zero Trust"
summary: "Treating every request as untrusted regardless of network location, verifying identity everywhere."
levels: { backend: staff }
related: [mtls]
---

Zero trust is a security approach that avoids treating network location as sufficient proof of identity or permission. Each access request should be evaluated using authenticated identity, device or workload context where relevant, resource, and policy. It does not mean “trust nobody” or require a specific vendor product.

A private network can still contain compromised machines, misconfigured services, and excessive permissions. Zero-trust designs make service identity explicit, segment access, and verify requests at meaningful boundaries. For example, a service in the same cluster should not automatically read every database just because it is on an internal subnet.

Apply the approach incrementally: inventory identities and resources, reduce broad credentials, define policies, and instrument access decisions. Requiring a new approval for every request can harm reliability and usability; automate low-risk decisions and provide carefully controlled emergency access. Security controls must continue to function during identity-provider or network outages, with a deliberate fail-safe policy.

Backend engineers should use workload identities and per-resource authorization; platform teams implement network and policy enforcement. A zero-trust label does not guarantee good controls—verify the actual paths and permissions. See [mTLS](/t/mtls), [least privilege](/t/least-privilege), and [identity architecture](/t/identity-architecture).

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
