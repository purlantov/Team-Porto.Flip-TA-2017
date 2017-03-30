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
            // Skip if the piece is still outside the matrix
            if (row + piece.pos.y < 0) {
                continue;
            }
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