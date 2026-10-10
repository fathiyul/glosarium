---
title: "Leading Large Migrations"
summary: "Moving many teams off an old system."
levels: { backend: staff, frontend: staff, data-engineer: staff }
---

A large migration moves many users, services, teams, or data flows from an old system to a new one. It is as much a coordination and risk-management problem as an implementation task: different owners may move at different times, and both systems may need to coexist temporarily.

Plan the target state, migration path, compatibility rules, validation, rollback, and retirement criteria. For example, a service migration might let consumers move one at a time while both interfaces are supported, with a check that outputs agree before switching traffic. Track adoption and exceptions so “almost complete” does not hide a critical remaining consumer.

Big-bang cutovers can be simpler to reason about but concentrate risk; gradual migration reduces blast radius but prolongs dual maintenance and can create inconsistent behavior. Choose based on reversibility, data consistency, dependencies, and operational ability to run both paths.

Backend migrations hinge on contract compatibility and traffic switching. Frontend migrations depend on staged rollout and user communication. Data migrations require source mapping, validation, and coordinated backfills. Publish the migration guide early and keep a visible tracker of who remains. Provide hands-on help for difficult consumers rather than only sending deadlines, and retire the old path on a stated date. Celebrate retired systems so the end state stays visible.

Backend, frontend, and data teams need clear owners for contracts, user communication, backfills, and cutover decisions. Coordinate with affected teams early and provide migration support, not just deadlines. See [cross-team dependencies](/t/cross-team-dependencies), [technical strategy](/t/technical-strategy), and [risk management](/t/risk-management).
