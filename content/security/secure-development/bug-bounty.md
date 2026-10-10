---
title: "Bug Bounty"
summary: "Paying outside researchers to report vulnerabilities."
levels: { backend: senior, frontend: senior, data-engineer: senior }
---

A bug bounty program invites external researchers to report security vulnerabilities under defined rules, sometimes with a reward. It gives an organization another source of testing and can help uncover issues that internal teams missed.

A useful program states which assets are in scope, which testing methods are prohibited, how to report safely, and how the organization will acknowledge and triage reports. Without clear authorization boundaries, a researcher may avoid reporting or unintentionally disrupt a production system. A bounty program does not transfer the organization's duty to secure its product to outsiders.

Set up a response process before opening the program: a monitored contact, severity assessment, reproducible test environment where possible, and ownership for fixes. Researchers should receive clear communication and avoid accessing, modifying, or exfiltrating other people's data. Reward amounts and timelines vary; do not advertise guarantees the team cannot meet.

Backend, frontend, and data teams should ensure the program covers relevant APIs, applications, and data flows, and should route reports to engineers who can act. Bounties can generate duplicate or low-quality submissions, so a managed platform may help but adds cost. Use them alongside [penetration testing](/t/penetration-testing), [responsible disclosure](/t/responsible-disclosure), and continuous security work.

Make the control operational: name an owner, decide how failures are escalated, and keep evidence that the check ran on the artifact or system that actually ships. A policy that exists only in a document is easy to bypass, while an automated gate with no exception path is likely to be disabled. Review the control when the system or threat changes.

For data engineers, apply the same controls to warehouse access, pipeline identities, exported datasets, and the copies that move downstream.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
