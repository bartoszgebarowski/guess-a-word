// Global parameters 

let rowCounter = 1;
let userWord = [];

// Wait for the DOM finish loading 
// Get the buttons elements and add event listeners

document.addEventListener('DOMContentLoaded', function() {
  let letterButtons = document.querySelectorAll('.letter-button');
  for (let letterButton of letterButtons) {
    letterButton.addEventListener('click', function() {
      console.log(`${letterButton.textContent} pressed`);
      userWord.push(letterButton.innerHTML);
    });
  }
  // Enter button
  let enterButton = document.getElementById('enter-button');
  enterButton.addEventListener('click', function() {
    alert('Enter pressed');
    // Currently active row on the board
    let activeRow = document.querySelector(`#row-${rowCounter}`);
    // Add user word into the board
    for(i = 0; i < activeRow.children.length; i++) {
      let letterInsert = activeRow.children[i];
      letterInsert.innerHTML = userWord[i];
    }
    // Clear the user word and change the active row
    userWord = [];
    rowCounter = rowCounter + 1;
  });
  // Delete Button
  let deleteButton = document.getElementById('delete-button');
  deleteButton.addEventListener('click', function() {
    alert('Delete pressed');
  });
});
