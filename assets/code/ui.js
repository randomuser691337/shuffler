function wal(content, btn1, n) {
    const windowId = gen(6);
    const windowContainer = document.createElement('div');
    windowContainer.className = 'window';
    windowContainer.id = windowId;
    windowContainer.style.display = "block";
    const titleBar = document.createElement('div');
    titleBar.className = 'content';
    titleBar.style.border = "none";
    if (!n) {
        n = "Okay"
    }
    if (btn1) {
        titleBar.innerHTML = content + `<p><button class="b1 wc" onclick="dest('${windowId}');">Close</button><button class="b1 wc" onclick="dest('${windowId}');${btn1}">${n}</button></p>`;
    } else {
        titleBar.innerHTML = content + `<p><button class="b1 b2 wc" onclick="dest('${windowId}');">Close</button></p>`;
    }
    windowContainer.appendChild(titleBar);
    document.getElementById('nest').appendChild(windowContainer);
}

function clapp(d1, destr) {
    if (destr) {
        dest(d1);
    } else {
        hidef(d1);
    }
    const fucker = d1 + "cb";
    dest(fucker);
}
function fesw(d1, d2) {
    const dr1 = document.getElementById(d1);
    const dr2 = document.getElementById(d2);
    $(dr1).fadeOut(140, function () { $(dr2).fadeIn(140); });
}
function hidef(d1, anim) {
    const dr1 = document.getElementById(d1);
    if (dr1) {
        if (anim) {
            $(dr1).fadeOut(anim);
        } else {
            $(dr1).fadeOut(170);
        }
    }
}
function showf(d1, anim) {
    const dr1 = document.getElementById(d1);
    if (dr1) {
        if (anim) {
            $(dr1).fadeIn(anim);
        } else {
            $(dr1).fadeIn(170);
        }
    }
}
function hidecls(className) {
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }
}
function showcls(className) {
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'inline';
    }
}
function changevar(varName, varValue, dontwrite) {
    const root = document.documentElement;
    root.style.setProperty(`--${varName}`, `${varValue}`);
    if (dontwrite === !true) {
        writevar(varName, varValue);
    }
}
function cv(name, val) {
    changevar(name, val);
}
function truncater(inputString, size) {
    if (inputString.length <= size) {
        return inputString;
    } else {
        return inputString.slice(0, size - 3) + '...';
    }
}
async function chacc(clr1) {
    changevar('accent', clr1);
    await writevar('accent', clr1);
    acce = await readvar('accent');
}
function dest(d1) {
    const dr1 = document.getElementById(d1);
    $(dr1).fadeOut(170, function () { dr1.remove(); });
}
function snack(cont, t) {
    var snackElement = document.createElement("div");
    snackElement.className = "snack";
    const fuckyou = gen(7);
    snackElement.id = fuckyou;
    snackElement.innerHTML = cont;
    document.body.appendChild(snackElement);
    snackElement.onclick = function () {
        dest(fuckyou);
    }
    setTimeout(function () { dest(fuckyou); }, t);
}
function sv() {
    snack('Saved!', '2000');
}
function toggle(elementId, time3) {
    var element = document.getElementById(elementId);
    if (element) {
        if (element.style.display === '' || element.style.display === 'none') {
            element.style.display = 'block';
        } else {
            hidef(elementId, time3);
        }
    }
}
function masschange(classn, val) {
    const usernameElements = document.getElementsByClassName(classn);
    for (let i = 0; i < usernameElements.length; i++) {
        usernameElements[i].textContent = val;
    }
}
function masshtml(classn, val) {
    const usernameElements = document.getElementsByClassName(classn);
    for (let i = 0; i < usernameElements.length; i++) {
        usernameElements[i].innerHTML = val;
    }
}
function embed(src, name, width, height) {
    const random = gen(8);
    const embed = `<embed class="embed" id="${random}" src="${src}", height="${height}"></embed>`
    mkw(embed, name, width, './assets/img/browse.svg');
}
function redir(url2) {
    const ye = `<p>You're about to be redirected to ${url2}.</p>
    <p>Select "Close" to cancel, or "Accept" to continue.</p>`
    wal(ye, `golink('${url2}');`);
}
function getstr() {
    const progressBarElements = document.querySelectorAll('.struse');
    const usageTextElements = document.querySelectorAll('.usage-text');
    try {
        navigator.storage.estimate().then(function (estimate) {
            const usedGB = (estimate.usage / (1024 * 1024 * 1024)).toFixed(2);
            const quotaGB = (estimate.quota / (1024 * 1024 * 1024)).toFixed(2);

            usageTextElements.forEach(function (usageText) {
                usageText.innerHTML = `Used <span class="med">${usedGB}</span> GB out of <span class="med">${quotaGB}</span> GB`;
            });

            progressBarElements.forEach(function (progressBar) {
                const usageInPercent = (estimate.usage / estimate.quota) * 100;
                progressBar.style.width = usageInPercent + '%';
            });
        });
    } catch (error) {
        usageText.innerHTML = `Error getting storage info. Try updating your browser.`;
        panic(`${error} - getstr`);
    }
}

function setupbg() {
    showf('setupbg');
}

setInterval(getstr, 2000);
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
function sall(className) {
    var buttons = document.getElementsByClassName(className);
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].click();
    }
}
async function setThemeColor(color) {
    var metaTag = document.querySelector('meta[name="theme-color"]');
    if (metaTag) {
        metaTag.setAttribute('content', color);
    } else {
        var newMetaTag = document.createElement('meta');
        newMetaTag.setAttribute('name', 'theme-color');
        newMetaTag.setAttribute('content', color);
        document.head.appendChild(newMetaTag);
    }
}

async function appear(mode) {
    if (mode === "l") {
        await setThemeColor('#ffffff');
        changevar('background', '#fff');
        changevar('lightdark', '#fff');
        changevar('lightdarkb', '#dfdfdf');
        changevar('fontc', '#000');
        changevar('fontc2', "#333");
        changevar('bordercolor', "#DFDFDF");
        changevar('isat', "invert(0)");
        await writevar('appear', 'l');
    } else if (mode === "a") {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            appear();
        } else {
            appear('l');
        }
    } else {
        await setThemeColor('#1a1a1a');
        changevar('background', '#000');
        changevar('lightdark', '#1a1a1a');
        changevar('lightdarkb', '#2a2a2a');
        changevar('fontc', '#fff');
        changevar('fontc2', "#aaa");
        changevar('bordercolor', "#3a3a3a");
        changevar('isat', "invert(1)");
        await writevar('appear', 'd');
    }
}