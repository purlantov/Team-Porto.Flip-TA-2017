function pieceMove(dir) {
    piece.pos.x += dir;
    if (collide(arena, piece)) {
        piece.pos.x -= dir;
    }
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; y += 1) {
        for (let x = 0; x < y; x += 1) {
            [
                matrix[x][y],
                matrix[y][x]
            ] = [
                matrix[y][x],
                matrix[x][y]
            ];
        }
    }
    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

function pieceRotate(dir) {

    const pos = piece.pos.x;
    let offset = 1;

    rotate(piece.matrix, dir);

    while (collide(arena, piece)) {
        piece.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));

        if (offset > piece.matrix[0].length) {
            rotate(piece.matrix, -dir);
            piece.pos.x = pos;
            return;
        }
    }
}

function pieceDrop() {
    piece.pos.y += 1;
    if (collide(arena, piece)) {
        piece.pos.y -= 1;
        if (piece.pos.y < 0) {
            gameOver = true;
            return;
        } else {
            merge(arena, piece);

            getNewPiece();
            arenaSweep();
        }
    }
}

function pieceFastDrop(params) {
    piece.pos.y += 1;
    if (collide(arena, piece)) {
        piece.pos.y -= 1;
        pieceDrop();
        return;
    }
    pieceFastDrop();
}