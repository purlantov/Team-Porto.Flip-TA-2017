const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
canvas.width = '420';
canvas.height = '700';


//context.scale(35, 35);

let lastTime = 0,
    dropCounter = 0,
    dropInterval = 150;

let gamePaused = true;
let gameOver = true;


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
            pieceDrop(); // playerdrop.js
            if (gameOver) {
                drawGameOverMessage();
                return;
            }
            dropCounter = 0;
        }

        draw(); // draw.js
        requestAnimationFrame(update);
    }
}

function startNewGame() {
    arena.forEach(row => row.fill(0));
    gamePaused = false;
    gameOver = false;
    currentPlayer = new Player();
    totalScore.innerText = 0;
    getNewPiece();
    update();
}

function pauseGame() {
    if (gameOver) {
        return;
    }
    if (!gamePaused) {
        gamePaused = true;
        drawPauseMessage();

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

    //Fast drop
    else if (event.code === 'Space' && !gamePaused) {
        for (let i = 0; i < matrixHeight; i += 1) {
            if (piece.pos.y === 0) {
                break;
            }
            pieceDrop();
        }
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

// Prevent SpaceBar to repeat last clicked event
$(window).keyup(function(e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
        e.preventDefault();
        //console.log('(Space) Key Up was trigered!');
    }
});

const gameControls = document.getElementsByClassName('game-controls')[0];
const btnNew = document.getElementById('newGame');
const btnPause = document.getElementById('pause');
const btnHelp = document.getElementById('help');
const instructions = document.getElementById('instructions');

gameControls.addEventListener('click', function(ev) {
    if (ev.target == btnNew) {
        startNewGame();
    } else if (ev.target == btnPause) {
        pauseGame();
    } else if (ev.target == btnHelp) {
        instructions.classList.toggle('active');
    }
}, false);


drawBlack();
drawWelcomeMessage();