function get(id) {
    return document.getElementById(id);
}

// if (!window.requestAnimationFrame) {
//     // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
//     window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
//         window.mozRequestAnimationFrame ||
//         window.oRequestAnimationFrame ||
//         window.msRequestAnimationFrame ||
//         function (callback, element) {
//             window.setTimeout(callback, 1000 / 60);
//         }
// }

var canvas = get('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 350;
canvas.height = 600;
ctx.scale(20, 20);

//
// Objects that represent each block element
// Blocks are T, J, L, S, Z, I, O
// Each block has property block with four rotation position inside
//
t = {
    size: 3,
    color: 'purple',
    blocks: [
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 1, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 1, 1, 1],
            [0, 0, 1, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 1],
            [0, 0, 0, 0]
        ]
    ]
}

j = {
    size: 3,
    color: 'blue',
    blocks: [
        [
            [0, 0, 0, 0],
            [0, 1, 1, 1],
            [0, 0, 0, 1],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 1, 1],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [0, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ]
    ]
}

l = {
    size: 3,
    color: 'orange',
    blocks: [
        [
            [0, 0, 0, 0],
            [0, 1, 1, 1],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 1],
            [0, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0]
        ]
    ]
}

z = {
    size: 3,
    color: 'red',
    blocks: [
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 1],
            [0, 0, 1, 1],
            [0, 0, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 1],
            [0, 0, 1, 1],
            [0, 0, 1, 0],
            [0, 0, 0, 0]
        ]
    ]
}

s = {
    size: 3,
    color: 'green',
    blocks: [
        [
            [0, 0, 0, 0],
            [0, 0, 1, 1],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 1],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 1, 1],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 1],
            [0, 0, 0, 0]
        ]
    ]
}

i = {
    size: 3,
    color: '#ADD8E6',
    blocks: [
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]
        ],
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]
        ]
    ]
}

o = {
    size: 2,
    color: 'yellow',
    blocks: [
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ]
    ]
}


function drawBlock(block, k, offsetX, offsetY) {
    block.blocks[k].forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                ctx.fillStyle = block.color;
                ctx.fillRect(x + offsetX, y + offsetY, 1, 1);
            }
        });
    });
}

let player = {
    position: {
        x: 0,
        y: 0
    },
    direction: 0 // starts from first block direction
};

function draw() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawBlock(t, player.direction, player.position.x, player.position.y);
}

function update() {
    draw();
    requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        player.position.x -= 1;
    }
    if (event.keyCode === 38) {
        if (player.direction >= 3) {
            player.direction = 0;
        } else {
            player.direction += 1;
        }
    }
    if (event.keyCode === 39) {
        player.position.x += 1;
    }
    if (event.keyCode === 40) {
        player.position.y += 1;
    }
});

update();

// drawBlock(t, 2, 0, 0);
// drawBlock(j, 2, 3, 3);
// drawBlock(l, 2, 6, 6);
// drawBlock(z, 2, 2, 6);
// drawBlock(s, 2, 12, 12);
// drawBlock(i, 2, 2, 12);
// drawBlock(o, 2, 5, 20);
