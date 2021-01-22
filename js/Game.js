/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
    this.phrases = [];
    this.activePhrase = null;
    this.missed = 0;
    this.selections = [];
    this._message = this.missed < 5 ? "You win!" : "Sorry, better luck next time!";
  }
  startGame() {
    this.showOverlay();
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }
  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }
  handleInteraction(e) {
    const selection = e.target;
    selection.disabled = true;
    this.selections.push(selection);

    if (this.activePhrase.includes(selection)) {
      selection.classList.add(chosen);
      this.activePhrase.showMatchedLetter();
      if (this.checkForWin()) this.gameOver();
    } else {
      selection.classList.add("wrong");
      this.removeLife();
    }
  }
  removeLife() {
    document.getElementsByClassName("tries")[this.missed].setAttribute("src", "images/lostHeart.png");
    this.missed++;
    if (this.missed === 5) this.gameOver();
  }
  checkForWin() {
    const phrase = this.activePhrase.split(" ");
    return phrase === phrase.filter((letter) => this.selections.includes(letter));
  }
  gameOver(win) {
    this.showOverlay(show);
    document.getElementById("game-over-message").innerHTML = this.message;
  }
  showOverlay(show) {
    const overlay = document.getElementById("overlay");
    overlay.style.display = show ? "inherit" : "none";
    overlay.classList.replace("start", show ? "win" : "lose");
  }
  get message() {
    return this._message;
  }
}
