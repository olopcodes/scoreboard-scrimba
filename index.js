const pointsButtonsEl = document.querySelectorAll(".scoreboard-btn");
const homeScoreEl = document.getElementById("home-score");
const guestScoreEl = document.getElementById("guest-score");

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
    // find the parent of the button
    const parentTarget = e.target.closest("div").id;
    // get value from data attribute and convert to number
    const pointValue = +e.target.dataset.points;
    // update score based on turn
    increaseScore(parentTarget, pointValue);
    // render score
    render(parentTarget);
  });
});

function increaseScore(target, value) {
  if (target === "guest-buttons") {
    guestPlayer.score += value;
  } else if (target === "home-buttons") {
    homePlayer.score += value;
  }
}

function render(target) {
  if (target === "guest-buttons") {
    guestScoreEl.textContent = guestPlayer.score;
  } else if (target === "home-buttons") {
    homeScoreEl.textContent = homePlayer.score;
  }
}
