---
title: "mTLS"
summary: "Mutual TLS: both client and server present certificates, common for service-to-service auth."
levels: { backend: senior }
related: [client-credentials-flow, zero-trust]
---

Mutual TLS (mTLS) is a TLS connection in which both server and client present certificates and verify each other. It can authenticate services or devices at the transport layer, often within service-to-service or partner integrations.

mTLS helps ensure that a client possesses a certificate trusted by the server, but certificate authentication is not automatically application authorization. The service still needs to map the authenticated identity to permitted actions and resources. A certificate that is valid for one service should not silently grant broad access to another.

Certificate issuance, distribution, renewal, revocation, and identity mapping are operational responsibilities. Expired certificates can cause outages; overly broad trust roots can let unintended clients connect. Automate lifecycle where possible and monitor expiry. Ensure proxies and load balancers preserve trustworthy client identity and do not accept spoofed headers from untrusted networks.

Backend engineers should decide where TLS terminates and how the application receives authenticated identity. mTLS can add strong workload identity but increases setup complexity and may not suit public user login. Combine it with least privilege and application-level checks. See [client credentials flow](/t/client-credentials-flow) and [zero trust](/t/zero-trust).

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.

Test renewal and revocation before certificates expire, and monitor failures at the proxy boundary.
