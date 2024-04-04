async function isMobileDevice() {
    const override = await readvar('mobileover');
    if (!override === "y") {
        return /Mobi|Android/i.test(navigator.userAgent);
    } else {
        return true;
    }
}
async function playaud(base64Content, contentType) {
    try {
        const acce = await readvar('accent');
        const binaryContent = atob(base64Content.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(binaryContent.length);
        const view = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryContent.length; i++) {
            view[i] = binaryContent.charCodeAt(i);
        }

        let mimeType;
        switch (contentType) {
            case '.mpeg':
            case '.mp3':
                mimeType = 'audio/mpeg';
                break;
            case '.wav':
                mimeType = 'audio/wav';
                break;
            default:
                throw new Error('Unsupported audio format');
        }

        let blob = new Blob([arrayBuffer], { type: mimeType });
        jsmediatags.read(blob, {
            onSuccess: async function (tag) {
                cv('covsc', '0.8');
                let base64String = "";
                const audio = new Audio();
                audio.src = URL.createObjectURL(blob);
                audio.type = contentType;
                audio.play();
                let wint, alb, nm, yr, albumImg;

                if (tag && tag.tags) {
                    if (tag.tags.title) {
                        wint = truncater(tag.tags.title, 26);
                    }
                    if (tag.tags.album) {
                        alb = truncater(tag.tags.album, 22);
                    }
                    if (tag.tags.artist) {
                        nm = truncater(tag.tags.artist, 26);
                    }
                    if (tag.tags.year) {
                        yr = tag.tags.year;
                    }
                    if (tag.tags.picture) {
                        albumImg = tag.tags.picture;
                    }
                }

                if (albumImg) {
                    const img = new Image();
                    img.onload = function () {
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        context.drawImage(img, 0, 0);
                        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                        const colors = sampleColors(imageData);
                        changevar('accent', colors[0], true);
                    };
                    img.src = "data:image/jpeg;base64," + arrayBufferToBase64(albumImg.data);
                }
                base64String = "data:image/jpeg;base64," + arrayBufferToBase64(albumImg.data);
                const e2 = gen(7);
                const e5 = gen(7);
                const e7 = gen(7);
                const e8 = gen(7);
                let lyrid = undefined;
                const div = document.createElement('div');
                const id = gen(7);
                lyrid = id;
                div.id = id;
                div.className = "lyric";
                document.getElementById('media').appendChild(div);
                div.onclick = function () { hidef(id); }
                if (isMobileDevice()) {
                    var audPlayer = `
                    <div style="position: fixed; left: 12vw; right: 12vw; top: 16vw; z-index: 2; overflow-y: auto !important;">
                        <img src="${base64String}" style="box-shadow: -1.5vw 0 1.5vw -1.5vw rgba(0, 0, 0, 0.25), 1.5vw 0 1.5vw -1.5vw rgba(0, 0, 0, 0.25), 0 3vw 3vw rgba(0, 0, 0, 0.25);
                        width: 90%; top: 4vw; box-sizing: border-box; height: auto; border: none; border-radius: 14px; max-width: 300px; transition: 0.25s; transform: scale(var(--covsc));" onclick="showf('${lyrid}');">
                        <p class="med" onclick="snack('Song title/name', '2200');" style="margin-top: 9px;">${wint}</p><p class="med" onclick="snack('Album and year', '2000');">${alb} - ${yr}</p><p class="med" style="margin-bottom: 9px;" onclick="snack('Artist', '1600');">${nm}</p>
                        <div class="flex-container">
                            <div class="timeplayed" class="smt">0:00</div>
                            <div class="flex-bar">
                                <input type="range" id="${e5}" min="0" max="100" value="0">
                            </div>
                            <div class="songlength" class="smt">0:00</div>
                        </div>
                        <p><img onclick="back();" id="${e8}" src="./assets/img/skip-back.svg" class="icon"></img><img id="${e2}" src="./assets/img/circle-pause.svg" class="icon"></img><img onclick="skip();" id="${e7}" src="./assets/img/skip-forward.svg" class="icon"></img></p>
                    </div>`;
                } else {
                    var audPlayer = `
                        <div style="margin-top: 20px;">
                            <img src="${base64String}" style="box-shadow: -1.5vw 0 1.5vw -1.5vw rgba(0, 0, 0, 0.25), 1.5vw 0 1.5vw -1.5vw rgba(0, 0, 0, 0.25), 0 2vw 2vw rgba(0, 0, 0, 0.25);
                            width: 200px; box-sizing: border-box; height: auto; border: none; border-radius: 14px; max-width: 300px; transition: 0.25s; transform: scale(var(--covsc));" onclick="showf('${lyrid}');">
                            <p class="med">${wint}</p>
                            <p class="med">${nm}</p>
                            <p class="med">${alb} - ${yr}</p>
                            <div class="flex-container">
                            <div class="timeplayed" class="smt">0:00</div>
                            <div class="flex-bar">
                                <input type="range" id="${e5}" min="0" max="100" value="0">
                            </div>
                            <div class="songlength" class="smt">0:00</div>
                        </div>
                            <p><img onclick="back();" id="${e8}" src="./assets/img/skip-back.svg" class="icon"></img><img id="${e2}" src="./assets/img/circle-pause.svg" class="icon"></img><img onclick="skip();" id="${e7}" src="./assets/img/skip-forward.svg" class="icon"></img></p>
                        </div>`;
                }

                if ("mediaSession" in navigator) {
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title: tag.tags.title,
                        artist: tag.tags.artist,
                        album: tag.tags.album,
                        artwork: [
                            {
                                src: base64String,
                                sizes: "512x512",
                                type: "image/png",
                            },
                        ],
                    });
                    navigator.mediaSession.setActionHandler("play", () => {
                        audio.play();
                    });
                    navigator.mediaSession.setActionHandler("pause", () => {
                        audio.pause();
                    });
                    navigator.mediaSession.setActionHandler("stop", () => {
                        audio.pause();
                        chacc(acce);
                        URL.revokeObjectURL(blob);
                        blob = null;
                        isPaused = false;
                        pauseBtn.src = './assets/img/circle-pause.svg';
                        cv('covsc', '0.8');
                        yay(); clapp('media');
                    });
                    navigator.mediaSession.setActionHandler("previoustrack", () => {
                        audio.pause();
                        back();
                        URL.revokeObjectURL(blob);
                        blob = null;
                    });
                    navigator.mediaSession.setActionHandler("nexttrack", () => {
                        audio.pause();
                        skip();
                        URL.revokeObjectURL(blob);
                        blob = null;
                    });
                    navigator.mediaSession.setActionHandler("seekto", (details) => {
                        if (details.fastSeek && 'fastSeek' in audio) {
                            audio.fastSeek(details.seekTime);
                        } else {
                            audio.currentTime = details.seekTime;
                        }
                    });
                }
                showf('media');
                document.getElementById('media2').innerHTML = audPlayer;
                const pauseBtn = document.getElementById(e2);
                const closeBtn = document.getElementById('killsong');
                const scrubber = document.getElementById(e5);
                const loopBtn = document.getElementById('loopbtn');
                const skipBtn = document.getElementById(e7);
                const backBtn = document.getElementById(e8);
                audio.addEventListener('ended', function () {
                    skip();
                });
                let isPaused = false;

                pauseBtn.addEventListener('click', function () {
                    if (!isPaused) {
                        audio.pause();
                        isPaused = true;
                        pauseBtn.src = './assets/img/circle-play.svg';
                        cv('covsc', '0.8');
                    } else {
                        audio.play();
                        isPaused = false;
                        pauseBtn.src = './assets/img/circle-pause.svg';
                        cv('covsc', '1.0');
                    }
                });

                closeBtn.addEventListener('click', function () {
                    audio.pause();
                    chacc(acce);
                    URL.revokeObjectURL(blob);
                    blob = null;
                    isPaused = false;
                    pauseBtn.src = './assets/img/circle-pause.svg';
                    cv('covsc', '0.8');
                    yay(); clapp('media');
                });

                skipBtn.addEventListener('click', function () {
                    cv('covsc', '0.8');
                    audio.pause();
                    URL.revokeObjectURL(blob);
                    blob = null;
                });

                backBtn.addEventListener('click', function () {
                    cv('covsc', '0.8');
                    audio.pause();
                    URL.revokeObjectURL(blob);
                    blob = null;
                });

                audio.addEventListener('pause', function () {
                    isPaused = true;
                    pauseBtn.src = './assets/img/circle-play.svg';
                    cv('covsc', '0.8');
                });
                audio.addEventListener('play', function () {
                    isPaused = false;
                    pauseBtn.src = './assets/img/circle-pause.svg';
                    cv('covsc', '1.0');
                });

                scrubber.addEventListener('input', function () {
                    const seekTo = audio.duration * (parseFloat(this.value) / 100);
                    audio.currentTime = seekTo;
                });

                audio.addEventListener('timeupdate', function () {
                    const progress = (audio.currentTime / audio.duration) * 100;
                    scrubber.value = progress;
                });

                audio.addEventListener('timeupdate', function () {
                    const timePlayed = formattime(audio.currentTime);
                    masschange('timeplayed', timePlayed);
                });

                audio.addEventListener('loadedmetadata', function () {
                    const songLength = formattime(audio.duration);
                    masschange('songlength', songLength);
                });

                function formattime(seconds) {
                    const minutes = Math.floor(seconds / 60);
                    const remainingSeconds = Math.floor(seconds % 60);
                    const formattedtime = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
                    return formattedtime;
                }

                loopBtn.textContent = 'Loop: Off';
                let loopEnabled = false;

                loopBtn.addEventListener('click', function () {
                    loopEnabled = !loopEnabled;
                    audio.loop = loopEnabled;
                    loopBtn.textContent = `Loop: ${loopEnabled ? 'On' : 'Off'}`;
                });
                await searchLyrics(tag.tags.title, tag.tags.artist)
                    .then(lyrics => {
                        const withoutFirstLine = lyrics.split('\n').slice(1).join('\n');
                        const sanitizedText = withoutFirstLine.replace(/\n/g, '</p><p>');
                        div.innerHTML = sanitizedText;
                    })
                    .catch(error => {
                        div.innerHTML = error;
                    });
            },
            onError: function (error) {
                panic(error);
                const audio = new Audio();
                audio.src = URL.createObjectURL(blob);
                audio.type = contentType;
                audio.play();
                const e2 = gen(7);
                const e5 = gen(7);
                const e7 = gen(7);
                const e8 = gen(7);
                if (isMobileDevice()) {
                    var audPlayer = `
                    <div style="position: fixed; left: 12vw; right: 12vw; top: 16vw; z-index: 2; overflow-y: auto !important;">
                       <p class="h2">Error handling song info.</p>
                        <div class="flex-container">
                            <div class="timeplayed" class="smt">0:00</div>
                            <div class="flex-bar">
                                <input type="range" id="${e5}" min="0" max="100" value="0">
                            </div>
                            <div class="songlength" class="smt">0:00</div>
                        </div>
                        <p><img onclick="back();" id="${e8}" src="./assets/img/skip-back.svg" class="icon"></img><img id="${e2}" src="./assets/img/circle-pause.svg" class="icon"></img><img onclick="skip();" id="${e7}" src="./assets/img/skip-forward.svg" class="icon"></img></p>
                    </div>`;
                } else {
                    var audPlayer = `
                        <div style="margin-top: 20px;">
                            <p>Error handling song data.</p>
                            <div class="flex-container">
                            <div class="timeplayed" class="smt">0:00</div>
                            <div class="flex-bar">
                                <input type="range" id="${e5}" min="0" max="100" value="0">
                            </div>
                            <div class="songlength" class="smt">0:00</div>
                        </div>
                            <p><img onclick="back();" id="${e8}" src="./assets/img/skip-back.svg" class="icon"></img><img id="${e2}" src="./assets/img/circle-pause.svg" class="icon"></img><img onclick="skip();" id="${e7}" src="./assets/img/skip-forward.svg" class="icon"></img></p>
                        </div>`;
                }

                if ("mediaSession" in navigator) {
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title: 'Error handling song info.',
                    });
                    navigator.mediaSession.setActionHandler("nexttrack", () => {
                        audio.pause();
                        skip();
                        URL.revokeObjectURL(blob);
                        blob = null;
                    });
                }
                showf('media');
                document.getElementById('media2').innerHTML = audPlayer;
                const pauseBtn = document.getElementById(e2);
                const closeBtn = document.getElementById('killsong');
                const scrubber = document.getElementById(e5);
                const loopBtn = document.getElementById('loopbtn');
                const skipBtn = document.getElementById(e7);
                const backBtn = document.getElementById(e8);
                audio.addEventListener('ended', function () { skip(); });
                let isPaused = false;

                pauseBtn.addEventListener('click', function () {
                    if (!isPaused) {
                        audio.pause();
                        isPaused = true;
                        pauseBtn.src = './assets/img/circle-play.svg';
                    } else {
                        audio.play();
                        isPaused = false;
                        pauseBtn.src = './assets/img/circle-pause.svg';
                    }
                });

                closeBtn.addEventListener('click', function () {
                    audio.pause();
                    chacc(acce);
                    URL.revokeObjectURL(blob);
                    blob = null;
                    isPaused = false;
                    pauseBtn.src = './assets/img/circle-pause.svg';
                    yay(); clapp('media');
                });

                skipBtn.addEventListener('click', function () {
                    audio.pause();
                    URL.revokeObjectURL(blob);
                    blob = null;
                });

                backBtn.addEventListener('click', function () {
                    audio.pause();
                    URL.revokeObjectURL(blob);
                    blob = null;
                });

                audio.addEventListener('pause', function () {
                    isPaused = true;
                    pauseBtn.src = './assets/img/circle-play.svg';
                });
                audio.addEventListener('play', function () {
                    isPaused = false;
                    pauseBtn.src = './assets/img/circle-pause.svg';
                });

                scrubber.addEventListener('input', function () {
                    const seekTo = audio.duration * (parseFloat(this.value) / 100);
                    audio.currentTime = seekTo;
                });

                audio.addEventListener('timeupdate', function () {
                    const progress = (audio.currentTime / audio.duration) * 100;
                    scrubber.value = progress;
                });

                audio.addEventListener('timeupdate', function () {
                    const timePlayed = formattime(audio.currentTime);
                    masschange('timeplayed', timePlayed);
                });

                audio.addEventListener('loadedmetadata', function () {
                    const songLength = formattime(audio.duration);
                    masschange('songlength', songLength);
                });

                function formattime(seconds) {
                    const minutes = Math.floor(seconds / 60);
                    const remainingSeconds = Math.floor(seconds % 60);
                    const formattedtime = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
                    return formattedtime;
                }

                loopBtn.textContent = 'Loop: Off';
                let loopEnabled = false;

                loopBtn.addEventListener('click', function () {
                    loopEnabled = !loopEnabled;
                    audio.loop = loopEnabled;
                    loopBtn.textContent = `Loop: ${loopEnabled ? 'On' : 'Off'}`;
                });
            }
        });
    } catch (error) {
        console.error("Error processing audio:", error);
        wal('<p>An error occured while attempting to play this song.</p>', `wal("<p>${error}</p>");`, 'View Details');
        panic(error);
    }
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
