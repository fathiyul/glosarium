---
title: "PCI DSS"
summary: "Rules for handling payment card data."
levels: { backend: senior, data-engineer: senior , tech-entrepreneur: pmf , data-scientist: senior }
---

PCI DSS is a security standard for organizations that store, process, or transmit payment card data, and for systems that can affect the security of that environment. The standard is maintained by the PCI Security Standards Council; applicability and validation requirements depend on the organization and how payments are handled.

A common way to reduce scope is to use a qualified payment provider's hosted or tokenized flow so the application does not handle raw card numbers. This does not automatically remove every obligation: connected systems, scripts, access paths, and provider responsibilities still need evaluation. Never place card data in logs, analytics events, support tickets, or general-purpose data warehouses.

For example, a checkout page that sends card data directly to a processor differs from an API that receives and stores the primary account number. Map the actual data flow, use approved provider guidance, and verify which systems can influence payment-page security.

Backend and data engineers should minimize exposure, restrict access, and preserve audit evidence. Frontend engineers should understand which scripts can affect the payment experience and avoid collecting card values unnecessarily. Compliance interpretation should come from qualified assessors and counsel; this page is not legal advice. See [data minimization](/t/data-minimization), [encryption at rest](/t/encryption-at-rest), and [security review](/t/security-review).

Make the requirement traceable to data and owners. Record the purpose, systems in scope, retention or access decision, and how an exception is reviewed. Include copies held by vendors, logs, backups, and analytical pipelines rather than checking only the primary application database. Revisit the design when the product purpose or the jurisdictions it serves change.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.
