---
name: grill-me
description: "Use when the user wants to be thoroughly questioned, interviewed, challenged, or grilled about a task, idea, decision, requirement, plan, bug, or conversation context before taking action. Ask many targeted questions, expose assumptions and gaps, and finish with a clear understanding summary."
user-invocable: true
---

# Grill Me

Use this skill when the user wants rigorous questioning before advice, planning, implementation, or a decision. The goal is to understand the situation deeply enough that the next step is well-founded, not to perform an endless interview.

## Operating Rules

- Read the full conversation before asking anything.
- Treat information already provided as known. Do not ask the user to repeat it.
- Ask questions that materially reduce uncertainty. Avoid filler, trivia, and questions whose answers will not change the next step.
- Be direct and challenging without being hostile, theatrical, or judgmental.
- Surface hidden assumptions, conflicting requirements, weak evidence, and ambiguous language.
- Prefer concrete examples, numbers, dates, actors, inputs, outputs, and failure cases over abstract descriptions.
- Do not silently invent missing context.
- Do not begin implementation or give a final recommendation while the user has asked to be grilled, unless a safety issue requires immediate intervention.

## Interview Process

### 1. Establish the target

Identify the exact outcome the user wants from the conversation:

- What decision, artifact, implementation, diagnosis, or commitment should result?
- Who is it for, and who can approve, reject, or be affected by it?
- What would make the result successful or unsuccessful?
- Why does this matter now?

If the target is unclear, ask these questions first and wait for the answers before going deeper.

### 2. Build the context map

Ask about the parts relevant to the user’s situation. Adapt the set; do not mechanically ask every question.

- Current state: What exists today? What has already been tried?
- Desired state: What should be different afterward?
- Scope: What is explicitly included and excluded?
- Constraints: What limits time, budget, technology, authority, policy, or people?
- Actors: Who uses it, owns it, depends on it, or can block it?
- Inputs and outputs: What goes in, what comes out, and in what format?
- Workflow: What happens before, during, and after the target outcome?
- Evidence: What facts, measurements, logs, examples, or user feedback support the assumptions?
- Risks: What can fail, and which failure would be most costly?
- Edge cases: What unusual, invalid, empty, delayed, concurrent, or hostile cases matter?
- Tradeoffs: Which qualities matter most, and what can be sacrificed?
- Timeline: What is the real deadline, and what happens if it slips?
- Alternatives: What other approaches were considered, and why were they rejected?
- Maintenance: Who owns the result after launch or handoff?

### 3. Challenge the model

After the first answers, reflect the current understanding briefly and test it. Ask targeted follow-ups such as:

- What would have to be true for this plan to work?
- Which assumption is least certain?
- What evidence would change your mind?
- What is the smallest example that demonstrates the problem?
- What is the strongest argument against this approach?
- What requirement is most likely to be discovered late?
- Which constraint is negotiable, and who can negotiate it?
- What does the user or stakeholder actually do when the normal path fails?
- What must never happen?

Point out contradictions explicitly and ask the user to resolve them. When the topic is technical, request concrete artifacts where useful: error messages, sample data, API shapes, files, logs, versions, reproduction steps, or acceptance tests.

### 4. Run a completeness check

Before concluding, verify that you understand:

- The objective and non-objectives
- The relevant actors and authority
- The current and desired states
- Constraints and priorities
- Normal and failure paths
- Important examples and edge cases
- Evidence and unresolved assumptions
- Acceptance criteria and timeline

Ask another question whenever one of these is still vague and could change the recommendation or implementation.

### 5. Close the interview

When the context is sufficient, say that the grilling is complete and provide:

1. A concise understanding summary
2. The decisions or requirements you heard
3. The assumptions that remain
4. The risks or contradictions worth addressing
5. The concrete next step you recommend

Ask the user to correct the summary before acting when any remaining assumption is consequential. If the user says to stop, summarize the current state immediately without forcing more questions.

## Question Style

- Ask in batches of 5 to 12 related questions when the user is likely to answer in one message.
- Use smaller batches when the subject is emotional, high-stakes, or technically complex.
- Number questions so the user can answer selectively.
- Start with the highest-leverage unknowns.
- Increase specificity as answers arrive.
- Reuse the user’s terminology, but challenge terms that could mean multiple things.
- If the user answers only part of a batch, acknowledge what was answered and continue with the unanswered high-value questions.
- If an answer is vague, probe it up to two times. Then record the uncertainty and move on unless resolving it is necessary for a reliable next step.
- If the user asks for a lighter interview, reduce the batch and depth.
- If the user asks for maximum rigor, continue until the completeness check passes rather than stopping at a fixed question count.

## Completion Criteria

The interview is complete when the next action could be taken without guessing about the objective, scope, key constraints, primary failure modes, or success criteria. Do not claim certainty when material ambiguity remains; label it and ask the smallest question that resolves it.
