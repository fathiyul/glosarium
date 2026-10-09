---
title: "OWASP Top 10"
summary: "The ten most critical web application security risks."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["OWASP Top Ten", "OWASP", "OWASP Top 10 web application security risks", "top 10 vulnerabilities"]
prereqs: ["sql-injection", "xss"]
related: ["broken-access-control", "security-misconfiguration", "sql-injection", "xss", "ssrf", "supply-chain-security"]
core: [backend]
---

The **OWASP Top 10** is a regularly updated list of the **most critical web application security risks**, published by the Open Worldwide Application Security Project (OWASP), a non-profit community. It's an awareness document, widely used as a baseline for secure coding, training and audits, and often referenced in
security requirements.

The categories change between editions, based on data and expert input. Over the years, the list has consistently included things like:

| Risk area | In plain words | Learn more |
|---|---|---|
| **Broken access control** | Users can act outside their permissions: read others' data, call admin functions | [Broken access control](/t/broken-access-control), [IDOR](/t/idor) |
| **Cryptographic failures** | Sensitive data unprotected: no TLS, weak algorithms, passwords stored badly | [Password hashing](/t/password-hashing), [TLS](/t/tls) |
| **Injection** | Untrusted input interpreted as commands: SQL, OS commands, templates, and (in older editions) XSS | [SQL injection](/t/sql-injection), [XSS](/t/xss), [command injection](/t/command-injection) |
| **Insecure design** | Missing security thinking in the design itself | [Threat modeling](/t/threat-modeling) |
| **Security misconfiguration** | Default passwords, open storage, verbose errors, unneeded features | [Security misconfiguration](/t/security-misconfiguration) |
| **Vulnerable and outdated components** | Known-vulnerable libraries and frameworks | [Dependency scanning](/t/dependency-scanning) |
| **Identification and authentication failures** | Weak login, session handling and credential recovery | [Authentication](/t/authentication-vs-authorization), [MFA](/t/mfa) |
| **Software and data integrity failures** | Unverified updates, pipelines or serialized data | [Supply chain security](/t/supply-chain-security), [insecure deserialization](/t/insecure-deserialization) |
| **Security logging and monitoring failures** | Attacks go unnoticed | [Audit logging](/t/audit-logging) |
| **Server-side request forgery (SSRF)** | The server is tricked into making requests on an attacker's behalf | [SSRF](/t/ssrf) |

(Names and ordering differ between editions. Check the current list at owasp.org.)

## How to use it

- **As a checklist for code review and design**: for each feature, which of these could apply?
- **As a training outline** for new developers: learn what each means and see how it looks in your stack.
- **In requirements and testing**: security scanning and penetration tests are often organized around it ([SAST](/t/sast), [DAST](/t/dast), [penetration testing](/t/penetration-testing)).
- **As a shared vocabulary** with security teams.

## What it isn't

- **Not complete.** It's the *top* ten, not every risk, and it's not a standard to be "compliant" with.
- **Not a to-do list in order of your priority.** Your own threats may differ. Do [threat modeling](/t/threat-modeling) for your system.
- **Not only about code**: configuration, dependencies and process matter as much.

OWASP also publishes lists for APIs, mobile and other areas, plus cheat sheets with concrete guidance on how to prevent each issue.
