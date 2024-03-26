function isFileTooLarge(file) {
    // Convert file size to megabytes
    const fileSizeInMB = file.size / (1024 * 1024);
    return fileSizeInMB > 15;
}

var valuesToCheck = [".jpg", ".png", ".svg", ".jpeg", ".webp", ".mp3", ".mp4", ".webm", '.wav', '.mpeg', '.gif'];

// Function to handle file upload
async function handleFileUpload(file) {
    const silly = await readvar('allowbu');
    if (locked === false) {
        try {
            if (!silly === "y") {
                if (isFileTooLarge(file)) {
                    snack('File size exceeds 15MB limit. Skipping upload.', '4000');
                    return;
                }
            }
            const reader = new FileReader();
            reader.onload = async () => {
                const fileName = 'locker_' + file.name;
                const content = reader.result;
                await writevar(fileName, content);
                window.updatefilesList();
            };
            reader.readAsDataURL(file);
            snack('Uploaded file successfully! WebDesk might have frozen if the file was large, wait for it to unfreeze.', '3000');
        } catch (error) {
            snack(`files error: ${error}`, '3500');
            console.log(error);
        }
    } else {
        snack(`Unlock WebDesk to upload.`, '3500');
    }
}

// Event listener for file drag and drop
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
        for (let i = 0; i < files.length; i++) {
            await handleFileUpload(files[i]);
        }
    });
});

// Manual upload function
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
                if (found === ".mp3" || found === ".wav" || found === ".mpeg") {
                    cachedSongs.push({ key, fileName });
                }
            }
        });
    };

    request.onerror = (event) => {
        console.error("[ERR] Error fetching files variables: " + event.target.errorCode);
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

// Function to play previous song
function back() {
    if (cachedSongs.length > 0) {
        currentSongIndex = (currentSongIndex - 1 + cachedSongs.length) % cachedSongs.length;
        const { key, fileName } = cachedSongs[currentSongIndex];
        readAndPlaySong(key, fileName);
    }
}

// Function to read and play song
async function readAndPlaySong(key, fileName) {
    const content = await readvar(key);
    let found = valuesToCheck.find(value => key.includes(value));
    found = found.toLowerCase();
    if (found === ".mp3" || found === ".wav" || found === ".mpeg" || found === ".ogg") {
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
                const fileName = key.slice(7);
                const listItem = document.createElement('div');
                listItem.textContent = fileName;
                listItem.className = "list";
                let found = valuesToCheck.find(value => key.includes(value));
                const viewBtn = document.createElement('button');
                if (found === ".mp3" || found === ".wav" || found === ".mpeg") {
                    viewBtn.textContent = "Play";
                    viewBtn.className = "winb";
                    viewBtn.addEventListener('click', async () => {
                        const content = await readvar(key);
                        playaud(content, found);
                        hidef('about');
                    });
                } else {
                    delvar(key);
                    window.updatefilesList();
                    snack('Shuffler only supports .mp3, .wav, and .mpeg right now.', '4000');
                }

                const downloadButton = document.createElement('button');
                downloadButton.textContent = "Grab";
                downloadButton.className = "winb";
                downloadButton.addEventListener('click', async () => {
                    const content = await readvar(key);
                    const a = document.createElement('a');
                    a.href = content;
                    a.download = fileName;
                    a.click();
                    snack('Started file download!', '2500');
                });

                const deleteButton = document.createElement('button');
                deleteButton.textContent = "Delete";
                deleteButton.className = "winb";
                deleteButton.addEventListener('click', () => {
                    listItem.parentNode.removeChild(listItem);
                    delvar(key);
                    snack('Deleted file successfully!', '2500');
                });

                const renButton = document.createElement('button');
                renButton.textContent = "Rename";
                renButton.className = "winb";
                renButton.addEventListener('click', () => {
                    const boxId = gen(7);
                    const win = `<p>Enter a name that isn't already used, filenames are not encrypted!</p>
                    <input class="i1" id="${boxId}" placeholder="Name here"/><button class="b1" onclick="renfiles('${key}', '${boxId}');$(this).parent().parent().fadeOut('150', function() {$(this).remove();});">Rename</button>`;
                    mkw(win, 'files - Rename', '300px');
                });

                const p = document.createElement('p');

                // Add both buttons to the list item
                listItem.appendChild(p);
                p.appendChild(downloadButton);
                p.appendChild(viewBtn);
                p.appendChild(deleteButton);
                p.appendChild(renButton);
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
