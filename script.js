// Random Farming Tips
const tips = [
  "Use organic compost to enrich soil fertility 🌱",
  "Rotate crops to prevent pest buildup 🐛",
  "Irrigate in the morning to reduce evaporation 💧",
  "Use drip irrigation to save water 💦",
  "Plant native crops for better resilience 🌾",
  "Test your soil regularly to monitor nutrient needs 🧪",
  "Use mulching to conserve soil moisture 🍂",
  "Adopt intercropping for better pest management 🌿"
];

const tipPopup = document.getElementById("tipPopup");

document.getElementById("tipBtn").addEventListener("click", (e) => {
  e.stopPropagation();
  const tip = tips[Math.floor(Math.random() * tips.length)];
  tipPopup.textContent = tip;
  tipPopup.style.display = "block";
});

document.addEventListener("click", (e) => {
  if (tipPopup.style.display === "block" && !tipPopup.contains(e.target) && e.target.id !== "tipBtn") {
    tipPopup.style.display = "none";
  }
});

// Crop Advisory Demo
document.getElementById("getAdvisory").addEventListener("click", () => {
  const crop = document.getElementById("crop").value.trim();
  const symptom = document.getElementById("symptom").value.trim();
  const resultBox = document.getElementById("advisoryResult");

  if (!crop || !symptom) {
    resultBox.textContent = "⚠️ Please enter both crop and symptom.";
    return;
  }

  resultBox.textContent = `For your ${crop}, symptom "${symptom}" detected. Suggested Action: Apply balanced fertilizer, ensure proper irrigation, and consider organic pest control. 🌱`;
});

// Bulletin News Strip (Right to Left)
const schemes = [
  "PM-Kisan Samman Nidhi - Financial support to farmers",
  "Soil Health Card Scheme - Free soil testing & nutrients info",
  "Pradhan Mantri Fasal Bima Yojana - Crop insurance",
  "Kisan Credit Card - Easy loans for farmers",
  "National Food Security Mission - Enhance crop production",
  "Rashtriya Krishi Vikas Yojana - Modern farming support",
  "Per Drop More Crop - Micro irrigation & water efficiency",
  "Agri Market Infrastructure Scheme - Better market access",
  "Organic Farming Support - Training & subsidies",
  "Paramparagat Krishi Vikas Yojana - Promote sustainable agriculture"
];

const bulletin = document.getElementById("bulletin");
let currentScheme = 0;

function showNextScheme() {
  bulletin.textContent = schemes[currentScheme];
  const width = bulletin.offsetWidth;
  let pos = bulletin.parentElement.offsetWidth;
  const speed = 2; // pixels per frame
  const fps = 16;

  const interval = setInterval(() => {
    pos -= speed;
    bulletin.style.transform = `translateX(${pos}px)`;
    if (pos <= -width) {
      clearInterval(interval);
      currentScheme = (currentScheme + 1) % schemes.length;
      setTimeout(showNextScheme, 1000); // 1s gap
    }
  }, fps);
}

showNextScheme();


