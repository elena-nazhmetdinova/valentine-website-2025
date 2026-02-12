const CONFIG = window.VALENTINE_CONFIG;

// Keep your existing moveButton behavior if it already exists in your old script.
// If not, this version implements a classic "escape" button.
function moveButton(button) {
    const padding = 16;
    const btnRect = button.getBoundingClientRect();
    const btnW = btnRect.width || 140;
    const btnH = btnRect.height || 50;

    const maxX = Math.max(padding, window.innerWidth - btnW - padding);
    const maxY = Math.max(padding, window.innerHeight - btnH - padding);

    const x = Math.floor(Math.random() * (maxX - padding + 1)) + padding;
    const y = Math.floor(Math.random() * (maxY - padding + 1)) + padding;

    button.style.position = "fixed";
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
    button.style.zIndex = "10";
}

function celebrate() {
    // Hide question, show celebration
    document.getElementById("questionSingle").classList.add("hidden");
    document.getElementById("celebration").classList.remove("hidden");

    // Fill celebration content
    document.getElementById("celebrationTitle").textContent = CONFIG.celebration.title;
    document.getElementById("celebrationMessage").textContent = CONFIG.celebration.message;
    document.getElementById("celebrationEmojis").textContent = CONFIG.celebration.emojis;
}

// Note modal handlers
function openNote() {
    document.getElementById("noteBody").textContent = CONFIG.celebration.noteText;
    document.getElementById("noteModal").classList.remove("hidden");
}

function closeNote() {
    document.getElementById("noteModal").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
    // Title
    document.getElementById("valentineTitle").textContent = CONFIG.valentineName;

    // Question + buttons
    document.getElementById("questionText").textContent = CONFIG.question.text;
    document.getElementById("hintText").textContent = CONFIG.question.hintText;

    document.getElementById("yesBtn").textContent = CONFIG.question.yesBtn;
    document.getElementById("noBtn").textContent = CONFIG.question.noBtn;

    // Make NO button extra slippery (moves on hover + click/touch attempts)
    const noBtn = document.getElementById("noBtn");
    noBtn.addEventListener("mouseenter", () => moveButton(noBtn));
    noBtn.addEventListener("mousedown", () => moveButton(noBtn));
    noBtn.addEventListener("touchstart", () => moveButton(noBtn), { passive: true });

    // Note open/close
    document.getElementById("openNoteBtn").addEventListener("click", openNote);
    document.getElementById("closeNoteBtn").addEventListener("click", closeNote);
    document.getElementById("noteBackdrop").addEventListener("click", closeNote);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeNote();
    });
});
