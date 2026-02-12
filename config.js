// config.js
// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
  valentineName: "Thijs!",

  pageTitle: "Will You Be My Valentine? 💝",

  floatingEmojis: {
    hearts: ["❤️", "💖", "💝", "💗", "💓"],
    bears: ["🐹"] // hamster only
  },

  question: {
    text: "Will you be my Valentine? 🌹",
    hintText: "Try to say no...",
    yesBtn: "Yes",
    noBtn: "No"
  },

  celebration: {
    title: "Aww! I'm the luckiest homikje!",
    hearts: ["❤️", "💖", "💝", "💗", "💓"],
    bears: ["🐹"] // hamster only,
    noteText:
`Spend this Valentine with me, my love. 

At 17:00, Saturday, at Archibald Restaurant Bussum.

Elena xxx.`
  },

  colors: {
    backgroundStart: "#ffafbd",
    backgroundEnd: "#ffc3a0",
    buttonBackground: "#ff6b6b",
    buttonHover: "#ff8787",
    textColor: "#ff4757"
  },

  animations: {
    floatDurationMs: 16000, // general floating emoji rise time
    floatIntervalMs: 520,   // how often to spawn a floating emoji
    bounceSpeed: "0.5s"
  }
};

window.VALENTINE_CONFIG = CONFIG;
document.title = CONFIG.pageTitle;

  // (Removed) music config entirely ✅
};

window.VALENTINE_CONFIG = CONFIG;
