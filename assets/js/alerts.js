/**
 * Shows the rule of the game, and determines the properties of SweetAlert2 modal
 **/
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
      htmlContainer: "swal-custom-html-container-height",
    },
    icon: "info",
    width: "1000px",
    html: rulesHTML,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Ok, got it!",
    allowOutsideClick: false,
    allowEscapeKey: false,
  });
}

/**
 * Determines the properties of SweetAlert2 error message
 **/
function swalError(text) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: `${text}`,
    allowOutsideClick: false,
    confirmButtonColor: "#FF0000",
    allowEscapeKey: false,
  });
}

/**
 * Determines the properties of SweetAlert2 confirm message
 **/
function swalConfirm(text) {
  Swal.fire({
    icon: "success",
    title: "Good Job",
    text: `${text}`,
    allowOutsideClick: false,
    confirmButtonColor: "#1DB954",
    allowEscapeKey: false,
  });
}

/**
 * Determines the properties of SweetAlert2 warning message
 **/
function swalWarning(text) {
  Swal.fire({
    icon: "warning",
    title: "Game Over",
    text: `${text}`,
    allowOutsideClick: false,
    confirmButtonColor: "#facea8",
    confirmButtonText: "Try again",
    allowEscapeKey: false,
  });
}

/**
 * Determines the properties of SweetAlert2 statistics
 **/
function swalStatistics(sortedPlayers) {
  let statisticsHTML = `
    <table style="width: 100%">
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody id="table-data"></tbody>
    </table>
  </div>
  `;
  Swal.fire({
    title: "Statistics",
    html: statisticsHTML,
    allowOutsideClick: false,
    confirmButtonColor: "#1DB954",
    confirmButtonText: "OK",
    allowEscapeKey: false,
  });

  createTableFromData(sortedPlayers);
}

/**
 * Creates the table
 **/
function createTableFromData(data) {
  let tableBody = document.getElementById("table-data");
  for (let player of data) {
    tr = document.createElement("tr");
    tdName = document.createElement("td");
    tdName.innerHTML = player.name;
    tdScore = document.createElement("td");
    tdScore.innerHTML = player.score;
    tdTime = document.createElement("td");
    tdTime.innerHTML = player.gameTime;
    tr.appendChild(tdName);
    tr.appendChild(tdScore);
    tr.appendChild(tdTime);
    tableBody.appendChild(tr);
  }
}
