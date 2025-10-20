let interval;
let totalSeconds;
let earningPerSecond = 0;
let currentEarning = 0;
let lastWhole = 0;

document.getElementById("startBtn").addEventListener("click", startWork);
document.getElementById("stopBtn").addEventListener("click", stopWork);

function startWork() {
  const salary = parseFloat(document.getElementById("salary").value);
  const hours = parseFloat(document.getElementById("hours").value);
  const days = parseFloat(document.getElementById("days").value);

  if (isNaN(salary) || isNaN(hours) || isNaN(days)) {
    alert("Please fill in all fields correctly!");
    return;
  }

  const weeklySalary = salary / 4;
  const hourlyRate = weeklySalary / (hours * days);
  earningPerSecond = hourlyRate / 3600;

  totalSeconds = hours * 3600;
  currentEarning = 0;
  lastWhole = 0;

  clearInterval(interval);
  interval = setInterval(updateTimer, 1000);
}

function stopWork() {
  clearInterval(interval);
}

function updateTimer() {
  if (totalSeconds <= 0) {
    clearInterval(interval);
    alert("Work session complete! 🎉");
    return;
  }

  totalSeconds--;
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  document.getElementById("timerDisplay").textContent =
    `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;

  currentEarning += earningPerSecond;
  document.getElementById("earning").textContent = currentEarning.toFixed(2);

  const whole = Math.floor(currentEarning);
  if (whole > lastWhole) {
    lastWhole = whole;
    goldRain();
  }
}

function goldRain() {
  const goldContainer = document.getElementById("goldContainer");
  const goldCount = 25;

  for (let i = 0; i < goldCount; i++) {
    const gold = document.createElement("div");
    gold.classList.add("gold");
    gold.style.left = Math.random() * 100 + "vw";
    gold.style.animationDuration = (1 + Math.random() * 2) + "s";
    gold.style.width = gold.style.height = (20 + Math.random() * 20) + "px";
    goldContainer.appendChild(gold);
    setTimeout(() => gold.remove(), 3000);
  }

  const audio = new Audio("coin.mp3");
  audio.play();
}

/* THEME STORE */
const themeModal = document.getElementById("themeModal");
document.getElementById("themeStoreBtn").onclick = () => themeModal.classList.remove("hidden");
document.getElementById("closeTheme").onclick = () => themeModal.classList.add("hidden");

document.querySelectorAll(".theme").forEach(t => {
  t.addEventListener("click", () => {
    if (t.classList.contains("locked")) {
      alert("Unlock this premium theme in the future 💎");
      return;
    }
    const theme = t.dataset.theme;
    applyTheme(theme);
    themeModal.classList.add("hidden");
  });
});

function applyTheme(theme) {
  const body = document.body;
  switch(theme) {
    case "sunset":
      body.style.background = "linear-gradient(180deg, #ff9966, #ff5e62)";
      break;
    case "galaxy":
      body.style.background = "radial-gradient(circle, #0f0c29, #302b63, #24243e)";
      break;
    default:
      body.style.background = "linear-gradient(180deg, #0f2027, #203a43, #2c5364)";
  }
}
