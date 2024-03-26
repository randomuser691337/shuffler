
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

function prr(val) {
    mkw(`<p>Please reboot to ${val}</p><button class="b1 b2" onclick="reboot();">Reboot</button>`, 'WebDesk', '270px');
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

async function nametime(el, reb) {
    const elID = document.getElementById(el).value;
    if (elID === "") {
        snack('Enter a username!', '3000');
        return false;
    } else {
        if (reb === "y") {
            await writevar('name', elID, 'r');
        } else {
            await writevar('name', elID);
        }
        return true;
    }
}

function passtime(el) {
    const elID = document.getElementById(el).value;
    if (elID === "") {
        snack('Enter a password!', '3000');
        return false;
    } else {
        pass = elID;
        return true;
    }
}

function passtimedesk(el) {
    const elID = document.getElementById(el).value;
    if (elID === "") {
        snack('Enter a password!', '3000');
    } else {
        passchange(elID);
    }
}

async function unlock2() {
    console.log(`<i> Password correct. Unlocking...`);
    showcls('whar'); hidecls('whar2'); showf('nest');
    const audio = document.getElementById("unlock");
    audio.currentTime = 0;
    audio.volume = 1.0;
    audio.play();
}

function cm(cont, t) {
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

async function finishsetup() {
    fesw('setup3', 'setup4');
    await writepb('setupdone', 'y');
    const hai = await readvar('name');
    desktop(hai, 'fuckoff');
    mkw(`<p>It's recommended to reboot before using WebDesk for the first time.</p><button class="b1" onclick="reboot();">Reboot</button>`, 'Setup Assistant', '270px');
    await writevar('check', 'passed');
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentDate = new Date();
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    await writevar('setupon', `${month} ${day}, ${year}`);
    await writevar('ogver', ver);
}

function reboot() {
    window.location.reload();
}

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let i = 0;

document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === "l") {
        lock();
    } else if (e.key === konamiCode[i++]) {
        if (i === konamiCode.length) {
            const win = `<p>This is meant for developers, or maybe you were curious. Don't click anything, if you don't know what it does.</p>
            <button class="b1 b2" onclick="burnitall('justreload');">Erase Now</button><button class="b1 b2" onclick="opapp('terminal')">Terminal</button>`
            mkw(win, 'Debug Menu', '320px');
            i = 0;
        }
    } else {
        i = 0;
    }
});

let timeoutId;
let timeoutDuration = 300000;

function resetTimeout() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(lock, timeoutDuration);
}

function timeoutChange(timeInMs) {
    timeoutDuration = timeInMs;
    resetTimeout();
    snack('Changed lock timeout successfully.', '3300');
}

document.addEventListener("mousemove", resetTimeout);
document.addEventListener("keypress", resetTimeout);
resetTimeout();

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

async function sandbox() {
    showf('sandbox');
    customCursor.style.opacity = "0%";
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

function updateClock() {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    // Ensure hours are always two digits
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    const elements = document.getElementsByClassName("time");

    for (let i = 0; i < elements.length; i++) {
        elements[i].innerText = formattedTime;
    }
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
        const color = `${r},${g},${b}`;
        colorCounts[color] = (colorCounts[color] || 0) + 1;
    }
    const sortedColors = Object.keys(colorCounts).sort((a, b) => colorCounts[b] - colorCounts[a]);
    return sortedColors.map(color => color.split(',').map(Number));
}


function exec(url) {
    if (sandParam) {
        appendScript(url);
    } else {
        const allowedUrls = ["./assets/apps/rosetoy.js"];
        if (allowedUrls.includes(url)) {
            appendScript(url);
        } else {
            mkw(`<p>That code is not from WebDesk, and cannot be run right now.</p>`, 'Security', '250px');
        }
    }

    function appendScript(url) {
        const scriptElement = document.createElement('script');
        scriptElement.src = url;
        document.head.appendChild(scriptElement);
    }
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
updateClock();
setInterval(updateClock, 1000);
