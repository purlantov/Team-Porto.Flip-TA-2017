const moveSound = new Audio("./sounds/move.mp3"),
    pauseSound = new Audio("./sounds/pause.mp3"),
    startSound = new Audio("./sounds/start.mp3"),
    gameOverSound = new Audio("./sounds/gameover.mp3"),
    lineDropSound = new Audio("./sounds/line-drop.mp3"),
    lineRemoveSound = new Audio("./sounds/line-remove.mp3");

// There should be a better way to do this?
const audioBox = document.getElementById('audio-elements');

audioBox.appendChild(moveSound);
audioBox.appendChild(pauseSound);
audioBox.appendChild(startSound);
audioBox.appendChild(gameOverSound);
audioBox.appendChild(lineDropSound);
audioBox.appendChild(lineRemoveSound);

function muteAll(element) {
    if (!element.muted) {
        element.muted = true;
        btnMute.innerHTML = '<img src="images/soundOff.svg">'
    } else {
        element.muted = false;
        btnMute.innerHTML = '<img src="images/soundOn.svg">';
    }
}