// theme.js
// Safe theme applier (no music dependencies)
(() => {
  const CONFIG = window.VALENTINE_CONFIG;
  if (!CONFIG) return;

  document.documentElement.style.setProperty("--bg-start", CONFIG.colors.backgroundStart);
  document.documentElement.style.setProperty("--bg-end", CONFIG.colors.backgroundEnd);
  document.documentElement.style.setProperty("--btn-bg", CONFIG.colors.buttonBackground);
  document.documentElement.style.setProperty("--btn-hover", CONFIG.colors.buttonHover);
  document.documentElement.style.setProperty("--text", CONFIG.colors.textColor);
})();
