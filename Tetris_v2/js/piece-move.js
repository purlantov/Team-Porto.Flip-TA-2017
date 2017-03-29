function pieceMove(dir) {
    piece.pos.x += dir;
    if (collide(arena, piece)) {
        piece.pos.x -= dir;
    }
    moveSound.play();
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
     moveSound.play();
}