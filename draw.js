canvas.width = 200;
canvas.height = 360;
ctx.scale(20, 20);

function drawBlock(block, type, offsetX, offsetY) {
    block.blocks[type].forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                ctx.fillStyle = block.color;
                ctx.fillRect((x + offsetX), (y + offsetY), 1, 1);
                // ctx.rect((x + offsetX) * 20, (y + offsetY) * 20, 20, 20);
                // ctx.strokeStyle = 'white';
                // ctx.stroke();
            }
        });
    });
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBlock(player.block, player.direction, player.position.x, player.position.y);
}

function update() {
    gravity();
    draw();
    requestAnimationFrame(update);
    if (player.position.y===canvas.height/20) {
        player.position.y=0;
        player.position.x=0;
        nextBlock();
    }
}

update();
