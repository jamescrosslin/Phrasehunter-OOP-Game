/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const keys = document.getElementsByClassName("key");
const qwerty = document.getElementById("qwerty");
let game;

/**
 * credit for function outline: animate CSS docs
 * https://github.com/animate-css/animate.css/blame/main/docsSource/sections/04-javascript.md
 * @function animate
 * @param {element} element the element to be animated
 * @param {string} animation the class name of the animationn
 * @param {*} cb callback function to handle when animation completes
 * @description creates a promise that adds, and after completeion removes, an animation on an element
 */
function animate(element, animation, cb) {
  new Promise((resolve, reject) => {
    element.classList.add(`animated`, animation);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(e) {
      e.stopPropagation();
      element.classList.remove(`animated`, animation);
      if (cb) cb();
      resolve("Animation ended");
    }

    element.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
}

function newGame() {
  game = new Game();
  game.startGame();
}

/**
 * @function selectHandler
 * @param {event} e
 * @description has paths for button presses on window as well as keyboard strokes - routes to
 * a new game call on
 */
function selectHandler(e) {
  if (document.getElementById("overlay").style.display === "none") {
    if (e.target.tagName === "BUTTON") {
      return game?.handleInteraction(e.target);
    }
    const matchIndex = [...keys].map((key) => key.innerHTML).indexOf(e.key?.toLowerCase());
    if (matchIndex >= 0 && keys[matchIndex].disabled === false) return game?.handleInteraction(keys[matchIndex]);
  } else {
    if (e.key === "Enter") return newGame();
  }
}

qwerty.addEventListener("click", selectHandler);
window.addEventListener("keyup", selectHandler);
document.getElementById("btn__reset").addEventListener("click", newGame);
