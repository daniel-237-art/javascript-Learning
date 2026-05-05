const wrapper = document.querySelector(".wrapper"),
    musingImg = wrapper.querySelector(".img-area img"),
    musicName = wrapper.querySelector(".song-details .name"),
    musicArtist = wrapper.querySelector(".song-details .artist"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    audio = wrapper.querySelector("audio"),
    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = wrapper.querySelector(".progress-bar"),
    progressCircle = progressBar.querySelector("span"),
    timer = wrapper.querySelector(".timer"),
    musicList = wrapper.querySelector(".music-list"),
    moreMusicBtn = wrapper.querySelector("#more-music"),
    closeMusicBtn = wrapper.querySelector("#close"),
    playlist = wrapper.querySelector("#playlist");

const allMusic = [
    {
        name: "01 - Hikaru Nara",
        artist: "Goose house",
        img: "dems (1)", // This looks for image/dems (1).jpg
        src: "song1.mp3"  // This looks for music/dems (1).mp3
    },
    {
        name: "01 - Orange",
        artist: "7!!",
        img: "dems (2)",
        src: "song5;mp3"
    },
    {
        name: "メフィスト",
        artist: "女王蜂",
        img: "dems (3)",
        src: "song8.mp3"
    },
    {
        name: "紅蓮華",
        artist: "LiSA",
        img: "dems (4)",
        src: "song9.mp3"
    },
    {
        name: "竈門禰豆子のうた",
        artist: "椎名豪 featuring 中川奈美",
        img: "dems (5)",
        src: "song10.mp3"
    },
    {
        name: "セレナーデ",
        artist: "natori",
        img: "dems (6)",
        src: "song3.flac"
    },

];


let musicIndex = 1;
window.addEventListener("load", () => {
    loadMusic(musicIndex);
});

function loadMusic(index) {
    musicName.innerText = allMusic[index - 1].name;
    musicArtist.innerText = allMusic[index - 1].artist;
    musingImg.src = `image/${allMusic[index - 1].img}.jpg`;
    audio.src = `music/${allMusic[index - 1].src}`;
}

function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    audio.play();
}

function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    audio.pause();
}


function nextMusic() {
    musicIndex++;

    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

function prevMusic() {
    musicIndex--;

    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

nextBtn.addEventListener("click", () => { nextMusic() });
prevBtn.addEventListener("click", () => { prevMusic() });
audio.addEventListener("ended", () => { nextMusic() });

// On écoute le changement de temps de la musique
audio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime; // Où on en est (ex: 30 secondes)
    const totalDuration = e.target.duration;    // Longueur du son (ex: 120 secondes)

    // On calcule le pourcentage (30 / 120 * 100 = 25%)
    let percentage = (currentTime / totalDuration) * 100;

    // On change la largeur de la barre bleue/orange en CSS
    progressBar.style.width = `${percentage}%`;
});
// On écoute le clic sur toute la zone de progression
progressArea.addEventListener("click", (e) => {
    let totalWidth = progressArea.clientWidth; // La largeur de la barre grise
    let clickedPosition = e.offsetX;             // La position X de ton clic
    let totalDuration = audio.duration;            // La durée totale du MP3

    // Formule magique : (Position du clic / Largeur totale) * Durée totale
    audio.currentTime = (clickedPosition / totalWidth) * totalDuration;

    // Une fois qu'on a sauté dans le temps, on force la lecture
    playMusic();
});
playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused");
    // Si la musique est en lecture (a la classe paused), on met en pause, sinon on joue
    isMusicPaused ? pauseMusic() : playMusic();
});




