const matrixWidth = 12;
const matrixHeight = 20;
const arena = createArenaMatrix(matrixWidth, matrixHeight);

function createArenaMatrix(width, height) {
    const matrix = [];

    while (height > 0) {
        matrix.push(new Array(width).fill(0));
        height -= 1;
    }

    return matrix;
}

function collide(arena, piece) {
    for (let row = 0; row < piece.matrix.length; row += 1) {
        for (let col = 0; col < piece.matrix[row].length; col += 1) {
            // Skip if the piece is still above the matrix
            // Don't skip if the piece tries to move out of the matrix (left or right)
            if (row + piece.pos.y < 0 &&
                // Fixes move left out of the field
                arena[col + piece.pos.x]) {
                break;
            }
            // Disregard piece matrix zero values
            else if (piece.matrix[row][col] !== 0 &&
                // Check if arena-row exists
                (arena[row + piece.pos.y] &&
                    // Check if arena cell corresponding to this piece's cell is filled
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

function arenaSweep() {
    let fullRows = 0;
    outer: for (let y = arena.length - 1; y > 0; y -= 1) {
        for (let x = 0; x < arena[y].length; x += 1) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }
        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        y += 1;
        fullRows += 1;
        audio.lineRemove.play();
    }

    if (fullRows > 0) {
        updateScore(fullRows);
    }

}