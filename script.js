// ===== ФОН ПО СЕЗОНУ =====
const month = new Date().getMonth();
let season = "winter";

if (month >= 2 && month <= 4) season = "spring";
if (month >= 5 && month <= 7) season = "summer";
if (month >= 8 && month <= 10) season = "autumn";

document.body.style.backgroundImage = `url(assets/bg/${season}.jpg)`;

// ===== СНЕГ (ПУШИСТЫЙ, С ЛУЧИКАМИ) =====
const canvas = document.getElementById("weather");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

// Создаём снежинки
for (let i = 0; i < 120; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 5 + 2,   // радиус: 2-7px (можно менять)
    s: Math.random() * 1 + 1    // скорость падения: 1-3px (можно менять)
  });
}

// Функция для рисования пушистой снежинки
function drawSnowflake(x, y, r) {
  const spikes = 6; // количество лучиков (можно менять)
  const step = (Math.PI * 2) / spikes;
  
  // Центральный кружок
  ctx.beginPath();
  ctx.arc(x, y, r / 2, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.9)"; // чуть прозрачный центр
  ctx.fill();

  // Лучики
  ctx.strokeStyle = "rgba(255,255,255,0.8)"; // прозрачные пушистые лучики
  ctx.lineWidth = 1; // толщина линии, можно уменьшить 0.5 для мягкости

  for (let i = 0; i < spikes; i++) {
    const angle = i * step;
    const xEnd = x + Math.cos(angle) * r;
    const yEnd = y + Math.sin(angle) * r;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(xEnd, yEnd);
    ctx.stroke();
  }
}

// Основная функция отрисовки снега
function drawSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    drawSnowflake(p.x, p.y, p.r); // пушистая снежинка
    p.y += p.s;
    if (p.y > canvas.height) p.y = 0;
  });

  requestAnimationFrame(drawSnow);
}

// Запуск снега только зимой
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



// ======================================================
// ДОБАВЛЕНО: мобильное меню (НЕ ЛОМАЕТ DESKTOP)
// ======================================================

const burger = document.querySelector(".burger");
const sidebar = document.querySelector(".sidebar");
const content = document.querySelector(".content");

if (burger) {
  burger.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    content.classList.toggle("shifted");
  });

  document.querySelectorAll(".menu button").forEach(btn => {
    btn.addEventListener("click", () => {
      sidebar.classList.remove("open");
      content.classList.remove("shifted");
    });
  });
}