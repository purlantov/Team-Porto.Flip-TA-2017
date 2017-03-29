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
    // Increases dropCounter with diff between current time and last time refresh was called
    // deltaTime is usually around 16ms
    // the piece moves down when dropInterval exceeded
    const deltaTime = time - lastTime;
    // console.log('time ' + time);
    // console.log('last time ' + lastTime);
    // console.log('delta time ' + deltaTime);
    lastTime = time;
    dropCounter += deltaTime;

    // TO TEAM: Verify
    // Increase dropCounter by a fixed amount of 16 every tick/window refresh
    // Remove code above and use this?
    // dropCounter += 16;

    if (!gamePaused) {
        if (dropCounter > dropInterval) {
            pieceDrop();
            if (gameOver) {
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
    startSound.play();
    arena.forEach(row => row.fill(0));
    gamePaused = false;
    gameOver = false;
    dropInterval = START_SPEED;

    totalScore.className = '';
    totalScore.innerText = 0;
    currentLevel.innerText = 1;
    getBestScore(currentPlayer.score);

    currentPlayer = new Player();
    getNewPiece();
    update();
}

function pauseGame() {
    pauseSound.play();
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
        moveSound.play();
        pieceDrop();
    }

    //Fast drop
    else if (event.code === 'Space' && !gamePaused) {
        for (let i = 0; i < matrixHeight; i += 1) {
            if (piece.pos.y === 0) {
                break;
            }
            pieceDrop();
        }
        lineDropSound.play();
        event.preventDefault();
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
const audios = document.querySelectorAll('audio');

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
    } else if (ev.target == btnMute) {
        btnMute.blur();
        [].forEach.call(audios, function(audio) { muteAll(audio); })
    }
}, false);


draw.drawBlack();
draw.drawWelcomeMessage();