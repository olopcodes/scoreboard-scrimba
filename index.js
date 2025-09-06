// variables =====================================
const scoreButtons = document.querySelectorAll(".scoreboard .scoreboard-btn");
const homeScoreEl = document.getElementById("home-score");
const guestScoreEl = document.getElementById("guest-score");
const homeScoreboardContainer = document.getElementById("home");
const guestScoreboardContainer = document.getElementById("guest");
const homeFoulsEl = document.getElementById("home-fouls");
const guestFoulsEl = document.getElementById("guest-fouls");
const homeFoulsCount = document.getElementById("home-fouls-count");
const guestFoulsCount = document.getElementById("guest-fouls-count");
const messageEl = document.getElementById("message");
const newGameBtn = document.getElementById("new-game");
const modal = document.querySelector(".modal");
const rulesBtn = document.getElementById("btn-rules");

const homePlayer = {
  score: 0,
  isPlaying: true,
  fouls: 0,
};

const guestPlayer = {
  score: 0,
  isPlaying: false,
  fouls: 0,
};

let gameActive = false;

// event listeners ===========================
newGameBtn.addEventListener("click", (e) => {
  if (gameActive) return;
  gameActive = true;
  intial();
});

scoreButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (gameActive) {
      const score = +e.target.dataset.points;

      if (homePlayer.isPlaying) {
        updateScoreTotal(homePlayer, score);
        renderScore(homeScoreEl, homePlayer);
        // change player state
        toggleIsPlaying(homePlayer, guestPlayer);
        homePlayerGameState();
        //console.log(homePlayer);
      } else if (guestPlayer.isPlaying) {
        updateScoreTotal(guestPlayer, score);
        renderScore(guestScoreEl, guestPlayer);

        // change player state
        toggleIsPlaying(homePlayer, guestPlayer);
        guestPlayerGameState();
      }

      generateFouls(homePlayer, guestPlayer, score);
      playerFouledOut(homePlayer, guestPlayer);
      checkScores(homePlayer, guestPlayer);
    }
  });
});

rulesBtn.addEventListener("click", (e) => {
  modal.classList.add("show");
});

modal.addEventListener("click", (e) => {
  if (e.target.id === "modal" || e.target.id === "btn-close") {
    modal.classList.remove("show");
  }
});
// functions ====================================

// control the whole app
function intial() {
  updateMessage("Home player's turn");
  toggleActivePlayer(homeScoreboardContainer);
  toggleDisableScoreButtons(guestScoreboardContainer, "add");
}

function playAgain(answer) {
  if (answer === null) return;

  if (answer.toUpperCase() === "YES") {
    gameActive = true;
    resetGame();
  } else if (answer.toUpperCase() === "NO") {
    alert("Maybe next time!");
  } else {
    alert("Invalid input. Maybe next time!");
  }
}

function updateMessage(msg) {
  messageEl.textContent = msg;
}

function toggleActivePlayer(el) {
  el.classList.toggle("active");
}

function updateScoreTotal(obj, score) {
  obj.score += score;
}

function renderScore(targetEl, obj) {
  targetEl.textContent = obj.score;
}

function toggleDisableScoreButtons(targetEl, action) {
  const buttons = targetEl.querySelectorAll("button");
  buttons.forEach((b) => {
    b.disabled = !b.disabled;

    if (action === "add") {
      b.classList.add("disabled");
    } else {
      b.classList.remove("disabled");
    }
  });
}

function toggleIsPlaying(obj, obj1) {
  obj.isPlaying = !obj.isPlaying;
  obj1.isPlaying = !obj1.isPlaying;
}

function homePlayerGameState() {
  updateMessage("guest player's turn");
  toggleDisableScoreButtons(guestScoreboardContainer, "remove");
  toggleDisableScoreButtons(homeScoreboardContainer, "add");
  toggleActivePlayer(guestScoreboardContainer);
  toggleActivePlayer(homeScoreboardContainer);
}

function guestPlayerGameState() {
  updateMessage("home player's turn");
  toggleDisableScoreButtons(guestScoreboardContainer, "add");
  toggleDisableScoreButtons(homeScoreboardContainer, "remove");
  toggleActivePlayer(guestScoreboardContainer);
  toggleActivePlayer(homeScoreboardContainer);
}

function generateRandomNumber(obj, obj1, score) {
  if ((obj.score >= 5 || obj1.score >= 5) && score >= 2) {
    // making the likelihood of fouls more frequent
    const rand = Math.random();

    if (rand > 0.35) {
      return Math.random();
    } else {
      return "no foul";
    }
  }
}

function generateFouls(home, guest, score) {
  const rand = generateRandomNumber(home, guest, score);
  if (!isNaN(rand)) {
    if (rand > 0.5) {
      // guest commits foul
      guest.fouls++;
      guestFoulsCount.textContent = guest.fouls;
    } else if (rand < 0.5) {
      //home commits foul
      home.fouls++;
      homeFoulsCount.textContent = home.fouls;
    }
  }
}

function playerFouledOut(home, guest) {
  if (home.fouls === 4 || guest.fouls === 4) {
    if (home.fouls > guest.fouls) {
      updateMessage("Home player fouled out, guest wins!");
    } else {
      updateMessage("guest fouled out, home wins!");
    }
    messageEl.style.color = "#f94f6d";
    gameActive = false;
    setTimeout(() => handleEndOfGame(), 1500);
  }
}

function handleEndOfGame() {
  const play = prompt("Would you like to play again? (yes/no)");
  playAgain(play);
}

function checkScores(home, guest) {
  if (home.score >= 21 || guest.score >= 21) {
    if (home.score > guest.score) {
      updateMessage("Home player wins");
    } else {
      updateMessage("guest player wins");
    }
    messageEl.style.color = "lime";
    gameActive = false;
    setTimeout(() => handleEndOfGame(), 1500);
  }
}

function resetGame() {
  homePlayer.fouls = 0;
  homePlayer.isPlaying = true;
  homePlayer.score = 0;
  guestPlayer.fouls = 0;
  guestPlayer.isPlaying = false;
  guestPlayer.score = 0;
  gameActive = true;
  messageEl.style.color = "#9aabd8";
  toggleActivePlayer(homeScoreboardContainer);
  toggleActivePlayer(guestScoreboardContainer);
  toggleDisableScoreButtons(homeScoreboardContainer, "remove");
  toggleDisableScoreButtons(guestScoreboardContainer, "remove");
  intial();
}
