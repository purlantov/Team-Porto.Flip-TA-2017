function Player() {
    this.score = 0;
    this.level = 1;
    this.scoreToLevelUp = 20,
    this.increasePoints = 10;
}

let currentPlayer = new Player();
let bestScore = 0;
let totalScore = document.getElementById('totalScore'),
    bestScoreHolder = document.getElementById('bestScore'),
    levelUp = document.getElementById('level-up');

function updateScore() {
    currentPlayer.score += currentPlayer.increasePoints;

    if (currentPlayer.score > bestScore) {
        totalScore.className = '';
        totalScore.classList.add('green');
    } else if (currentPlayer.score < bestScore) {
        totalScore.className = '';
        totalScore.classList.add('red');
    }
    totalScore.innerText = currentPlayer.score;

    if (currentPlayer.score >= currentPlayer.scoreToLevelUp) {
        currentPlayer.increasePoints += 20;
        currentPlayer.scoreToLevelUp = currentPlayer.scoreToLevelUp * 2;
        console.log(currentPlayer.scoreToLevelUp);
        dropInterval = dropInterval - 10;
        levelUp.innerHTML = 'Level up!<br />Points will increase with ' + currentPlayer.increasePoints;
        setTimeout(function(){levelUp.innerHTML = '';}, 5000);
    }
}

function getBestScore (score) {
    if (score > bestScore) {
        bestScore = score;
        bestScoreHolder.innerHTML = bestScore;
    }
}

// TO DO: Top 5 scores