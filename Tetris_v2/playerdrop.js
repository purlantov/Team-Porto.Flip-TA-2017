const player = {
    pos: { x: 5, y: 0 },
    matrix: createPiece('T'), // blocks.js
    score: 0
};

function playerDrop() {
    player.pos.y += 1;
    if (collide(arena, player)) {
        player.pos.y -= 1;
        merge(arena, player);

        playerReset();
        arenaSweep();
    }

    dropCounter = 0;
}

const arena = createMatrix(12, 20);
function createMatrix(width, height) {
    const matrix = [];

    while (height > 0) {
        matrix.push(new Array(width).fill(0));
        height -= 1;
    }

    return matrix;
}

function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; y += 1) {
        for (let x = 0; x < m[y].length; x += 1) {

            if (m[y][x] !== 0 //if player y-row x-colum !==0  
                &&
                (arena[y + o.y] // arena-row exist (is not 0) 
                    &&
                    arena[y + o.y][x + o.x]) !== 0) {
                return true; //coolision true
            }
        }
    }
    return false; // no coolision
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function playerReset() {
    const pieces = 'ILJOTSZ';
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);

    if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));
    }
}

function arenaSweep() {
    outer: for (let y = arena.length - 1; y > 0; y -= 1) {
        for (let x = 0; x < arena[y].length; x += 1) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        y += 1;
    }
}