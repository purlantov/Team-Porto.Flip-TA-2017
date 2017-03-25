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

                var gradient = context.createLinearGradient(0, 0, 360, 0);
                gradient.addColorStop("0", colors[value]);
                gradient.addColorStop("1", "black");
                context.strokeStyle = gradient;
                context.lineWidth = 5;
                context.strokeRect((x + offset.x) * k, (y + offset.y) * k, k, k);
            }
        });
    });
}