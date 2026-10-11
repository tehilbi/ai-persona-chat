# System Architecture

## Overview
Two processes running locally, connected over HTTP.

```
User (browser)
    ↓ React (Vite, port 5173)
    ↓ fetch POST /api/chat
Flask server (port 5000)
    ↓ client.messages.stream()
Claude API (Anthropic)
```

## Components

### Frontend — React + Vite
- `PersonaSelector` — displays the three persona cards; sets active persona in state.
- `ChatWindow` — renders the message list; streams incoming assistant text into the last message.
- `MessageInput` — textarea + send button; disabled while a response is streaming.
- `App.jsx` — holds global state: `selectedPersona`, `messages`, `isStreaming`.

### Backend — Flask
- `GET /api/personas` — returns the list of personas (name, emoji, description, system prompt).
- `POST /api/chat` — receives `{ messages, persona }`, calls Claude with the matching system
  prompt, and streams the response back as Server-Sent Events (`text/event-stream`).

## Data Flow — one chat turn
1. User types a message and presses Send.
2. React appends the user message to `messages` and calls `POST /api/chat`.
3. Flask picks the system prompt for the chosen persona.
4. Flask opens a streaming request to Claude and forwards each text chunk as an SSE event.
5. React reads the stream with `fetch` + `ReadableStream`, appending each chunk to the
   last assistant message in state.
6. When the stream ends, React re-enables the input.

## External Dependencies
- Anthropic Claude API — model `claude-haiku-4-5`, requires `ANTHROPIC_API_KEY` in `backend/.env`.

## Ports
- Frontend: `5173` (Vite default)
- Backend: `5000` (Flask default)
