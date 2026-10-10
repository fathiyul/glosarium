---
title: "BPJS"
summary: "Indonesia's mandatory health and employment social security programs for employees."
levels: { tech-entrepreneur: pmf }
aliases: ["BPJS", "BPJS Kesehatan", "BPJS Ketenagakerjaan", "social security Indonesia"]
prereqs: ["payroll", "pkwt-pkwtt"]
related: ["payroll", "thr", "pkwt-pkwtt", "startup-taxes"]
---

**BPJS** runs Indonesia's mandatory social security: **BPJS Kesehatan** (health insurance) and **BPJS Ketenagakerjaan** (employment: work-accident, death, old-age savings/JHT, and pension/JP programs). Employers must enroll eligible employees and split contributions — shares borne by company and employee differ per program, and the employer's portion is a real budget line, not a rounding error.

```text
hire → enroll in both BPJS programs → withhold employee share via payroll
     → remit employer share monthly → file reports on schedule
```

Registration and monthly discipline matter from the first hire: arrears compound, audits check enrollment against headcount, and employees quickly notice missing coverage (which destroys trust faster than almost any other admin failure).

The classic mistakes:

- "We'll register when bigger." Obligations attach to hiring, not to comfort. Operating unregistered invites arrears plus penalties discovered at the worst moments (fundraise diligence, disputes).
- Contractor misclassification to dodge enrollment. De-facto employees without coverage is a liability stack (labor + tax + social security) detonating together. Decide status honestly ([contractors vs employees](/t/contractors-vs-employees)).
- Employee share mishandled. Deducting without remitting (or remitting late) is the fastest way to convert an admin task into a legal problem. Automate through payroll.
- Ignoring the programs' evolution. Contribution bases, caps and program details shift by regulation. Confirm current rules yearly with payroll advice rather than running on founding-year memory.
- No employee education. Staff who do not understand their coverage undervalue total compensation and flood HR with confusion. Explain benefits at onboarding, in plain language.

**Budget fully-loaded employment cost** (salary + BPJS shares + [THR](/t/thr) + taxes) per hire from the offer stage. BPJS is part of compensation planning, not an afterthought — see [payroll](/t/payroll).
