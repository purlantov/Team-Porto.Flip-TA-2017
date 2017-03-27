function Player() {
    this.score = 0;
    this.level = 1;
    this.scoreToLevelUp = 20,
    this.increasePoints = 10;
}

let currentPlayer = new Player();
let bestScore = 0;
let totalScore = document.getElementById('totalScore');
let bestScoreHolder = document.getElementById('bestScore');

function updateScore() {
    currentPlayer.score += currentPlayer.increasePoints;

    if (currentPlayer.score > bestScore) {
        totalScore.classList.add('green');
    } else if (currentPlayer.score < bestScore) {
        totalScore.classList.add('red');
    }
    totalScore.innerText = currentPlayer.score;

    if (currentPlayer.score === currentPlayer.scoreToLevelUp) {
        currentPlayer.increasePoints += 20;
        currentPlayer.scoreToLevelUp = currentPlayer.scoreToLevelUp * 2;
        dropInterval = dropInterval - 10;
    }
}

function getBestScore (score) {
    if (score > bestScore) {
        bestScore = score;
        bestScoreHolder.innerHTML = bestScore;
    }
}

// TO DO: Top 5 scores