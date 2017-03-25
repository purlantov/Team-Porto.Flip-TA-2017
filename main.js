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


let player = {
    position: {
        x: 0,
        y: 0
    },
    direction: 0, // starts from first block direction
    block: blocks[0]
};



function nextBlock() {

    // TODO random next block

    // if (player.block >= 6) {
    //     player.block = 0;
    // } else {
    //     player.block += 1;
    // }
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
    if (event.keyCode === 39 && player.position.x+2 < canvas.width / 20) {
        player.position.x += 1;
    }
    if (event.keyCode === 40) {
        player.position.y += 1;
    }
});
