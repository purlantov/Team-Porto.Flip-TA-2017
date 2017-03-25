const canvas = document.getElementById('tetris');
canvas.width = '420';
canvas.height = '700';
const context = canvas.getContext('2d');

const k = 35;
//context.scale(35, 35);

let lastTime = 0,
    dropCounter = 0,
    dropinteval = 150;

let gamePaused = false;

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;

    if (!gamePaused) {
        if (dropCounter > dropinteval) {
            playerDrop(); // playerdrop.js
        }

        draw(); // draw.js
        requestAnimationFrame(update);
    }
}

document.addEventListener('keydown', event => {
    // Move left
    if (event.code === 'ArrowLeft') {
        playerMove(-1); // playermove.js
    }

    // Move right
    else if (event.code === 'ArrowRight') {
        playerMove(1);
    }

    // Move down faster
    else if (event.code === 'ArrowDown') {
        playerDrop();
    }

    // Rotate right
    else if (event.code === 'ArrowUp') {
        playerRotate(1);
    }

    // Fast drop
    else if (event.code === 'Space') {
        for (let i = 0; i < 20; i = i + 1) {
            if (player.pos.y === 0) {
                break;
            }
            playerDrop();
        }
    }

    // Pause game
    else if (event.keyCode === 27) {
        pauseGame();
    }
});

const buttonNew = document.getElementById('newGame');
buttonNew.addEventListener("click", startNewGame);

const buttonPause = document.getElementById('pause');
buttonPause.addEventListener("click", pauseGame);

update();