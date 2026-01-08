// Question: Omnitrix alien selector with rotation, sounds, countdown, GIFs, and auto refresh
// Name - ADITYA BHARDWAJ
// Section - D2
// Roll No - 08
// Course – B TECH
// Branch – CSE

const ring = document.getElementById("ring");
const diamond = document.querySelector(".diamond");
const centerAlien = document.getElementById("centerAlien");
const aliens = document.querySelectorAll(".alien");
const countdownEl = document.getElementById("countdown");
const countdownGif = document.getElementById("countdownGif");

/* UI Sounds */
const rotateSound = new Audio("sounds/arrow_key.wav");
const enterSound = new Audio("sounds/enter.wav");
const countdownSound = new Audio("sounds/countdown.wav");

rotateSound.volume = 0.7;
enterSound.volume = 0.8;
countdownSound.volume = 0.6;

/* Alien Sounds */
const alienSounds = [
    new Audio("aliens_sounds/Heatblast.wav"),
    new Audio("aliens_sounds/Wildmutt.wav"),
    new Audio("aliens_sounds/Diamondhead.wav"),
    new Audio("aliens_sounds/XLR8.wav"),
    new Audio("aliens_sounds/Grey Matter.wav"),
    new Audio("aliens_sounds/Four Arms.wav"),
    new Audio("aliens_sounds/Stinkfly.wav"),
    new Audio("aliens_sounds/Ripjaws.wav"),
    new Audio("aliens_sounds/Upgrade.wav"),
    new Audio("aliens_sounds/Ghostfreak.wav")
];

alienSounds.forEach(s => s.volume = 0.9);

/* Alien GIFs (LOCAL) */
const alienGifs = [
    "gif/heatblast.gif",
    "gif/wildmutt.gif",
    "gif/diamondhead.gif",
    "gif/xlr8.gif",
    "gif/greymatter.gif",
    "gif/fourarms.gif",
    "gif/stinkfly.gif",
    "gif/ripjaws.gif",
    "gif/upgrade.gif",
    "gif/ghostfreak.gif"
];

/* State */
let index = 0;
let rotation = 0;
const STEP = 36;
let isTransforming = false;

/* Update center alien */
function updateCenterAlien() {
    centerAlien.src = aliens[index].src;
}

/* Hide UI */
function hideUI() {
    ring.style.display = "none";
    diamond.style.display = "none";
}

/* Countdown */
function startCountdown(seconds) {
    let timeLeft = seconds;

    countdownEl.style.display = "block";
    countdownEl.classList.remove("red");
    countdownEl.textContent = timeLeft;

    countdownGif.src = alienGifs[index];
    countdownGif.style.display = "block";

    const timer = setInterval(() => {
        timeLeft--;
        countdownEl.textContent = timeLeft;

        if (timeLeft === 5) {
            countdownEl.classList.add("red");
            countdownSound.currentTime = 0;
            countdownSound.play();
        }

        if (timeLeft <= 0) {
            clearInterval(timer);

            countdownSound.pause();
            countdownSound.currentTime = 0;

            countdownGif.style.display = "none";
            countdownEl.textContent = "Battery Low!";

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }, 1000);
}

/* Controls */
document.addEventListener("keydown", (e) => {

    if (isTransforming) return;

    if (e.key === "ArrowRight") {
        index = (index + 1) % aliens.length;
        rotation -= STEP;
        rotateSound.currentTime = 0;
        rotateSound.play();
    }
    else if (e.key === "ArrowLeft") {
        index = (index - 1 + aliens.length) % aliens.length;
        rotation += STEP;
        rotateSound.currentTime = 0;
        rotateSound.play();
    }
    else if (e.key === "Enter") {
        isTransforming = true;

        enterSound.currentTime = 0;
        enterSound.play();

        alienSounds[index].currentTime = 0;
        alienSounds[index].play();

        hideUI();
        startCountdown(10);
        return;
    }
    else {
        return;
    }

    ring.style.transform = `rotate(${rotation}deg)`;
    updateCenterAlien();
});
