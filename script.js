// ======================================================
// ===== ОБЩИЕ НАСТРОЙКИ =====
// ======================================================

// ===== ФОН ПО СЕЗОНУ =====
const month = new Date().getMonth();
let season = "winter";

if (month >= 2 && month <= 4) season = "spring";
if (month >= 5 && month <= 7) season = "summer";
if (month >= 8 && month <= 10) season = "autumn";

document.body.style.backgroundImage = `url(assets/bg/${season}.jpg)`;

// ===== СНЕГ (только для зимы) =====
const canvas = document.getElementById("weather");
const ctx = canvas.getContext("2d");

// canvas не перехватывает клики
canvas.style.pointerEvents = "none";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 120; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 5 + 2,
    s: Math.random() * 1 + 1
  });
}

function drawSnowflake(x, y, r) {
  const spikes = 6;
  const step = (Math.PI * 2) / spikes;

  ctx.beginPath();
  ctx.arc(x, y, r / 2, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.8)";
  ctx.lineWidth = 1;

  for (let i = 0; i < spikes; i++) {
    const angle = i * step;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
      x + Math.cos(angle) * r,
      y + Math.sin(angle) * r
    );
    ctx.stroke();
  }
}

function drawSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    drawSnowflake(p.x, p.y, p.r);
    p.y += p.s;
    if (p.y > canvas.height) p.y = 0;
  });

  requestAnimationFrame(drawSnow);
}

if (season === "winter") drawSnow();


// ======================================================
// ===== ОПРЕДЕЛЕНИЕ ВЕРСИИ (DESKTOP / MOBILE) =====
// ======================================================

let isMobile = window.innerWidth <= 768;

const desktopContainer = document.querySelector(".desktop-version");
const mobileContainer = document.querySelector(".mobile-version");

function showCorrectVersion() {
  desktopContainer.style.display = isMobile ? "none" : "block";
  mobileContainer.style.display = isMobile ? "block" : "none";
}

showCorrectVersion();


// ======================================================
// ===== DESKTOP VERSION LOGIC =====
// ======================================================

function initDesktop() {
  const buttons = desktopContainer.querySelectorAll(".menu button");
  const sections = desktopContainer.querySelectorAll(".section");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.section;

      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      sections.forEach(sec => sec.classList.remove("active"));
      desktopContainer.querySelector(`#${target}`).classList.add("active");
    });
  });
}


// ======================================================
// ===== MOBILE VERSION LOGIC =====
// ======================================================

function initMobile() {
  const buttons = mobileContainer.querySelectorAll(".menu button");
  const sections = mobileContainer.querySelectorAll(".section");
  const sidebar = mobileContainer.querySelector(".sidebar");
  const content = mobileContainer.querySelector(".content");
  const burger = mobileContainer.querySelector(".burger");

  if (!burger) return;

  burger.onclick = () => {
    sidebar.classList.toggle("open");
    content.classList.toggle("shifted");
  };

  buttons.forEach(btn => {
    btn.onclick = () => {
      const target = btn.dataset.section;

      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      sections.forEach(sec => sec.classList.remove("active"));
      mobileContainer.querySelector(`#${target}`).classList.add("active");

      sidebar.classList.remove("open");
      content.classList.remove("shifted");
    };
  });
}


// ======================================================
// ===== ИНИЦИАЛИЗАЦИЯ =====
// ======================================================

if (isMobile) {
  initMobile();
} else {
  initDesktop();
}


// ======================================================
// ===== RESIZE (БЕЗ ПЕРЕЗАГРУЗКИ)
// ======================================================

window.addEventListener("resize", () => {
  const isMobileNow = window.innerWidth <= 768;

  if (isMobileNow !== isMobile) {
    isMobile = isMobileNow;
    showCorrectVersion();

    if (isMobile) {
      initMobile();
    } else {
      initDesktop();
    }
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
