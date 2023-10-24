let board;
let score = 0;
let rows = 4;
let columns = 4;

window.onload = function () {
  setGame();
};

function newGame() {
  document.querySelector(".game-wrapper").innerHTML = "";
  document.getElementById("gameScore").innerText = 0;
  score = 0;
  setGame();
}

function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = `${r}-${c}`;
      let num = board[r][c];
      updateTile(tile, num);
      document.querySelector(".game-wrapper").append(tile);
    }
  }

  setTwo();
  setTwo();
}

function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("game-tiles");
  if (num > 0) {
    tile.innerText = num.toString();
    if (num <= 4096) {
      tile.classList.add(`x${num}`);
    } else {
      tile.classList.add("x8192");
    }
  }
}

// arrow keys event

document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    slideLeft();
    setTwo();
  } else if (e.code == "ArrowRight") {
    slideRight();
    setTwo();
  } else if (e.code == "ArrowUp") {
    slideUp();
    setTwo();
  } else if (e.code == "ArrowDown") {
    slideDown();
    setTwo();
  }
  document.getElementById("gameScore").innerText = score;
});

// touch event

document
  .querySelector(".game-wrapper")
  .addEventListener("touchstart", function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
  });

document
  .querySelector(".game-wrapper")
  .addEventListener("touchend", function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
  });

function handleGesture() {
  let leftGap = touchstartX - touchendX;
  let rightGap = touchendX - touchstartX;
  let upGap = touchstartY - touchendY;
  let downGap = touchendY - touchstartY;

  if (leftGap > 100 && upGap < 100 && downGap < 100) {
    slideLeft();
    setTwo();
  }

  if (rightGap > 100 && upGap < 100 && downGap < 100) {
    slideRight();
    setTwo();
  }

  if (upGap > 100 && leftGap < 100 && rightGap < 100) {
    slideUp();
    setTwo();
  }

  if (downGap > 100 && leftGap < 100 && rightGap < 100) {
    slideDown();
    setTwo();
  }
  document.getElementById("gameScore").innerText = score;
}

function filterZero(row) {
  return row.filter((num) => num != 0);
}

function slide(row) {
  row = filterZero(row);
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
    }
  }
  row = filterZero(row);
  while (row.length < columns) {
    row.push(0);
  }
  return row;
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(`${r}-${c}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    board[r] = row.reverse();
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(`${r}-${c}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(`${r}-${c}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(`${r}-${c}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function setTwo() {
  if (!hasEmptyTile()) {
    return;
  }
  let found = false;
  while (!found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    if (board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(`${r}-${c}`);
      tile.innerText = "2";
      tile.classList.add("x2");
      found = true;
    }
  }
}

function hasEmptyTile() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        return true;
      }
    }
  }
  return false;
}
