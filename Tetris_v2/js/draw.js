const blockSize = 35;
const darkerPercentage = -0.5;

function draw() {
    drawBlack();

    drawMatrix(arena, {
        x: 0,
        y: 0
    });
    drawMatrix(piece.matrix, piece.pos);
}

function drawBlack() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function shadeColor(color, percent) {
    var f = parseInt(color.slice(1), 16),
        t = percent < 0 ? 0 : 255,
        p = percent < 0 ? percent * -1 : percent,
        R = f >> 16,
        G = f >> 8 & 0x00FF,
        B = f & 0x0000FF,
        r = Math.round((t - R) * p) + R,
        g = Math.round((t - G) * p) + G,
        b = Math.round((t - B) * p) + B,
        result = '#' + (0x1000000 + (r * 0x10000) + (g * 0x100) + b).toString(16).slice(1);

    return result;
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.strokeStyle = shadeColor(colors[value], darkerPercentage);
                context.lineWidth = 5;

                let startPointX = (x + offset.x) * blockSize;
                let startPointY = (y + offset.y) * blockSize;
                context.fillRect(startPointX, startPointY, blockSize, blockSize);
                context.strokeRect(startPointX, startPointY, blockSize, blockSize);
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
