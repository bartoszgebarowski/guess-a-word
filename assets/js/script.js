// Wait for the DOM finish loading 
// Get the buttons elements and add event listeners

document.addEventListener('DOMContentLoaded', function() {
  let buttons = document.querySelectorAll('.button');
  for (let button of buttons) {
    button.addEventListener('click', function() {
      if (this.getAttribute('data-type') === 'enter') {
        alert('Enter pressed');
      } else if (this.getAttribute('data-type') === 'delete') {
        alert('Delete pressed');
      } else {
        let activePuzzleRow = document.getElementsByClassName('puzzle-area-row-flex')[0].children;
          if(activePuzzleRow.length > 5) {
            console.log(activePuzzleRow.length)
            alert('Too many characters');
          } else {
            console.log(`${button.textContent} pressed`)
          }
      }
    })
  }
}); 
