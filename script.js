const rows = 10;
const cols = 10;
const minesCount = 15;
let board = [];

function initGame() {
    board = Array.from({ length: rows }, () => Array(cols).fill(0));
    placeMines();
    updateNumbers();
    renderBoard();
}

function placeMines() {
    let placed = 0;
    while (placed < minesCount) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);
        if (board[r][c] !== 'M') {
            board[r][c] = 'M';
            placed++;
        }
    }
}

function updateNumbers() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (board[r][c] === 'M') continue;
            let count = 0;
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    let nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === 'M') {
                        count++;
                    }
                }
            }
            board[r][c] = count;
        }
    }
}

function renderBoard() {
    const gameDiv = document.getElementById("game");
    gameDiv.innerHTML = "";
    gameDiv.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
    board.forEach((row, r) => {
        row.forEach((cell, c) => {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.dataset.row = r;
            cellDiv.dataset.col = c;
            cellDiv.addEventListener("click", revealCell);
            gameDiv.appendChild(cellDiv);
        });
    });
}

function revealCell(event) {
    const r = event.target.dataset.row;
    const c = event.target.dataset.col;
    const cellValue = board[r][c];
    event.target.classList.add("revealed");
    event.target.innerText = cellValue === 0 ? "" : cellValue;
    if (cellValue === "M") {
        event.target.classList.add("mine");
        alert("지뢰를 밟았습니다! 게임 오버!");
        initGame();
    }
}

function resetGame() {
    initGame();
}

initGame();
