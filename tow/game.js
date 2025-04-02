/* ===== GAME SETUP ===== */
if (window.innerHeight > window.innerWidth) {
    document.body.innerHTML = '<span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" class="is-size-1">Please rotate your device in landscape mode</span>';
}

window.onresize = function() {
    window.location.reload();
}

/* ===== GAME VARIABLES ===== */

const lBar = document.getElementById("lBar");
const rBar = document.getElementById("rBar");
const announcer = document.getElementById("announcer");

const restartButton = '<button class="button is-primary" onclick="restart()" style="position: relative; top: 50%; transform: translateY(-50%);">Restart</button>';

var position = 50;
var started = false;
var timeToStart = 3000;

var interval = setInterval(startGame, 1000);

/* ===== GAME FUNCTIONS AND HANDLING ===== */

function startGame() {
    timeToStart -= 1000;

    if (timeToStart == 0) {
        started = true;
        announcer.innerText = "Go!";
        clearInterval(interval);
    } else {
        announcer.innerText = timeToStart / 1000;
    }
}

function tug(amount) {
    if (!started) return;
    position += amount;
    lBar.style.width = position.toString() + "%";
    rBar.style.width = (100 - position).toString() + "%";

    if (position == 100) {
        lBar.style.borderTopRightRadius = lBar.style.borderBottomRightRadius = "var(--bulma-radius-rounded)";
        announcer.innerText = "Blue wins! ";
        announcer.innerHTML += restartButton;
        started = false;
    } else if (position == 0) {
        rBar.style.borderTopLeftRadius = rBar.style.borderBottomLeftRadius = "var(--bulma-radius-rounded)";
        announcer.innerText = "Red wins! ";
        announcer.innerHTML += restartButton;
        started = false;
    }
}

function restart() {
    clearInterval(interval);
    started = false;
    position = 50;
    lBar.style.width = "50%";
    rBar.style.width = "50%";
    lBar.style.borderTopRightRadius = lBar.style.borderBottomRightRadius = rBar.style.borderTopLeftRadius = rBar.style.borderBottomLeftRadius = "0px";
    timeToStart = 3000;
    announcer.innerText = timeToStart / 1000;
    interval = setInterval(startGame, 1000);
}