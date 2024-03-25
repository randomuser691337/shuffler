// huge pile of shit mixed with decent code
// if you have any optimizations/better code for this pls dm me: @illchangethislater on discord

const DB_NAME = "WebDeskStore";
const STORE_NAME = "WebDeskDB";
let NTName = "database"; // Default value
// Open IndexedDB
// Initialize the IndexedDB
let dbPromise = null;
var pass = "def" // prepare for encryption
function initDB() {
    if (dbPromise) {
        return dbPromise;
    }

    dbPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const request = indexedDB.open(NTName, 1);

            request.onerror = (event) => {
                reject(`<!> Couldn't open IDB! Run fuck() for details.`);
                mostrecerr = event.target.errorCode;
                panic(`Coudn't open IDB, which is a critical part of WebDesk.`);
            };

            request.onsuccess = (event) => {
                const db = event.target.result;
                resolve(db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                const objectStore = db.createObjectStore('settings', { keyPath: 'name' });
                objectStore.transaction.oncomplete = () => {
                    resolve(db);
                };
            };
        }, 500);
    });

    return dbPromise;
}

// The three following functions are the db to get WebDesk on it's feet before decryption

function writepb(key, value) {
    localStorage.setItem(key, value);
}

function readpb(key) {
    return localStorage.getItem(key);
}

function delpb(key) {
    localStorage.removeItem(key);
}

function erasepb() {
    localStorage.clear();
}

function encrypt(value) {
    if (pass === "def") {
        console.log(`<!> STOP: Password is unset. Value of attempted write: ${value}`);
        return;
    }
    let encrypted = '';
    for (let i = 0; i < value.length; i++) {
        encrypted += String.fromCharCode(value.charCodeAt(i) ^ pass.charCodeAt(i % pass.length));
    }
    return encrypted;
}

function decrypt(value) {
    if (pass === "def") {
        console.log(`<!> STOP: Password is unset. Value of attempted read: ${value}`);
        return;
    }
    let decrypted = '';
    for (let i = 0; i < value.length; i++) {
        decrypted += String.fromCharCode(value.charCodeAt(i) ^ pass.charCodeAt(i % pass.length));
    }
    return decrypted;
}

// Read a variable from the database
async function readvar(varName) {
    if (crashed == true) {
        console.log('Rejected FS action: Panic!');
        return;
    } else {
        try {
            const db = await initDB();
            const transaction = db.transaction('settings', 'readonly');
            const objectStore = transaction.objectStore('settings');
            const request = objectStore.get(varName);

            return new Promise(async (resolve, reject) => {
                request.onsuccess = async (event) => {
                    const encryptedData = event.target.result ? event.target.result.value : undefined;
                    if (!encryptedData) {
                        resolve(undefined); // No data found
                        return;
                    }

                    try {
                        const decryptedData = decrypt(encryptedData);
                        resolve(decryptedData);
                    } catch (error) {
                        reject("[ERR] Error decrypting variable: " + error);
                    }
                };

                request.onerror = (event) => {
                    reject("[ERR] Error reading variable: " + event.target.errorCode);
                };
            });
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
}
// finally killing security theater????
var cleartowr = true;
// Write a variable to the database
async function writevar(varName, value, op) {
    try {
        if (crashed == true) {
            console.log('Rejected FS action: Panic!'); return;
        } else {
            const db = await initDB();
            const transaction = db.transaction('settings', 'readwrite');
            const objectStore = transaction.objectStore('settings');
            const value2 = encrypt(value);
            const request = objectStore.put({ name: varName, value: value2 });

            request.onerror = (event) => {
                console.error("[ERR] Error writing variable: " + event.target.errorCode);
            };

            transaction.oncomplete = function () {
                if (op == "r") {
                    reboot();
                }
            };
        }
    } catch (error) {
        console.error(error);
    }
}

async function delvar(varName) {
    try {
        if (crashed == true) { console.log('Rejected FS action: Panic!'); } else {
            const db = await initDB();
            const transaction = db.transaction('settings', 'readwrite');
            const objectStore = transaction.objectStore('settings');
            objectStore.delete(varName);
            transaction.onerror = (event) => {
                console.error("[ERR] Error deleting variable: " + event.target.errorCode);
            };
        }
    } catch (error) {
        console.error(error);
    }
}

async function eraseall() {
    try {
        if (crashed == true) { console.log('Rejected FS action: crashed!'); return; }
        indexedDB.deleteDatabase(NTName);
        // Don't forget the little one!
        erasepb();
        console.log('<i> Erased container successfully.');
        window.location = "./index.html"
    } catch (error) {
        console.error(error);
    }
}

async function burnitall(er) {
    try {
        await eraseall();
        promptreboot = false;
        if (er === undefined || er === "") {
            stm('<p>Erase completed. Auto-rebooting in 3s...</p><button class="b1" onclick="window.location.reload();">Reboot</button>', 'Erase Assistant', '200px');
            setTimeout(reboot, 3000);
        } else if (er = "justreload") {
            window.location.reload();
        } else {
            stm(`<p>Erase completed. Auto-rebooting in 4s...</p><p>Reason: ${er}</p><button class="b1" onclick="window.location.reload();">Reboot</button>`, 'Erase Assistant', '200px');
            setTimeout(reboot, 4000);
        }
        console.log('[OK] All data has been destroyed.');
    } catch (error) {
        console.log('[CRT] Erase failed! Details: ' + error);
        mkw('<p>Erase may have failed! Reload, chances are that it succeded.</p><button class="b1" onclick="window.location.reload();">Reload</button>', 'Reset Error', '450px');
    }
}

async function passchange(newpass) {
    try {
        // Decrypt the entire database using the old password
        const db = await initDB();
        const transaction = db.transaction('settings', 'readonly');
        const objectStore = transaction.objectStore('settings');
        const request = objectStore.getAll();

        request.onsuccess = async (event) => {
            const variables = event.target.result;

            // Decrypt variables using the current password
            const decryptedVariables = variables.map(variable => ({
                name: variable.name,
                value: decrypt(variable.value)
            }));

            // Change the password
            pass = newpass;

            // Encrypt variables using the new password
            const encryptedVariables = decryptedVariables.map(variable => ({
                name: variable.name,
                value: encrypt(variable.value)
            }));

            // Clear the current database
            const clearTransaction = db.transaction('settings', 'readwrite');
            const clearObjectStore = clearTransaction.objectStore('settings');
            clearObjectStore.clear();

            // Write the encrypted variables with the new password to the database
            const writeTransaction = db.transaction('settings', 'readwrite');
            const writeObjectStore = writeTransaction.objectStore('settings');
            encryptedVariables.forEach(variable => {
                writeObjectStore.put(variable);
            });

            console.log('Database password changed successfully.');
        };

        request.onerror = (event) => {
            console.error("[ERR] Error fetching variables: " + event.target.errorCode);
        };
    } catch (error) {
        console.error(error);
    }
}

const dbParam = urlParams.get("db");

if (dbParam) {
    NTName = dbParam;
} else {
    console.log(`<i> No database variable defined (?db=)`);
}