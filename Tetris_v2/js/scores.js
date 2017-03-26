function Player() {
    this.score = 0;
    this.level = 1;
    this.scoreToLevelUp = 20;
}

let totalScore = document.getElementById('totalScore');
let currentPlayer = new Player();
let addedScore = 10;

function updateScore() {
    currentPlayer.score += addedScore;
    totalScore.innerText = currentPlayer.score;
    if (currentPlayer.score === currentPlayer.scoreToLevelUp) {
        addedScore += 20;
        currentPlayer.scoreToLevelUp = currentPlayer.scoreToLevelUp * 2;
        dropinteval = dropinteval - 10;
    }
}

// TO DO: Top 5 scores