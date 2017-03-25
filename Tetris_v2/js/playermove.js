function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
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

function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;

    rotate(player.matrix, dir);

    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));

        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

function pauseGame() {
    if (!gamePaused) {
        gamePaused = true;

        // todo put drawing in the draw.js file
        context.fillStyle = "rgba(0, 0, 0, 0.5)";
        context.fillRect(0, 8, canvas.width, 50);
        context.font = "16pt Calibri";
        context.fillStyle = "#FFF";
        context.fillText("GAME PAUSED", 30, 30);
        context.font = "14pt Calibri";
        context.fillText("(press Esc to resume)", 30, 30);

    } else if (gamePaused) {
        gamePaused = false;
        update();
    }
}