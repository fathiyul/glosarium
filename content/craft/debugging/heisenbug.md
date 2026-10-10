---
title: "Heisenbug"
summary: "A bug that disappears when you try to observe it."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["heisenbug", "observer effect bug"]
prereqs: ["debugger"]
related: ["race-condition", "deterministic-tests", "check-then-act", "profiler"]
---

A heisenbug is a bug that changes or disappears when you try to observe it. Add a log line, run it under a debugger, or switch on verbose output, and the failure stops happening. The name comes from the uncertainty principle, though the software effect comes from timing and state, not physics.

The usual causes are timing-dependent: a [race condition](/t/race-condition), code that depends on the order threads happen to run, or an uninitialized value that is usually zero in one build and garbage in another. Observation changes the timing. A log call slows one thread, and a debugger pauses everything, so the bad interleaving no longer occurs.

Good approaches don't rely on watching the failure directly. Record enough state at the moment of failure to explain it, reproduce the bug under stress, or remove the timing dependence so the behaviour becomes [deterministic](/t/deterministic-tests). Sanitizers and race detectors in some languages can find these bugs without changing timing much.

The classic mistake is adding logging until the bug vanishes and then declaring it fixed. It isn't; it's hidden. Look for the shared state or the unchecked timing assumption, and fix that. A [profiler](/t/profiler) can also change timing, so measure with that in mind.
