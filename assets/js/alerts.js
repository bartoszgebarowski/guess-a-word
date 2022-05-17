function rulesSwalAlert() {
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

// This function will bring rules popup


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

function swalStatistics() {
  let statisticsHTML =`
 <p>Placeholder</p>`;
  Swal.fire({
    title: 'Statistics',
    html: statisticsHTML,
    allowOutsideClick: false,
    confirmButtonColor: '#1DB954',
    confirmButtonText: 'OK',
    allowEscapeKey: false,
  });
}