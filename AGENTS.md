# Agent Instructions

## Security
- Never commit or expose secrets (API keys, tokens, passwords).
- `ANTHROPIC_API_KEY` lives in `backend/.env` only — never hardcode it.

## Stack
- **Backend**: Python 3 + Flask + Anthropic SDK (`claude-haiku-4-5`)
- **Frontend**: React + Vite (JavaScript)

## Repository Layout
- `backend/` — Flask server, Claude API calls, streaming logic
- `backend/.env` — API key (not committed)
- `backend/venv/` — Python virtual environment (not committed)
- `frontend/src/` — React components
- `frontend/src/components/` — PersonaSelector, ChatWindow, MessageInput
- `.plan/` — `000-backlog.md` is the task queue; `NNN-YYYY-MM-DD-*.md` are the plans

## Planning
- Every new feature or meaningful change gets a plan file in `.plan/`
- Naming: `NNN-YYYY-MM-DD-<short-name>.md` (e.g. `001-2026-10-11-backend-setup.md`)
- Each plan includes: Goal, Scope, Steps, Validation
- Update `000-backlog.md` when adding or completing tasks

## Running the Project
- Backend (port 5000): `cd backend` → `venv\Scripts\activate` → `python app.py`
- Frontend (port 5173): `cd frontend` → `npm run dev`

## Key Concepts
- `system` prompts define each persona's behavior
- Streaming via `client.messages.stream()`
- Full `messages` list sent on every request (Claude is stateless)
