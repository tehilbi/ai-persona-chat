# AI Persona Chat

A full-stack chat app powered by Claude API. Pick a persona — Tutor, Career Mentor, or Code Reviewer — and chat with Claude in that role. Responses stream token by token.

## Stack

- **Backend**: Python + Flask + Anthropic SDK
- **Frontend**: React + Vite + SCSS Modules

## Setup

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install flask flask-cors anthropic python-dotenv

cp .env.example .env   # then open .env and fill in your API key
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Concepts Demonstrated

- `system` prompts to shape model behavior per persona
- Streaming responses via `client.messages.stream()`
- Multi-turn conversation history (stateless API, stateful client)
- React frontend consuming SSE from a Flask backend
