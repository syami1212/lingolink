const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const languageSelect = document.getElementById("language");
const startBtn = document.getElementById("startBtn");
const chatArea = document.getElementById("chatArea");


let chosenLang = "";

// Language intro prompts
const intros = {
  spanish: "¡Hola! Let’s practice Spanish! Try saying 'Hello', 'How are you?', or 'Good morning.'",
  french: "Salut ! Let’s practice French! Try saying 'Hello', 'How are you?', or 'Good morning.'",
  japanese: "こんにちは！Let’s practice Japanese greetings. Try 'Hello', 'Thank you', or 'Good night.'",
  german: "Hallo! Let’s practice German! Try 'Hello', 'Good morning', or 'Thank you.'",
  italian: "Ciao! Let’s practice Italian! Try 'Hello', 'Good morning', or 'Good night.'"
};

// Basic replies
const responses = {
  spanish: { "hello": "👋 ¡Hola!", "thank you": "🙏 De nada.", "good morning": "☀️ ¡Buenos días!" },
  french: { "hello": "👋 Bonjour!", "thank you": "🙏 De rien.", "good morning": "☀️ Bonjour!" },
  japanese: { "hello": "👋 こんにちは (Konnichiwa)", "thank you": "🙏 ありがとう (Arigatou)", "good night": "🌙 おやすみ (Oyasumi)" },
  german: { "hello": "👋 Hallo!", "thank you": "🙏 Bitte!", "good morning": "☀️ Guten Morgen!" },
  italian: { "hello": "👋 Ciao!", "thank you": "🙏 Prego!", "good night": "🌙 Buona notte!" },
};

// Add message to chat box
function addMessage(text, sender, isTyping = false) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
  
  // 🐥 Add cute bird avatar for bot messages
  if (sender === "bot") {
    const avatar = document.createElement("div");
    avatar.classList.add("lingo-avatar");
    avatar.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="#ffe066" stroke="#ffb703" stroke-width="3"/>
        <circle cx="24" cy="28" r="4" fill="#333"/>
        <circle cx="40" cy="28" r="4" fill="#333"/>
        <polygon points="32,34 28,42 36,42" fill="#ff9a8b"/>
      </svg>
    `;
    msgDiv.appendChild(avatar);
  }

  const textSpan = document.createElement("span");
  textSpan.textContent = text;
  msgDiv.appendChild(textSpan);

  if (isTyping) msgDiv.classList.add("typing");

  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}


// Handle input
async function handleInput() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  // Use AI for a response
  addMessage("🐥 Lingo is thinking...", "bot", true);

  try {
    const reply = await getAIResponse(text, chosenLang);
    const lastBotMsg = document.querySelectorAll(".bot-message");
    lastBotMsg[lastBotMsg.length - 1].textContent = reply;
  } catch (err) {
    console.error(err);
    addMessage("⚠️ Sorry, I’m having trouble connecting to Lingo’s brain right now!", "bot");
  }
}


// Start the chat when a language is selected
startBtn.addEventListener("click", () => {
  const lang = languageSelect.value;
  chosenLang = lang;
  document.querySelector(".language-select").style.display = "none";
  chatArea.style.display = "flex";
  addMessage(`Let's practice ${lang}!`, "bot");
});


// Attach listeners *after* the chat area is visible
sendBtn.addEventListener("click", handleInput);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleInput();
});

// 🧠 Function to call Hugging Face model
// store previous messages for context
let conversationHistory = [];

async function getAIResponse(userMessage, language) {
  try {
    const response = await fetch("http://127.0.0.1:5001/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage, language }),
    });
    const data = await response.json();
    return data.reply || "🤔 No reply from Lingo.";
  } catch (err) {
    console.error(err);
    return "⚠️ Couldn't reach Lingo's brain — is the Python server running?";
  }
}

