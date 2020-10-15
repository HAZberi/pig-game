var scores, roundScore, activePlayer, gameState; //track if game is over or not

init();

document.querySelector(".btn-new").addEventListener("click", init);

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gameState) {
    //1. Generate a random number for the dices
    var randomDice1 = Math.floor(Math.random() * 6) + 1;
    var randomDice2 = Math.floor(Math.random() * 6) + 1;
    //2. Display the random dices
    var diceDom1 = document.querySelector("#dice-1");
    var diceDom2 = document.querySelector("#dice-2");
    diceDom1.src = "assets/images/dice-" + randomDice1 + ".png";
    diceDom2.src = "assets/images/dice-" + randomDice2 + ".png";
    document.querySelector("#dice-1").style.display = "block";
    document.querySelector("#dice-2").style.display = "block";
    //3. Update and add to the current score only if dice value is not 1
    if (randomDice1 !== 1 && randomDice2 !== 1) {
      //Add score
      roundScore += randomDice1 + randomDice2;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gameState) {
    //add to global score
    scores[activePlayer] += roundScore;
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];
    //check if the player has won
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).innerHTML =
        "<em>Winner!</em>";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      document.querySelector("#dice-1").style.display = "none";
      document.querySelector("#dice-2").style.display = "none";
      gameState = false;
    } else {
      //Next Turn
      nextPlayer();
    }
  }
});
function nextPlayer() {
  //setting round score to zero
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = roundScore;
  //change active player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}
function init() {
  (scores = [0, 0]), (roundScore = 0), (activePlayer = 0);
  gameState = true;
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector("#dice-1").style.display = "none";
  document.querySelector("#dice-2").style.display = "none";
}
