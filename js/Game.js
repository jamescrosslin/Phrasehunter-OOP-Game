/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
    this.phrases = [
      new Phrase("It's just a flesh wound!"),
      new Phrase("Raise your hand if you've ever been personally victimized by Regina George."),
      new Phrase("Yeah, well, you know, that's just like, your opinion, man."),
      new Phrase("The quick brown fox jumps over the lazy dog."),
      new Phrase("What is this? A center for ants?"),
    ];
    this.activePhrase = null;
    this.missed = 0;
    this.selections = [];
    this.active = true;
    this._overlay = document.getElementById("overlay");
    this._lifeTracker = document.getElementsByClassName("tries");
  }
  startGame() {
    this.showOverlay(false);
    [...this.tries].forEach((icon) => icon.firstElementChild.setAttribute("src", "images/liveHeart.png"));
    this.overlay.classList.remove("start");
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
    [...this.activePhrase.letters].forEach((letter) => {
      letter.style.animationDelay = `${Math.random()}s`;
      animate(letter, "fadeInDownBig");
    });
  }
  getRandomPhrase() {
    const rando = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[rando];
  }
  handleInteraction(element) {
    const letter = element.innerHTML;
    element.disabled = true;
    this.selections.push(letter);
    if (this.activePhrase.checkLetter(letter)) {
      element.classList.add("chosen");
      this.activePhrase.showMatchedLetter(letter);
      if (this.checkForWin()) this.gameOver();
    } else {
      element.classList.add("wrong");
      this.removeLife();
    }
  }
  removeLife() {
    //animate hearts with throbbing or something
    this.tries[this.missed].firstElementChild.setAttribute("src", "images/lostHeart.png").bind(this);
    this.missed++;
    if (this.missed === 5) this.gameOver();
  }
  checkForWin() {
    const phrase = this.activePhrase.normalized.split("");
    return phrase.every((letter) => this.selections.includes(letter));
  }
  gameOver() {
    const win = this.missed < 5;
    this.overlay.classList.toggle("win", win);
    this.overlay.classList.toggle("lose", !win);
    document.getElementById("game-over-message").innerHTML = win
      ? "You win!"
      : `Sorry, the correct answer was "${this.activePhrase.phrase}"<br>
      Better luck next time!`;
    this.active = false;
    this.activePhrase.container.innerHTML = "";
    [...document.getElementsByClassName("key")].forEach((key) => {
      key.className = "key";
      key.disabled = false;
    });
    this.showOverlay();
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
