document.addEventListener("DOMContentLoaded", () => {

  /* PAGE SWITCH */
  function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  }

  /* MUSIC + HEARTBEAT */
  const music = document.getElementById("bgMusic");
  const heartbeat = document.getElementById("heartbeat");
  let musicStarted = false;

  function startMusic() {
    if (musicStarted) return;
    musicStarted = true;

    music.volume = 0;
    music.play().catch(() => {});

    let v = 0;
    const fade = setInterval(() => {
      v += 0.02;
      music.volume = Math.min(v, 0.7);
      if (v >= 0.7) clearInterval(fade);
    }, 100);

    heartbeat.classList.add("active");
  }

  /* PAGE 1 */
  document.getElementById("p1yes").onclick = () => {
    startMusic();
    showPage("lovePage");
  };

  document.getElementById("p1no").onclick = () => {
    startMusic();
    showPage("page2");
  };

  /* PAGE 2 */
  document.getElementById("p2yes").onclick = () => showPage("lovePage");
  document.getElementById("p2no").onclick = () => showPage("page3");

  /* PAGE 3 */
  document.getElementById("p3yes").onclick = () => showPage("lovePage");
  document.getElementById("p3no").onclick = () => showPage("page4");

  /* FINAL PAGE ESCAPE 😈 */
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const finalButtons = document.getElementById("finalButtons");
  const escapeSound = document.getElementById("escapeSound");

  let flip = false;
  let last = 0;

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

  noBtn.addEventListener("pointermove", escapeNo);
  noBtn.addEventListener("pointerdown", escapeNo);
  noBtn.onclick = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  yesBtn.onclick = () => showPage("lovePage");

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

});
