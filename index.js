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
      // change active status
      toggleActiveClass();
      toggleActiveState();
    }
  });
});

// functions =============================
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

  setTimeout(() => (messageEl.textContent = "Welcome to the scoreboard"), 1000);
}

function playerFoulsOut(homeObj, guestObj) {
  if (homeObj.fouls === 6) {
    messageEl.textContent = "HOME fouled out, GUEST wins";
    console.log("lost");
  }

  if (guestObj.fouls === 6) {
    messageEl.textContent = "GUEST fouled out, HOME wins!";
    console.log("lost");
  }

  if (guestObj.fouls === 6 || homeObj.fouls === 6) gameActive = false;
}
