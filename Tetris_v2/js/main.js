const canvas = document.getElementById('tetris');
canvas.width = '420';
canvas.height = '700';
const context = canvas.getContext('2d');


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
            pieceDrop(); // playerdrop.js
        }

        draw(); // draw.js
        requestAnimationFrame(update);
    }
}

function startNewGame() {
    arena.forEach(row => row.fill(0));
    gamePaused = false;
    currentPlayer = new Player();
    totalScore.innerText = 0;
    getNewPiece();
    update();
}

function pauseGame() {
    if (!gamePaused) {
        gamePaused = true;
        drawPause();

    } else if (gamePaused) {
        gamePaused = false;
        update();
    }
}

document.addEventListener('keydown', event => {
    // Move left
    if (event.code === 'ArrowLeft') {
        pieceMove(-1); // playermove.js
    }

    // Move right
    else if (event.code === 'ArrowRight') {
        pieceMove(1);
    }

    // Rotate right
    else if (event.code === 'ArrowUp') {
        pieceRotate(1);
    }

    // Move down faster
    else if (event.code === 'ArrowDown') {
        pieceDrop();
    }

    // Fast drop
    else if (event.code === 'Space' && !gamePaused) {
        for (let i = 0; i < matrixHeight; i += 1) {
            if (piece.pos.y === 0) {
                break;
            }
            pieceDrop();
        }
    }

    // Pause game
    else if (event.code === 'Escape') {
        pauseGame();
    }
});

const buttonNew = document.getElementById('newGame');
buttonNew.addEventListener("click", startNewGame);

const buttonPause = document.getElementById('pause');
buttonPause.addEventListener("click", pauseGame);

drawBlack();