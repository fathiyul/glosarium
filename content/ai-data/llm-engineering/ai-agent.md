---
title: "AI Agent"
summary: "A model that plans and takes actions with tools in a loop."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["AI agent", "LLM agent", "agent"]
prereqs: ["tool-calling", "how-llms-work"]
related: ["tool-calling", "guardrails", "prompt-injection"]
---
An **AI agent** is a system in which a language model decides a sequence of actions toward a goal: it observes the current state, chooses a tool or a next step, executes it, reads the result and continues until it judges the task done or gives up. The model is the planner; the surrounding code supplies the tools, the memory and the limits.

```text
goal → model picks action → tool runs → observation appended → model decides next → … → answer
```

What distinguishes an agent from a single prompt is the loop and the external effects. Each iteration can read data, call APIs or change state, which is where both the usefulness and the risk come from.

The classic mistakes:

- Unbounded loops. An agent without a step limit, a budget or a stopping rule can run indefinitely and spend money doing nothing useful. Cap steps, tokens and time.
- Giving tools more power than the task needs. Read-only access for research, scoped credentials for actions, and explicit confirmation before irreversible steps.
- Trusting the model's self-report. "Task complete" from the model is a claim, not a verified outcome. Check results against the real system state.
- Ignoring failure modes in tool results. Malformed or unexpected tool output derails plans. Validate results and let the agent handle errors explicitly.
- Skipping evaluation of trajectories. Final answers can look right after a wasteful or unsafe path. Evaluate the steps taken, not only the outcome.

**Start small:** one or two well-defined tools, a hard step limit, human approval for writes, and logged trajectories you can replay and review.
