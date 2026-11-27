
let currentScene = 1;
let candleBlown = false;
let envelopeOpened = false;

// CHANGE BIRTHDAY DATE HERE
// Format: YYYY-MM-DDTHH:MM:SS
const birthdayDate = new Date("2027-01-01T00:00:00");

// MUSIC

const song = document.getElementById("birthdaySong");

function toggleMusic() {

    const btn = document.getElementById("musicBtn");

    if (song.paused) {

        song.play().then(() => {
            btn.innerHTML = "⏸ Pause Music";
        }).catch(() => {
            alert("Please add birthday-song.mp3 to your project folder.");
        });

    } else {

        song.pause();
        btn.innerHTML = "🎵 Play Music";

    }
}

// START STORY

function startStory() {

    song.play().then(() => {
        document.getElementById("musicBtn").innerHTML =
            "⏸ Pause Music";
    }).catch(() => {});

    showScene(2);
    createHearts(15);
}

// CHANGE SCENE

function showScene(number) {

    document.querySelectorAll(".scene").forEach(scene => {
        scene.classList.remove("active");
    });

    document.getElementById("scene" + number)
        .classList.add("active");

    currentScene = number;

    if(number === 7) {
        launchConfetti();
    }
}

function nextScene(number) {

    showScene(number);
    createHearts(20);

    if(number === 4) {
        updateCountdown();
    }
}

// ENVELOPE

function openEnvelope() {

    if(envelopeOpened) return;

    envelopeOpened = true;

    document.getElementById("envelope")
        .classList.add("open");

    createHearts(20);

    setTimeout(() => {
        showScene(3);
    }, 1600);
}

// PHOTO GALLERY

// Add your photos inside the images folder.
// HTML automatically displays the placeholders if a photo is missing.

// COUNTDOWN

function updateCountdown() {

    const now = new Date();
    const difference = birthdayDate - now;

    if(difference <= 0) {

        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";

        document.getElementById("countdownMessage").innerHTML =
            "It's your special day! Happy Birthday Suhani! ❤️";

        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    document.getElementById("countdownMessage").innerHTML =
        "Something beautiful is coming! 💗";
}

updateCountdown();

setInterval(updateCountdown, 1000);

// CAKE AND CANDLE

function blowCandle() {

    if(candleBlown) return;

    candleBlown = true;

    document.getElementById("flame").style.display = "none";

    document.getElementById("cakeText").innerHTML =
        "Your wish is on its way! ✨❤️";

    document.getElementById("blowBtn").style.display = "none";

    document.getElementById("letterBtn")
        .classList.remove("hidden");

    launchConfetti();
    createHearts(30);
}

// FLOATING HEARTS

function createHearts(amount) {

    const container = document.getElementById("hearts");

    for(let i = 0; i < amount; i++) {

        const heart = document.createElement("div");

        heart.className = "heart";

        heart.innerHTML = ["❤️", "💗", "💕", "✨", "🌸"][
            Math.floor(Math.random() * 5)
        ];

        heart.style.left = Math.random() * 100 + "vw";

        heart.style.fontSize =
            (15 + Math.random() * 25) + "px";

        heart.style.animationDuration =
            (4 + Math.random() * 5) + "s";

        container.appendChild(heart);

        setTimeout(() => heart.remove(), 9000);
    }
}

// AUTOMATIC HEARTS

setInterval(() => {

    if(currentScene !== 1) {
        createHearts(2);
    }

}, 1500);

// CONFETTI

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let pieces = [];
let animationRunning = false;

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

function launchConfetti() {

    pieces = [];

    for(let i = 0; i < 180; i++) {

        pieces.push({

            x: Math.random() * canvas.width,
            y: -Math.random() * canvas.height,

            size: 5 + Math.random() * 8,
            speed: 2 + Math.random() * 5,

            rotation: Math.random() * 360,

            color: [
                "#ff4fa3",
                "#ffd1e8",
                "#b98aff",
                "#ffffff",
                "#ffcc66"
            ][Math.floor(Math.random() * 5)]

        });

    }

    if(!animationRunning) {

        animationRunning = true;
        animateConfetti();

    }
}

function animateConfetti() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(piece => {

        ctx.save();

        ctx.translate(piece.x, piece.y);

        ctx.rotate(piece.rotation * Math.PI / 180);

        ctx.fillStyle = piece.color;

        ctx.fillRect(
            -piece.size / 2,
            -piece.size / 2,
            piece.size,
            piece.size
        );

        ctx.restore();

        piece.y += piece.speed;
        piece.rotation += 4;

    });

    pieces = pieces.filter(
        piece => piece.y < canvas.height + 20
    );

    if(pieces.length > 0) {

        requestAnimationFrame(animateConfetti);

    } else {

        animationRunning = false;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

    }
}

// RESTART

function restartStory() {

    candleBlown = false;
    envelopeOpened = false;

    document.getElementById("envelope")
        .classList.remove("open");

    document.getElementById("flame").style.display = "block";

    document.getElementById("blowBtn").style.display = "inline-block";

    document.getElementById("letterBtn")
        .classList.add("hidden");

    document.getElementById("cakeText").innerHTML =
        "Close your eyes and make a wish! 🌟";

    showScene(1);
}
