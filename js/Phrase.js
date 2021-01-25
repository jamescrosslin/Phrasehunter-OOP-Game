/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase;
    this.normalized = this.phrase.toLowerCase().replaceAll(/[^a-z]/gi, "");
  }
  addPhraseToDisplay() {
    function makeListItem(letter) {
      const isLetter = /[a-z]/i.test(letter);
      return `${isLetter ? "<" : "</div><"}li class='${
        isLetter ? "hide letter animated fadeInDownBig " + letter.toLowerCase() : "space"
      }'>${letter}</li${isLetter ? ">" : "><div>"}`;
    }
    const html = this.phrase.split("").reduce((phrase, letter) => phrase + makeListItem(letter), `<ul>`) + "</ul>";
    document.getElementById("phrase").innerHTML = html;
  }
  checkLetter(letter) {
    return this.normalized.includes(letter);
  }
  showMatchedLetter(letter) {
    [...document.getElementsByClassName(letter)].forEach((element) => {
      element.classList.remove("hide");
      element.classList.add("show");
    });
  }
}
