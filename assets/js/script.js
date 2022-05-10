// Global parameters 

let rowCounter = 1;
let userWord = [];

//Function that will check the user answer length

function pushLetter(letterButton, userWord) {
  if(userWord.length < 5) {
    userWord.push(letterButton.innerHTML);
  } else {
    alert('Too many letters. The letter x will be removed')
    console.log(userWord);
  }
};

// Function that insert word to row

function insertWordToRow(rowNumber, wordArray) {
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
      pushLetter(letterButton, userWord);
    });
  }
  // Enter button
  let enterButton = document.getElementById('enter-button');
  enterButton.addEventListener('click', function() {
    // Words must be 5 
    if(userWord.length === 5) {
      insertWordToRow(rowCounter, userWord);
    } else {
      alert('Word must be 5 characters long');
    };
    // Clear the user word and change the active row
    // resetInput(userWord);
    userWord = [];
    rowCounter = rowCounter + 1;
  });
  // Delete Button
  let deleteButton = document.getElementById('delete-button');
  deleteButton.addEventListener('click', function() {
    alert('Delete pressed');
    userWord.pop();
  });
});
