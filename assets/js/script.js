// Wait for the DOM finish loading 
// Get the buttons elements and add event listeners

document.addEventListener('DOMContentLoaded', function() {
  let letterButtons = document.querySelectorAll('.letter-button');
  for (let letterButton of letterButtons) {
    letterButton.addEventListener('click', function() {
      console.log(`${letterButton.textContent} pressed`);
    })
  }
  // Enter button
  let enterButton = document.getElementById('enter-button');
  enterButton.addEventListener('click', function() {
    alert('Enter pressed');
  })
  // Delete Button
  let deleteButton = document.getElementById('delete-button');
  deleteButton.addEventListener('click', function() {
    alert('Delete pressed');
  })
})