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
  /**
   * @method startGame
   * @description resets and initializes the game, hides the overlay, set hearts to full, and animates the phrase's intro
   */
  startGame() {
    this.showOverlay(false);
    this.overlay.classList.remove("start");
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
    // loop adds animation to the letters with a random delay between 0 and 1 second
    [...this.activePhrase.letters].forEach((letter) => {
      letter.style.animationDelay = `${Math.random()}s`;
      animate(letter, "fadeInDownBig");
    });
    [...this.tries].forEach((icon) => (icon.firstElementChild.style.filter = "drop-shadow(0 0 3px #E9D985)"));
  }

  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }

  /**
   * @method handleInteraction
   * @param {element} element
   * @description letter selections are handled by receiving the element corresponding to the letter and changes the game state to reflect user selection
   */
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
    /**
     * @callback handleLoss
     * @description changes the left most full life to a lost life, decrements the missed count, and checks for a game over
     */
    const handleLoss = () => {
      this.tries[this.missed].firstElementChild.setAttribute("src", "images/lostHeart.png");
      this.missed++;
      if (this.missed === 5) this.gameOver();
    };
    // adds a small flash animation to the leftmost full life heard and handles the callback at the end of the animation
    animate(this.tries[this.missed].firstElementChild, "flash", handleLoss);
  }

  checkForWin() {
    const phrase = this.activePhrase.normalized.split("");
    return phrase.every((letter) => this.selections.includes(letter));
  }

  /**
   * @method gameOver
   * @description handles a game over scenario with different outcomes depending on win or loss
   */
  gameOver() {
    const win = this.missed < 5;
    this.overlay.classList.toggle("win", win);
    this.overlay.classList.toggle("lose", !win);
    document.getElementById("game-over-message").innerHTML = win
      ? "You win!"
      : `Sorry, the correct answer was "${this.activePhrase.phrase}"<br>
      Better luck next time!`;
    this.resetGame();
  }
  /**
   * @method resetGame
   * @description resets the board and game object to their previous state in order to stop further interaction after a win scenario and stop animation conflicts
   */
  resetGame() {
    [...this.tries].forEach((icon) => (icon.firstElementChild.style.filter = "none"));
    [...this.tries].forEach((icon) => icon.firstElementChild.setAttribute("src", "images/liveHeart.png"));
    [...document.getElementsByClassName("key")].forEach((key) => {
      key.className = "key";
      key.disabled = false;
    });
    this.activePhrase.container.innerHTML = "";
    this.active = false;
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
