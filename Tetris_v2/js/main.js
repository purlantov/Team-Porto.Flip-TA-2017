const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(35, 35);

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
});

//ScoreBoard
function updateScore() {
    document.getElementById('score').innerHTML = player.score;
}

update();
