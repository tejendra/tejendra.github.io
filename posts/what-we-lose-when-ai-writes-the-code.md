---
title: "What we lose when AI writes the code"
date: 2026-03-10
description: "How writing code by hand built understanding of the codebase—and what we lose when AI writes the code instead."
keywords: "AI coding, Cursor, code review, codebase understanding, software development, intent-based programming"
---

I have been using AI tools, primarily Cursor, every day for almost 2 years and like everyone else, I find myself writing less code and reviewing AI-generated code. By having my AI companion write the code, I've lost something I used to hold near and dear: the intimate familiarity of the codebase.

Writing code manually created understanding as a side effect.
With AI, we are losing that understanding.

## Writing code creates understanding

In the past, onboarding as a new developer to a project usually followed this timeline:

- **Week 0 - 1**: Setting up the project to run locally
- **Weeks 1 - 2**: Fixing small defects or working on easy first issues
- **Weeks 2 - 3**: Implementing small features that span a handful of files
- **Weeks 4 and beyond**: Implementing features that span across the full stack of the project

I learned the most about a project during the first few weeks of onboarding. It gave me the opportunity to update outdated project setup documentation. I got to learn about the build system, what services and libraries are being used, and how everything is wired together. I began to understand the history of why things were done the way they are.

I began working on simple first issues once I had the project running locally. Those issues allow me to understand the codebase through bug fixes or small enhancements. As I navigate through the codebase, I learn how it's structured, how the code flows, and I make note of things I don't fully understand. I start adding console log statements to debug the root cause and within a few minutes, I have 15 files open. Completing these first issues gives me a sense of accomplishment. That sense of accomplishment does not come from fixing the bugs, which I might have seen in the past. Instead, it comes from knowing that I was able to dive deep into an unfamiliar codebase, navigate around it to pinpoint the issue.

After I've gained enough understanding, I start anchoring features that span the full stack. Working on those features helps me understand the business domain, how business logic is baked into the code and what the edge cases are. I may forget to take those edge cases into consideration and end up breaking the app (even though the tests might still pass) but it's these mistakes that build a deeper understanding of how the code flows and how modules interact with each other.

The byproduct of being knee-deep in the codebase leads to forming an intimate relationship with it. You get to a point where you and the codebase become one. You refactor the code, improve performance and stability, and you have pride in the code you wrote. When you review a pull request, you immediately sense code smell even though you can't pinpoint it right away. You read a bug work item and know exactly why and where it exists.

## Reviewing code doesn't create understanding

I remember my first time using Cursor. I prompted it to make a minor change to a React component. I felt my codebase was desecrated when it directly modified my code. I would've appreciated if Cursor gave me code snippets in chat which I could verify and apply if I agreed. This was due to both a lack of trust in the models and fear of giving up control of the code to AI. Fast forward to today, I'm spending more time in markdown files writing requirements, constraints, examples, and outcomes for my AI agent to go build and review.

AI agents can write more code over a weekend than I have in my entire career.

If I let agents write code at that speed, I do not have the cognitive ability to review each line it produces. When that does happen, the codebase as we know it cannot be managed by humans and we will become the bottleneck if we need to review every change AI makes.

As I delegate more of the coding to AI, I am starting to feel an erosion of control over the codebase. Reviewing code doesn't create the same neural networks in the brain that are essential for learning and information encoding as writing code does. The codebase is no longer an artifact we can completely own and fully understand.

## Not understanding code becomes a risk

Would the maintainers of Bitcoin Core or the React project accept a 50-line change pull request from a developer who has never contributed to the codebase? Let alone a 10-line changed PR? What if they also added new tests? Without the deep understanding of a codebase, it is difficult for developers to understand the implications of their changes. Even with well-written tests, you lose confidence in your changes.

AI agents can write good code; more code than we can review, and they're not going anywhere. Therefore, the codebase cannot remain the primary source of truth of what the developer intended and what AI agents wrote. This leads to the creation of another layer of abstraction to programming. The same way Assembly was replaced with high-level programming languages, those same programming languages are being replaced with natural language. My prediction is for a new intent-based programming language, that abstracts away the codebase as we know it and we will be programming intent, not the how.

For decades, developers understood systems by writing code. AI breaks that feedback loop. To scale with AI, we need a system where we can explicitly define requirements, constraints, and outcomes that are verifiable without having to look at the underlying code AI produced.
