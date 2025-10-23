from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Load Gemma-3-1B-IT (small and CPU-friendly)
pipe = pipeline("text-generation", model="google/gemma-3-1b-it")

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    language = data.get("language", "English")

    # Prompt the model with a teaching context
    messages = [
        {
            "role": "user",
            "content": (
                f"You are Lingo, a friendly {language} tutor chatbot. "
                f"Respond in {language}, include a short English translation in parentheses. "
                f"Student: {user_message}"
            ),
        },
    ]

    try:
        # Generate a response
        outputs = pipe(messages, max_new_tokens=120)
        # Extract text (Gemma returns a list of dicts)
        reply = outputs[0]["generated_text"][-1]["content"]
    except Exception as e:
        print("Error:", e)
        reply = "⚠️ Lingo is having trouble thinking right now!"

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)

