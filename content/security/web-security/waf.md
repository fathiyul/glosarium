---
title: "Web Application Firewall"
summary: "Filtering malicious HTTP traffic before it reaches your app."
levels: { backend: mid-level }
---

A web application firewall (WAF) inspects HTTP traffic and applies rules before requests reach an application. It can block or challenge traffic that matches known attack patterns, suspicious rates, or organization-specific policies. It is one layer of defense, not a guarantee that the application is secure.

A WAF can help provide a rapid mitigation for a widespread exploit or absorb some unwanted traffic at the edge. But rules can miss novel or obfuscated attacks, and broad rules can block legitimate requests. Treat managed rule sets as signals that need monitoring: review false positives, understand what is blocked, and test rule changes against real application behavior.

Do not use a WAF rule as the only fix for an injection or access-control bug. Patch the vulnerable code and keep the rule as a temporary or additional control where it still helps. Ensure the origin cannot be reached through a path that bypasses the WAF, or attackers may simply go around it.

Backend and platform teams configure rules, logs, and origin restrictions; frontend teams can help identify valid request patterns affected by a rule. WAFs may add latency, cost, and operational complexity, and capabilities differ by provider. See [DDoS](/t/ddos), [security headers](/t/security-headers), and [SQL injection](/t/sql-injection).

A useful verification habit is to test the boundary from an untrusted caller, not only through the intended interface. Send unexpected values directly to the endpoint, check the response and side effects, and confirm that a denied request does not still change state. Keep a regression test for the failure mode so a refactor or framework update does not quietly reopen it.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.
