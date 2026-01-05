// ===== ФОН ПО СЕЗОНУ =====
const month = new Date().getMonth();
let season = "winter";

if (month >= 2 && month <= 4) season = "spring";
if (month >= 5 && month <= 7) season = "summer";
if (month >= 8 && month <= 10) season = "autumn";

document.body.style.backgroundImage = `url(assets/bg/${season}.jpg)`;

// ===== СНЕГ =====
const canvas = document.getElementById("weather");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 120; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    s: Math.random() + 0.5
  });
}

function drawSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.y += p.s;
    if (p.y > canvas.height) p.y = 0;
  });

  requestAnimationFrame(drawSnow);
}

if (season === "winter") drawSnow();

// ===== МЕНЮ =====
const buttons = document.querySelectorAll(".menu button");
const sections = document.querySelectorAll(".section");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.section;

    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(target).classList.add("active");
  });
});
