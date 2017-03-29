function Player() {
    this.score = 0;
    this.level = 1;
    this.lines = 0;
}

const pointsPerRow = [40, 100, 300, 1200]

let currentPlayer = new Player();
let bestScore = 0;
let totalScore = document.getElementById('totalScore'),
    bestScoreHolder = document.getElementById('bestScore'),
    level = document.getElementById('currentLevel'),
    lines = document.getElementById('totalLines');

function updateScore(rowsCount) {
    const newPoints = currentPlayer.level * pointsPerRow[rowsCount - 1];

    currentPlayer.score += newPoints;
    currentPlayer.lines += rowsCount;

    if (currentPlayer.score > bestScore) {
        totalScore.className = 'green';
    } else if (currentPlayer.score < bestScore) {
        totalScore.className = 'red';
    }
    // Level update
    currentPlayer.level = Math.floor(currentPlayer.lines / 10 + 1);
    // Speed update
    dropInterval = START_SPEED - 30 * currentPlayer.level;

    totalScore.innerText = currentPlayer.score;
    currentLevel.innerText = currentPlayer.level;
    totalLines.innerText = currentPlayer.lines;
}

function getBestScore(score) {
    if (score > bestScore) {
        bestScore = score;
        bestScoreHolder.innerHTML = bestScore;
    }
}