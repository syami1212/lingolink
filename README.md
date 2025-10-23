# 🐥 LingoLink

**Practice real conversations in any language!**  
LingoLink is an interactive language-learning chat website that lets you talk naturally with an AI tutor, powered by the Hugging Face model `google/gemma-3-1b-it`.

---

## Features

**Multi-language support** – Practice Spanish, French, Japanese, German, or Italian.  
**Real AI conversations** – Replies are generated live using Hugging Face’s `transformers` pipeline.  
**Cute, friendly UI** – Minimal design with pastel colors and emojis for extra motivation.  
**Local + Offline capable** – Runs through a lightweight Flask backend.  

---

## Tech Stack

| Layer | Tools Used |
|-------|-------------|
| **Frontend** | HTML, CSS, JavaScript (vanilla) |
| **Backend** | Python (Flask) |
| **AI Model** | Hugging Face — `google/gemma-3-1b-it` |
| **Libraries** | `transformers`, `torch`, `flask`, `huggingface_hub` |

---

## Setup Instructions

### 1️⃣ Clone the repo
git clone https://github.com/<your-username>/lingolink.git

cd lingolink
### 2️⃣ Install dependencies
pip install -r requirements.txt
### 3️⃣ Run the Python server
python main.py
### 4️⃣ Open the app
Just double-click index.html or open it in your browser.
Then choose a language and start chatting!

##  How it Works
- The frontend sends messages via fetch() to http://localhost:5001/api/chat.
- Flask receives the message and calls the Hugging Face model using transformers.pipeline().
- The generated text is sent back and displayed in the chat box.
