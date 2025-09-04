// variables =====================================
const pointsButtonsEl = document.querySelectorAll(".scoreboard-btn");
const homeScoreEl = document.getElementById("home-score");
const guestScoreEl = document.getElementById("guest-score");
const homeScoreboardEl = document.getElementById("home");
const guestScoreboardEl = document.getElementById("guest");
const homeFoulsEl = document.getElementById("home-fouls");
const guestFoulsEl = document.getElementById("guest-fouls");
const homeFoulsCount = document.getElementById("home-fouls-count");
const guestFoulsCount = document.getElementById("guest-fouls-count");
const messageEl = document.getElementById("message");
const newGameBtn = document.getElementById("new-game");

const homePlayer = {
  score: 0,
  isActive: true,
  fouls: 0,
  commitsFoul: false,
};

const guestPlayer = {
  score: 0,
  isActive: false,
  fouls: 0,
  commitsFoul: false,
};

let gameActive = true;

// event listeners ===========================
