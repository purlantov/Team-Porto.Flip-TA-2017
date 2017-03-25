function get(id) {
    return document.getElementById(id);
}

var canvas = get('canvas');
var ctx = canvas.getContext('2d');


let player = {
    position: {
        x: 0,
        y: 0
    },
    direction: 0, // starts from first block direction
    block: blocks[0]
};

function gravity() {

    if (player.position.y < canvas.height/20-3) {
            player.position.y += 0.15;
            console.log(player.position.y);
    }
}

function nextBlock() {
    // TODO: random next block

    if (player.block >= 6) {
        player.block = 0;
    } else {
        player.block += 1;
    }
    draw();
}



document.addEventListener('keydown', event => {
    if (event.keyCode === 37 && player.position.x >= 1) {
        player.position.x -= 1;
    }
    if (event.keyCode === 38) {
        if (player.direction >= 3) {
            player.direction = 0;
        } else {
            player.direction += 1;
        }
    }
    if (event.keyCode === 39 && player.position.x + 3 < canvas.width / 20) {
        player.position.x += 1;
    }
    if (event.keyCode === 40) {
        player.position.y += 1;
    }
});
