const wordList = [
  "Henrik",
  "Funktion",
  "Javascript",
  "Variabel",
  "Backend",
  "Algoritm",
]; // Array: med spelets alla ord
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
let guessedLetterCount = 0;
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

// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
function gameWasWon() {
  informUser("YOU WON");
  deactivate();
}

function gameWasLost() {
  informUser("GAME OVER");
  deactivate();
}

function checkGameState(lastGuessCorrect) {
  //kolla om förlust föreligger
  //game over när användaren har slut på liv
  //game over när:
  //hangmanImg är på näst sista OCH användaren då gissar fel
  //stämmer src på hangmanImg överrens med strängen nedan
  //"images/h5.png"
  if (hangmanImgEl.src.slice(-6) === "h6.png" && !lastGuessCorrect) {
    informUser("GAME OVER");
  }
  if (lastGuessCorrect && selectedWord.length === guessedLetterCount) {
    gameWasWon();
  }
}

//skriv en funktion som skickar meddelande till användaren
function informUser(message) {
  //skriv ut meddelandet message på rätt ställe
  //skriv ut meddelandet inuti elementet msgHolderEl
  msgHolderEl.innerText = message;
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav
function guessLetter(e) {
  let lastGuessCorrect;
  if (e.target.tagName !== "BUTTON") {
    return;
  }
  //console.log(e.target.value);
  let guessedLetter = e.target.value;
  //deactivateLetter(guessedLetter);
  //'string text ${expression} string text'
  //let buttonClicked = document.querySelector('button[value="${guessedLetter}]')
  // öka guesses med 1
  e.target.disabled = true;

  // (kolla om guesses är för högt?)

  // undersök om bokstaven (guessedLetter) finns i selectedWord

  const indexOfFirst = selectedWord.indexOf(guessedLetter);
  //console.log("first occurence at " + indexOfFirst);
  if (indexOfFirst < 0) {
    // spelaren gissade FEL!
    lastGuessCorrect = false;
    guesses = guesses + 1;
    setHangmanImg(guesses);
    checkGameState(lastGuessCorrect);
    return;
  } else {
    // bokstav HITTAD!
    lastGuessCorrect = true;
    letterBoxEls[indexOfFirst].firstElementChild.value = guessedLetter;
    guessedLetterCount++;
    checkGameState(lastGuessCorrect);
  }
  // vad händer om det finns fler instanser av tecknet?
  const indexOfSecond = selectedWord.indexOf(guessedLetter, indexOfFirst + 1);
  if (indexOfSecond < 0) {
    return;
  } else {
    // bokstav HITTAD!
    letterBoxEls[indexOfSecond].firstElementChild.value = guessedLetter;
    guessedLetterCount++;
  }
  // om ja : sätt in tecknet i den tomma rutan som överrensstämmer med bokstavens position i ordet
  //console.log("second occurence at " + indexOfSecond);
  checkGameState(lastGuessCorrect);
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

function deactivateLetter(letter) {
  for (let i = 0; i < letterButtonEls.length; i++) {
    //console.log("index: " + i)
    //console.log("element: ");
    //console.log(letterButtonEls[i])
    if (letter === letterBoxEls[i].value) {
      letterButtonEls[i].disabled = true;
    }
  }
}

removeLB();
deactivate();
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
  guessedLetterCount = 0;
  selectedWord = randomWord(wordList).toUpperCase();
  let wordLength = selectedWord.length;
  activate();
  removeLB();
  generateLB(wordLength);
  setHangmanImg(0);
  informUser("");
}

