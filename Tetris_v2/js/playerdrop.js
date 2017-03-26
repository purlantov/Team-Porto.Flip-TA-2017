const pieces = 'ILJOTSZ';

const piece = {
    pos: { x: 5, y: 0 },
    matrix: createPiece('T'), // blocks.js
};

function pieceDrop() {
    piece.pos.y += 1;
    if (collide(arena, piece)) {
        piece.pos.y -= 1;
        merge(arena, piece);

        getNewPiece();
        arenaSweep();
    }
}


// Declared constants because matrix height is needed for spacebar drop
const matrixWidth = 12;
const matrixHeight = 20;
const arena = createMatrix(matrixWidth, matrixHeight);

function createMatrix(width, height) {
    const matrix = [];

    while (height > 0) {
        matrix.push(new Array(width).fill(0));
        height -= 1;
    }

    return matrix;
}

function collide(arena, piece) {
    //Destructuring confusing
    //const [m, o] = [piece.matrix, piece.pos];
    for (let row = 0; row < piece.matrix.length; row += 1) {
        for (let col = 0; col < piece.matrix[row].length; col += 1) {

            // Disregard piece matrix zero values
            if (piece.matrix[row][col] !== 0 &&
                // Check if arena-row exists
                (arena[row + piece.pos.y] &&
                    // Check if arena col next to piece position on this row is filled
                    arena[row + piece.pos.y][col + piece.pos.x]) !== 0) {
                // There is a collision
                return true;
            }
        }
    }
    return false;
}

function merge(arena, piece) {
    piece.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + piece.pos.y][x + piece.pos.x] = value;
            }
        });
    });
}

let randomize = pieces[(Math.random() * pieces.length) | 0];

// Gets new piece
function getNewPiece() {
    piece.matrix = createPiece(randomize);
    let image = document.getElementById(randomize);
    image.className = "active";
    randomize = pieces[pieces.length * Math.random() | 0];
    image.className = "";
    image = document.getElementById(randomize);

    image.className = "active";

    // To do: pieces start from out of the matrix?
    piece.pos.y = 0;
    piece.pos.x = (arena[0].length / 2 | 0) - (piece.matrix[0].length / 2 | 0);

    let gameOver = collide(arena, piece);
    if (gameOver) {
        // To do: fix game over message appears only on arrow down
        gamePaused = true;
        drawGameOver();
    }
}

function arenaSweep() {
    outer: for (let y = arena.length - 1; y > 0; y -= 1) {
        for (let x = 0; x < arena[y].length; x += 1) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }
        updateScore();
        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        y += 1;
    }
}