const peer = new Peer(gen(4));

peer.on('open', (id) => {
    masschange('mcode', id);
});

peer.on('connection', (conn) => {
    showf('uploadwarn', 0);
    conn.on('data', (data) => {
        hidef('uploadwarn', 0);
        downloadFile(data.file, data.name);
    });
});

async function downloadFile(data, name) {
    await writevar(name, data);
    window.updatefilesList();
}

function sendf(id) {
    const dataToSend = {
        name: sname,
        file: sblob
    };

    const conn = peer.connect(id); 

    conn.on('open', () => {
        conn.send(dataToSend); 
        hidef('sender');
        snack('Song has been sent.', '2500');
    });

    conn.on('error', (err) => {
        snack('An error occured while sending your song.', '2500');
    });
}