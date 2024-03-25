function playaud(base64Content, contentType) {
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
            const wint = truncater(tag.tags.title, 26);
            const alb = truncater(tag.tags.album, 22);
            const nm = truncater(tag.tags.artist, 26);
            const yr = tag.tags.year;
            const albumImg = tag.tags.picture;
            if (albumImg) {
                base64String = "data:" + albumImg.format + ";base64," + arrayBufferToBase64(albumImg.data);
            }
            const e2 = gen(7);
            const e3 = gen(7);
            const e5 = gen(7);
            const e7 = gen(7);
            const e8 = gen(7);
            function isMobileDevice() {
                return /Mobi|Android/i.test(navigator.userAgent);
            }
            if (isMobileDevice()) {
                var audPlayer = `
                <div style="position: fixed; left: 18vw; right: 18vw; top: 18vw; z-index: 2; overflow-y: auto !important;">
                    <img src="${base64String}" style="box-shadow: -1vw 0 1vw -1vw rgba(0, 0, 0, 0.25), 1.2vw 0 1.2vw -1.2vw rgba(0, 0, 0, 0.25), 0 2vw 2vw rgba(0, 0, 0, 0.25);
                    width: 90%; top: 2vw; box-sizing: border-box; height: auto; border: none; border-radius: 12px; max-width: 300px; transition: 0.25s; transform: scale(var(--covsc));">
                    <p class="med">${wint}</p>
                    <p class="med">${nm}</p>
                    <p class="med">${alb} - ${yr}</p>
                    <p class="smt">Progress: <input type="range" id="${e5}" min="0" max="100" value="0"></p>
                    <p class="smt">Volume: <input type="range" id="${e3}" min="0" max="100" value="100"></p>
                    <p><img onclick="back();" id="${e8}" src="./assets/img/skip-back.svg" class="icon"></img><img id="${e2}" src="./assets/img/circle-pause.svg" class="icon"></img><img onclick="skip();" id="${e7}" src="./assets/img/skip-forward.svg" class="icon"></img></p>
                </div>`;
            } else {
                var audPlayer = `
                <div style="margin-top: 20px;">
                    <img src="${base64String}" style="box-shadow: -1vw 0 1vw -1vw rgba(0, 0, 0, 0.25), 1.2vw 0 1.2vw -1.2vw rgba(0, 0, 0, 0.25), 0 2vw 2vw rgba(0, 0, 0, 0.25);
                    width: 200px; box-sizing: border-box; height: auto; border: none; border-radius: 12px; max-width: 300px; transition: 0.25s; transform: scale(var(--covsc));">
                    <p class="med">${wint}</p>
                    <p class="med">${nm}</p>
                    <p class="med">${alb} - ${yr}</p>
                    <p class="smt">Progress: <input type="range" id="${e5}" min="0" max="100" value="0"></p>
                    <p class="smt">Volume: <input type="range" id="${e3}" min="0" max="100" value="100"></p>
                    <p><img onclick="back();" id="${e8}" src="./assets/img/skip-back.svg" class="icon"></img><img id="${e2}" src="./assets/img/circle-pause.svg" class="icon"></img><img onclick="skip();" id="${e7}" src="./assets/img/skip-forward.svg" class="icon"></img></p>
                </div>`;
            }
            showf('media');
            document.getElementById('media2').innerHTML = audPlayer;
            const audio = new Audio();
            audio.src = URL.createObjectURL(blob);
            audio.type = contentType;
            audio.play();
            const pauseBtn = document.getElementById(e2);
            const volumeSlider = document.getElementById(e3);
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


            volumeSlider.addEventListener('input', function () {
                audio.volume = parseFloat(this.value) / 100;
            });

            closeBtn.addEventListener('click', function () {
                audio.pause();
                URL.revokeObjectURL(blob);
                blob = null;
                clapp('media');
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

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}