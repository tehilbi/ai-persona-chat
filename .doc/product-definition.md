# Product Definition

## Purpose
A portfolio project demonstrating AI integration skills using the Anthropic Claude API.

## Product Vision
A chat app where the user picks a "persona" before chatting — each persona is a different
system prompt that shapes Claude's behavior. The same model responds completely differently
depending on the chosen role.

## Audience
- Recruiters and developers reviewing the GitHub repo.
- The developer herself, learning how to build with the Claude API.

## No Auth / No Database
- No login, no user accounts, no persistence.
- Conversation lives in React state only — refreshing the page resets everything.

## Personas
- 🎓 **Tutor** — explains any topic simply and patiently, step by step.
- 💼 **Career Mentor** — helps with CVs, interview prep, and career decisions.
- 🧑‍💻 **Code Reviewer** — reviews code, explains bugs, suggests improvements.

## What This Project Demonstrates
- Calling the Claude API from a Python backend.
- Using `system` prompts to control model behavior per persona.
- Streaming responses token-by-token (`client.messages.stream()`).
- Managing multi-turn conversation history (stateless API, stateful client).
- Connecting a React frontend to a Flask backend via SSE (Server-Sent Events).

## Acceptance Criteria
- AC1 — User can select a persona before starting a chat.
- AC2 — Claude's response style clearly reflects the chosen persona.
- AC3 — Responses stream in real time (text appears token by token).
- AC4 — Conversation history is preserved across multiple turns.
- AC5 — Switching persona resets the conversation.
