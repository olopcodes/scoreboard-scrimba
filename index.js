const pointsButtonsEl = document.querySelectorAll(".scoreboard-btn");
const homeScoreEl = document.getElementById("home-score");
const guestScoreEl = document.getElementById("guest-score");
const homeScoreboardEl = document.getElementById("home");
const guestScoreboardEl = document.getElementById("guest");

const homePlayer = {
  score: 0,
  isActive: true,
};
const guestPlayer = {
  score: 0,
  isActive: false,
};

pointsButtonsEl.forEach((pointButton) => {
  pointButton.addEventListener("click", (e) => {
    // get value from data attribute and convert to number
    const pointValue = +e.target.dataset.points;

    gameLogic(pointValue);

    // change active status
    toggleActiveClass();
    toggleActiveState();
  });
});

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
