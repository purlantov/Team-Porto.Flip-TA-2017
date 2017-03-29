function Player() {
    this.score = 0;
    this.level = 1;
}

const startPoints = [40, 100, 300, 1200]

let currentPlayer = new Player();
let bestScore = 0;
let totalScore = document.getElementById('totalScore'),
    bestScoreHolder = document.getElementById('bestScore'),
    level = document.getElementById('currentLevel');

function updateScore(rows) {
    let increasePoints = currentPlayer.level * startPoints[rows-1];

    currentPlayer.score += increasePoints;

    if (currentPlayer.score > bestScore) {
        totalScore.className = '';
        totalScore.classList.add('green');
    } else if (currentPlayer.score < bestScore) {
        totalScore.className = '';
        totalScore.classList.add('red');
    }
    // Level update
    currentPlayer.level = Math.floor(currentPlayer.score/1000 + 1);
   // Speed update
    dropInterval = START_SPEED - 30 * currentPlayer.level;

    totalScore.innerText = currentPlayer.score;
    currentLevel.innerText = currentPlayer.level;

    //if (currentPlayer.score >= currentPlayer.scoreToLevelUp) {
    //    currentPlayer.scoreToLevelUp = currentPlayer.scoreToLevelUp * 2;
    //    console.log(currentPlayer.scoreToLevelUp);
    //    dropInterval = dropInterval - 10;
    //    //levelUp.innerHTML = 'Level up!<br />Points will increase with ' + increasePoints;
    //    //setTimeout(function(){levelUp.innerHTML = '';}, 5000);
    //}
}

function getBestScore (score) {
    if (score > bestScore) {
        bestScore = score;
        bestScoreHolder.innerHTML = bestScore;
    }
}

// TO DO: Top 5 scores