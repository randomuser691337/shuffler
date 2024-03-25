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
            const e1 = gen(7);
            const e2 = gen(7);
            const e3 = gen(7);
            const e5 = gen(7);
            const e6 = gen(7);
            const e7 = gen(7);
            const e8 = gen(7);
            function isMobileDevice() {
                return /Mobi|Android/i.test(navigator.userAgent);
            }
            if (isMobileDevice()) {
                var audPlayer = `
                <div style="position: fixed; left: 18vw; right: 18vw; top: 18vw; z-index: 2; overflow-y: auto !important;">
                    <img src="${base64String}" style="box-shadow: -1vw 0 1vw -1vw rgba(0, 0, 0, 0.25), 1vw 0 1vw -1vw rgba(0, 0, 0, 0.25), 0 2vw 2vw rgba(0, 0, 0, 0.25);
                    width: 90%; top: 2vw; box-sizing: border-box; height: auto; border: none; border-radius: 12px; max-width: 300px;">
                    <p class="med">${wint}</p>
                    <p class="med">${nm}</p>
                    <p class="med">${alb} - ${yr}</p>
                    <p class="smt">Progress: <input type="range" id="${e5}" min="0" max="100" value="0"></p>
                    <p class="smt">Volume: <input type="range" id="${e3}" min="0" max="100" value="100"></p>
                    <p><button id="${e1}" class="b1">Play</button><button id="${e2}" class="b1">Pause</button><button id="${e6}" class="b1">Loop: Off</button></p>
                    <p><button onclick="back();" id="${e8}" class="b1">Back</button><button onclick="skip();" id="${e7}" class="b1">Skip</button></p>
                </div>`;
            } else {
                var audPlayer = `
                <div style="margin-top: 20px;">
                    <img src="${base64String}" style="box-shadow: -1vw 0 1vw -1vw rgba(0, 0, 0, 0.25), 1vw 0 1vw -1vw rgba(0, 0, 0, 0.25), 0 2vw 2vw rgba(0, 0, 0, 0.25);
                    width: 200px; box-sizing: border-box; height: auto; border: none; border-radius: 12px; max-width: 300px;">
                    <p class="med">${wint}</p>
                    <p class="med">${nm}</p>
                    <p class="med">${alb} - ${yr}</p>
                    <p class="smt">Progress: <input type="range" id="${e5}" min="0" max="100" value="0"></p>
                    <p class="smt">Volume: <input type="range" id="${e3}" min="0" max="100" value="100"></p>
                    <p><button onclick="back();" id="${e8}" class="b1">Previous</button><button id="${e1}" class="b1">Play</button><button id="${e2}" class="b1">Pause</button><button id="${e6}" class="b1">Loop: Off</button><button onclick="skip();" id="${e7}" class="b1">Skip</button></p>
                </div>`;
            }
            showf('media');
            document.getElementById('media2').innerHTML = audPlayer;
            const audio = new Audio();
            audio.src = URL.createObjectURL(blob);
            audio.type = contentType;
            audio.play();
            const playBtn = document.getElementById(e1);
            const pauseBtn = document.getElementById(e2);
            const volumeSlider = document.getElementById(e3);
            const closeBtn = document.getElementById('killsong');
            const scrubber = document.getElementById(e5);
            const loopBtn = document.getElementById(e6);
            const skipBtn = document.getElementById(e7);
            const backBtn = document.getElementById(e8);
            audio.addEventListener('ended', function () {
                playNextSong();
            });

            playBtn.addEventListener('click', function () {
                audio.play();
            });

            pauseBtn.addEventListener('click', function () {
                audio.pause();
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
