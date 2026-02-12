// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
  // Name (no "my love")
  valentineName: "Thijs!",

  // Tab title
  pageTitle: "Will You Be My Valentine? 💝",

  // Background floating emojis
  floatingEmojis: {
    hearts: ["❤️", "💖", "💝", "💗", "💓"],
    bears: ["🧸", "🐻"],
  },

  // Single question only
  question: {
    text: "Will you be my Valentine? 🌹",
    yesBtn: "Yes",
    noBtn: "No",
    hintText: "Try to say no...",
  },

  // After "Yes"
  celebration: {
    title: "Aww! I'm the luckiest homikje!",
    message: "Here is a small note for you.",
    noteButtonText: "Open note 💌",
    noteText:
      "Spend this Valentine with me, my love! 
      At 17:00, Saturday, at Archibald Restaurant Bussum.",
    floatingEmojis: {
    hearts: ["❤️", "💖", "💝", "💗", "💓"],
  },

  // Colors
  colors: {
    backgroundStart: "#ffafbd",
    backgroundEnd: "#ffc3a0",
    buttonBackground: "#ff6b6b",
    buttonHover: "#ff8787",
    textColor: "#ff4757",
  },

  // Animations
  animations: {
    floatDuration: "15s",
    floatDistance: "50px",
    bounceSpeed: "0.5s",
    heartExplosionSize: 1.5,
  },

  // (Removed) music config entirely ✅
};

window.VALENTINE_CONFIG = CONFIG;
