var moveSound = new Audio("./sounds/move.mp3"),
    pauseSound = new Audio("./sounds/pause.mp3"),
    startSound = new Audio("./sounds/start.mp3"),
    gameOverSound = new Audio("./sounds/gameover.mp3"),
    lineDropSound = new Audio("./sounds/line-drop.mp3"),
    lineRemoveSound = new Audio("./sounds/line-remove.mp3");

// There should be a better way to do this?
$('body').append(moveSound);
$('body').append(pauseSound);
$('body').append(startSound);
$('body').append(gameOverSound);
$('body').append(lineDropSound);
$('body').append(lineRemoveSound);

function muteAll(element) {
    if (!element.muted) {
        element.muted = true;
    } else {
        element.muted = false;
    }
}