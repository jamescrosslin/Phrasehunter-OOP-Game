/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game;
const keys = document.getElementsByClassName("key");
const keyValues = [...keys].map((key) => key.innerHTML);

function addPhrase(phrase) {
  game.phrases.push(new Phrase(phrase));
}
/**
 * credit for function outline: animate CSS docs
 * https://github.com/animate-css/animate.css/blame/main/docsSource/sections/04-javascript.md
 * @function animate
 * @param {element} element the element to be animated
 * @param {string} animation the class name of the animation
 */
function animate(element, animation) {
  new Promise((resolve, reject) => {
    element.classList.add(`animated`, animation);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(e) {
      e.stopPropagation();
      element.classList.remove(`animated`, animation);

      resolve("Animation ended");
    }

    element.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
}

function newGame() {
  game = new Game();
  game.startGame();
}

document.getElementById("btn__reset").addEventListener("click", newGame);

const qwerty = document.getElementById("qwerty");
function selectHandler(e) {
  if (document.getElementById("overlay").style.display === "none") {
    if (e.target.tagName === "BUTTON") {
      return game?.handleInteraction(e.target);
    }
    const matchIndex = keyValues.indexOf(e.key.toLowerCase());
    if (matchIndex >= 0 && keys[matchIndex].disabled === false) return game?.handleInteraction(keys[matchIndex]);
  } else {
    if (e.key === "Enter") return newGame();
  }
}
qwerty.addEventListener("click", selectHandler);
window.addEventListener("keyup", selectHandler);
