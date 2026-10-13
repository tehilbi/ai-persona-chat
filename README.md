# AI Persona Chat
![Persona Chat](docs/screenshot.png)

A full-stack chat app powered by Claude API. Pick a persona — Tutor, Career Mentor, or Code Reviewer — and chat with Claude in that role. Each response is returned as a single, complete message.

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
- Claude API via client.messages.create()
- Multi-turn conversation history (stateless API, stateful client)
- React frontend consuming a Flask JSON API



