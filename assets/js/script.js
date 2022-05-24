// Global parameters

let rowCounter = 1;
let userWord = [];
let puzzleWord = randomize(gameWords);
let playerId;

/**
 *Returns one random word from five_char_words.txt
 **/
function randomize(words) {
  let shuffledWords = words[Math.floor(Math.random() * words.length)];
  return Array.from(shuffledWords.toUpperCase());
}

/**
 *Changes the colour of tile in the game board depending on the user input and puzzle word
 **/
function tileColor(tile, color) {
  tile.classList.add(`${color}-button`);
}

/**
 *Changes background color of button to red, if the letter does not appear in the word from the puzzle
 **/
function buttonToRed(wrongLetter, puzzleArray) {
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
  for (let i = 0; i < userAnswer.length; i++) {
    let guessedLetter = userAnswer[i];
    let correctLetter = correctAnswer[i];
    if (guessedLetter === correctLetter) {
      // Mark correct letters green/yellow and change them to number(disable letter from further search)
      tileColor(activeRow.children[i], "green");
      correctAnswer[i] = 0;
    } else {
      buttonToRed(guessedLetter, puzzleWord);
    }
  }
}

/**
 *Clears board and remove applied colours due to user actions
 **/
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

/**
 *Checks if the player guessed the right word
 **/
function winConditionCheck() {
  swalConfirm("That is correct! +1 point");
  let player = getPlayerById(playerId);
  player.score++;
  player.endTime = new Date().getTime();
  player.gameTime = (player.endTime - player.startTime) / 1000;
  updatePlayer(player);
  puzzleWord = randomize(gameWords);
  clearBoard();
}

/**
 *Game over condition check
 **/
function gameOverConditionCheck(userAnswer, correctAnswer) {
  if (userAnswer.toString() !== correctAnswer.toString()) {
    let firstLetter = correctAnswer[0];
    let fourLetters = correctAnswer.slice(1, 5);
    let fourLettersJoin = fourLetters.join("");
    let fourLettersJoinLowerCase = fourLettersJoin.toLowerCase();
    let answerToDisplay = firstLetter + fourLettersJoinLowerCase;
    let player = getPlayerById(playerId);
    player.endTime = new Date().getTime();
    player.gameTime = (player.endTime - player.startTime) / 1000;
    updatePlayer(player);
    swalWarning(
      `You have used all of your tries. The correct answer was ${answerToDisplay}`
    );
    puzzleWord = randomize(gameWords);
    clearBoard();
  }
}

/**
 * Checks letter placement
 **/
function checkForLetterPlacement(correctAnswer, userAnswer) {
  let activeRow = document.querySelector(`#row-${rowCounter}`);
  for (let i = 0; i < userAnswer.length; i++) {
    let guessedLetter = userAnswer[i];
    let letterIndex = correctAnswer.indexOf(guessedLetter);
    if (letterIndex !== -1) {
      // // Mark correct letter but not in their place and change them to number(disable letter from further search)
      tileColor(activeRow.children[i], "yellow");
      correctAnswer[letterIndex] = 0;
    }
  }
}

/**
 *Checks the player answer
 **/
function checkAnswer(correctAnswer, userAnswer) {
  let activeRow = document.querySelector(`#row-${rowCounter}`);
  if (correctAnswer.toString() === userAnswer.toString()) {
    for (let tile of activeRow.children) {
      tileColor(tile, "green");
    }
    winConditionCheck();
    rowCounter = 0;
  } else {
    checkForCorrectLetter(correctAnswer, userWord);
    checkForLetterPlacement(correctAnswer, userWord);
  }
}

/**
 *Inserts value (letter) to the row
 **/
function insertValue(rowNumber, index, value) {
  let activeRow = document.querySelector(`#row-${rowNumber}`);
  let letterInsert = activeRow.children[index];
  letterInsert.innerHTML = value;
}

/**
 *Validates the correct number of letters
 **/
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

/**
 *Submit word to row
 **/
function submitAnswer(rowNumber, wordArray) {
  // Currently active row on the board
  let activeRow = document.querySelector(`#row-${rowNumber}`);
  // Add user word into the board
  for (let i = 0; i < activeRow.children.length; i++) {
    let letterInsert = activeRow.children[i];
    letterInsert.innerHTML = wordArray[i];
  }
}

/**
 *Validates if the guessed word is in database
 **/
function isValidWord(word) {
  let wordToCheck = word.join("").toLowerCase();
  if (gameWords.includes(wordToCheck)) {
    return true;
  } else {
    return false;
  }
}

/**
 * Initiates action buttons
 **/
function initiateButtonsActions() {
  let letterButtons = document.querySelectorAll(".letter-button");
  for (let letterButton of letterButtons) {
    letterButton.addEventListener("click", function () {
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

/**
 * Displays SweetAlert2, capture user input and push it to local storage
 **/
function swalInput(id) {
  Swal.fire({
    html: `<label for="username">Choose your username</label>
    <input type="text" id="username" name="username" class="swal-custom-input" placeholder="Username">`,
    customClass: {
      input: "swal-custom-input",
      htmlContainer: "color-black",
    },
    confirmButtonText: "I'm, ready",
    confirmButtonColor: "#008A00",
    focusConfirm: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    preConfirm: () => {
      let input = Swal.getPopup().querySelector("#username").value;
      if (!input) {
        // Part of SweetAlert2 functionality
        Swal.showValidationMessage(`Please enter your username`);
      }
      if (input.length > 12) {
        // Part of SweetAlert2 functionality
        Swal.showValidationMessage(`Max 12 characters`);
      }
      return input;
    },
  }).then((input) => {
    let player;
    let players;
    players = getPlayers();
    player = getPlayerById(id);
    player.name = input.value;
    player.startTime = new Date().getTime();
    updatePlayer(player);
  });
}

/**
 * Gets the rules and statistics element and add event listeners
 **/
function initiateRulesAndStatistics() {
  let rulesInfo = document.getElementById("rules");
  rulesInfo.addEventListener("click", function () {
    rulesSwalAlert();
  });
  let statistics = document.getElementById("statistics");
  statistics.addEventListener("click", function () {
    swalStatistics(getTopFivePlayers());
  });
}

/**
 * Start the game
 **/
function initiateGame() {
  if (!localStorage.Players) {
    localStorage.Players = JSON.stringify([]);
  }
  let newPlayer = createNewPlayer();
  playerId = newPlayer.id;
  swalInput(newPlayer.id);
  initiateButtonsActions();
}

document.addEventListener("DOMContentLoaded", function () {
  initiateRulesAndStatistics();
  initiateGame();
});

/**
 * Creates new player
 **/
function createNewPlayer() {
  let players = getPlayers();
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

/**
 * Gets players from local storage
 **/
function getPlayers() {
  if (!localStorage.Players) {
    localStorage.Players = JSON.stringify([]);
  }
  return JSON.parse(localStorage.Players);
}

/**
 * Saves player
 **/
function savePlayer(newPlayer) {
  let players = getPlayers();
  players.push(newPlayer);
  savePlayers(players);
}

/**
 * Updates players
 **/
function updatePlayer(updatedPlayer) {
  let players = getPlayers();
  players = players.map((player) =>
    player.id !== updatedPlayer.id ? player : updatedPlayer
  );
  savePlayers(players);
}

/**
 * Saves player to local storage
 **/
function savePlayers(players) {
  localStorage.Players = JSON.stringify(players);
}

/**
 * Returns player by Id
 **/
function getPlayerById(id) {
  let players = getPlayers();
  for (let player of players) {
    if (player.id == id) {
      return player;
    }
  }
}

/**
 * Filters out invalid entries
 **/
function getLeaderBoardPlayers() {
  let dataToSort = getPlayers();
  let leaderBoardPlayers = [];
  for (let i = 0; i < dataToSort.length; i++) {
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

/**
 * Sorts Players
 **/
function sortPlayers(dataToSort) {
  let dataSorted = dataToSort.sort(
    (a, b) => a.name - b.name || b.score - a.score || a.gameTime - b.gameTime
  );
  return dataSorted;
}

/**
 * Returns top five players
 **/
function getTopFivePlayers() {
  let sortedPlayers = sortPlayers(getLeaderBoardPlayers());
  return sortedPlayers.slice(0, 5);
}
