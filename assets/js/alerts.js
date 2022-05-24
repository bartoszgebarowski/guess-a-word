const rulesHTML = `
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
  <ul class="text-align-left">
    <li>1. The objective of the game is to guess the correct word in 6 tries.</li>
    <li>2. Each guess must be a valid five-letter english word.</li>
    <li>3. After each try, the letters will be coloured accordingly on the puzzle board or the keyboard panel.</li>
  </ul>
  <p class="margin-top-10px">Considering the example above:</p>
  <p class="text-align-left margin-top-10px">If the letter is in the puzzle word and is in its place, the tile will be coloured green (Tile with letter R).</p>
  <p class="text-align-left margin-top-10px">If the letter is in the puzzle word but not in its place, the tile will be coloured yellow (Tile with letter W).</p>
  <p class="text-align-left margin-top-10px">If the letter is not in the puzzle word, the corresponding buttons on the keyboard panel will be coloured red.</p>
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

const statisticsHTML = `
<table style="width: 85%">
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

/**
 * Shows the rule of the game, and determines the properties of SweetAlert2 modal
 **/
function rulesSwalAlert() {
  Swal.fire({
    customClass: {
      title: "color-black",
      htmlContainer: "swal-custom-html-container-rules color-black",
    },
    icon: "info",
    width: "1000px",
    html: rulesHTML,
    confirmButtonColor: "#2166A6",
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
    customClass: {
      title: "color-black",
      htmlContainer: "color-black",
    },
    icon: "error",
    title: "Error",
    text: `${text}`,
    allowOutsideClick: false,
    confirmButtonColor: "#DC3741",
    allowEscapeKey: false,
  });
}

/**
 * Determines the properties of SweetAlert2 confirm message
 **/
function swalConfirm(text) {
  Swal.fire({
    customClass: {
      title: "color-black",
      htmlContainer: "color-black",
    },
    icon: "success",
    title: "Good Job",
    text: `${text}`,
    allowOutsideClick: false,
    confirmButtonColor: "#006100",
    allowEscapeKey: false,
  });
}

/**
 * Determines the properties of SweetAlert2 warning message
 **/
function swalWarning(text) {
  Swal.fire({
    customClass: {
      title: "color-black",
      htmlContainer: "color-black",
    },
    icon: "warning",
    title: "Game Over",
    text: `${text}`,
    allowOutsideClick: false,
    confirmButtonColor: "#7066e0",
    confirmButtonText: "Try again",
    allowEscapeKey: false,
  });
}

/**
 * Determines the properties of SweetAlert2 statistics
 **/
function swalStatistics(sortedPlayers) {
  Swal.fire({
    customClass: {
      title: "color-black",
      htmlContainer: "swal-custom-html-container color-black",
    },
    title: "Statistics",
    html: statisticsHTML,
    allowOutsideClick: false,
    confirmButtonColor: "#008A00",
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
    let tr = document.createElement("tr");
    let tdName = document.createElement("td");
    tdName.innerHTML = player.name;
    let tdScore = document.createElement("td");
    tdScore.innerHTML = player.score;
    let tdTime = document.createElement("td");
    tdTime.innerHTML = player.gameTime;
    tr.appendChild(tdName);
    tr.appendChild(tdScore);
    tr.appendChild(tdTime);
    tableBody.appendChild(tr);
  }
}
