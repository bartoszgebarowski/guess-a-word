// Global parameters 

let rowCounter = 1;
let userWord = [];
let puzzleWordPool = ['WORLD', 'SMELL', 'PRIDE'];
let puzzleWord = Array.from(puzzleWordPool[0]);
let userPoints = 0;
let wrongAnswers = 0;
let gameOver = 0;
//Function that will change the color of tile in the game board depending on the user input and puzzle word

function tileColor(tile, color) {
    tile.classList.add(`${color}-button`);
}

// Function that will change background color of button to red, if the letter does not appear in the word from the puzzle

function buttonToRed(wrongLetter) {
  let letterElement = document.getElementById(`letter-${wrongLetter.toLowerCase()}`);
  letterElement.classList.add('red-button');
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
    } 
}}

// Clear Board 

function clearBoard(activeRow) {
  let puzzleRows = document.querySelectorAll('.puzzle-area-row-flex');
  for (let tiles of puzzleRows) {
    let allTiles = tiles.children
    for (let tile of allTiles) {
      tile.innerHTML = '';
      tile.classList.remove('yellow-button');
      tile.classList.remove('green-button');
    }
  }
}

// Win condition check

function winConditionCheck(activeRow, correctAnswer) {
  let firstLetter = correctAnswer[0];
    let fourLetters = correctAnswer.slice(1,5);
    let fourLettersJoin = fourLetters.join('');
    let fourLettersJoinLowerCase = fourLettersJoin.toLowerCase();
    let answerToDisplay = firstLetter + fourLettersJoinLowerCase;
    alert(`That is correct ! The puzzle word was ${answerToDisplay}`);
    userPoints = userPoints + 1;
    console.log(activeRow)
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
    alert(`You have used all of your tries. The correct answer was ${answerToDisplay}`)
    wrongAnswers = wrongAnswers + 1;
    console.log(`Wrong Answers: ${wrongAnswers}`)
    clearBoard(activeRow);
  }
}

// Function that checks letter placement

function checkForLetterPlacement(correctAnswer, userAnswer,) {
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
    alert('Too many letters. The last letter will be removed. To continue, please, confirm your answer.');
    console.log(userWord);
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
      alert('Word must be 5 characters long');
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
      alert('There is nothing to remove');
    }
  });
});