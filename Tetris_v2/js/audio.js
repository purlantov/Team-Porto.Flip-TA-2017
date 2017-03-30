const audio = {
    song: new Audio("./sounds/song.mp3"),
    move: new Audio("./sounds/move.mp3"),
    pause: new Audio("./sounds/pause.mp3"),
    start: new Audio("./sounds/start.mp3"),
    gameEnd: new Audio("./sounds/gameover.mp3"),
    lineDrop: new Audio("./sounds/line-drop.mp3"),
    lineRemove: new Audio("./sounds/line-remove.mp3")
};

audio.song.loop = true;
audio.song.autoplay = true;

const audioBox = document.getElementById('audio-elements');

for (let i in audio) {
    audioBox.appendChild(audio[i]);
}

function toggleSound() {
    for (let i in audio) {
        if (!audio[i].muted) {
            audio[i].muted = true;
            btnMute.innerHTML = '<img src="images/soundOff.svg">'
        } else {
            audio[i].muted = false;
            btnMute.innerHTML = '<img src="images/soundOn.svg">';
        }
    }
}