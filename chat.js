const messagesEl = document.getElementById("messages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");
const cameraBtn = document.getElementById("cameraBtn");
const imageInput = document.getElementById("imageInput");
const quickQs = document.querySelectorAll("#quickQs button");
const clearBtn = document.getElementById("clearBtn");

// Hardcoded responses and problem solutions
const cropData = {
  soil_ph: "Most crops prefer a pH between 6.0 and 7.5",
  irrigation: "Irrigate when soil feels dry 4–6 inches below surface",
  common_problems: {
    "powdery mildew": "Use fungicide sprays and ensure proper air circulation.",
    "leaf spot": "Remove infected leaves and apply copper-based fungicides.",
    "root rot": "Improve drainage and avoid overwatering.",
    "nutrient deficiency": "Conduct soil tests and apply balanced fertilizers.",
    "pest infestation (aphids)": "Spray neem oil or insecticidal soap.",
    "bacterial blight": "Remove infected plants and maintain field hygiene.",
    "stem borer": "Use pheromone traps and apply recommended insecticides.",
    "yellowing leaves": "Check for nitrogen deficiency and adjust fertilization.",
    "wilting": "Ensure proper irrigation and avoid root damage.",
    "fruit drop": "Avoid water stress and maintain proper fertilization."
  },
  weather_responses: [
    "Sunny with a chance of clouds",
    "Partly cloudy, light breeze",
    "Light rainfall expected",
    "Hot and humid conditions",
    "Cool and pleasant",
    "Overcast skies with mild wind",
    "Thunderstorms possible in some areas",
    "Foggy morning, clear afternoon",
    "High humidity with light showers",
    "Dry and sunny conditions",
    "Moderate rainfall expected",
    "Windy with scattered clouds",
    "Temperatures rising slightly",
    "Cool night, warm day",
    "Sunny intervals throughout the day"
  ]
};

// Add message to chat
function addMessage(text, sender) {
  const msgEl = document.createElement("div");
  msgEl.className = `message ${sender}`;
  msgEl.textContent = text;
  messagesEl.appendChild(msgEl);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Bot reply
function botReply(message) {
  const msg = message.toLowerCase().trim();

  // Check if message matches any specific problem
  for (const problem in cropData.common_problems) {
    if (msg.includes(problem)) {
      addMessage(cropData.common_problems[problem], "bot");
      return;
    }
  }

  // Check general queries
  if (msg.includes("weather")) {
    const randomIndex = Math.floor(Math.random() * cropData.weather_responses.length);
    addMessage(cropData.weather_responses[randomIndex], "bot");

  } else if (msg.includes("soil ph")) {
    addMessage(cropData.soil_ph, "bot");

  } else if (msg.includes("irrigation")) {
    addMessage(cropData.irrigation, "bot");

  } else if (msg.includes("problem") || msg.includes("pest")) {
    let response = "Common crop problems:\n";
    for (const prob in cropData.common_problems) {
      response += `• ${prob}\n`;
    }
    addMessage(response, "bot");

  } else if (msg.includes("help") || msg.includes("tips")) {
    addMessage("You can ask me about soil pH, irrigation, crop problems, specific problems, or weather.", "bot");

  } else {
    addMessage("Sorry, I can answer only basic agriculture questions.", "bot");
  }
}

// Send message
sendBtn.addEventListener("click", () => {
  const msg = userInput.value.trim();
  if (!msg) return;
  addMessage(msg, "user");
  userInput.value = "";
  botReply(msg);
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

// Quick question buttons
quickQs.forEach(btn => {
  btn.addEventListener("click", () => {
    const q = btn.dataset.q;
    addMessage(q, "user");
    botReply(q);
  });
});

// Voice input
if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-IN';

  voiceBtn.addEventListener("click", () => recognition.start());

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    addMessage(transcript, "user");
    botReply(transcript);
  };
}

// Image input
cameraBtn.addEventListener("click", () => imageInput.click());

imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const imgEl = document.createElement("img");
    imgEl.src = reader.result;
    imgEl.style.maxWidth = "100px";
    imgEl.style.borderRadius = "8px";
    addMessage("[Image uploaded]", "user");
    messagesEl.appendChild(imgEl);
  };
  reader.readAsDataURL(file);
});

// Clear chat
clearBtn.addEventListener("click", () => {
  messagesEl.innerHTML = "";
});






