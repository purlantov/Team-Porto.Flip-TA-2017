canvas.width = 200;
canvas.height = 360;
ctx.scale(20, 20);

function drawBlock(block, k, offsetX, offsetY) {
    block.blocks[k].forEach((row, y) => {
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
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // ctx.fillStyle = '#000000';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawBlock(player.block, player.direction, player.position.x, player.position.y);
}

function update() {
    draw();
    requestAnimationFrame(update);
}

update();
