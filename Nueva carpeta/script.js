let currentPage = 1;
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicText = document.getElementById('musicText');
let isPlaying = false;

// === CONTADOR DE DÍAS ===
const startDate = new Date('2025-07-31');
const today = new Date('2025-10-30');
const diffTime = Math.abs(today - startDate);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
document.getElementById('daysCount').textContent = diffDays;

// === MÚSICA LOCAL ===
musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    musicText.textContent = 'Toca para música';
    musicBtn.classList.remove('playing');
  } else {
    music.play().then(() => {
      musicText.textContent = 'Perfect - Ed Sheeran';
      musicBtn.classList.add('playing');
    }).catch(err => {
      console.error("Error de audio:", err);
      alert("Error: Asegurate de tener 'perfect.mp3' en la carpeta.");
    });
  }
  isPlaying = !isPlaying;
});

// Loop infinito
music.addEventListener('ended', () => {
  music.currentTime = 0;
  if (isPlaying) music.play();
});

// === LLUVIA DE PÉTALOS 2D ===
function createPetal() {
  const petal = document.createElement('div');
  petal.classList.add('petal');
  
  petal.style.left = Math.random() * 100 + 'vw';
  
  const duration = Math.random() * 3 + 4;
  petal.style.animationDuration = duration + 's';
  petal.style.animationDelay = Math.random() * 0.5 + 's';

  const size = Math.random() * 8 + 16;
  petal.style.width = size + 'px';
  petal.style.height = (size * 1.5) + 'px';

  const rotate = Math.random() * 180 - 90;
  petal.style.transform = `rotate(${rotate}deg)`;

  document.querySelector('.petal-rain').appendChild(petal);
  
  setTimeout(() => {
    if (petal.parentNode) petal.remove();
  }, (duration + 1) * 1000);
}

// Crear muchos pétalos para fluidez
setInterval(createPetal, 180);
for (let i = 0; i < 30; i++) setTimeout(createPetal, i * 50);

// === ESTRELLAS AL TOCAR ===
document.addEventListener('click', (e) => {
  if (currentPage !== 1) return;
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.left = e.clientX - 2 + 'px';
  star.style.top = e.clientY - 2 + 'px';
  document.querySelector('.star-field').appendChild(star);
  setTimeout(() => star.remove(), 1000);
});

// === NAVEGACIÓN ===
function nextPage(n) {
  document.getElementById(`page${currentPage}`).classList.remove('active');
  document.getElementById(`page${currentPage}`).classList.add('hidden');
  currentPage = n;
  const next = document.getElementById(`page${n}`);
  next.classList.remove('hidden');
  setTimeout(() => next.classList.add('active'), 50);
}

function prevPage() {
  if (currentPage <= 1) return;
  document.getElementById(`page${currentPage}`).classList.remove('active');
  document.getElementById(`page${currentPage}`).classList.add('hidden');
  currentPage--;
  const prev = document.getElementById(`page${currentPage}`);
  prev.classList.remove('hidden');
  setTimeout(() => prev.classList.add('active'), 50);
}

function toggleCaption(card) {
  card.classList.toggle('tapped');
}

function sayYes() {
  nextPage(6);
  launchConfetti();
  new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-04.mp3').play().catch(() => {});
}

function sayNo() {
  alert("¡COMO QUE NO 😠😠! TENES QUE DECIR QUE SI NENA ");
}

function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = [];
  const colors = ['#ff6b9d', '#ff8cb4', '#fce4ec', '#f48fb1', '#ad1457', '#4caf50'];

  for (let i = 0; i < 400; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 8 + 3,
      d: Math.random() * 12 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10,
      tiltAngleIncremental: Math.random() * 0.08 + 0.04,
      tiltAngle: 0
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = 0;
    confetti.forEach((c) => {
      c.tiltAngle += c.tiltAngleIncremental;
      c.y += c.d;
      c.tilt = Math.sin(c.tiltAngle) * 15;

      if (c.y <= canvas.height) {
        active++;
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
        ctx.stroke();
      }
    });

    if (active > 0) requestAnimationFrame(draw);
  }

  draw();
}

window.addEventListener('resize', () => {
  const canvas = document.getElementById('confetti-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});