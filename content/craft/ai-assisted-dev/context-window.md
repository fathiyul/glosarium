---
title: "Context Window"
summary: "How much text a model can consider at once."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["context length", "token limit"]
prereqs: ["llm"]
related: ["llm", "coding-agent", "agent-instructions-file", "llm-token"]
---

A context window is the amount of text a language model can consider in one request. It includes everything sent with the request: the instructions, the conversation so far, the files the model has read, and the output it's producing. Anything outside the window is invisible to the model for that request.

```
[instructions][conversation][file contents][tool output][new answer] <= context window
```

The window is measured in [tokens](/t/llm-token), which are chunks of text rather than words. Longer inputs leave less room for the answer, and they usually cost more to process and take longer.

The trade-off is between completeness and focus. Giving the model more context can help it understand a change, but irrelevant material can distract it and crowd out what matters. Summaries and targeted file reads are often better than pasting everything.

The classic mistake is assuming the model remembers everything from earlier in a long session. As a session grows, older details can drop out of the window, or be summarized, and the model may then contradict decisions made earlier. Restate key constraints when they matter, and start a fresh session for an unrelated task.
