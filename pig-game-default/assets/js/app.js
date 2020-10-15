/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, 
    gameState; //track if game is over or not

init();

document.querySelector(".btn-new").addEventListener("click", init);

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gameState) {
    //1. Generate a random number for the dice
    var randomDice = Math.floor(Math.random() * 6) + 1;
    //2. Display the random dice
    var diceDom = document.querySelector(".dice");
    diceDom.src = "assets/images/dice-" + randomDice + ".png";
    diceDom.style.display = "block";
    //3. Update and add to the current score only if dice value is not 1
    if (randomDice !== 1) {
      //Add score
      roundScore += randomDice;
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
      document.querySelector(".dice").style.display = "none";
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
  document.querySelector(".dice").style.display = "none";
}
