/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game;
document.getElementById("btn__reset").addEventListener("click", (e) => {
  document.getElementById("phrase").innerHTML = "";
  [...document.getElementsByClassName("key")].forEach((key) => {
    key.className = "key";
    key.disabled = false;
  });
  game = new Game();
  game.startGame();
});
(() => {
  const qwerty = document.getElementById("qwerty");
  function selectHandler(e) {
    if (e.target.tagName === "BUTTON") {
      return game.handleInteraction(e.target);
    }
    const keys = document.getElementsByClassName("key");
    const keyValues = [...keys].map((key) => key.innerHTML);
    const matchIndex = keyValues.indexOf(e.code);
    if (matchIndex >= 0) return game.handleInteraction(keys[matchIndex]);
  }
  qwerty.addEventListener("click", selectHandler);
  qwerty.addEventListener("keyup", selectHandler);
})();
