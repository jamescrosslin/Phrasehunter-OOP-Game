/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game;
const keys = document.getElementsByClassName("key");
const keyValues = [...keys].map((key) => key.innerHTML);

function addPhrase(phrase) {
  game.phrases.push(new Phrase(phrase));
}

document.getElementById("btn__reset").addEventListener("click", (e) => {
  document.getElementById("phrase").innerHTML = "";
  [...document.getElementsByClassName("key")].forEach((key) => {
    key.className = "key";
    key.disabled = false;
  });
  game = new Game();
  game.startGame();
  [...document.getElementsByClassName("letter")].forEach((letter, i) => {
    letter.style.animationDelay = `${i * 0.05}s`;
    letter.addEventListener("animationend", (e) => {
      e.target.classList.remove("animated");
    });
  });
});

(() => {
  const qwerty = document.getElementById("qwerty");
  function selectHandler(e) {
    if (game.active) {
      if (e.target.tagName === "BUTTON") {
        return game?.handleInteraction(e.target);
      }
      const matchIndex = keyValues.indexOf(e.key.toLowerCase());
      if (matchIndex >= 0 && keys[matchIndex].disabled === false) return game?.handleInteraction(keys[matchIndex]);
    }
  }
  qwerty.addEventListener("click", selectHandler);
  window.addEventListener("keyup", selectHandler);
})();
