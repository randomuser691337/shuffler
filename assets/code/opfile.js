async function playaud(base64Content, contentType) {
    const binaryContent = atob(base64Content.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(binaryContent.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryContent.length; i++) {
        view[i] = binaryContent.charCodeAt(i);
    }

    let mimeType;
    switch (contentType) {
        case '.mpeg':
            mimeType = 'audio/mpeg';
            break;
        case '.mp3':
            mimeType = 'audio/mpeg';
            break;
        case '.wav':
            mimeType = 'audio/wav';
            break;
        // Add support for more audio formats as needed
        default:
            throw new Error('Unsupported audio format');
    }

    var blob = new Blob([arrayBuffer], { type: mimeType });

    let base64String = '';

    jsmediatags.read(blob, {
        onSuccess: function (tag) {
            cv('covsc', '0.8');
            const wint = truncater(tag.tags.title, 26);
            const alb = truncater(tag.tags.album, 22);
            const nm = truncater(tag.tags.artist, 26);
            const yr = tag.tags.year;
            const albumImg = tag.tags.picture;
            if (albumImg) {
                base64String = "data:" + albumImg.format + ";base64," + arrayBufferToBase64(albumImg.data);
            }
            const e2 = gen(7);
            const e5 = gen(7);
            const e7 = gen(7);
            const e8 = gen(7);
            async function isMobileDevice() {
                const override = await readvar('mobileover');
                if (!override === "y") {
                    return /Mobi|Android/i.test(navigator.userAgent);
                } else {
                    return true;
                }
            }
            if (isMobileDevice()) {
                var audPlayer = `
                <div style="position: fixed; left: 12vw; right: 12vw; top: 14vw; z-index: 2; overflow-y: auto !important;">
                    <img src="${base64String}" style="box-shadow: -1.5vw 0 1.5vw -1.5vw rgba(0, 0, 0, 0.25), 1.5vw 0 1.5vw -1.5vw rgba(0, 0, 0, 0.25), 0 3vw 3vw rgba(0, 0, 0, 0.25);
                    width: 90%; top: 4vw; box-sizing: border-box; height: auto; border: none; border-radius: 12px; max-width: 300px; transition: 0.25s; transform: scale(var(--covsc));" onclick="lyrics('${tag.tags.lyrics}');">
                    <p class="med">${wint}</p>
                    <p class="med">${nm}</p>
                    <p class="med">${alb} - ${yr}</p>
                    <p class="smt">Progress: <input type="range" id="${e5}" min="0" max="100" value="0"></p>
                    <p><img onclick="back();" id="${e8}" src="./assets/img/skip-back.svg" class="icon"></img><img id="${e2}" src="./assets/img/circle-pause.svg" class="icon"></img><img onclick="skip();" id="${e7}" src="./assets/img/skip-forward.svg" class="icon"></img></p>
                </div>`;
            } else {
                var audPlayer = `
                <div style="margin-top: 20px;">
                    <img src="${base64String}" style="box-shadow: -1.5vw 0 1.5vw -1.5vw rgba(0, 0, 0, 0.25), 1.5vw 0 1.5vw -1.5vw rgba(0, 0, 0, 0.25), 0 2vw 2vw rgba(0, 0, 0, 0.25);
                    width: 200px; box-sizing: border-box; height: auto; border: none; border-radius: 12px; max-width: 300px; transition: 0.25s; transform: scale(var(--covsc));">
                    <p class="med">${wint}</p>
                    <p class="med">${nm}</p>
                    <p class="med">${alb} - ${yr}</p>
                    <p class="smt">Progress: <input type="range" id="${e5}" min="0" max="100" value="0"></p>
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
                    URL.revokeObjectURL(blob);
                    blob = null;
                    isPaused = false;
                    pauseBtn.src = './assets/img/circle-pause.svg';
                    cv('covsc', '1.0');
                    clapp('media');
                });
                navigator.mediaSession.setActionHandler("previoustrack", () => {
                    back();
                    audio.pause();
                    URL.revokeObjectURL(blob);
                    blob = null;
                });
                navigator.mediaSession.setActionHandler("nexttrack", () => {
                    skip();
                    audio.pause();
                    URL.revokeObjectURL(blob);
                    blob = null;
                });
            }
            showf('media');
            document.getElementById('media2').innerHTML = audPlayer;
            const audio = new Audio();
            audio.src = URL.createObjectURL(blob);
            audio.type = contentType;
            audio.play();
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
                URL.revokeObjectURL(blob);
                blob = null;
                isPaused = false;
                pauseBtn.src = './assets/img/circle-pause.svg';
                cv('covsc', '0.8');
                clapp('media');
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

            loopBtn.textContent = 'Loop: Off';
            let loopEnabled = false;

            loopBtn.addEventListener('click', function () {
                loopEnabled = !loopEnabled;
                audio.loop = loopEnabled;
                loopBtn.textContent = `Loop: ${loopEnabled ? 'On' : 'Off'}`;
            });

        },
        onError: function (error) {
            console.error("Error reading metadata:", error);
        }
    });
}

function lyrics(text) {
    const div = document.createElement('div');
    const id = gen(7);
    div.id = id;
    div.className = "lyric";
    document.getElementById('media').appendChild(div);
    div.innerHTML = text;
    div.onclick = function () {dest(id);}
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
