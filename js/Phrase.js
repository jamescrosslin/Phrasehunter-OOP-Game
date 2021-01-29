/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase;
    this.normalized = phrase.toLowerCase().replaceAll(/[^a-z]/gi, "");
    this._letters = document.getElementsByClassName("letter");
    this._container = document.getElementById("phrase");
  }
  /**
   * @method addPhraseToDisplay
   * @description creates list items for the letters of the phrase and adds the phrase to the game display
   */
  addPhraseToDisplay() {
    /**
     * @function makeListItem
     * @param {string} letter
     * @returns {string}
     * @description this function only exists within addPhraseToDisplay and creates a list item element with additional tags based on logic
     */
    const makeListItem = (letter) => {
      const isLetter = /[a-z]/i.test(letter);
      const isSpace = /\s/.test(letter);
      const spaceLi = `<li class="space"></li>`;

      if (isLetter) return `<li class="hide letter ${letter.toLowerCase()}">${letter}</li>`;
      if (isSpace) return `</div>${spaceLi}<div>`;
      return `<li class="punctuation">${letter}</li>` + spaceLi;
    };

    const html =
      this.phrase.split("").reduce((phrase, letter) => phrase + makeListItem(letter), `<ul><div>`) + "</div></ul>";
    this.container.innerHTML = html;
  }
  checkLetter(letter) {
    return this.normalized.includes(letter);
  }
  /**
   * @method showMatchedLetter
   * @param {string} letter
   */
  showMatchedLetter(letter) {
    [...this.letters]
      .filter((element) => element.classList.contains(letter))
      .forEach((element) => {
        element.classList.remove("hide");
        element.classList.add("show");
      });
  }
  get letters() {
    return this._letters;
  }
  get container() {
    return this._container;
  }
}
