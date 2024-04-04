// graveyard of variables and functions, even some working ones are here
var DoNotModifyUnlessYouKnowWhatYoureDoing = ["whatever"];
var promptreboot = false;
var urlParams = new URLSearchParams(window.location.search);
var sandParam = urlParams.get("sand");
async function forceoffdata() {
    await writevar('forcedata', 'off');
    send(`This WebDesk's final cry: someone's disabled data collection. `);
    snack('Disabled data collection', '3000')
}
async function forceondata() {
    await writevar('forcedata', 'on');
    send(`This WebDesk's NOT final cry: the user took it back!`);
    snack('Enabled data collection', '3000');
}

async function exsandcon() {
    if (sandParam) {
        burnitall();
        sth('end');
    }
}

function exsand() {
    mkw(`<p>Are you sure you want to exit Sandbox?</p><p>All data in Sandbox will be erased, select 'Close' to cancel or 'Okay' to continue.</p><button class="b1" onclick="exsandcon();">Okay</button>`, 'Sandbox', '350px');
}

async function holyfuck() {
    const yeah = await passtime('oobepin');
    if (yeah === true) {
        fesw('setupnew', 'setup2');
    }
}
async function holyshit() {
    const yeah = await nametime('username');
    if (yeah === true) {
        fesw('setup2', 'setup3');
    }
}
function apps() {
    cm(`<button class="b1 b2" onclick="showf('about');">About</button><button class="b1 b2" onclick="showf('settings');">Settings</button><button class="b1 b2" onclick="showf('terminal');">Terminal</button><button class="b1 b2 hide" onclick="showf('sender');">Sender</button><button class="b1 b2" onclick="showf('weather');">Weather</button><button style="margin-top: 2px;" class="b1">Close</button>`);
}