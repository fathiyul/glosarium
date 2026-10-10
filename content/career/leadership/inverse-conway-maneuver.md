---
title: "Inverse Conway Maneuver"
summary: "Designing team structure to get the architecture you want."
levels: { backend: principal, frontend: principal, data-engineer: principal }
---

The inverse Conway maneuver is the deliberate design of team and communication structures to encourage a desired software architecture. Conway's law is commonly used to describe how system designs reflect the communication structure of the organizations that build them; the inverse maneuver works in the other direction by changing team boundaries to support a target architecture.

For example, if one product capability requires constant coordination among three teams with separate release processes, leaders might organize ownership around the capability or clarify the interfaces between those teams. Reorganization alone does not guarantee a better architecture: incentives, skills, platform support, and existing dependencies also shape how work flows.

Changing teams has human and delivery costs. Preserve domain knowledge, communicate why the change is happening, and plan the transition of ownership. Avoid drawing new boxes on an org chart while leaving every approval and dependency unchanged.

Backend team splits might follow service boundaries that need independent delivery. Frontend grouping could reflect a shared experience that needs coherence. Data ownership may align with domains that define meaning. Test the new structure against a real upcoming change. Adjust interfaces and decision rights together, since moving people without changing coordination rarely alters the architecture. Review the new boundaries after one delivery cycle.

Backend, frontend, and data engineers should help identify where communication paths and software boundaries reinforce or contradict each other. Involve affected teams in testing the model and revisit it when product needs change. See [team topologies](/t/team-topologies), [org design](/t/org-design), and [technical vision](/t/technical-vision).
