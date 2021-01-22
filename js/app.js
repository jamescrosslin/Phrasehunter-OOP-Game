/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game;

document.getElementById("btn__reset").addEventListener("click", (e) => {
  document.getElementById("phrase").innerHTML = "";
  [...document.getElementsByClassName("key")].forEach((key) => (key.className = "key"));
  game = new Game();
  game.startGame();
});

document.getElementById("qwerty").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    game.handleInteraction();
  }
});
