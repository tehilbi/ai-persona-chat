from app import app

def test_empty_messages_returns_400():
    client = app.test_client()
    response = client.post("/api/chat", json={"persona_id": "tutor", "messages": []})
    assert response.status_code == 400

def test_long_message_returns_400():
    client = app.test_client()
    response = client.post("/api/chat", json={"persona_id": "mentor", "messages": [{"role": "user", "content": "a" * 2001}]})
    assert response.status_code == 400

def test_invalid_persona_id():
    client = app.test_client()
    response = client.post("/api/chat", json={"persona_id": "invalid", "messages": [{"role": "user", "content": "Hello!"}]})
    assert response.status_code == 400