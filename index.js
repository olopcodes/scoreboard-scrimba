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
pointsButtonsEl.forEach((pointButton) => {
  pointButton.addEventListener("click", (e) => {
    if (gameActive) {
      // get value from data attribute and convert to number
      const pointValue = +e.target.dataset.points;
      // get points
      gameLogic(pointValue);
      // generate fouls
      const rand = Math.random();
      if (guestPlayer.score >= 5 || (homePlayer.score >= 5 && rand > 0.5)) {
        generateFoul();
      }

      checkScore(homePlayer, guestPlayer);

      // change active status
      toggleActiveClass();
      toggleActiveState();
    } else {
      unHide(newGameBtn);
      document.querySelector(".active").classList.remove("active");
    }
  });
});

newGameBtn.addEventListener("click", (e) => {
  // reset game
});

// functions =============================
function resetGame() {
  guestPlayer.fouls = 0;
  gameActive = true;
  guestPlayer.score = 0;
  guestPlayer.isActive = false;
  homePlayer.fouls = 0;
  homePlayer.score = 0;
  homeFoulsEl.textContent = 0;
  guestFoulsEl.textContent = 0;
  homeScoreEl.textContent = 0;
  guestPlayer.textContent = 0;
}

function gameLogic(pointValue) {
  // check which player is active and increase score
  if (guestPlayer.isActive) {
    increaseScore(guestPlayer, pointValue);
    // render score
    render(guestScoreEl, guestPlayer);
    // disable guest button
    disableButtons(guestScoreboardEl);
    // enable home buttons
    enableButtons(homeScoreboardEl);
  }

  if (homePlayer.isActive) {
    increaseScore(homePlayer, pointValue);
    // render score to user
    render(homeScoreEl, homePlayer);
    // disable home buttons
    disableButtons(homeScoreboardEl);
    // enable guest button
    enableButtons(guestScoreboardEl);
  }
}

function increaseScore(obj, value) {
  obj.score += value;
}

function render(targetEl, obj) {
  targetEl.textContent = obj.score;
}

function toggleActiveClass() {
  homeScoreboardEl.classList.toggle("active");
  guestScoreboardEl.classList.toggle("active");
}

function toggleActiveState() {
  guestPlayer.isActive = !guestPlayer.isActive;
  homePlayer.isActive = !homePlayer.isActive;
}

function disableButtons(targetEl) {
  const targetButtons = targetEl.querySelectorAll("button");
  targetButtons.forEach((b) => (b.disabled = true));
}

function enableButtons(targetEl) {
  const targetButtons = targetEl.querySelectorAll("button");
  targetButtons.forEach((b) => (b.disabled = false));
}

//logic is wrong
function generateFoul() {
  if (Math.random() > 0.5) {
    messageEl.textContent = "Guest commits foul";
    guestPlayer.fouls++;
    guestFoulsCount.textContent = guestPlayer.fouls;
  } else {
    messageEl.textContent = "Home commits foul";
    homePlayer.fouls++;
    homeFoulsCount.textContent = homePlayer.fouls;
  }

  setTimeout(() => (messageEl.textContent = "Welcome to the scoreboard"), 1700);

  playerFoulsOut(homePlayer, guestPlayer);
}
//logic is wrong
function playerFoulsOut(homeObj, guestObj) {
  if (homeObj.fouls === 6) {
    messageEl.textContent = "HOME fouled out, GUEST wins";
    console.log("lost");
  }

  if (guestObj.fouls === 6) {
    messageEl.textContent = "GUEST fouled out, HOME wins!";
    console.log("lost");
  }

  endGame(homeObj, guestObj);
}
//logic is wrong
function checkScore(homeObj, guestObj) {
  if (homeObj.score >= 15) {
    messageEl.textContent = "Home Wins!";
  } else if (guestObj.score >= 15) {
    messageEl.textContent = "Guest Wins";
  }

  endGame(homeObj, guestObj);
}
// needs more work logic is worng
function endGame(homeObj, guestObj) {
  if (
    homeObj.score >= 16 ||
    guestObj.score >= 16 ||
    guestObj.fouls === 5 ||
    homeObj.fouls === 5
  ) {
    gameActive = false;
    disableButtons(homeScoreboardEl);
    disableButtons(guestScoreboardEl);
    document.querySelector(".active").classList.remove("active");
  }
}

function unHide(el) {
  el.classList.remove("hide");
}
