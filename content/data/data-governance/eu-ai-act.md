---
title: "EU AI Act"
summary: "EU rules on AI systems and the data used to build them."
levels: { data-engineer: staff , tech-entrepreneur: growth , data-scientist: staff }
aliases: ["EU AI regulation", "AI Act", "European AI Act", "EU AI rules"]
prereqs: ["data-governance", "gdpr"]
related: ["data-governance", "gdpr", "training-data", "data-lineage", "documenting-datasets", "privacy-by-design"]
---

The EU AI Act is a European Union regulation for artificial intelligence systems. It sorts systems by risk and places obligations on the organisations that build and use them, and it also reaches the data those systems are trained and tested on. Because it applies to systems placed on the EU market, it can affect companies outside the EU as well.

The exact duties depend on the role (provider, deployer, importer or distributor) and on the risk tier, and the details are still being interpreted. This page describes the shape, not legal advice.

## The risk-based tiers

- **Unacceptable risk**: a small set of practices the regulation bans outright, such as certain forms of social scoring and manipulative techniques.
- **High risk**: systems used in areas like employment, education, credit, critical infrastructure and some safety components. These carry the heaviest obligations.
- **Limited risk**: mostly transparency duties, such as telling people they are interacting with an AI or that content is generated.
- **Minimal risk**: the rest, largely unregulated.

General-purpose AI models are handled separately, with their own transparency and documentation expectations, and extra duties for the largest ones.

## What high-risk obligations often include

- A risk-management process across the system's life.
- Data governance for training, validation and test data: relevance, representativeness, and checking for bias and errors.
- Technical documentation and record-keeping, so the system's design and behaviour can be examined.
- Logging, so incidents can be investigated.
- Human oversight, and appropriate accuracy, robustness and cybersecurity.
- A conformity assessment and post-market monitoring after release.

Penalties can be substantial, and application is phased over time rather than all at once.

## What it means for data engineers

If you build or curate data for a system that may be high-risk, the regulation turns good data practice into a legal expectation. In practice that means keeping [lineage](/t/data-lineage) of where training data came from, [documenting datasets](/t/documenting-datasets), and having defensible quality and bias checks ([training data](/t/training-data)). This overlaps with existing privacy law: the GDPR still governs personal data, and the AI Act does not replace it ([GDPR](/t/gdpr)).

## Cautions

The classification of a given system is a judgement, and guidance is evolving, so involve legal early. Do not assume every AI feature is high-risk, and do not treat the Act as only a legal exercise: much of the burden lands on engineering teams who must show their data and their process. Build the documentation and quality checks as part of normal work, before an assessment asks for them.
