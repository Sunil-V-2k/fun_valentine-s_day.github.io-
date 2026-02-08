/* PAGE NAVIGATION */
function goToPage(n) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("page" + n).classList.add("active");
}

function sayYes() {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("lovePage").classList.add("active");
}

/* FLOATING HEARTS */
const heartsContainer = document.getElementById("hearts-container");
setInterval(() => {
  const h = document.createElement("div");
  h.className = "heart";
  h.innerText = "❤️";
  h.style.left = Math.random() * 100 + "vw";
  h.style.animationDuration = (Math.random() * 3 + 4) + "s";
  heartsContainer.appendChild(h);
  setTimeout(() => h.remove(), 7000);
}, 350);

/* 🎵 MUSIC AUTOPLAY (MUTED) + UNMUTE ON INTERACTION */
const music = document.getElementById("bgMusic");
const heartbeat = document.getElementById("heartbeat");
let unmuted = false;

function unmuteMusic() {
  if (unmuted) return;
  unmuted = true;

  music.muted = false;
  music.volume = 0;
  music.play().catch(() => {});

  let v = 0;
  const fade = setInterval(() => {
    v += 0.02;
    music.volume = Math.min(v, 0.7);
    if (v >= 0.7) clearInterval(fade);
  }, 100);
}

["click","pointerdown","touchstart","mousemove","keydown"].forEach(e =>
  document.addEventListener(e, unmuteMusic, { once: true })
);

music.addEventListener("play", () => heartbeat.classList.add("active"));
music.addEventListener("pause", () => heartbeat.classList.remove("active"));

/* 😈 FINAL PAGE NO BUTTON ESCAPE + SOUND */
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const finalButtons = document.getElementById("finalButtons");
const escapeSound = document.getElementById("escapeSound");

let last = 0, flip = false;

function escapeNo() {
  const now = performance.now();
  if (now - last < 60) return;
  last = now;

  flip
    ? finalButtons.insertBefore(yesBtn, noBtn)
    : finalButtons.insertBefore(noBtn, yesBtn);

  flip = !flip;

  escapeSound.currentTime = 0;
  escapeSound.play().catch(() => {});
}

if (noBtn) {
  noBtn.addEventListener("pointermove", escapeNo);
  noBtn.addEventListener("pointerdown", escapeNo);
  noBtn.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
  });
}