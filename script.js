(() => {
  const CONFIG = window.VALENTINE_CONFIG;

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme();
    renderSingleQuestion();
    startFloatingEmojis();
  });

  function applyTheme() {
    document.documentElement.style.setProperty("--bg-start", CONFIG.colors.backgroundStart);
    document.documentElement.style.setProperty("--bg-end", CONFIG.colors.backgroundEnd);
    document.documentElement.style.setProperty("--btn-bg", CONFIG.colors.buttonBackground);
    document.documentElement.style.setProperty("--btn-hover", CONFIG.colors.buttonHover);
    document.documentElement.style.setProperty("--text", CONFIG.colors.textColor);

    // If your CSS already uses these variables, great.
    // If not, you can add them to your CSS (see section 3 below).
  }

  function renderSingleQuestion() {
    // Assumes you have a main container element with id="app"
    // If your project uses a different root, change this selector.
    const root = document.getElementById("app") || document.body;

    root.innerHTML = `
      <div class="valentine-wrap">
        <h1 class="valentine-title">${escapeHtml(CONFIG.valentineName)}</h1>
        <p class="valentine-question">${escapeHtml(CONFIG.question.text)}</p>
        <p class="valentine-hint">${escapeHtml(CONFIG.question.hintText)}</p>

        <div class="valentine-actions">
          <button id="yesBtn" class="btn btn-yes">${escapeHtml(CONFIG.question.yesBtn)}</button>
          <button id="noBtn" class="btn btn-no">${escapeHtml(CONFIG.question.noBtn)}</button>
        </div>

        <div class="floating-layer" id="floatingLayer" aria-hidden="true"></div>
      </div>
    `;

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    // Keep "No" button moving/escaping
    makeButtonEscape(noBtn);

    yesBtn.addEventListener("click", () => {
      showCelebrationScreen();
    });
  }

  function showCelebrationScreen() {
    const root = document.getElementById("app") || document.body;

    root.innerHTML = `
      <div class="valentine-wrap">
        <h2 class="valentine-celebrate-title">${escapeHtml(CONFIG.celebration.title)}</h2>
        <p class="valentine-celebrate-msg">${escapeHtml(CONFIG.celebration.message)}</p>

        <button id="openNoteBtn" class="btn btn-yes">${escapeHtml(CONFIG.celebration.noteButtonText)}</button>

        <div class="celebrate-emojis" id="celebrateEmojis" aria-hidden="true"></div>
      </div>
    `;

    bounceEmojis();
    document.getElementById("openNoteBtn").addEventListener("click", () => {
      openNoteModal(CONFIG.celebration.noteText);
    });
  }

  function openNoteModal(noteText) {
    // Remove existing modal if any
    const old = document.getElementById("noteModal");
    if (old) old.remove();

    const modal = document.createElement("div");
    modal.id = "noteModal";
    modal.className = "note-modal";
    modal.innerHTML = `
      <div class="note-modal-backdrop" id="noteBackdrop"></div>
      <div class="note-modal-card" role="dialog" aria-modal="true" aria-label="Note">
        <h3 class="note-title">💌 Note</h3>
        <p class="note-text">${escapeHtml(noteText)}</p>
        <button class="btn btn-no" id="closeNoteBtn">Close</button>
      </div>
    `;

    document.body.appendChild(modal);

    const close = () => modal.remove();
    document.getElementById("closeNoteBtn").addEventListener("click", close);
    document.getElementById("noteBackdrop").addEventListener("click", close);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.getElementById("noteModal")) close();
    }, { once: true });
  }

  function makeButtonEscape(btn) {
    if (!btn) return;

    const move = () => {
      const padding = 16;

      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;

      // Button size (fallback if not rendered yet)
      const rect = btn.getBoundingClientRect();
      const btnW = rect.width || 120;
      const btnH = rect.height || 44;

      const maxX = Math.max(padding, viewportW - btnW - padding);
      const maxY = Math.max(padding, viewportH - btnH - padding);

      const x = randInt(padding, maxX);
      const y = randInt(padding, maxY);

      btn.style.position = "fixed";
      btn.style.left = `${x}px`;
      btn.style.top = `${y}px`;
      btn.style.zIndex = "10";
    };

    // Move on hover/touch attempts
    btn.addEventListener("mouseenter", move);
    btn.addEventListener("mousedown", move);
    btn.addEventListener("touchstart", move, { passive: true });

    // Optional: first nudge so user notices it moves
    setTimeout(move, 350);
  }

  function startFloatingEmojis() {
    const layer = document.getElementById("floatingLayer");
    if (!layer) return;

    const all = [...(CONFIG.floatingEmojis.hearts || []), ...(CONFIG.floatingEmojis.bears || [])];
    if (!all.length) return;

    setInterval(() => {
      const el = document.createElement("div");
      el.className = "floating-emoji";
      el.textContent = all[Math.floor(Math.random() * all.length)];

      const x = randInt(0, Math.max(0, window.innerWidth - 30));
      el.style.left = `${x}px`;
      el.style.animationDuration = CONFIG.animations.floatDuration;

      layer.appendChild(el);

      setTimeout(() => el.remove(), 20000);
    }, 450);
  }

  function bounceEmojis() {
    const host = document.getElementById("celebrateEmojis");
    if (!host) return;

    host.textContent = ""; // clear
    const emojis = (CONFIG.celebration.emojis || "").split("");

    emojis.forEach((ch) => {
      if (!ch.trim()) return;
      const el = document.createElement("span");
      el.className = "bounce-emoji";
      el.textContent = ch;
      host.appendChild(el);
    });
  }

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
})();
