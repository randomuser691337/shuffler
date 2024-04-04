var valuesToCheck = [".jpg", ".png", ".svg", ".jpeg", ".webp", ".mp3", ".mp4", ".webm", '.wav', '.mpeg', '.gif'];
async function handleFileUpload(file) {
    try {
        showf('uploadwarn', 0);
        const reader = new FileReader();
        reader.onload = async () => {
            const fileName = 'locker_' + file.name;
            const content = reader.result;
            await writevar(fileName, content);
            window.updatefilesList();
            hidef('uploadwarn', 0);
        };
        reader.readAsDataURL(file);
    } catch (error) {
        snack(`files error: ${error}`, '3500');
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.body;

    dropArea.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    dropArea.addEventListener('dragleave', (event) => {
        event.preventDefault();
    });

    dropArea.addEventListener('drop', async (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        uploadsCompleted = 0;
        for (let i = 0; i < files.length; i++) {
            await handleFileUpload(files[i], files.length);
        }
    });
});

function upload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'music/'; // Adjust file types as needed
    input.onchange = async (event) => {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            await handleFileUpload(files[i]);
        }
    };
    input.click();
}

let cachedSongs = [];
let currentSongIndex = -1;
async function cacheAllSongs() {
    cachedSongs = [];
    const db = await initDB();
    const transaction = db.transaction('settings', 'readonly');
    const objectStore = transaction.objectStore('settings');
    const request = objectStore.getAllKeys();

    request.onsuccess = async (event) => {
        const keys = event.target.result;
        keys.forEach(key => {
            if (key.startsWith('locker_')) {
                const fileName = key.slice(7);
                let found = valuesToCheck.find(value => key.includes(value));
                if (found === ".mp3" || found === ".wav" || found === ".mpeg" || found === ".flac" || found === ".ogg") {
                    cachedSongs.push({ key, fileName });
                }
            }
        });
    };

    request.onerror = (event) => {
        console.error("<!> Error fetching files variables: " + event.target.errorCode);
    };
}

let playedSongs = [];

function skip() {
    if (cachedSongs.length > 0) {
        currentSongIndex = (currentSongIndex + 1) % cachedSongs.length;
        const { key, fileName } = cachedSongs[currentSongIndex];
        readAndPlaySong(key, fileName);
    }
}

function back() {
    if (cachedSongs.length > 0) {
        currentSongIndex = (currentSongIndex - 1 + cachedSongs.length) % cachedSongs.length;
        const { key, fileName } = cachedSongs[currentSongIndex];
        readAndPlaySong(key, fileName);
    }
}

async function readAndPlaySong(key, fileName) {
    const content = await readvar(key);
    let found = valuesToCheck.find(value => key.includes(value));
    found = found.toLowerCase();
    if (found === ".mp3" || found === ".wav" || found === ".mpeg" || found === ".ogg" || found === ".flac") {
        playaud(content, found, fileName);
    }
}

window.updatefilesList = async function () {
    const filesList = document.getElementById('files-list');
    filesList.innerHTML = '';
    const db = await initDB();
    const transaction = db.transaction('settings', 'readonly');
    const objectStore = transaction.objectStore('settings');
    const request = objectStore.getAllKeys();
    cacheAllSongs(); scrounge();
    request.onsuccess = async (event) => {
        const keys = event.target.result;
        if (keys.length === 0) {
            filesList.innerHTML = '<p>Nothing here yet. Select "<a onclick="upload();">Upload</a>" to add songs, maybe <a onclick="showf(`weather`);">set up the weather</a>, or go to <a onclick="showf(`settings`);">Settings</a> to personalize!</p>';
            return;
        }
        keys.forEach(key => {
            if (key.startsWith('locker_')) {
                const found = valuesToCheck.find(value => key.includes(value));
                if (found === ".mp3" || found === ".wav" || found === ".mpeg" || found === ".ogg" || found === ".flac") {
                } else {
                    delvar(key);
                    window.updatefilesList();
                }
                const fileName = key.slice(7);
                const listItem = document.createElement('div');
                listItem.className = "list";

                const nameCont = document.createElement('span');
                nameCont.className = "namecont";
                nameCont.innerHTML = fileName;
                nameCont.addEventListener('click', async () => {
                    const content = await readvar(key);
                    playaud(content, found);
                    hidef('about');
                });
                const dropdownContainer = document.createElement('div');
                dropdownContainer.className = "dropdown";

                const dropdownButton = document.createElement('button');
                dropdownButton.textContent = "More";
                dropdownButton.className = "dropbtn winb";

                const dropdownContent = document.createElement('div');
                dropdownContent.className = "dropdown-content";

                const playBtn = document.createElement('button');
                playBtn.textContent = "Play";
                playBtn.classList = "b1 b2";
                playBtn.addEventListener('click', async () => {
                    const content = await readvar(key);
                    const found = valuesToCheck.find(value => key.includes(value));
                    if (found === ".mp3" || found === ".wav" || found === ".mpeg" || found === ".ogg" || found === ".flac") {
                        playaud(content, found);
                        hidef('about');
                    } else {
                        delvar(key);
                        window.updatefilesList();
                        snack('Shuffler only supports .mp3, .wav, and .mpeg right now.', '4000');
                    }
                });

                const grabBtn = document.createElement('button');
                grabBtn.textContent = "Grab";
                grabBtn.classList = "b1 b2";
                grabBtn.addEventListener('click', async () => {
                    const content = await readvar(key);
                    const a = document.createElement('a');
                    a.href = content;
                    a.download = fileName;
                    a.click();
                    snack('Started file download!', '2500');
                });

                const upBtn = document.createElement('button');
                upBtn.textContent = "Send";
                upBtn.classList = "b1 b2 hide";
                upBtn.addEventListener('click', async () => {
                    const content = await readvar(key);
                    sblob = content;
                    sname = key;
                    showf('sender');
                });


                const renBtn = document.createElement('button');
                renBtn.textContent = "Rename";
                renBtn.classList = "b1 b2";
                renBtn.addEventListener('click', () => {
                    const boxId = gen(7);
                    const win = `<p>Renaming <span class="med">${fileName}</span></p><p>Enter a name that isn't already used, or else this file will overwrite the other file.</p>
                    <input class="i1" id="${boxId}" placeholder="Name here"/>`;
                    wal(win, `renfiles('${key}', '${boxId}');`, 'Rename');
                });

                const delBtn = document.createElement('button');
                delBtn.textContent = "Delete";
                delBtn.classList = "b1 b2";
                delBtn.addEventListener('click', () => {
                    listItem.parentNode.removeChild(listItem);
                    delvar(key);
                    snack('Deleted file successfully!', '2500');
                });

                dropdownContent.appendChild(playBtn);
                dropdownContent.appendChild(upBtn);
                dropdownContent.appendChild(grabBtn);
                dropdownContent.appendChild(renBtn);
                dropdownContent.appendChild(delBtn);
                dropdownContainer.appendChild(dropdownButton);
                dropdownContainer.appendChild(dropdownContent);
                listItem.appendChild(dropdownContainer);
                listItem.appendChild(nameCont);
                filesList.appendChild(listItem);
            }
        });
    };

    request.onerror = (event) => {
        console.error("[ERR] Error fetching files variables: " + event.target.errorCode);
    };
};
async function renfiles(name, box) {
    const inputValue = document.getElementById(box).value;
    const sillyExtension = valuesToCheck.find(ext => name.endsWith(ext));
    if (sillyExtension) {
        const newName = `${inputValue}${sillyExtension}`;
        await renvar(name, `locker_${newName}`);
    } else {
        await renvar(name, `locker_${inputValue}`);
    }
    await window.updatefilesList();
    snack(`Renamed to ${inputValue} successfully`, '3500');
}

window.updatefilesList();
