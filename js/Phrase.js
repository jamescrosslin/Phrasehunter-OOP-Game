/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase;
  }
  addPhraseToDisplay() {
    function makeListItem(letter) {
      return `<li class="${letter === " " ? "space" : "hide letter " + letter}>${letter}"</li>`;
    }

    const html =
      this.phrase.split("").reduce((phrase, letter) => {
        return phrase + makeListItem(letter);
      }, `<ul>`) + "</ul>";
    console.log(html);
    document.getElementById("phrase").innerHTML = html;
  }
  checkLetter(letter) {
    return this.phrase.includes(letter);
  }
  showMatchedLetter() {
    document.getElementsByClassName(letter).forEach((element) => {
      element.classList.remove("hide");
      element.classList.add("show");
    });
  }
}
