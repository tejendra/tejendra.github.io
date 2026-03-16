---
title: "Does your LangChain agent return empty structured response?"
date: 2024-03-13
description: "Troubleshooting a LangChain agent that calls tools correctly but returns an empty structured response—root cause and solution."
keywords: "LangChain, agent, structured output, Python, LLM, web search tool, response format"
---

## The Problem

I created a simple LangChain agent that had one tool to do web search and it returned a structrured response. When the agent was invoked, it called the web search tool as expected but it retured an empty structured response. The agent did not follow the flow I was expecting:

1. Do web search based on the user's query
2. Synthesize the search results
3. Return the results in a structured object

```python
my_agent = create_agent(
    model=llm_model,
    tools=web_search_tool,
    system_prompt=system_prompt,
    response_format=WebSearchResponse,
)
```

## The Root Cause

## The Solution
