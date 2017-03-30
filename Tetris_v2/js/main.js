const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
canvas.width = '420';
canvas.height = '700';

const START_SPEED = 700;

let lastTime = 0,
    dropCounter = 0,
    gamePaused = true,
    gameOver = true,
    dropInterval = START_SPEED;

function update(time = 0) {
    // Counts time interval, based on window refresh rate.
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    // dropCounter += 16;

    if (!gamePaused) {
        if (dropCounter > dropInterval) {
            pieceDrop();
            if (gameOver) {
                audio.gameEnd.play();
                draw.drawGameOverMessage();
                getBestScore(currentPlayer.score);
                return;
            }
            dropCounter = 0;
        }

        draw.draw();
        requestAnimationFrame(update);
    }
}

function startNewGame() {
    audio.start.play();
    arena.forEach(row => row.fill(0));
    gamePaused = false;
    gameOver = false;
    dropInterval = START_SPEED;

    totalScore.className = '';
    totalScore.innerText = 0;
    currentLevel.innerText = 1;
    totalLines.innerText = 0;
    getBestScore(currentPlayer.score);

    currentPlayer = new Player();
    getNewPiece();
    update();
}

function pauseGame() {
    audio.pause.play();
    if (gameOver) {
        return;
    }
    if (!gamePaused) {
        gamePaused = true;
        draw.drawPauseMessage();

    } else if (gamePaused) {
        gamePaused = false;
        update();
    }
}

document.addEventListener('keydown', event => {
    // Move left
    if (event.code === 'ArrowLeft') {
        pieceMove(-1);
        audio.move.play();
    }

    // Move right
    else if (event.code === 'ArrowRight') {
        pieceMove(1);
        audio.move.play();
    }

    // Rotate right
    else if (event.code === 'ArrowUp') {
        pieceRotate(1);
        audio.move.play();
    }

    // Move down faster
    else if (event.code === 'ArrowDown') {
        pieceDrop();
        audio.move.play();
    }

    //Fast drop
    else if (event.code === 'Space' && !gamePaused) {
        pieceFastDrop();
        audio.lineDrop.play();
    }

    // Pause game
    else if (event.code === 'Escape') {
        pauseGame();
    }

    // Start new game
    else if (event.code === 'F2') {
        startNewGame();
    }
});

const gameControls = document.getElementById('game-controls');
const btnNew = document.getElementById('newGame');
const btnPause = document.getElementById('pause');
const btnHelp = document.getElementById('help');
const instructions = document.getElementById('instructions');
const btnMute = document.getElementById('mute');

gameControls.addEventListener('click', function(ev) {
    if (ev.target == btnNew) {
        btnNew.blur();
        startNewGame();
    } else if (ev.target == btnPause) {
        btnPause.blur();
        pauseGame();
    } else if (ev.target == btnHelp) {
        btnHelp.blur();
        instructions.classList.toggle('active');
    } else if (ev.target == btnMute || ev.target.parentElement === btnMute) {
        btnMute.blur();
        toggleSound();
    }
}, false);


draw.drawBlack();
draw.drawWelcomeMessage();