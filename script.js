// ===== ФОН ПО СЕЗОНУ =====
const body = document.body;
const month = new Date().getMonth();

let season = "winter";
if (month >= 2 && month <= 4) season = "spring";
if (month >= 5 && month <= 7) season = "summer";
if (month >= 8 && month <= 10) season = "autumn";

document.body.style.backgroundImage = `url(assets/bg/${season}.jpg)`;

// ===== ПОГОДА =====
const canvas = document.getElementById("weather");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const isMobile = window.innerWidth < 768;
const count = isMobile ? 40 : 120;

for (let i = 0; i < count; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    s: Math.random() * 1 + 0.5
  });
}

function drawWeather() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.y += p.s;
    if (p.y > canvas.height) p.y = 0;
  });
  requestAnimationFrame(drawWeather);
}

if (season === "winter" || season === "autumn") {
  drawWeather();
}

// ===== МОБИЛЬНОЕ МЕНЮ =====
const menuBtn = document.querySelector(".mobile-menu-btn");
const sidebar = document.querySelector(".sidebar");
menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

// ===== ПЕРЕКЛЮЧЕНИЕ РАЗДЕЛОВ =====
const menuButtons = document.querySelectorAll(".menu button");
const sections = document.querySelectorAll(".section");

menuButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.section;

    menuButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    sections.forEach(sec => {
      if (sec.id === target) {
        sec.classList.add("active");
      } else {
        sec.classList.remove("active");
      }
    });

    if (window.innerWidth < 768) {
      sidebar.classList.remove("open");
    }
  });
});

// ===== РЕЗАЙЗ КАНВАСА =====
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
