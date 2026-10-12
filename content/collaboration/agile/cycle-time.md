---
title: "Cycle Time and Lead Time"
summary: "How long work takes from start, or from request, until it's done."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
---

Cycle time measures how long work takes from the point a team starts it until it is finished. Lead time usually starts earlier, when the work is requested or committed to, and ends at delivery. Teams should define the exact start and finish events because tools and organizations use these terms differently.

The distinction helps locate delays. If a small change spends little time in implementation but waits days for review or release, cycle-time data can reveal that queue. If lead time is much longer, work may be waiting before anyone starts it. The numbers do not explain the cause by themselves; combine them with workflow context and discuss outliers without blaming individuals.

Use consistent definitions and a time window suited to the work. Mixing tiny fixes with long migrations can make an average hard to interpret, so examine distributions or group comparable work. Do not use cycle time as a quota: pressure to shorten it can lead to splitting tickets artificially or skipping necessary quality work.

Backend, frontend, and data teams can use the measure to find handoff and review bottlenecks, including work waiting on another team or a data source. Compare changes in the process with changes in customer outcomes. See [WIP limits](/t/wip-limit), [velocity](/t/velocity), and lead time.

Check the workflow with a recent piece of work rather than relying on an abstract rule. If the practice adds a queue or hides blocked work, adjust it; if it helps the team finish and learn, keep it. Backend developers can flag service constraints, frontend developers can check user-facing behavior, and data engineers can surface pipeline or data-quality dependencies.

After trying it, review several completed items and adjust the practice if it created a queue, hid a blocker, or failed to produce a useful outcome.
