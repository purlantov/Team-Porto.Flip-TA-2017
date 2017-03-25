const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

let Score = document.getElementById("Score")
let totalScore = Score.firstElementChild;
let addedScore = 10;

const k = 35;
//context.scale(35, 35);

let lastTime = 0,
    dropCounter = 0,
    dropinteval = 150;

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;

    if (dropCounter > dropinteval) {
        playerDrop(); // playerdrop.js
    }

    draw(); // draw.js
    requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
    //move left
    if (event.keyCode === 37) {
        //player.pos.x -= 1;
        playerMove(-1); // playermove.js
    }

    //move right
    else if (event.keyCode === 39) {
        //player.pos.x += 1;
        playerMove(1);
    }

    //move down
    else if (event.keyCode === 40) {
        playerDrop();
    }

    //playerRotate right
    else if (event.keyCode === 81) {
        playerRotate(-1);
    }

    //playerRotate left
    else if (event.keyCode === 87) {
        playerRotate(1);
    }
    else if (event.keyCode === 32) {
        //player.pos.x += 1;
        for(let i=0;i<20;i=i+1)
        {
            if(player.pos.y === 0)
            {
                break;
            }
            playerDrop();
        }
    }
});

//ScoreBoard
function updateScore() {
    player.score += addedScore;
    totalScore.value = player.score;
    if(player.score === player.scoreToLevelUp)
    {
        addedScore += 20;
        player.scoreToLevelUp = player.scoreToLevelUp*2;
        dropinteval = dropinteval - 10;
    }
    
}

update();
