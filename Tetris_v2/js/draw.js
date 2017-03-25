function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(arena, { x: 0, y: 0 });
    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                // context.fillStyle = 'blue';
                // context.fillStyle = colors[value];
                // context.fillRect(x + offset.x, y + offset.y, 1, 1);

                //context.fillStyle = 'blue';

                context.fillStyle = colors[value];
                context.fillRect((x + offset.x) * k, (y + offset.y) * k, k, k);

                var gradient = context.createLinearGradient(100, 100, 600, 600);
                gradient.addColorStop("0", colors[value]);
                gradient.addColorStop("0.5", "black");
                gradient.addColorStop("1", colors[value]);
                context.strokeStyle = gradient;
                context.lineWidth = 5;
                context.strokeRect((x + offset.x) * k, (y + offset.y) * k, k, k);
            }
        });
    });
}

function drawPause() {
    messageBackground();
    context.font = "26pt Calibri";
    context.fillStyle = "#FFF";
    context.fillText("GAME PAUSED", canvas.width / 4, 320);
    context.font = "20pt Calibri";
    context.fillText("(press Esc to resume)", canvas.width / 4.5, 360);
}

function drawGameOver() {
    messageBackground();
    context.font = "26pt Calibri";
    context.fillStyle = "#FFF";
    context.fillText("GAME OVER", canvas.width / 3.5, 340);
}

function messageBackground() {
    context.fillStyle = "rgba(0, 0, 30, 0.5)";
    context.fillRect(0, 250, canvas.width, 150);
}