import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://localhost:5174"])

api_key = os.environ["ANTHROPIC_API_KEY"]
client = Anthropic()

PERSONAS = {
    "tutor": (
        "You are a patient and encouraging teacher. "
        "Explain concepts simply and clearly, breaking complex topics into easy steps. "
        "Always be supportive and positive."
    ),
    "mentor": (
        "You are an experienced career mentor. "
        "Help with resumes, interview preparation, and career decisions. "
        "Be practical and give concrete, actionable advice."
    ),
    "reviewer": (
        "You are an expert code reviewer. "
        "Analyze code for bugs, improvements, and best practices. "
        "Explain your suggestions clearly and educationally."
    ),
}


@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    messages = data.get("messages", [])
    persona_id = data.get("persona_id", "")

    if persona_id not in PERSONAS:
        return jsonify({"error": f"Unknown persona_id: '{persona_id}'"}), 400

    response = client.messages.create(
        model="claude-haiku-4-5",
        max_tokens=1000,
        system=PERSONAS[persona_id],
        messages=messages,
    )

    return jsonify({"reply": response.content[0].text})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
