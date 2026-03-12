---
title: "What we lose when AI writes the code"
date: 2026-03-10
---

I have been using AI tools, primarily Cursor, everyday for almost 2 years and like everyone else, I find myself writing less code and reviewing AI generated code. My current workflow is to write a detailed spec of the thing I want the agent to implement then point the agent to that Markdown file. I iterate on the solution with the agent via chat until I'm satisfied with the results. With this new way of coding, I've realized that I no longer have a deep and thorough understanding of the codebase as I did when I wrote the code manually. That got me wondering, how important is it to be intimately familar with the codebase in the age of AI?

## Byproduct of writing code leads to deeper understanding

In the past, onboarding as a new developer to a project usually followed this timeline:

- Week 0 - 1: Setting up the project to run locally
- Weeks 1 - 2: Fixing small defacts or working on easy first issues
- Weeks 2 - 3: Implementing small features that span a handful of files
- Weeks 4 and beyond: Implementing features that span across the fullstack of the project

I recall learning the most about a project during the first few weeks of onboarding. It gave me the opportunity to update outdated project setup documentation. I got to learn about the build system, what services and libraries are being used, and how everything is wired together. I start to understand the history of why things were done the way they are.

Once I have the project running locally, I can pick up good first issues. Those issues allow me to understand the codebase through bug fixes or small enhancements. As I navigate through the codebase, I understand how it's structured, how the code flows and make note of things I don't fully understand to revisit. When fixing a bug, I start adding console log statements to debug the root cause and within a few minutes, I have 15 files open. I find the root cause, apply a fix and when all the tests pass it gives me a sense of accomplishment. That sense of accomplishment does not come from fixing the bug, which I might have seen in the past. Instead, it comes from knowing that I was able to dive deep into an existing codebase, navigate around it to pinpoint the issue.

As I transition from being the new developer on the team, I start anchoring features that touch cross full stack. Working on those features help me understand the business domain, how business logic is baked into the code and edge cases. I may miss those edge cases and end up breaking the app (even though the tests might still pass) but its these mistakes that build a deeper understanding of how the code flows and how modules interact with each other.

This period marks the beginning of building domain knowledge which happens by getting your hands dirty, by doing and fixing and documenting. The byproduct of being knee deep in the codebase leads to this strangely weird, intimate relationship with the codebase. You get to a point where when you review a pull request, you immediately know if the change will break a specific edge case or if a particular condition wasn't covered. You read a bug work item and know exactly why and where it exists. Writing the code created understanding as a side effect.

As I prompt agents to implement and fix on my behalf, I miss the feeling of not being one with the codebase. There was a sense of pride in ones code and ownership. It feels like that is disappearing a little, day by day.

## What happens if we don't understand the codebase

How long would it take a developer to contribute a decent sized feature to an open source project like React or VS Code Editor? Would you trust the changes?

When I first started using Cursor, I did not feel comfortable having it modify my files. I was more comfortable with Cursor giving me code snippets in chat which I could copy and paste. This was due to both a lack of trust in the models and fear of giving up control of the code to AI. Overtime, I gained trust in Cursor and would let it change my files. And as more time went by, I have since been able to scan through the changes and "Accept All".

I traded speed of implementing new features for control over the codebase.
And now, to a certain extent have offloaded thinking to AI leading to brain atrophy - but that deserves it's own article.

New dev workflows are fully driven by AI. A product manager can use AI to brainstorm and define requirements for a new feature. AI can create work items in the backlog. AI can implement each work item. AI can commit the changes, open a PR and another agent can do a code review. Not all companies have been able to implement this flow but we are headed in that direction.

When that does happen and as the models get better, the codebase will not be managed by humans. We can not scale to review all the code written by AI. How can we trust and verify AI has implemented our intent exactly as we intented? Which is really interesting, given how many meetings I've had with UX and PMs to implement some functionality, the amount of planning we did, only for the PM to come back and say we lost alignment and didn't deliver what they were expecting.

The biggest risk will be, did AI implement exactly what the user's intent was and the next issue will be, was the implementation optimal for the codebase. I'm not concerned if AI didn't follow naming conventions or best practices, but more concerned if AI didn't violated core principles like DRY, SOLID or YAGNI. These in my opinion are violations that make codebases hard to maintain overtime with or without AI. I won't touch on security risks with the assumption that AI agents will run thorough security scans on a code base to find vulnerabilities - take that with a grain of salt.

When we don't understand a codebase, it becomes harder to maintain it, we lose confidence when changes are made and if something else will be impacted (even if you have tests) and it becomes bloated. And then you spend lots of tokens.

### What do we lose if we don’t understand code

### What is the risk of reviewing code changes in a codebase you don't understand

## Creating a Intent based programming language

The new way of coding is through AI agents. Agents need to understand our intent from ambigious human language, convert that into a high level programming language, which eventually turns into machine code. If we are no longer writing code, is there even a need for such high level programming languges which were made for us so we don't need to write Assembly or machine code?

That is where I propose we research a new intent-based programming language. It would be a structured language where we define rules, policies and outcomes, and the AI agent implements said rules, policies and outcomes into a language we dont even need to review. That language can be machine code for all we care.
