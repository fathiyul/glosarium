---
title: "Async Communication"
summary: "Writing so people can respond on their own time."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-analyst: junior }
---

Async communication is written or recorded communication that people can read and respond to without being present at the same time. It includes design notes, issue comments, decision records, and a clear project update—not just chat messages sent outside meeting hours.

Good async communication states the context, the question or decision needed, relevant evidence, and when a response is useful. For example, “The export job is delayed because the source cursor resets; should we pause the rollout or ship with a manual retry?” gives readers something actionable. A message that says only “Thoughts?” forces people to reconstruct the situation.

Async work can reduce interruptions and include teammates across time zones, but it is not always faster. Sensitive conflict, ambiguous brainstorming, or an urgent incident may need a live conversation. Write down the outcome afterward so people who were absent can follow the decision.

Backend, frontend, and data engineers should leave enough technical context for someone outside the immediate conversation to understand the trade-off. Use threads or documents that remain findable, and avoid expecting instant responses from an async channel. See [writing culture](/t/writing-culture), [remote visibility](/t/remote-visibility), and [effective meetings](/t/effective-meetings).

Choose the channel and amount of detail for the people who need to act, then make important outcomes findable later. If a conversation changes scope or ownership, record that change rather than relying on memory. Backend developers can explain service impact, frontend developers can clarify interaction concerns, and data engineers can make lineage or measurement implications visible.

After trying it, ask whether people had enough context to act and revise the agreement if it created extra coordination or left someone out.
