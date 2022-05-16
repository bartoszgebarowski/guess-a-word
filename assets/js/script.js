// Global parameters 

let rowCounter = 1;
let userWord = [];
let puzzleWordPool = ['WORLD', 'SMELL', 'PRIDE'];
let puzzleWord = Array.from(puzzleWordPool[0]);
let userPoints = 0;
let wrongAnswers = 0;

//Function that will change the color of tile in the game board depending on the user input and puzzle word

function tileColor(tile, color) {
    tile.classList.add(`${color}-button`);
}


// Function that will change background color of button to red, if the letter does not appear in the word from the puzzle

function buttonToRed(wrongLetter, correctLetter, puzzleArray) {
  let letterElement = document.getElementById(`letter-${wrongLetter.toLowerCase()}`);
  if(puzzleArray.includes(wrongLetter) === false) {
    letterElement.classList.add('red-button');
  }
}

// Function that checks if letter is correct
function checkForCorrectLetter(correctAnswer, userAnswer,) {
  let activeRow = document.querySelector(`#row-${rowCounter}`);
  for(i = 0; i < userAnswer.length; i++) {
    let guessedLetter = userAnswer[i];
    let correctLetter = correctAnswer[i];
    if(guessedLetter === correctLetter) {
      // Mark correct letters green/yellow and change them to number(disable letter from further search)
      tileColor(activeRow.children[i], 'green');
      correctAnswer[i] = 0; 
    } else {
      buttonToRed(guessedLetter, correctLetter, puzzleWord);
    }
}
}

// Clear Board 

function clearBoard(activeRow) {
  let puzzleRows = document.querySelectorAll('.puzzle-area-row-flex');
  for (let tiles of puzzleRows) {
    let allTiles = tiles.children;
    for (let tile of allTiles) {
      tile.innerHTML = '';
      tile.classList.remove('yellow-button');
      tile.classList.remove('green-button');
    }
  }
  let keyboardButtons = document.querySelectorAll('.letter-button');
  for (let button of keyboardButtons) {
    button.classList.remove('red-button');
  }
}

// Win condition check

function winConditionCheck(activeRow, correctAnswer) {
  let firstLetter = correctAnswer[0];
    let fourLetters = correctAnswer.slice(1,5);
    let fourLettersJoin = fourLetters.join('');
    let fourLettersJoinLowerCase = fourLettersJoin.toLowerCase();
    let answerToDisplay = firstLetter + fourLettersJoinLowerCase;
    swalConfirm(`That is correct ! The puzzle word was ${answerToDisplay}`);
    userPoints = userPoints + 1;
    console.log(activeRow);
    console.log(userPoints);
    clearBoard(activeRow);
}

// Game over condition check

function gameOverConditionCheck(activeRow, userAnswer, correctAnswer) {
  if (userAnswer.toString() !== correctAnswer.toString()) {
    let firstLetter = correctAnswer[0];
    let fourLetters = correctAnswer.slice(1,5);
    let fourLettersJoin = fourLetters.join('');
    let fourLettersJoinLowerCase = fourLettersJoin.toLowerCase();
    let answerToDisplay = firstLetter + fourLettersJoinLowerCase;
    swalWarning(`You have used all of your tries. The correct answer was ${answerToDisplay}`);
    wrongAnswers = wrongAnswers + 1;
    console.log(`Wrong Answers: ${wrongAnswers}`);
    clearBoard(activeRow);
  }
}

// Function that checks letter placement

function checkForLetterPlacement(correctAnswer, userAnswer) {
  let activeRow = document.querySelector(`#row-${rowCounter}`);
  for(i = 0; i < userAnswer.length; i++) {
    let guessedLetter = userAnswer[i];
    let letterIndex = correctAnswer.indexOf(guessedLetter);
      if(letterIndex !== -1) {
        // // Mark correct letter but not in their place and change them to number(disable letter from further search)
        tileColor(activeRow.children[i], 'yellow');
        correctAnswer[letterIndex] = 0;
}}}


// Function that will check the answer 

function checkAnswer(correctAnswer, userAnswer) {
  let activeRow = document.querySelector(`#row-${rowCounter}`);
  if(correctAnswer.toString() === userAnswer.toString()) {
    for(let tile of activeRow.children) {
      tileColor(tile, 'green');
    }
    winConditionCheck(rowCounter, puzzleWord);
    rowCounter = 0;
  } else {
    checkForCorrectLetter(correctAnswer, userWord);
    checkForLetterPlacement(correctAnswer, userWord);
  }
}

// Function that will insert value to the row

function insertValue(rowNumber, index, value) {
  let activeRow = document.querySelector(`#row-${rowNumber}`);
  let letterInsert = activeRow.children[index];
  letterInsert.innerHTML = value;
}

// Function that validate the correct number of letters

function pushLetterValidation(letterButton, userWord) {
  if(userWord.length < 5) {
    let letter = letterButton.innerHTML; 
    userWord.push(letter);
    let letterIndex = userWord.length - 1;
    insertValue(rowCounter, letterIndex, letter);
  } else {
    swalError('Too many letters. To continue, please, confirm your answer.');
  }
}

// Function that submit word to row

function submitAnswer(rowNumber, wordArray) {
    // Currently active row on the board
    let activeRow = document.querySelector(`#row-${rowNumber}`);
    // Add user word into the board
    for(i = 0; i < activeRow.children.length; i++) {
      let letterInsert = activeRow.children[i];
      letterInsert.innerHTML = wordArray[i];
    }
}

// Wait for the DOM finish loading 
// Get the buttons elements and add event listeners

document.addEventListener('DOMContentLoaded', function() {
  let letterButtons = document.querySelectorAll('.letter-button');
  for (let letterButton of letterButtons) {
    letterButton.addEventListener('click', function() {
      console.log(`${letterButton.textContent} pressed`);
      pushLetterValidation(letterButton, userWord);
    });
  }
  // Enter button
  let enterButton = document.getElementById('enter-button');
  enterButton.addEventListener('click', function() {
    // Words must be 5 characters long
    if(userWord.length === 5) {
      submitAnswer(rowCounter, userWord);
      checkAnswer(puzzleWord.slice(), userWord);
      // Check for game over condition
      if(rowCounter > 5) {
        gameOverConditionCheck(rowCounter, userWord, puzzleWord);
        rowCounter = 0;
      }
      userWord = [];
      rowCounter = rowCounter + 1;
    } else {
      swalError('Word must be 5 characters long or word does not exist');
    }
  });
  // Delete Button
  let deleteButton = document.getElementById('delete-button');
  deleteButton.addEventListener('click', function() {
    if(userWord.length) {
      let letterIndex = userWord.length - 1;
      insertValue(rowCounter, letterIndex, '');
      userWord.pop();
    } else {
      swalError('There is nothing to remove');
    }
  });
});

// This function will bring rules popup

function rulesAlert() {
  let rulesHTML = `
<div class="puzzle-area">
  <div class="puzzle-area-row-flex">
    <div class="tile yellow-background">W</div>
    <div class="tile">O</div>
    <div class="tile green-background">R</div>
    <div class="tile">L</div>
    <div class="tile">D</div>
  </div>
</div>
<div class="margin-top-10px">
  <p class="text-align-left margin-top-10px">1. The objective of the game is to guess the correct word in 6 tries.</p>
  <p class="text-align-left margin-top-10px">2. Each guess must be a valid five-letter english word.</p>
  <p class="text-align-left margin-top-10px">3. After each try, the letters will be coloured accordingly on the puzzle board or the keyboard panel.</p>
  <p class="margin-top-10px">Considering the example above:</p>
  <p class="text-align-left margin-top-10px">If the letter is in the puzzle word and is on its place, the tile will be coloured on green (Tile with letter R).</p>
  <p class="text-align-left margin-top-10px">If the letter is in the puzzle word but not on its place, the tile will coloured on yellow (Tile with letter W).</p>
  <p class="text-align-left margin-top-10px">If the letter is not in the puzzle word, the corresponding buttons on the keyboard panel will be coloured on red.</p>
  <div class="margin-top-10px">
    <span class="letter-button-example red-background">O</span>
    <span class="letter-button-example red-background">L</span>
    <span class="letter-button-example red-background">D</span>
  </div>
  <div class="margin-top-10px">
    <p class="text-align-left margin-top-10px">To confirm your answer, click on the button with the following symbol<i class="fa-solid fa-right-to-bracket margin-left-5px"></i></p>
    <p class="text-align-left margin-top-10px">To remove 1 letter from your guess, use the button with the following symbol<i class="fa-solid fa-delete-left margin-left-5px"></i></p>
  </div>
</div>
`;

  Swal.fire({
    customClass: {
      htmlContainer: 'html-container-height',
    },
    icon: 'info',
    width: '1000px',
    html: rulesHTML,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Ok, got it!',
    allowOutsideClick: false,
    allowEscapeKey: false,
  });
}

// This function will bring up the SweetAlert2 popup with desired text

function swalError(text) {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: `${text}`,
    allowOutsideClick: false,
    confirmButtonColor: '#FF0000',
    allowEscapeKey: false,
  });
}

// This function will bring up the SweetAlert2 confirmation popup with desired text

function swalConfirm(text) {
  Swal.fire({
    icon: 'success',
    title: 'Good Job',
    text: `${text}`,
    allowOutsideClick: false,
    confirmButtonColor: '#1DB954',
    allowEscapeKey: false,
  });
}

function swalWarning(text) {
  Swal.fire({
    icon: 'warning',
    title: 'Game Over',
    text: `${text}`,
    allowOutsideClick: false,
    confirmButtonColor: '#facea8',
    confirmButtonText: 'Try again',
    allowEscapeKey: false,
  });
}

//  Wait for the DOM finish loading 
// Get the rules element, add event listener,  SweetAlert modal

document.addEventListener('DOMContentLoaded', function() {
  let rulesInfo = document.getElementById('rules');
  rulesInfo.addEventListener('click', function() {
    rulesAlert();
  });
});

