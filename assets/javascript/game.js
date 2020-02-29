// global variables
var wordOptions = ["blue", "red", "green", "purple", "black", "white", "yellow", "pink", "orange"];
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccess = [];
var wrongLetters = [];

// Game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

// Functions ======================================================================================
function startGame() {
    
    // random word selector
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersInWord = selectedWord.split("");
    numBlanks = lettersInWord.length;

    // Reset
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccess = [];

    // Populate blanks and successes with right number of blanks
    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccess.push("_");
    }

    // change HTML to reflect game conditions
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccess.join(" ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;

    // Testing / debugging
    console.log(selectedWord);
    console.log(lettersInWord);
    console.log(numBlanks);
    console.log(blanksAndSuccess);
}

function checkletters(letter) {
    //check if letter exists in the word
    var isLetterInWord = false;
    for (var i = 0; i < numBlanks; i++) {
        if (selectedWord[i] == letter) {
            isLetterInWord = true;

        }
    }
    // Check where in word letter exists, then populate out blanks array
    if (isLetterInWord) {
        for (var i = 0; i < numBlanks; i++) {
            if (selectedWord[i] == letter) {
                blanksAndSuccess[i] = letter;
            }
        }
    }

    // letter wasn't found
    else {
        wrongLetters.push(letter);
        guessesLeft--;
    }
    // Testing and debugging
    console.log(blanksAndSuccess);

}

// reset guessed letters
var resetGuesses = function () {
    document.querySelector("#wrongGuesses").innerHTML = "";
}

function gameComplete() {
    console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left " + guessesLeft)

    // Update the HTML to reflect the most recent stats
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccess.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

    // check if user won
    if (lettersInWord.toString() == blanksAndSuccess.toString()) {
        resetGuesses();
        winCount++;
        document.getElementById("win/loss").innerHTML = "You Won!!!";

        // Update the win counter in the HTML
        document.getElementById("winCounter").innerHTML = winCount;
        startGame();
    }

    // check if user lost
    else if (guessesLeft == 0) {
        resetGuesses();
        lossCount++
        document.getElementById("win/loss").innerHTML = "You Lost!!!";


        // Update the HTML
        document.getElementById("lossCounter").innerHTML = lossCount;
        startGame();
    }

}

// main process ===================================================================================


// Initiates the code the first time
startGame()

//Register keyclicks
document.onkeyup = function (event) {
    document.getElementById("win/loss").innerHTML = "";
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkletters(letterGuessed);
    gameComplete();

    // Testing and debgugging
    console.log(letterGuessed);
}