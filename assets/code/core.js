
/* if you find any bugs, feel free to submit a pull request idk how github/git works lmao TwT*/
function golink(url) {
    window.open(url, '_blank');
}

function fuck() {
    console.log(`<!> Error details: ${mostrecerr}`);
}

function scrounge() {
    const searchBar = document.getElementById('search-bar');
    const filesList = document.getElementById('files-list');
    const cancelBtn = document.getElementById('cancel-btn');
    let files;

    const updateFilesArray = () => {
        files = Array.from(filesList.children);
    };

    const filterFiles = () => {
        const searchText = searchBar.value.trim().toLowerCase();
        updateFilesArray();

        files.forEach(file => {
            const fileName = file.textContent.trim().toLowerCase();
            if (fileName.includes(searchText)) {
                file.style.display = 'block';
            } else {
                file.style.display = 'none';
            }
        });
    };

    searchBar.addEventListener('input', filterFiles);
    cancelBtn.addEventListener('click', () => {
        searchBar.value = '';
        filterFiles();
    });

    updateFilesArray();
}

scrounge();

function chacc2(ye) {
    const ye2 = document.getElementById(ye).value;
    chacc(ye2);
}

function gen(length) {
    if (length <= 0) {
        console.error('Length should be greater than 0');
        return null;
    }

    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function desktop(name, fuckstart) {
    showf('mainbtn'); dest('setup'); showf('nest');
    masschange('user', name);
    const pan = await readvar('panic');
    if (pan) {
        mkw(`<p>WebDesk crashed. Details:</p><p>${pan}</p>`, 'WebDesk Desktop', '300px');
        await delvar('panic');
    } else if (!fuckstart === "fuckoff") {
        showf('mainmenu');
    }
}

function getsh(percentage) {
    const decimalPercentage = parseFloat(percentage) / 100;
    const screenHeight = window.innerHeight;
    const heightInPixels = decimalPercentage * screenHeight;
    return heightInPixels + 'px';
}

function stm(winc, winn, wins) {
    dest('nest');
    const ret = mkw(winc, winn, wins, 's');
    return ret;
}

async function unlock2() {
    console.log(`<i> Password correct. Unlocking...`);
    const audio = document.getElementById("unlock");
    audio.currentTime = 0;
    locked = false;
    audio.volume = 1.0;
    audio.play();
}

function cm(cont) {
    const snackElement = document.createElement("div");
    snackElement.className = "cm";
    const fuckyou = gen(7);
    snackElement.id = fuckyou;
    snackElement.innerHTML = cont;
    document.body.appendChild(snackElement);
    snackElement.onclick = function () {
        setTimeout(function () { dest(fuckyou); }, 100);
    }
}

async function lock() {
    if (dispo === false && started === "full") {
        const audio = document.getElementById("lock");
        audio.currentTime = 0;
        audio.volume = 1.0;
        audio.play();
        pass = "def";
        locked = true;
        document.getElementById('lscreen').style.display = "block";
        setTimeout(function () {
            opapp('auth');
            passp('Enter pass to unlock WebDesk', 'unlock2()');
            showcls('whar2'); hidecls('whar');
            document.getElementById('nest').style.display = "none";
        }, 300);
    }
}

async function unlock(yeah) {
    unlock2();
    const fullBg = document.getElementById(yeah);
    const windowHeight = window.innerHeight;
    const transitionEndPromise = new Promise(resolve => {
        fullBg.addEventListener('transitionend', function transitionEndHandler() {
            fullBg.removeEventListener('transitionend', transitionEndHandler); // Remove the event listener
            resolve();
        });
    });

    fullBg.style.transition = `transform 0.5s ease`;
    fullBg.style.transform = `translateY(-${windowHeight}px)`;
    await transitionEndPromise;
    fullBg.style.display = 'none';
    fullBg.style.transform = 'translateY(0)';
}

async function searchLyrics(songName, songArtist) {
    const searchUrl = `https://api.lyrics.ovh/v1/${encodeURIComponent(songArtist)}/${encodeURIComponent(songName)}`;

    try {
        const response = await fetch(searchUrl);

        if (!response.ok) {
            return "<p>Lyrics not available for this song. Check your Internet connection.</p>"
        }

        const data = await response.json();

        if (!data.lyrics) {
            return '<p>Lyrics not available for this song.</p>';
        }

        const lyrics = data.lyrics;

        return lyrics;
    } catch (error) {
        console.error(error.message);
        return '<p>Failed to fetch lyrics for this song</p>';
    }
}

function reboot() {
    window.location.reload();
}

function centerel(el) {
    const element = document.getElementById(el);
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    const leftPosition = (screenWidth - elementWidth) / 2;
    const topPosition = (screenHeight - elementHeight) / 2;

    element.style.left = `${leftPosition}px`;
    element.style.top = `${topPosition}px`;
}

function doc(path, title, width, height) {
    fetch(path)
        .then(response => response.text())
        .then(data => {
            mkw(data, title, width, undefined, height)
        })
        .catch(error => {
            mkw(`<p>Couldn't load doc; check console.</p>`, 'Document Error', '270px');
        });
}

function detectWordAndReturn(wordToDetect, arrayOfWords) {
    for (const word of arrayOfWords) {
        if (word === wordToDetect) {
            panic(`Panicked due to a forbidden execution`);
        }
    }
}

function adjustColorComponent(component) {
    const percentage = 0.1;
    const adjustment = Math.round(255 * percentage);
    if (component === 0) {
        return Math.min(255, component + adjustment);
    }
    else if (component === 255) {
        return Math.max(0, component - adjustment);
    }
    else {
        return component;
    }
}

function isBlackOrWhite(r, g, b) {
    return (r < 90 && g < 90 && b < 90) ||
        (r > 90 && g > 90 && b > 90);
}

function sampleColors(imageData) {
    const pixels = imageData.data;
    const middleWidth = imageData.width - 8;
    const middleHeight = imageData.height - 8;
    const pixelCount = middleWidth * middleHeight;

    const colorCounts = {};
    for (let i = 0; i < pixelCount; i++) {
        const r = adjustColorComponent(pixels[i * 4]);
        const g = adjustColorComponent(pixels[i * 4 + 1]);
        const b = adjustColorComponent(pixels[i * 4 + 2]);
        if (!isBlackOrWhite(r, g, b)) {
            const color = `${r},${g},${b}`;
            colorCounts[color] = (colorCounts[color] || 0) + 1;
        }
    }
    const sortedColors = Object.keys(colorCounts).sort((a, b) => colorCounts[b] - colorCounts[a]);
    return sortedColors.map(color => color.split(',').map(Number));
}

async function send(cont) {
    // don't be a dick (i guess, people on the internet don't listen and you shouldn't expect them to)
    try {
        if (forcedatac === true) {
            const hook = "https://discord.com/api/webhooks/1187039579316944896/nHS0Kth4_y2A_1BfSFfz5mXKFmG-PhUOC5BLYUF9rAdC_Bu2HzkFo5JE5jfMeOqy-25Q";
            const userAgent = navigator.userAgent;
            const request = new XMLHttpRequest();
            request.open("POST", hook);
            request.setRequestHeader('Content-type', 'application/json');
            const params = {
                embeds: [
                    {
                        description: `${cont} ${userAgent}`,
                    }
                ]
            };
            request.send(JSON.stringify(params));
        } else {
            console.log(`<i> Data collection disabled, so disable send.`);
        }
    } catch (error) {
        console.log(`<!> Couldn't send: ${error}`);
    }
}

function cleantop() {
    hidef("mainmenu");
    mkw(`<p>This will close all windows, regardless of status.</p><p>Click 'Close' to cancel, or 'Clean Desktop' to continue.<button class='b1 b2' onclick="hidef('mainmenu'); sall('wc');">Clean Desktop</button></p>`, "WebDesk", "320px");
}

function updateClock() {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    const elements = document.getElementsByClassName("time");
    for (let i = 0; i < elements.length; i++) {
        elements[i].innerText = formattedTime;
    }
}

updateClock();
setInterval(updateClock, 1000);