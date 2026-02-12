// script.js
const CONFIG = window.VALENTINE_CONFIG;

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function startFloatingEmojis() {
  const host = document.querySelector(".floating-elements");
  if (!host) return;

  const all = [
    ...(CONFIG.floatingEmojis?.hearts || []),
    ...(CONFIG.floatingEmojis?.bears || [])
  ];
  if (!all.length) return;

  setInterval(() => {
    const el = document.createElement("div");
    el.className = "floating-emoji";
    el.textContent = all[Math.floor(Math.random() * all.length)];

    el.style.left = `${randInt(0, Math.max(0, window.innerWidth - 30))}px`;
    el.style.animationDuration = `${CONFIG.animations.floatDurationMs}ms`;

    host.appendChild(el);

    setTimeout(() => el.remove(), CONFIG.animations.floatDurationMs + 1200);
  }, CONFIG.animations.floatIntervalMs);
}

function moveButton(button) {
  const padding = 16;

  const rect = button.getBoundingClientRect();
  const btnW = rect.width || 140;
  const btnH = rect.height || 50;

  const maxX = Math.max(padding, window.innerWidth - btnW - padding);
  const maxY = Math.max(padding, window.innerHeight - btnH - padding);

  const x = randInt(padding, maxX);
  const y = randInt(padding, maxY);

  button.style.position = "fixed";
  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
  button.style.zIndex = "10";
}

function renderCelebrationEmojis() {
  const emojiContainer = document.getElementById("celebrationEmojis");
  emojiContainer.innerHTML = "";

  (CONFIG.celebration.emojis || "").split("").forEach((ch) => {
    if (!ch.trim()) return;
    const span = document.createElement("span");
    span.className = "bounce-emoji";
    span.textContent = ch;
    emojiContainer.appendChild(span);
  });
}

function triggerSparkles() {
  const old = document.querySelector(".sparkle-layer");
  if (old) old.remove();

  const layer = document.createElement("div");
  layer.className = "sparkle-layer";
  document.body.appendChild(layer);

  const sparkles = ["✨", "✦", "✧", "💖", "⭐"];
  const count = 28;

  for (let i = 0; i < count; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];

    s.style.left = `${Math.random() * window.innerWidth}px`;
    s.style.top = `${Math.random() * window.innerHeight}px`;
    s.style.animationDelay = `${Math.random() * 260}ms`;

    layer.appendChild(s);
  }

  setTimeout(() => layer.remove(), 1200);
}

function celebrate() {
  document.getElementById("questionSingle").classList.add("hidden");
  document.getElementById("celebration").classList.remove("hidden");

  document.getElementById("celebrationTitle").textContent = CONFIG.celebration.title;
  document.getElementById("celebrationMessage").textContent = CONFIG.celebration.message;

  renderCelebrationEmojis();
  triggerSparkles();
}

function openNote() {
  const noteText = CONFIG.celebration.noteText || "";
  // Convert newlines into paragraphs visually
  document.getElementById("noteBody").innerHTML =
    escapeHtml(noteText).replace(/\n\s*\n/g, "<br><br>").replace(/\n/g, "<br>");

  const modal = document.getElementById("noteModal");
  modal.classList.remove("hidden");

  // Re-trigger fold animation each time (by forcing reflow)
  const card = document.getElementById("noteCard");
  card.style.animation = "none";
  // eslint-disable-next-line no-unused-expressions
  card.offsetHeight; // reflow
  card.style.animation = "";
}

function closeNote() {
  document.getElementById("noteModal").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  // Title + question
  document.getElementById("valentineTitle").textContent = CONFIG.valentineName;
  document.getElementById("questionText").textContent = CONFIG.question.text;
  document.getElementById("hintText").textContent = CONFIG.question.hintText;

  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");

  yesBtn.textContent = CONFIG.question.yesBtn;
  noBtn.textContent = CONFIG.question.noBtn;

  // No button escapes
  noBtn.addEventListener("mouseenter", () => moveButton(noBtn));
  noBtn.addEventListener("mousedown", () => moveButton(noBtn));
  noBtn.addEventListener("touchstart", () => moveButton(noBtn), { passive: true });

  // Yes -> celebrate + sparkles
  yesBtn.addEventListener("click", celebrate);

  // Note open/close
  document.getElementById("openNoteBtn").addEventListener("click", openNote);
  document.getElementById("closeNoteBtn").addEventListener("click", closeNote);
  document.getElementById("noteBackdrop").addEventListener("click", closeNote);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNote();
  });

  // Start background floaters
  startFloatingEmojis();
});
