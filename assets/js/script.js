// Global parameters

let rowCounter = 1;
let userWord = [];
let puzzleWordPool = ["WORLD", "SMELL", "PRIDE"];
let puzzleWord = Array.from(puzzleWordPool[0]);
let playerId;
let scoreBoard = [];

//Function that will change the color of tile in the game board depending on the user input and puzzle word

function tileColor(tile, color) {
  tile.classList.add(`${color}-button`);
}

// Function that will change background color of button to red, if the letter does not appear in the word from the puzzle

function buttonToRed(wrongLetter, correctLetter, puzzleArray) {
  let letterElement = document.getElementById(
    `letter-${wrongLetter.toLowerCase()}`
  );
  if (puzzleArray.includes(wrongLetter) === false) {
    letterElement.classList.add("red-button");
  }
}

// Function that checks if letter is correct
function checkForCorrectLetter(correctAnswer, userAnswer) {
  let activeRow = document.querySelector(`#row-${rowCounter}`);
  for (i = 0; i < userAnswer.length; i++) {
    let guessedLetter = userAnswer[i];
    let correctLetter = correctAnswer[i];
    if (guessedLetter === correctLetter) {
      // Mark correct letters green/yellow and change them to number(disable letter from further search)
      tileColor(activeRow.children[i], "green");
      correctAnswer[i] = 0;
    } else {
      buttonToRed(guessedLetter, correctLetter, puzzleWord);
    }
  }
}

// Clear Board

function clearBoard() {
  let puzzleRows = document.querySelectorAll(".puzzle-area-row-flex");
  for (let tiles of puzzleRows) {
    let allTiles = tiles.children;
    for (let tile of allTiles) {
      tile.innerHTML = "";
      tile.classList.remove("yellow-button");
      tile.classList.remove("green-button");
    }
  }
  let keyboardButtons = document.querySelectorAll(".letter-button");
  for (let button of keyboardButtons) {
    button.classList.remove("red-button");
  }
}

// Win condition check

function winConditionCheck(correctAnswer) {
  let firstLetter = correctAnswer[0];
  let fourLetters = correctAnswer.slice(1, 5);
  let fourLettersJoin = fourLetters.join("");
  let fourLettersJoinLowerCase = fourLettersJoin.toLowerCase();
  let answerToDisplay = firstLetter + fourLettersJoinLowerCase;
  swalConfirm(`That is correct ! The puzzle word was ${answerToDisplay}`);
  console.log(playerId);
  player = getPlayerById(playerId);
  console.log(player);
  player.score++;
  player.endTime = new Date().getTime();
  player.gameTime = (player.endTime - player.startTime) / 1000;
  updatePlayer(player);
  clearBoard();
}

// Game over condition check

function gameOverConditionCheck(userAnswer, correctAnswer) {
  if (userAnswer.toString() !== correctAnswer.toString()) {
    let firstLetter = correctAnswer[0];
    let fourLetters = correctAnswer.slice(1, 5);
    let fourLettersJoin = fourLetters.join("");
    let fourLettersJoinLowerCase = fourLettersJoin.toLowerCase();
    let answerToDisplay = firstLetter + fourLettersJoinLowerCase;
    player = getPlayerById(playerId);
    console.log(player);
    player.endTime = new Date().getTime();
    player.gameTime = (player.endTime - player.startTime) / 1000;
    updatePlayer(player);
    swalWarning(
      `You have used all of your tries. The correct answer was ${answerToDisplay}`
    );
    clearBoard();
  }
}

// Function that checks letter placement

function checkForLetterPlacement(correctAnswer, userAnswer) {
  let activeRow = document.querySelector(`#row-${rowCounter}`);
  for (i = 0; i < userAnswer.length; i++) {
    let guessedLetter = userAnswer[i];
    let letterIndex = correctAnswer.indexOf(guessedLetter);
    if (letterIndex !== -1) {
      // // Mark correct letter but not in their place and change them to number(disable letter from further search)
      tileColor(activeRow.children[i], "yellow");
      correctAnswer[letterIndex] = 0;
    }
  }
}

// Function that will check the answer

function checkAnswer(correctAnswer, userAnswer) {
  let activeRow = document.querySelector(`#row-${rowCounter}`);
  if (correctAnswer.toString() === userAnswer.toString()) {
    for (let tile of activeRow.children) {
      tileColor(tile, "green");
    }
    winConditionCheck(puzzleWord);
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
  if (userWord.length < 5) {
    let letter = letterButton.innerHTML;
    userWord.push(letter);
    let letterIndex = userWord.length - 1;
    insertValue(rowCounter, letterIndex, letter);
  } else {
    swalError("Too many letters. To continue, please, confirm your answer.");
  }
}

// Function that submit word to row

function submitAnswer(rowNumber, wordArray) {
  // Currently active row on the board
  let activeRow = document.querySelector(`#row-${rowNumber}`);
  // Add user word into the board
  for (i = 0; i < activeRow.children.length; i++) {
    let letterInsert = activeRow.children[i];
    letterInsert.innerHTML = wordArray[i];
  }
}

function requestToDictionaryAPI(word) {
  var request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    false
  ); // `false` makes the request synchronous
  request.send(null);
  return request.status;
}

function isValidWord(word) {
  let status = requestToDictionaryAPI(word.join(""));
  if (status === 200) {
    return true;
  }
  return false;
}

// Function that will get the enter and delete buttons elements and add event listeners

function initiateButtonsActions() {
  let letterButtons = document.querySelectorAll(".letter-button");
  for (let letterButton of letterButtons) {
    letterButton.addEventListener("click", function () {
      console.log(`${letterButton.textContent} pressed`);
      pushLetterValidation(letterButton, userWord);
    });
  }
  // Enter button
  let enterButton = document.getElementById("enter-button");
  enterButton.addEventListener("click", function () {
    // Words must be 5 characters long
    if (userWord.length === 5) {
      if (isValidWord(userWord)) {
        submitAnswer(rowCounter, userWord);
        checkAnswer(puzzleWord.slice(), userWord);
        // Check for game over condition
        if (rowCounter > 5) {
          gameOverConditionCheck(userWord, puzzleWord);
          rowCounter = 0;
        }
        userWord = [];
        rowCounter = rowCounter + 1;
      } else {
        swalError("It must be a valid word");
      }
    } else {
      swalError("Word must be 5 characters long.");
    }
  });
  // Delete Button
  let deleteButton = document.getElementById("delete-button");
  deleteButton.addEventListener("click", function () {
    if (userWord.length) {
      let letterIndex = userWord.length - 1;
      insertValue(rowCounter, letterIndex, "");
      userWord.pop();
    } else {
      swalError("There is nothing to remove");
    }
  });
}

// Function that will display SweetAlert, capture user input and push it to local storage

function swalInput(id) {
  Swal.fire({
    title: "Choose your username",
    html: `<input type="text" id="username" class="swal2-input" placeholder="Username">`,
    confirmButtonText: "I'm, ready",
    confirmButtonColor: "#1DB954",
    focusConfirm: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    preConfirm: () => {
      let input = Swal.getPopup().querySelector("#username").value;
      if (!input) {
        Swal.showValidationMessage(`Please enter your username`);
      }
      return input;
    },
  }).then((input) => {
    players = getPlayers();
    player = getPlayerById(id);
    player.name = input.value;
    player.startTime = new Date().getTime();
    updatePlayer(player);
  });
}

//  Wait for the DOM finish loading
// Get the rules and statistics element, add event listeners,  SweetAlert modals

document.addEventListener("DOMContentLoaded", function () {
  // Rules

  let rulesInfo = document.getElementById("rules");
  rulesInfo.addEventListener("click", function () {
    rulesSwalAlert();
  });
  // Stats
  let statistics = document.getElementById("statistics");
  statistics.addEventListener("click", function () {
    swalStatistics(getTopFivePlayers());
  });
});

//  Wait for the DOM finish loading , start the game

document.addEventListener("DOMContentLoaded", function () {
  // Initiate local storage when one does not exist
  if (!localStorage.Players) {
    localStorage.Players = JSON.stringify([]);
  }
  let newPlayer = createNewPlayer();
  playerId = newPlayer.id;
  swalInput(newPlayer.id);
  initiateButtonsActions();
});

// Create new Player

function createNewPlayer() {
  players = getPlayers();
  let lastId = 0;
  if (players.length) {
    lastId = players.at(-1).id;
  }
  let newPlayer = {
    id: lastId + 1,
    name: "",
    score: 0,
    gameTime: 0,
  };
  savePlayer(newPlayer);
  return newPlayer;
}

// Get players

function getPlayers() {
  return JSON.parse(localStorage.Players);
}

// Save players

function savePlayer(newPlayer) {
  players = getPlayers();
  players.push(newPlayer);
  savePlayers(players);
}

// Update player

function updatePlayer(updatedPlayer) {
  players = players.map((player) =>
    player.id !== updatedPlayer.id ? player : updatedPlayer
  );
  savePlayers(players);
}

// Save player

function savePlayers(players) {
  localStorage.Players = JSON.stringify(players);
}

// Get player by Id

function getPlayerById(id) {
  players = getPlayers();
  for (let player of players) {
    if (player.id == id) {
      return player;
    }
  }
}

// Function that will filter out invalid entries

function getLeaderBoardPlayers() {
  let dataToSort = getPlayers();
  let leaderBoardPlayers = [];
  for (i = 0; i < dataToSort.length; i++) {
    if (
      dataToSort[i].name &&
      dataToSort[i].gameTime !== 0 &&
      dataToSort[i].name !== ""
    ) {
      leaderBoardPlayers.push(dataToSort[i]);
    }
  }
  return leaderBoardPlayers;
}

getLeaderBoardPlayers();

// Function that will sort players

function sortPlayers(dataToSort) {
  let dataSorted = dataToSort.sort(
    (a, b) => a.name - b.name || b.score - a.score || a.gameTime - b.gameTime
  );
  return dataSorted;
}

// Return top five players

function getTopFivePlayers() {
  let sortedPlayers = sortPlayers(getLeaderBoardPlayers());
  return sortedPlayers.slice(0, 5);
}
