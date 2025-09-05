// variables =====================================
const pointsButtonsEl = document.querySelectorAll(
  ".scoreboard .scoreboard-btn"
);
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
  isPlaying: true,
  fouls: 0,
  commitsFoul: false,
};

const guestPlayer = {
  score: 0,
  isPlaying: false,
  fouls: 0,
  commitsFoul: false,
};

let gameActive = true;

// event listeners ===========================
newGameBtn.addEventListener("click", (e) => {
  // start game if gameActive true
  if (gameActive) {
    runGame();
  }
});

// functions ====================================
function handleScoreBtnClicked(target, obj) {
  pointsButtonsEl.forEach((pointEl) => {
    pointEl.addEventListener("click", (e) => {
      const value = +pointEl.dataset.points;
      obj.score += value;
      renderScore(target, obj);
    });
  });
}

function runGame() {
  if (homePlayer.isPlaying) {
    toggleActiveClass(homeScoreboardEl);
    updateMessage("Home player's turn");
    disableButtons(guestScoreboardEl);
    addDisabledClass(guestScoreboardEl);
    removeDisabledClass(homeScoreboardEl);
    handleScoreBtnClicked(homeScoreEl, homePlayer);
  } else {
    toggleActiveClass(guestScoreboardEl);
    updateMessage("Guest player's turn");
    disableButtons(homeScoreboardEl);
    addDisabledClass(homeScoreboardEl);
    removeDisabledClass(guestScoreboardEl);
    handleScoreBtnClicked(guestScoreEl, guestPlayer);
  }
}

function updateMessage(message) {
  messageEl.textContent = message;
}

function toggleActiveClass(el) {
  el.classList.toggle("active");
}

function disableButtons(targetEl) {
  const targetButtons = targetEl.querySelectorAll("button");
  targetButtons.forEach((b) => (b.disabled = true));
}

function addDisabledClass(targetEl) {
  const targetButtons = targetEl.querySelectorAll("button");
  targetButtons.forEach((b) => b.classList.add("disabled"));
}

function removeDisabledClass(targetEl) {
  const targetButtons = targetEl.querySelectorAll("button");
  targetButtons.forEach((b) => b.classList.remove("disabled"));
}

function renderScore(targetEl, obj) {
  targetEl.textContent = obj.score;
}
