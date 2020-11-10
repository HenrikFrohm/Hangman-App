const wordList = ["VSCode", "Krille", "Javascript", "Kaffe", "Te", "Vatten"]; // Array: med spelets alla ord
const imgList = [
  "images/h0.png",
  "images/h1.png",
  "images/h2.png",
  "images/h3.png",
  "images/h4.png",
  "images/h5.png",
  "images/h6.png",
];

let selectedWord; // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan

let guesses = 0; // Number: håller antalet gissningar som gjorts
let guessesLeft = 6;
let hangmanImg; // Sträng: sökväg till bild som kommer visas (och ändras) vid fel svar. t.ex. `/images/h1.png`

let msgHolderEl = document.querySelector("#message"); // DOM-nod: Ger meddelande när spelet är över
let startGameBtnEl = document.querySelector("#startGameBtn"); // DOM-nod: knappen som du startar spelet med
let letterButtonEls = document.querySelectorAll("#letterButtons button"); // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls = document.querySelectorAll("#letterBoxes ul li"); // Array av DOM-noder: Rutorna där bokstäverna ska stå
let letterBoxContainerEl = document.querySelector("#letterBoxes ul");
let letterButtonContainerEl = document.querySelector("ul#letterButtons");
let hangmanImgEl = document.querySelector("#hangman");

startGameBtnEl.addEventListener("click", initiateGame);

letterButtonContainerEl.addEventListener("click", guessLetter);

// Funktion som körs när du trycker på bokstäverna och gissar bokstav
function guessLetter(e) {
  // om anv ej klickat på en knapp, returna
  if (e.target.tagName !== "BUTTON") {
    return;
  }
  console.log(e.target.value);
  let guessedLetter = e.target.value;
  // öka guesses med 1

  // (kolla om guesses är för högt?)

  // undersök om bokstaven (guessedLetter) finns i selectedWord

  const indexOfFirst = selectedWord.indexOf(guessedLetter);
  console.log("first occurence at " + indexOfFirst);
  if (indexOfFirst < 0) {
    // spelaren gissade FEL!
    guesses = guesses + 1;
    setHangmanImg(guesses);
    return;
  } else {
    // bokstav HITTAD!
    letterBoxEls[indexOfFirst].firstElementChild.value = guessedLetter;
  }
  // vad händer om det finns fler instanser av tecknet?
  const indexOfSecond = selectedWord.indexOf(guessedLetter, indexOfFirst + 1);
  if (indexOfSecond < 0) {
    return;
  } else {
    // bokstav HITTAD!
    letterBoxEls[indexOfSecond].firstElementChild.value = guessedLetter;
  }
  // om ja : sätt in tecknet i den tomma rutan som överrensstämmer med bokstavens position i ordet
  console.log("second occurence at " + indexOfSecond);
  // om nej: gåt nåt annat
}

// funktion som uppdaterar bilden som visas
function setHangmanImg(index) {
  // sätta hangmanImg-variablen till images/h0.png
  // sätt img-taggens src property till hangmanImg
  hangmanImg = imgList[index];
  hangmanImgEl.setAttribute("src", hangmanImg);
}

// Funktion som slumpar fram ett ord
function randomWord(arr) {
  const randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
}

// skriv en funktion som rensar letterBox-rutorna, dvs tar bort dem
function removeLB() {
  letterBoxContainerEl.innerHTML = "";
}
// skriv en funktion som genererar n antal tomma letterBoxrutor och stoppar in dem på rätt ställe
// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumpas fram
function generateLB(amount) {
  // amount = det antal rutor vi vill generera.
  for (let i = 0; i < amount; i++) {
    let newLI = document.createElement("li");
    newLI.innerHTML = '<input type="text" disabled value="&nbsp;"/>';
    letterBoxContainerEl.appendChild(newLI);
  }
  letterBoxEls = document.querySelectorAll("#letterBoxes ul li");
}

// Funktion som inaktiverar/aktiverar bokstavsknapparna (beroende på vilken del av spelet du är på)
function activate() {
  for (let i = 0; i < letterButtonEls.length; i++) {
    //console.log("index: " + i)
    //console.log("element: ");
    //console.log(letterButtonEls[i])
    letterButtonEls[i].disabled = false;
  }
}
function deactivate() {
  for (let i = 0; i < letterButtonEls.length; i++) {
    //console.log("index: " + i)
    //console.log("element: ");
    //console.log(letterButtonEls[i])
    letterButtonEls[i].disabled = true;
  }
}

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
function initiateGame() {
  // sätta upp spelet
  // slumpa fram ett ord (klar)
  // räkna längden (= antal gissningar spelaren har kvar) (klar)
  // aktivera knappar (klar)
  // se till att antalet tomma rutor i ul:n letterBoxEls stämmer överrens med ordets längd (klar)

  // sätta hangmanImg-variablen till images/h0.png (klar)
  // sätt img-taggens src property till hangmanImg (klar)
  guesses = 0;
  selectedWord = randomWord(wordList).toUpperCase();
  let wordLength = selectedWord.length;
  activate();
  removeLB();
  generateLB(wordLength);
  setHangmanImg(0);
}

// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet

/* // vcreate a variable and assign it element main from DOM
 
const myvar = document.querySelector('main');
let myButtonContainer = document.querySelector('#letterButtons')
 */
