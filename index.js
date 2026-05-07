const wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector(".img-area img"),
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
        src: "song1.mp3",  // This looks for music/dems (1).mp3
        gradient: "linear-gradient(135deg, #ff9a9e, #fecfef, #a1c4fd, #c2e9fb)"
    },
    {
        name: "01 - Orange",
        artist: "7!!",
        img: "dems (2)",
        src: "song5;mp3",
        gradient: "linear-gradient(135deg, #ff758c, #ff7eb3, #a18cd1, #fbc2eb)"
    },
    {
        name: "メフィスト",
        artist: "女王蜂",
        img: "dems (3)",
        src: "song8.mp3",
        gradient: "linear-gradient(135deg, #141414, #434343, #eeb9cc, #9a769e)"
    },
    {
        name: "紅蓮華",
        artist: "LiSA",
        img: "dems (4)",
        src: "song9.mp3",
        gradient: "linear-gradient(135deg, #f857a6, #ff5858, #ff0844, #ffb199)"
    },
    {
        name: "竈門禰豆子のうた",
        artist: "椎名豪 featuring 中川奈美",
        img: "dems (5)",
        src: "song10.mp3",
        gradient: "linear-gradient(135deg, #a18cd1, #fbc2eb, #fad0c4, #ffd1ff)"
    },
    {
        name: "セレナーデ",
        artist: "natori",
        img: "dems (6)",
        src: "song3.flac",
        gradient: "linear-gradient(135deg, #25974fff, #03108aff, #4facfe, #00f2fe)"
    },

];


let musicIndex = 1;
window.addEventListener("load", () => {
    loadMusic(musicIndex);
    initPlaylist();
});

function loadMusic(index) {
    musicName.innerText = allMusic[index - 1].name;
    musicArtist.innerText = allMusic[index - 1].artist;
    musicImg.src = `image/${allMusic[index - 1].img}.jpg`;
    audio.src = `music/${allMusic[index - 1].src}`;

    // On change la variable CSS qui définit la couleur de fond
    wrapper.style.setProperty('--song-gradient', allMusic[index - 1].gradient);
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

moreMusicBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});

closeMusicBtn.addEventListener("click", () => {
    musicList.classList.remove("show");
});

function initPlaylist() {
    playlist.innerHTML = "";
    allMusic.forEach((song, i) => {
        let liTag = `<li data-index="${i + 1}">
            <div class="row">
                <span>${song.name}</span>
                <p>${song.artist}</p>
            </div>
        </li>`;
        playlist.insertAdjacentHTML("beforeend", liTag);
    });

    const allLiTags = playlist.querySelectorAll("li");
    allLiTags.forEach(li => {
        li.addEventListener("click", () => {
            musicIndex = parseInt(li.getAttribute("data-index"));
            loadMusic(musicIndex);
            playMusic();
            musicList.classList.remove("show");
        });
    });
}
