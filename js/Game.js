/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
    this.phrases = [];
    this.activePhrase = null;
    this.missed = 0;
    this.selections = [];
    this._overlay = document.getElementById("overlay");
    this._lifeTracker = document.getElementsByClassName("tries");
  }
  startGame() {
    this.showOverlay(false);
    [...this.tries].forEach((icon) => icon.firstElementChild.setAttribute("src", "images/liveHeart.png"));
    this.overlay.classList.remove("start");
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }
  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }
  handleInteraction(element) {
    const selection = element;
    const letter = selection.innerHTML;
    selection.disabled = true;
    this.selections.push(selection);

    if (this.activePhrase.checkLetter(letter)) {
      selection.classList.add("chosen");
      this.activePhrase.showMatchedLetter(letter);
      if (this.checkForWin()) this.gameOver();
    } else {
      selection.classList.add("wrong");
      this.removeLife();
    }
  }
  removeLife() {
    this.tries[this.missed].firstElementChild.setAttribute("src", "images/lostHeart.png");
    this.missed++;
    if (this.missed === 5) this.gameOver();
  }
  checkForWin() {
    const phrase = this.activePhrase.phrase.replaceAll(/[^a-z]/g, "").split("");
    const selections = this.selections.map((selection) => selection.innerHTML);
    const check = phrase.join("") === phrase.filter((letter) => selections.includes(letter)).join("");
    return check;
  }
  gameOver() {
    const win = this.missed < 5;
    this.showOverlay();
    this.overlay.classList.toggle("win", win);
    this.overlay.classList.toggle("lose", !win);
    document.getElementById("game-over-message").innerHTML = win ? "You win!" : "Sorry, better luck next time!";
  }
  showOverlay(show = true) {
    this.overlay.style.display = show ? "inherit" : "none";
  }
  get overlay() {
    return this._overlay;
  }
  get tries() {
    return this._lifeTracker;
  }
}
