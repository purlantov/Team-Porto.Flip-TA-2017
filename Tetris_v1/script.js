const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(35, 35);

// const matrix = [
//     [0, 0, 0],
//     [1, 1, 1],
//     [0, 1, 0]
// ];

const player = {
    pos: { x: 5, y: 0 },
    matrix: createPiece('T'),
    score: 0
};
//game pieces-------------------------------------------------
function createPiece(type) {
    if (type === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ];
    } else if (type === 'O') {
        return [
            [2, 2],
            [2, 2]
        ];
    } else if (type === 'L') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3]
        ];
    } else if (type === 'J') {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0]
        ];
    } else if (type === 'I') {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0]
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0]
        ];
    } else if (type === 'Z') {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0]
        ];
    }
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

//game matrix-------------------------------------------------------------------------------------------------
function createMatrix(w, h) {
    const matrix = [];

    while (h--) {
        matrix.push(new Array(w).fill(0))
    }
    return matrix;
}
const arena = createMatrix(12, 20);
//console.log(arena);
//console.table(arena);

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; y += 1) {
        for (let x = 0; x < m[y].length; x += 1) {

            if (m[y][x] !== 0  //if player y-row x-colum !==0  
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


//----------------------------------------------------------------------------------------------------------
function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                // context.fillStyle = 'blue';
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

const colors = [
    null,
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF'
];

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(arena, { x: 0, y: 0 });
    drawMatrix(player.matrix, player.pos);

}

// function drawGrid() {
// 		for(let i = 0; i <= TETRIS_ROWS; i += 1) {
// 			context.moveTo(0, getCellY(i));
// 			context.lineTo(getCellX(TETRIS_COLS), getCellY(i));
// 			context.stroke();
// 		}

// 		for(let i = 0; i <= TETRIS_COLS; i += 1) {
// 			context.moveTo(getCellX(i), 0);
// 			context.lineTo(getCellX(i), getCellY(TETRIS_ROWS));
// 			context.stroke();
// 		}
// 	}

//--------------------------------------------------------------------------------------------------------
//dropdown variables
let lastTime = 0,
    dropCounter = 0,
    dropinteval = 150;

function playerDrop() {
    player.pos.y += 1;
    if (collide(arena, player)) {
        player.pos.y -= 1;
        merge(arena, player);
        //player.pos.y = 0;
        playerReset();
        arenaSweep();
    }
    dropCounter = 0;
}

function update(time = 0) {
    //console.log(time);
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    //console.log(dropCounter);

    if (dropCounter > dropinteval) {
        playerDrop();
    }

    draw();
    requestAnimationFrame(update);
}
//player moves---------------------------------------------------------
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

document, addEventListener('keydown', event => {
    //console.log(event);

    //move left
    if (event.keyCode === 37) {
        //player.pos.x -= 1;
        playerMove(-1);
    }

    //move right
    else if (event.keyCode === 39) {
        //player.pos.x += 1;
        playerMove(1);
    }

    //move down
    else if (event.keyCode === 40) {
        playerDrop();
    }

    //playerRotate right
    else if (event.keyCode === 81) {
        playerRotate(-1);
    }

    //playerRotate left
    else if (event.keyCode === 87) {
        playerRotate(1);
    }
});

//CLEAN ROWS-------------------------------------------------------------------
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

//ScoreBoard
function updateScore() {
    document.getElementById('score').innerHTML = player.score;
}

update();



