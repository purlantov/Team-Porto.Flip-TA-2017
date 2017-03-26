const blockSize = 35;

function draw() {
    drawBlack();

    drawMatrix(arena, { x: 0, y: 0 });
    drawMatrix(piece.matrix, piece.pos);
}

function drawBlack() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
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
                context.fillRect((x + offset.x) * blockSize, (y + offset.y) * blockSize, blockSize, blockSize);

                var gradient = context.createLinearGradient(100, 100, 600, 600);
                gradient.addColorStop("0", colors[value]);
                gradient.addColorStop("0.5", "black");
                gradient.addColorStop("1", colors[value]);
                context.strokeStyle = gradient;
                context.lineWidth = 5;
                context.strokeRect((x + offset.x) * blockSize, (y + offset.y) * blockSize, blockSize, blockSize);
            }
        });
    });
}

function drawWelcomeMessage() {
    messageStyle();
    context.fillText("WELCOME!", canvas.width / 3.8, 320);
    context.font = "20pt Calibri";
    context.fillText("(press F2 to start)", canvas.width / 4.5, 360);
}


function drawPauseMessage() {
    messageStyle();
    context.fillText("GAME PAUSED", canvas.width / 4, 320);
    context.font = "20pt Calibri";
    context.fillText("(press Esc to resume)", canvas.width / 4.5, 360);
}

function drawGameOverMessage() {
    messageStyle();
    context.fillText("GAME OVER", canvas.width / 3.5, 340);
}

function messageStyle() {
    context.fillStyle = "rgba(144, 144, 144, 0.2)";
    context.fillRect(0, 250, canvas.width, 150);

    context.font = "26pt Calibri";
    context.fillStyle = "#FFF";
}