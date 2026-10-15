# Plan: Backend + Frontend Connection

Status: done
Note: streaming is deferred to the backlog.
Owner: Tehila
Last updated: 2026-10-11

---

## Goal
Build the Flask backend with a single `/api/chat` endpoint, connect the React frontend to it,
and get a real Claude response working end-to-end — without streaming first.

---

## Scope

In scope:
- `backend/app.py` — Flask server with one endpoint: `POST /api/chat`
- Persona system prompts live on the server only; client sends persona ID
- `frontend/src/api/chat.js` — replaces `mockSend` with a real `fetch` call
- `App.jsx` — swaps `mockSend` import for the real API function
- CORS configured so React (port 5173) can call Flask (port 5000)

Out of scope:
- Streaming (next step after this works end-to-end)
- Multiple endpoints
- Auth

---

## Architecture Decision
Persona system prompts are defined in `backend/app.py` only.
The frontend sends a `persona_id` string — never the prompt text itself.
This prevents prompt injection from the client side.

---

## Steps

### Backend
1. Create `backend/app.py`:
   - Load `ANTHROPIC_API_KEY` with `os.environ["ANTHROPIC_API_KEY"]` (fails fast if missing).
   - Define `PERSONAS` dict: `id → system prompt text`.
   - `POST /api/chat` — receives `{ messages, persona_id }`, calls `client.messages.create()`,
     returns `{ reply: "..." }` as JSON.
   - Enable CORS for `http://localhost:5173`.
2. Create `backend/requirements.txt`.

### Frontend
3. Create `frontend/src/api/chat.js` — exports `sendMessage(messages, personaId)`:
   - `fetch("http://localhost:5000/api/chat", { method: "POST", body: JSON.stringify(...) })`
   - Returns the reply string.
   - Same signature as `mockSend` — one import swap in `App.jsx`.
4. Update `App.jsx`: import `sendMessage` from `./api/chat` instead of `mockSend`.
5. Update `data/personas.js`: remove description field duplication if needed — IDs must
   match the backend keys exactly.

---

## Validation
- [ ] `python app.py` starts without error (API key loaded correctly).
- [ ] `curl -X POST http://localhost:5000/api/chat -H "Content-Type: application/json" -d "{\"messages\":[{\"role\":\"user\",\"content\":\"hello\"}],\"persona_id\":\"tutor\"}"` returns a JSON reply.
- [ ] Sending a message in the React UI shows a real Claude response in the chat window.
- [ ] Switching persona changes Claude's response style noticeably.
- [ ] Sending a message with an invalid `persona_id` returns a 400 error, not a crash.

---

## Open Questions

Q1. Should `/chat` be nested under `/api/` prefix (i.e. `/api/chat`)?
→ Decided: yes, `/api/chat`. Implemented that way; the plan now matches the code.

Q2. What to return when the persona_id is unknown — 400 or fallback to a default persona?
→ Recommended: 400 with a clear error message. Fail loudly.

---

## Rollback
Delete `backend/app.py` and `frontend/src/api/chat.js`.
Restore `mockSend` import in `App.jsx`.
