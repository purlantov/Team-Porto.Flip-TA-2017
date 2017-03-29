const pieces = 'ILJOTSZ';

function getRandomLetter() {
    return pieces[(Math.random() * pieces.length) | 0];
}

// Random x position can be improved to reflect piece width
function Piece(type) {
    this.matrix = createPieceMatrix(type);
    this.pos = {
        x: (matrixWidth - 3) * Math.random() | 0,
        y: -this.matrix.length
    };
}

function createPieceMatrix(type) {
    if (type === 'T') {
        return [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ];
    } else if (type === 'O') {
        return [
            [2, 2],
            [2, 2]
        ];
    } else if (type === 'L') {
        return [
            [0, 0, 3],
            [3, 3, 3],
            [0, 0, 0]
        ];
    } else if (type === 'J') {
        return [
            [4, 0, 0],
            [4, 4, 4],
            [0, 0, 0]
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

const colors = [
    null,
    '#8a2be2',
    '#FFFA34',
    '#FFA500',
    '#0000FF',
    '#2DDDDD',
    '#00B800',
    '#FF0000'
];